import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Baseline seed count to ensure view continuity
const BASELINE_VIEWS = 154;
const REDIS_KEY = "portfolio_total_views";

// In-memory cache for fast local responses and fallback
let inMemoryViews = BASELINE_VIEWS;

// Simple in-memory IP cooldown to prevent automated increment spam (30s window)
const ipCooldowns = new Map<string, number>();

// Helper to determine Upstash / Vercel KV REST credentials (supports STORAGE, KV, UPSTASH prefixes)
function getRedisCredentials() {
  // Direct check for standard and custom prefixes (including Vercel's STORAGE prefix)
  const url =
    process.env.STORAGE_REST_API_URL ||
    process.env.KV_REST_API_URL ||
    process.env.UPSTASH_REDIS_REST_URL ||
    process.env.REDIS_REST_API_URL;

  const token =
    process.env.STORAGE_REST_API_TOKEN ||
    process.env.KV_REST_API_TOKEN ||
    process.env.UPSTASH_REDIS_REST_TOKEN ||
    process.env.REDIS_REST_API_TOKEN;

  if (url && token) {
    return { url: url.replace(/\/$/, ""), token };
  }

  // Dynamic discovery: find any environment variable matching *_REST_API_URL and *_REST_API_TOKEN
  const envKeys = Object.keys(process.env);
  const urlKey = envKeys.find((k) => k.endsWith("_REST_API_URL"));
  if (urlKey) {
    const prefix = urlKey.replace(/_REST_API_URL$/, "");
    const tokenKey = `${prefix}_REST_API_TOKEN`;
    const foundUrl = process.env[urlKey];
    const foundToken = process.env[tokenKey];
    if (foundUrl && foundToken) {
      return { url: foundUrl.replace(/\/$/, ""), token: foundToken };
    }
  }

  return null;
}

// 1. Cloud-Native Upstash / Vercel KV Operations via HTTP REST (Atomic & Globally Synced)
async function getViewsFromRedis(url: string, token: string): Promise<number | null> {
  try {
    const res = await fetch(`${url}/get/${REDIS_KEY}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (data.result !== null && data.result !== undefined) {
      const parsed = parseInt(String(data.result), 10);
      if (!isNaN(parsed) && parsed > 0) {
        inMemoryViews = parsed;
        return parsed;
      }
    }
    // Key does not exist yet in Redis; seed it with BASELINE_VIEWS
    await fetch(`${url}/set/${REDIS_KEY}/${BASELINE_VIEWS}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    inMemoryViews = BASELINE_VIEWS;
    return BASELINE_VIEWS;
  } catch (err) {
    console.error("Vercel KV / Redis read error:", err);
    return null;
  }
}

async function incrementViewsInRedis(url: string, token: string): Promise<number | null> {
  try {
    // Ensure the key exists with baseline before incrementing
    await fetch(`${url}/setnx/${REDIS_KEY}/${BASELINE_VIEWS}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    // Atomic INCR command
    const res = await fetch(`${url}/incr/${REDIS_KEY}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (typeof data.result === "number") {
      inMemoryViews = data.result;
      return data.result;
    }
  } catch (err) {
    console.error("Vercel KV / Redis increment error:", err);
  }
  return null;
}

// 2. Local File System Fallback (For local development or environments with persistent disk)
function getViewsFromDisk(): number {
  try {
    const DATA_DIR = path.join(process.cwd(), "data");
    const VIEWS_FILE = path.join(DATA_DIR, "views.json");

    if (fs.existsSync(VIEWS_FILE)) {
      const raw = fs.readFileSync(VIEWS_FILE, "utf-8");
      const parsed = JSON.parse(raw);
      if (typeof parsed.views === "number" && parsed.views >= BASELINE_VIEWS) {
        inMemoryViews = parsed.views;
        return parsed.views;
      }
    }
  } catch {
    // Read-only filesystem on Vercel lambda (expected if KV is not yet linked)
  }
  return inMemoryViews;
}

function saveViewsToDisk(count: number) {
  inMemoryViews = count;
  try {
    const DATA_DIR = path.join(process.cwd(), "data");
    const VIEWS_FILE = path.join(DATA_DIR, "views.json");

    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(VIEWS_FILE, JSON.stringify({ views: count }), "utf-8");
  } catch {
    // In serverless read-only environments, attempt /tmp fallback
    try {
      const tmpPath = path.join("/tmp", "views.json");
      fs.writeFileSync(tmpPath, JSON.stringify({ views: count }), "utf-8");
    } catch {
      // Ephemeral memory holds it
    }
  }
}

// GET: Pure read operation (Never increments)
export async function GET() {
  const redis = getRedisCredentials();
  let count: number | null = null;

  if (redis) {
    count = await getViewsFromRedis(redis.url, redis.token);
  }

  if (count === null) {
    count = getViewsFromDisk();
  }

  return NextResponse.json(
    { views: count },
    {
      headers: {
        "Cache-Control": "no-store, max-age=0, must-revalidate",
        Pragma: "no-cache",
      },
    }
  );
}

// POST: Genuine visit increment with deduplication
export async function POST(request: Request) {
  try {
    const redis = getRedisCredentials();
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : "anonymous";
    const now = Date.now();

    // Check anti-spam cooldown: 30 seconds per unique IP
    const lastSeen = ipCooldowns.get(ip);
    const isRateLimited = lastSeen && now - lastSeen < 30_000;

    if (isRateLimited) {
      // Return current views without incrementing
      let current: number | null = null;
      if (redis) {
        current = await getViewsFromRedis(redis.url, redis.token);
      }
      if (current === null) {
        current = getViewsFromDisk();
      }
      return NextResponse.json(
        { views: current },
        {
          headers: {
            "Cache-Control": "no-store, max-age=0, must-revalidate",
          },
        }
      );
    }

    // Record this IP's visit timestamp
    ipCooldowns.set(ip, now);
    if (ipCooldowns.size > 2000) {
      // Periodic cleanup of old cooldown records
      ipCooldowns.clear();
    }

    let nextCount: number | null = null;

    if (redis) {
      nextCount = await incrementViewsInRedis(redis.url, redis.token);
    }

    if (nextCount === null) {
      const current = getViewsFromDisk();
      nextCount = current + 1;
      saveViewsToDisk(nextCount);
    }

    return NextResponse.json(
      { views: nextCount },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0, must-revalidate",
        },
      }
    );
  } catch (error) {
    console.error("Views POST handler error:", error);
    const fallback = getViewsFromDisk();
    return NextResponse.json({ views: fallback });
  }
}
