"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  Code2,
} from "lucide-react";

interface NodeData {
  id: string;
  stage: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  metric: string;
  detail: string;
  tags: string[];
}

const SYSTEM_NODES: NodeData[] = [
  {
    id: "user",
    stage: "01 // INGESTION",
    title: "USER & WORKFLOWS",
    subtitle: "WebSockets & Events",
    icon: Terminal,
    metric: "< 2ms latency",
    detail: "Natural language business queries, invoice documents, and repo scan requests entering the system via streaming WebSocket sessions.",
    tags: ["Streaming", "WebSockets", "MIME Detection"],
  },
  {
    id: "ai-system",
    stage: "02 // GATEWAY",
    title: "AI SYSTEM LAYER",
    subtitle: "FastAPI & Auth Router",
    icon: Layers,
    metric: "Strict Pydantic",
    detail: "Validates input schemas, enforces rate-limiting and authorization boundaries, and resolves target domain routing.",
    tags: ["FastAPI", "Session Isolation", "Schema Auth"],
  },
  {
    id: "agent-rag-ml",
    stage: "03 // REASONING",
    title: "AGENT / RAG / ML",
    subtitle: "Specialist Agents & Search",
    icon: Cpu,
    metric: "vLLM Serving",
    detail: "Domain-scoped agents determine intention. Vector search queries pgvector with HNSW indexing; ML models prepare pairwise behavioral tensors.",
    tags: ["Specialist Prompts", "pgvector HNSW", "vLLM Engine"],
  },
  {
    id: "tools",
    stage: "04 // BOUNDARY",
    title: "TYPED PYTHON TOOLS",
    subtitle: "Deterministic Logic",
    icon: Wrench,
    metric: "Zero Hallucination",
    detail: "The LLM only outputs validated tool calls. Pure Python executes business operations, ensuring model reasoning cannot corrupt system state.",
    tags: ["Typed Validation", "AST Splitter", "Task Queue"],
  },
  {
    id: "software",
    stage: "05 // PERSISTENCE",
    title: "REAL SOFTWARE",
    subtitle: "ERP · DB · Storage",
    icon: Database,
    metric: "System of Record",
    detail: "PostgreSQL, MongoDB, and enterprise services execute transactions and maintain audited business state with rollback guarantees.",
    tags: ["Enterprise DB", "Document Store", "Audit Logs"],
  },
];

export function SystemVisualization() {
  const [selectedNode, setSelectedNode] = useState<string>("agent-rag-ml");

  const currentNode =
    SYSTEM_NODES.find((node) => node.id === selectedNode) || SYSTEM_NODES[2];

  return (
    <div className="w-full relative rounded-lg border border-white/[0.08] bg-[#0d0f17]/90 backdrop-blur-md overflow-hidden shadow-2xl">
      {/* Top Telemetry Bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06] bg-black/40 text-[11px] font-mono text-zinc-400">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-60"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
          </span>
          <span className="text-zinc-200 font-semibold tracking-wider">
            SYSTEM TOPOLOGY MONITOR
          </span>
          <span className="hidden sm:inline text-zinc-500">//</span>
          <span className="hidden sm:inline text-zinc-400">ORCHESTRATION PIPELINE</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            <ShieldCheck className="w-3 h-3" /> DETERMINISTIC
          </span>
          <span className="hidden md:inline text-zinc-500">vLLM: ACTIVE</span>
        </div>
      </div>

      {/* Main Flow Grid */}
      <div className="p-4 sm:p-5">
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 sm:gap-2.5 relative">
          {SYSTEM_NODES.map((node, index) => {
            const isSelected = selectedNode === node.id;
            const Icon = node.icon;

            return (
              <div key={node.id} className="relative group">
                <button
                  type="button"
                  onClick={() => setSelectedNode(node.id)}
                  className={`w-full text-left p-3 rounded transition-all duration-200 cursor-pointer border flex flex-col justify-between h-full min-h-[105px] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 ${
                    isSelected
                      ? "bg-cyan-950/30 border-cyan-500/60 shadow-[0_0_15px_rgba(6,182,212,0.15)] ring-1 ring-cyan-500/40"
                      : "bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.15]"
                  }`}
                >
                  {/* Stage Eyebrow */}
                  <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 mb-1.5">
                    <span className="tracking-wider">{node.stage.split(" // ")[0]}</span>
                    <Icon
                      className={`w-3.5 h-3.5 transition-colors ${
                        isSelected ? "text-cyan-400" : "text-zinc-400 group-hover:text-zinc-300"
                      }`}
                    />
                  </div>

                  {/* Node Title & Subtitle */}
                  <div>
                    <div
                      className={`text-xs font-mono font-semibold tracking-wide transition-colors ${
                        isSelected ? "text-cyan-200" : "text-zinc-200 group-hover:text-white"
                      }`}
                    >
                      {node.title}
                    </div>
                    <div className="text-[11px] text-zinc-400 font-sans mt-0.5 line-clamp-1">
                      {node.subtitle}
                    </div>
                  </div>

                  {/* Micro metric */}
                  <div className="mt-2 pt-1.5 border-t border-white/[0.04] flex items-center justify-between">
                    <span className="text-[10px] font-mono text-cyan-400/90 font-medium">
                      {node.metric}
                    </span>
                    {isSelected && (
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    )}
                  </div>
                </button>

                {/* Subtle connector arrow on desktop */}
                {index < SYSTEM_NODES.length - 1 && (
                  <div className="hidden sm:flex absolute -right-2 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
                    <ArrowRight className="w-3 h-3 text-zinc-500" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Selected Stage Deep-Dive Inspection Panel */}
        <div className="mt-4 p-4 rounded border border-white/[0.08] bg-black/40 relative">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
            <div className="space-y-1.5 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono font-semibold text-cyan-400 tracking-wider">
                  NODE INSPECTION // {currentNode.stage}
                </span>
                <span className="text-zinc-500 text-xs">·</span>
                <span className="text-xs font-mono text-zinc-300 font-medium">
                  {currentNode.title}
                </span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                {currentNode.detail}
              </p>
            </div>

            <div className="flex sm:flex-col items-start gap-1.5 pt-1">
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                System Boundary
              </span>
              <div className="flex flex-wrap gap-1">
                {currentNode.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono px-2 py-0.5 rounded border border-white/[0.08] bg-white/[0.03] text-zinc-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Core Architectural Principle Anchor */}
          <div className="mt-3 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-zinc-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span className="text-zinc-300">
                Core Rule: <span className="text-zinc-200">The LLM plans. Python executes. The ERP/DB remains system of record.</span>
              </span>
            </div>
            <span className="hidden md:inline text-zinc-400 text-[10px]">
              Click any node to inspect
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
