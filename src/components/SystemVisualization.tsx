"use client";

import React, { useState, useEffect } from "react";
import {
  Terminal,
  Cpu,
  Layers,
  Wrench,
  Database,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Activity,
  Zap,
} from "lucide-react";

interface NodeData {
  id: string;
  index: number;
  stage: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  metric: string;
  detail: string;
  tags: string[];
  role: string;
}

const SYSTEM_NODES: NodeData[] = [
  {
    id: "user",
    index: 0,
    stage: "01 // INGESTION",
    title: "USER & TRIGGERS",
    subtitle: "WebSockets & Schedulers",
    icon: Terminal,
    metric: "Streaming Sockets",
    detail: "Natural language business queries, invoice documents, or automated PostgreSQL-backed cron scheduler triggers entering through persistent WebSocket connections.",
    tags: ["Streaming", "WebSockets", "AI Scheduler", "MIME Ingest"],
    role: "Client Trigger & Ingestion",
  },
  {
    id: "ai-system",
    index: 1,
    stage: "02 // GATEWAY",
    title: "FASTAPI GATEWAY",
    subtitle: "Auth, MIME & Streaming",
    icon: Layers,
    metric: "Strict Pydantic",
    detail: "Validates input schemas, enforces rate-limiting and authorization boundaries, extracts MIME types, and streams model tokens asynchronously back to the client.",
    tags: ["FastAPI", "Session Isolation", "Async Streaming"],
    role: "Validation & Request Routing",
  },
  {
    id: "agent-rag-ml",
    index: 2,
    stage: "03 // REASONING",
    title: "SPECIALIST AGENT / RAG",
    subtitle: "vLLM & Dense Retrieval",
    icon: Cpu,
    metric: "vLLM Serving (~5s)",
    detail: "Domain-scoped specialist agents formulate structured action plans via local vLLM serving. CodeBase-RAG retrieves AST-parsed syntax chunks from pgvector.",
    tags: ["Specialist Agents", "vLLM Qwen", "Tree-sitter AST", "HNSW Rebuild"],
    role: "Intent Planning & Retrieval",
  },
  {
    id: "tools",
    index: 3,
    stage: "04 // BOUNDARY",
    title: "TYPED PYTHON TOOLS",
    subtitle: "Deterministic Execution",
    icon: Wrench,
    metric: "Bounded Tool Access",
    detail: "The model only outputs validated tool arguments. Python executes operations via an asynchronous task queue, ensuring model outputs cannot directly mutate database tables.",
    tags: ["Pydantic Validation", "Async Task Queue", "Internal APIs"],
    role: "Deterministic Execution",
  },
  {
    id: "software",
    index: 4,
    stage: "05 // PERSISTENCE",
    title: "REAL SOFTWARE & DB",
    subtitle: "ERP · DB · Storage",
    icon: Database,
    metric: "System of Record",
    detail: "PostgreSQL, MongoDB, and enterprise services execute transactions and maintain audited business state with rollback mechanisms and notification delivery.",
    tags: ["PostgreSQL", "MongoDB", "Enterprise ERP", "Audit State"],
    role: "State Persistence & Systems",
  },
];

export function SystemVisualization() {
  const [selectedNode, setSelectedNode] = useState<string>("agent-rag-ml");
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [activeSignalIndex, setActiveSignalIndex] = useState<number>(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Continuous subtle request/data signal travelling through the 5 nodes
  useEffect(() => {
    if (prefersReducedMotion) return;
    const interval = setInterval(() => {
      setActiveSignalIndex((prev) => (prev + 1) % SYSTEM_NODES.length);
    }, 1800);
    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  const handleNodeMouseEnter = (nodeId: string) => {
    if (typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches) {
      setHoveredNode(nodeId);
    }
  };

  const handleNodeMouseLeave = () => {
    if (typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches) {
      setHoveredNode(null);
    }
  };

  const activeNodeId = hoveredNode || selectedNode;
  const currentNode =
    SYSTEM_NODES.find((node) => node.id === activeNodeId) || SYSTEM_NODES[2];
  const currentIndex = currentNode.index;

  // Determine if a node is in the immediate connected path of the currently active node
  const isPathConnected = (index: number) => {
    return Math.abs(index - currentIndex) <= 1;
  };

  return (
    <div className="w-full relative rounded-xl border border-white/[0.08] bg-[#0d0f17]/95 backdrop-blur-md overflow-hidden shadow-2xl">
      {/* Top Telemetry Monitor Bar */}
      <div className="flex flex-wrap items-center justify-between px-4 py-3 border-b border-white/[0.06] bg-black/50 text-[11px] font-mono text-zinc-400 gap-2">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-60"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
          </span>
          <span className="text-zinc-200 font-semibold tracking-wider">
            SYSTEM TOPOLOGY MONITOR
          </span>
          <span className="text-zinc-500">//</span>
          <span className="text-zinc-400">LIVE ORCHESTRATION PIPELINE</span>
        </div>

        {/* Live Signal Status Indicator */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-cyan-400 bg-cyan-950/40 px-2.5 py-0.5 rounded border border-cyan-500/20 text-[10px]">
            <Activity className="w-3 h-3 text-cyan-400 animate-pulse" />
            <span>SIGNAL:</span>
            <span className="text-zinc-200 uppercase font-semibold">
              {SYSTEM_NODES[activeSignalIndex].stage.split(" // ")[1]}
            </span>
          </div>
          <span className="hidden sm:flex items-center gap-1 text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 text-[10px]">
            <ShieldCheck className="w-3 h-3" /> BOUNDED EXECUTION
          </span>
        </div>
      </div>

      {/* Main Interactive Flow Pipeline */}
      <div className="p-4 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5 relative">
          {SYSTEM_NODES.map((node, index) => {
            const isSelected = selectedNode === node.id;
            const isHovered = hoveredNode === node.id;
            const isDirectActive = activeNodeId === node.id;
            const isConnected = isPathConnected(node.index);
            const isCarryingSignal = activeSignalIndex === index;
            const Icon = node.icon;

            return (
              <div key={node.id} className="relative group">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedNode(node.id);
                    setHoveredNode(null);
                  }}
                  onMouseEnter={() => handleNodeMouseEnter(node.id)}
                  onMouseLeave={handleNodeMouseLeave}
                  className={`w-full text-left p-3.5 sm:p-3 rounded-lg transition-all duration-200 cursor-pointer border flex flex-col justify-between h-full min-h-[110px] touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 active:bg-cyan-900/40 ${
                    isDirectActive
                      ? "bg-cyan-950/40 border-cyan-400/80 shadow-[0_0_20px_rgba(6,182,212,0.2)] ring-1 ring-cyan-400/50"
                      : isConnected && (hoveredNode || selectedNode)
                      ? "bg-cyan-950/15 border-cyan-500/30 text-zinc-200"
                      : "bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.05] hover:border-white/[0.18]"
                  }`}
                  aria-pressed={isSelected}
                  aria-label={`${node.title}: ${node.subtitle}`}
                >
                  {/* Top: Stage + Icon + Signal Pulse */}
                  <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 mb-1.5">
                    <span className="tracking-wider">{node.stage.split(" // ")[0]}</span>
                    <div className="flex items-center gap-1.5">
                      {isCarryingSignal && (
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#38bdf8] animate-ping" />
                      )}
                      <Icon
                        className={`w-3.5 h-3.5 transition-colors ${
                          isDirectActive
                            ? "text-cyan-400"
                            : isConnected
                            ? "text-cyan-300/80"
                            : "text-zinc-500 group-hover:text-zinc-300"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <div
                      className={`text-xs font-mono font-semibold tracking-wide transition-colors ${
                        isDirectActive
                          ? "text-cyan-200"
                          : isConnected
                          ? "text-zinc-100"
                          : "text-zinc-300 group-hover:text-white"
                      }`}
                    >
                      {node.title}
                    </div>
                    <div className="text-[11px] text-zinc-400 font-sans mt-0.5 line-clamp-1">
                      {node.subtitle}
                    </div>
                  </div>

                  {/* Metric Pill */}
                  <div className="mt-2.5 pt-1.5 border-t border-white/[0.05] flex items-center justify-between">
                    <span
                      className={`text-[10px] font-mono font-medium ${
                        isDirectActive ? "text-cyan-300" : "text-zinc-400"
                      }`}
                    >
                      {node.metric}
                    </span>
                    {isDirectActive && (
                      <span className="text-[9px] font-mono text-cyan-400 px-1 py-0.2 rounded bg-cyan-400/10">
                        ACTIVE
                      </span>
                    )}
                  </div>
                </button>

                {/* Desktop Connecting Arrow with Dynamic Path Highlighting */}
                {index < SYSTEM_NODES.length - 1 && (
                  <div
                    className={`hidden sm:flex absolute -right-2 top-1/2 -translate-y-1/2 z-10 pointer-events-none transition-colors duration-200 ${
                      (currentIndex === index || currentIndex === index + 1)
                        ? "text-cyan-400 scale-110 drop-shadow-[0_0_4px_rgba(56,189,248,0.5)]"
                        : "text-zinc-600"
                    }`}
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Selected Node Detailed Architecture Telemetry Drawer */}
        <div className="mt-5 p-4 sm:p-5 rounded-lg border border-white/[0.08] bg-black/60 font-mono text-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-3 border-b border-white/[0.06] gap-2">
            <div className="flex items-center gap-2">
              <span className="text-cyan-400 font-bold">{currentNode.stage}</span>
              <span className="text-zinc-500">//</span>
              <span className="text-zinc-100 font-semibold">{currentNode.title}</span>
              <span className="text-zinc-400">({currentNode.role})</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-zinc-400">
              <Zap className="w-3 h-3 text-cyan-400" />
              <span>TELEMETRY:</span>
              <span className="text-cyan-300 font-semibold">{currentNode.metric}</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
            {currentNode.detail}
          </p>

          <div className="mt-3.5 flex flex-wrap items-center gap-2">
            <span className="text-[10px] text-zinc-400 uppercase tracking-wider">
              Enforced Technologies:
            </span>
            {currentNode.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-950/30 text-cyan-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
