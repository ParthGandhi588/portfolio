"use client";

import React from "react";
import { TECHNOLOGIES } from "@/data/portfolioData";

// Authentic, recognizable brand logos & symbols for each technology
function TechSymbol({ name }: { name: string }) {
  switch (name) {
    case "Python":
      return (
        <svg className="w-5 h-5" viewBox="0 0 128 128" fill="none">
          <path
            d="M63.086 5C35.215 5 36.96 17.067 36.96 17.067L37 29.56H64.08V33.32H26.31S8.57 31.332 8.57 59.168C8.57 87.005 24.1 85.5 24.1 85.5L33.36 85.5V72.548S32.86 57.06 48.64 57.06H75.44V33.32S76.84 21.365 63.086 5ZM48.63 15.688A4.28 4.28 0 0 1 52.92 19.98 4.28 4.28 0 0 1 48.63 24.27 4.28 4.28 0 0 1 44.34 19.98 4.28 4.28 0 0 1 48.63 15.688Z"
            fill="#387eb8"
          />
          <path
            d="M64.914 123C92.785 123 91.04 110.933 91.04 110.933L91 98.44H63.92V94.68H101.69S119.43 96.668 119.43 68.832C119.43 40.995 103.9 42.5 103.9 42.5L94.64 42.5V55.452S95.14 70.94 79.36 70.94H52.56V94.68S51.16 106.635 64.914 123ZM79.37 112.312A4.28 4.28 0 0 1 75.08 108.02 4.28 4.28 0 0 1 79.37 103.73 4.28 4.28 0 0 1 83.66 108.02 4.28 4.28 0 0 1 79.37 112.312Z"
            fill="#ffe052"
          />
        </svg>
      );

    case "FastAPI":
      return (
        <svg className="w-5 h-5" viewBox="0 0 128 128" fill="none">
          <circle cx="64" cy="64" r="60" fill="#059669" />
          <path
            d="M71.5 24L39.5 70H63.5L56.5 104L88.5 58H64.5L71.5 24Z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case "PostgreSQL":
      return (
        <svg className="w-5 h-5" viewBox="0 0 128 128" fill="none">
          <path
            d="M64 12C35.28 12 12 35.28 12 64C12 92.72 35.28 116 64 116C92.72 116 116 92.72 116 64C116 35.28 92.72 12 64 12Z"
            fill="#336791"
          />
          <path
            d="M62 32C52 32 44 38 41 46C38 42 33 40 28 42C22 44 20 51 22 57C24 63 30 65 36 64C36 76 43 88 56 92C61 93 67 92 72 90C77 88 83 83 86 78C91 69 92 57 88 47C84 37 73 32 62 32ZM67 47C69.2 47 71 48.8 71 51C71 53.2 69.2 55 67 55C64.8 55 63 53.2 63 51C63 48.8 64.8 47 67 47Z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case "MongoDB":
      return (
        <svg className="w-5 h-5" viewBox="0 0 128 128" fill="none">
          <path
            d="M63.8 8C63.8 8 36 43 36 74C36 89.4 46.8 102.5 61.2 105.7C61.2 105.7 63.8 119.5 64.2 120C64.6 119.5 67.2 105.7 67.2 105.7C81.6 102.5 92.4 89.4 92.4 74C92.4 43 63.8 8 63.8 8Z"
            fill="#13aa52"
          />
          <path
            d="M63.8 8V106.6C63.8 106.6 63.9 106.7 64.1 106.7C64.3 106.7 64.4 106.6 64.4 106.6V8C64.4 8 64.1 8 63.8 8Z"
            fill="#FFFFFF"
            opacity="0.3"
          />
        </svg>
      );

    case "Docker":
      return (
        <svg className="w-5 h-5" viewBox="0 0 128 128" fill="none">
          <path
            d="M26 50H36V60H26V50ZM38 50H48V60H38V50ZM50 50H60V60H50V50ZM62 50H72V60H62V50ZM38 38H48V48H38V38ZM50 38H60V48H50V38ZM62 38H72V48H62V38ZM50 26H60V36H50V26ZM74 50H84V60H74V50Z"
            fill="#2496ED"
          />
          <path
            d="M117.8 59C114.7 54.3 108.9 52.4 103.5 54C100.9 48 94.6 44 87.5 44H13C9 44 5.7 47.3 5.7 51.3C5.7 75.3 25.3 95 49.3 95C77.4 95 101.4 76.5 107.5 59.8C111.4 61.2 115.8 60.5 117.8 59Z"
            fill="#2496ED"
          />
        </svg>
      );

    case "MySQL":
      return (
        <svg className="w-5 h-5" viewBox="0 0 128 128" fill="none">
          <circle cx="64" cy="64" r="60" fill="#00758F" />
          <path
            d="M32 76C40 76 48 68 56 60C62 54 70 50 78 50C86 50 94 54 98 62C92 60 84 62 80 66C76 70 76 76 80 80C74 80 66 76 60 72C52 66 42 66 32 76Z"
            fill="#F29111"
          />
          <path
            d="M74 38C78 44 82 48 88 50C84 46 80 42 74 38Z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case "vLLM":
      return (
        <svg className="w-5 h-5" viewBox="0 0 128 128" fill="none">
          <rect width="128" height="128" rx="28" fill="#7C3AED" />
          <path
            d="M32 40L54 88H68L90 40H76L61 74L46 40H32Z"
            fill="#FFFFFF"
          />
          <circle cx="96" cy="40" r="8" fill="#F43F5E" />
        </svg>
      );

    case "pgvector":
      return (
        <svg className="w-5 h-5" viewBox="0 0 128 128" fill="none">
          <rect width="128" height="128" rx="28" fill="#3B82F6" />
          <path
            d="M64 28L98 48V80L64 100L30 80V48L64 28Z"
            stroke="#FFFFFF"
            strokeWidth="7"
            strokeLinejoin="round"
          />
          <path
            d="M64 28V100M30 48L98 80M98 48L30 80"
            stroke="#93C5FD"
            strokeWidth="5"
          />
          <circle cx="64" cy="64" r="7" fill="#60A5FA" />
        </svg>
      );

    case "Tree-sitter":
      return (
        <svg className="w-5 h-5" viewBox="0 0 128 128" fill="none">
          <rect width="128" height="128" rx="28" fill="#22C55E" />
          <path
            d="M64 24V104M64 54L38 74M64 68L90 88M64 40L88 56"
            stroke="#FFFFFF"
            strokeWidth="9"
            strokeLinecap="round"
          />
          <circle cx="64" cy="24" r="8" fill="#FFFFFF" />
          <circle cx="38" cy="74" r="7" fill="#DCFCE7" />
          <circle cx="90" cy="88" r="7" fill="#DCFCE7" />
          <circle cx="88" cy="56" r="7" fill="#DCFCE7" />
        </svg>
      );

    case "WebSockets":
      return (
        <svg className="w-5 h-5" viewBox="0 0 128 128" fill="none">
          <circle cx="64" cy="64" r="60" fill="#06B6D4" />
          <path
            d="M34 52H84L72 40M94 76H44L56 88"
            stroke="#FFFFFF"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case "Scikit-learn":
      return (
        <svg className="w-5 h-5" viewBox="0 0 128 128" fill="none">
          <circle cx="50" cy="64" r="34" fill="#F97316" />
          <circle cx="78" cy="64" r="34" fill="#0EA5E9" fillOpacity="0.85" />
          <path
            d="M40 50L64 64L88 78M64 42L64 86"
            stroke="#FFFFFF"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </svg>
      );

    case "GitPython":
      return (
        <svg className="w-5 h-5" viewBox="0 0 128 128" fill="none">
          <path
            d="M121 57L71 7C68 4 63 4 60 7L47 20L63 36C67 35 71 36 74 39C77 42 78 47 76 51L91 66C95 64 100 66 103 69C107 73 107 79 103 83C99 87 93 87 89 83C86 80 85 76 86 72L72 58V87C74 88 75 90 76 92C78 96 77 101 74 104C71 107 66 108 62 106C58 104 56 99 57 95C58 92 60 89 63 88V58C60 57 58 54 57 51C56 47 57 42 60 39L44 23L7 60C4 63 4 68 7 71L57 121C60 124 65 124 68 121L121 68C124 65 124 60 121 57Z"
            fill="#F05032"
          />
        </svg>
      );

    case "LangChain":
      return (
        <svg className="w-5 h-5" viewBox="0 0 128 128" fill="none">
          <rect width="128" height="128" rx="28" fill="#10B981" />
          <path
            d="M44 48C44 38 52 30 62 30C72 30 80 38 80 48V80C80 90 72 98 62 98C52 98 44 90 44 80V48Z"
            stroke="#FFFFFF"
            strokeWidth="8"
          />
          <circle cx="70" cy="42" r="5" fill="#FFFFFF" />
          <path d="M80 44L94 50L80 56V44Z" fill="#FBBF24" />
        </svg>
      );

    case "LangGraph":
      return (
        <svg className="w-5 h-5" viewBox="0 0 128 128" fill="none">
          <rect width="128" height="128" rx="28" fill="#047857" />
          <circle cx="40" cy="40" r="12" fill="#FFFFFF" />
          <circle cx="88" cy="40" r="12" fill="#FFFFFF" />
          <circle cx="64" cy="88" r="12" fill="#34D399" />
          <path
            d="M48 40H80M82 48L70 80M58 80L46 48"
            stroke="#FFFFFF"
            strokeWidth="5"
          />
        </svg>
      );

    case "LlamaIndex":
      return (
        <svg className="w-5 h-5" viewBox="0 0 128 128" fill="none">
          <rect width="128" height="128" rx="28" fill="#8B5CF6" />
          <path
            d="M48 30V60H40V78H54V66H76V88H68V98H86V54H62V30H48Z"
            fill="#FFFFFF"
          />
          <circle cx="56" cy="38" r="4" fill="#8B5CF6" />
        </svg>
      );

    case "Ollama":
      return (
        <svg className="w-5 h-5" viewBox="0 0 128 128" fill="none">
          <circle cx="64" cy="64" r="60" fill="#E2E8F0" />
          <path
            d="M46 36V62C46 72 54 80 64 80C74 80 82 72 82 62V36L72 44V60C72 64 68 68 64 68C60 68 56 64 56 60V44L46 36Z"
            fill="#0F172A"
          />
          <circle cx="58" cy="54" r="3" fill="#0F172A" />
          <circle cx="70" cy="54" r="3" fill="#0F172A" />
        </svg>
      );

    case "MinIO":
      return (
        <svg className="w-5 h-5" viewBox="0 0 128 128" fill="none">
          <rect width="128" height="128" rx="28" fill="#C72C48" />
          <path
            d="M32 44L64 62L96 44L64 26L32 44ZM32 54V84L64 102V72L32 54ZM96 54L64 72V102L96 84V54Z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case "LLMs":
      return (
        <svg className="w-5 h-5" viewBox="0 0 128 128" fill="none">
          <circle cx="64" cy="64" r="60" fill="#8B5CF6" />
          <path
            d="M64 20L72 52L104 60L72 68L64 100L56 68L24 60L56 52L64 20Z"
            fill="#FFFFFF"
          />
          <circle cx="92" cy="36" r="6" fill="#FDE047" />
        </svg>
      );

    case "RAG":
      return (
        <svg className="w-5 h-5" viewBox="0 0 128 128" fill="none">
          <circle cx="64" cy="64" r="60" fill="#2563EB" />
          <rect x="36" y="32" width="34" height="46" rx="4" fill="#FFFFFF" />
          <path d="M44 44H62M44 54H58M44 64H54" stroke="#2563EB" strokeWidth="4" strokeLinecap="round" />
          <circle cx="82" cy="74" r="18" fill="#60A5FA" />
          <path d="M76 74L80 78L88 70" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case "Agentic AI":
      return (
        <svg className="w-5 h-5" viewBox="0 0 128 128" fill="none">
          <circle cx="64" cy="64" r="60" fill="#0284C7" />
          <path
            d="M64 28A36 36 0 1 1 34 82L24 84L40 98L48 80L38 82A28 28 0 1 0 64 36V28Z"
            fill="#FFFFFF"
          />
          <circle cx="64" cy="64" r="10" fill="#38BDF8" />
        </svg>
      );

    case "OCR":
      return (
        <svg className="w-5 h-5" viewBox="0 0 128 128" fill="none">
          <circle cx="64" cy="64" r="60" fill="#E11D48" />
          <path
            d="M36 48V36H48M80 36H92V48M92 80V92H80M48 92H36V80"
            stroke="#FFFFFF"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <path d="M46 64H82" stroke="#FDA4AF" strokeWidth="6" strokeLinecap="round" />
        </svg>
      );

    case "Computer Vision":
      return (
        <svg className="w-5 h-5" viewBox="0 0 128 128" fill="none">
          <circle cx="64" cy="64" r="60" fill="#059669" />
          <path
            d="M26 64C38 44 50 36 64 36C78 36 90 44 102 64C90 84 78 92 64 92C50 92 38 84 26 64Z"
            stroke="#FFFFFF"
            strokeWidth="7"
            strokeLinejoin="round"
          />
          <circle cx="64" cy="64" r="14" fill="#34D399" />
          <circle cx="64" cy="64" r="6" fill="#FFFFFF" />
        </svg>
      );

    case "Embeddings":
    case "FastEmbed":
      return (
        <svg className="w-5 h-5" viewBox="0 0 128 128" fill="none">
          <circle cx="64" cy="64" r="60" fill="#4F46E5" />
          <circle cx="44" cy="44" r="8" fill="#FFFFFF" />
          <circle cx="84" cy="44" r="8" fill="#818CF8" />
          <circle cx="44" cy="84" r="8" fill="#818CF8" />
          <circle cx="84" cy="84" r="8" fill="#FFFFFF" />
          <path d="M44 44L84 84M84 44L44 84" stroke="#C7D2FE" strokeWidth="4" />
        </svg>
      );

    default:
      return (
        <div className="w-5 h-5 rounded-full bg-zinc-800 flex items-center justify-center text-[10px] text-zinc-400 font-mono">
          ✓
        </div>
      );
  }
}

export function TechnologyStack() {
  return (
    <section id="inventory" className="py-24 sm:py-36 border-t border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-10 border-b border-white/[0.08] gap-6">
          <div className="space-y-2">
            <span className="text-xs font-mono text-blue-400 tracking-wider uppercase">
              INDEX 04 // TECHNICAL TOOLCHAIN LEDGER
            </span>
            <h2 className="text-3xl sm:text-5xl font-sans font-light text-white tracking-tight">
              Production <span className="font-serif italic text-white">Inventory</span>
            </h2>
          </div>
          <p className="text-sm text-zinc-400 font-sans max-w-md leading-relaxed">
            Technologies deployed across model inference serving, vector retrieval indexes, and backend enterprise microservices.
          </p>
        </div>

        {/* 4-Column Typographic Ledger with Real Technology Logos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 pt-12">
          {TECHNOLOGIES.map((group, idx) => (
            <div key={group.category} className="space-y-6">
              <div className="space-y-1 pb-3 border-b border-white/[0.1]">
                <span className="font-mono text-xs text-blue-400">0{idx + 1} // CATEGORY</span>
                <h3 className="text-lg font-sans font-medium text-white">
                  {group.category}
                </h3>
              </div>

              <ul className="space-y-3 font-sans text-sm text-zinc-300">
                {group.items.map((tech) => (
                  <li
                    key={tech}
                    className="flex items-center justify-between py-2 border-b border-white/[0.04] hover:text-white transition-colors group cursor-default"
                  >
                    <span className="group-hover:translate-x-0.5 transition-transform font-medium">
                      {tech}
                    </span>
                    <div className="opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all shrink-0">
                      <TechSymbol name={tech} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
