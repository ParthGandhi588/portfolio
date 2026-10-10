"use client";

import React, { useState } from "react";
import {
  Zap,
  Bot,
  Cpu,
  Database,
  ArrowRight,
  Server,
  Layers,
  Workflow,
  Radio,
  FileCode2,
  HardDrive,
  CheckCircle2,
  GitBranch,
  LineChart,
} from "lucide-react";

export interface FlowNode {
  id: string;
  type: "trigger" | "gateway" | "agent" | "inference" | "tool" | "database" | "model";
  title: string;
  subtitle: string;
  icon: React.ElementType;
  badge: string;
  badgeColor: string;
  details: {
    protocol?: string;
    runtime?: string;
    parameters?: string;
    status: string;
  };
}

interface N8nFlowCanvasProps {
  systemSlug: "agentic-erp" | "codebase-rag" | "absence-risk";
}

const FLOW_CONFIGS: Record<string, { title: string; nodes: FlowNode[] }> = {
  "agentic-erp": {
    title: "AGENTIC ERP // AUTONOMOUS WORKFLOW EXECUTION GRAPH",
    nodes: [
      {
        id: "trigger",
        type: "trigger",
        title: "Client & Schedulers",
        subtitle: "WebSockets / MIME Uploads / Cron",
        icon: Zap,
        badge: "TRIGGER",
        badgeColor: "bg-amber-500/15 text-amber-300 border-amber-500/30",
        details: {
          protocol: "WebSocket / HTTP multipart",
          runtime: "agent_ws.py",
          parameters: "session_id, token_stream=true",
          status: "READY",
        },
      },
      {
        id: "gateway",
        type: "gateway",
        title: "FastAPI Gateway",
        subtitle: "MIME Routing & Auth Validation",
        icon: Server,
        badge: "GATEWAY",
        badgeColor: "bg-teal-500/15 text-teal-300 border-teal-500/30",
        details: {
          protocol: "FastAPI Async Engine",
          runtime: "PyMuPDF / MIME Sniffer",
          parameters: "Rate limit: 60/min · JWT Auth",
          status: "ACTIVE",
        },
      },
      {
        id: "agent",
        type: "agent",
        title: "Domain Specialist Agent",
        subtitle: "Purchase / Stores / Planning / QC",
        icon: Bot,
        badge: "SPECIALIST",
        badgeColor: "bg-blue-500/15 text-blue-300 border-blue-500/30",
        details: {
          protocol: "Bounded System Prompt",
          runtime: "Scoped Tool Schema Context",
          parameters: "Lazy schema injection",
          status: "SCOPED",
        },
      },
      {
        id: "inference",
        type: "inference",
        title: "vLLM Model Serving",
        subtitle: "Local Qwen Inference Engine",
        icon: Cpu,
        badge: "INFERENCE",
        badgeColor: "bg-purple-500/15 text-purple-300 border-purple-500/30",
        details: {
          protocol: "OpenAI-compatible vLLM",
          runtime: "Local GPU serving",
          parameters: "temperature=0.0 · Latency: ~5s",
          status: "STREAMING",
        },
      },
      {
        id: "tools",
        type: "tool",
        title: "Typed Python Tools",
        subtitle: "Pydantic & Async Task Queue",
        icon: Workflow,
        badge: "VALIDATION",
        badgeColor: "bg-indigo-500/15 text-indigo-300 border-indigo-500/30",
        details: {
          protocol: "asyncio.gather Execution",
          runtime: "Pydantic V2 Schema Validation",
          parameters: "Zero raw SQL mutation",
          status: "DETERMINISTIC",
        },
      },
      {
        id: "database",
        type: "database",
        title: "System of Record",
        subtitle: "PostgreSQL & ERP REST Services",
        icon: Database,
        badge: "DATABASE",
        badgeColor: "bg-sky-500/15 text-sky-300 border-sky-500/30",
        details: {
          protocol: "ACID Transaction & MinIO S3",
          runtime: "Internal Authenticated APIs",
          parameters: "Audit logging & Webhook delivery",
          status: "PERSISTED",
        },
      },
    ],
  },
  "codebase-rag": {
    title: "CODEBASE RAG // AST CODE RETRIEVAL GRAPH",
    nodes: [
      {
        id: "scanner",
        type: "trigger",
        title: "Repository Scanner",
        subtitle: "GitPython .gitignore Scan",
        icon: GitBranch,
        badge: "INGEST",
        badgeColor: "bg-amber-500/15 text-amber-300 border-amber-500/30",
        details: {
          protocol: "Git Tree Walk",
          runtime: "GitPython filter",
          parameters: "Excludes binary blobs & lockfiles",
          status: "READY",
        },
      },
      {
        id: "manifest",
        type: "gateway",
        title: "Incremental Manifest",
        subtitle: "Dual SHA-256 + mtime Hashing",
        icon: Database,
        badge: "CHANGE DETECT",
        badgeColor: "bg-teal-500/15 text-teal-300 border-teal-500/30",
        details: {
          protocol: "PostgreSQL Manifest Table",
          runtime: "Selective Changed File Filter",
          parameters: "Bypasses unchanged files",
          status: "INCREMENTAL",
        },
      },
      {
        id: "treesitter",
        type: "agent",
        title: "Tree-sitter AST Parser",
        subtitle: "Language-Aware Code Splitting",
        icon: FileCode2,
        badge: "AST 10-LANG",
        badgeColor: "bg-blue-500/15 text-blue-300 border-blue-500/30",
        details: {
          protocol: "AST Grammar Parser",
          runtime: "Python, JS, TS, Go, Rust, C++...",
          parameters: "chunk_lines=50 · overlap=10",
          status: "SYNTAX-BOUNDED",
        },
      },
      {
        id: "fastembed",
        type: "inference",
        title: "FastEmbed Dense Vector",
        subtitle: "384-dimensional Embeddings",
        icon: Cpu,
        badge: "EMBEDDING",
        badgeColor: "bg-purple-500/15 text-purple-300 border-purple-500/30",
        details: {
          protocol: "ONNX Local Engine",
          runtime: "Zero cloud API rate-limits",
          parameters: "Batch vector inference",
          status: "LOCAL",
        },
      },
      {
        id: "pgvector",
        type: "database",
        title: "pgvector HNSW Engine",
        subtitle: "Bulk Drop & Rebuild Optimization",
        icon: Layers,
        badge: "VECTOR STORE",
        badgeColor: "bg-indigo-500/15 text-indigo-300 border-indigo-500/30",
        details: {
          protocol: "PostgreSQL pgvector extension",
          runtime: "HNSW Cosine Graph Rebuild",
          parameters: "source_key & session isolation",
          status: "INDEXED",
        },
      },
      {
        id: "hybrid-llm",
        type: "model",
        title: "Hybrid Reasoner",
        subtitle: "Gemini API + Ollama Fallback",
        icon: Bot,
        badge: "REASONING",
        badgeColor: "bg-sky-500/15 text-sky-300 border-sky-500/30",
        details: {
          protocol: "Dual Model Provider",
          runtime: "Primary Gemini · Fallback llama3.2",
          parameters: "File path citation & line spans",
          status: "GROUNDED",
        },
      },
    ],
  },
  "absence-risk": {
    title: "ABSENCE RISK // APPLIED ML INFERENCE GRAPH",
    nodes: [
      {
        id: "logs",
        type: "trigger",
        title: "Attendance Logs Ingest",
        subtitle: "Punch Logs & Shift Rosters",
        icon: Zap,
        badge: "RAW DATA",
        badgeColor: "bg-amber-500/15 text-amber-300 border-amber-500/30",
        details: {
          protocol: "PostgreSQL & MongoDB Records",
          runtime: "Daily Punch Data Loader",
          parameters: "Shift timestamps & approved leave",
          status: "INGESTED",
        },
      },
      {
        id: "window",
        type: "gateway",
        title: "120-Day Partition Engine",
        subtitle: "90d Feature / 30d Target Window",
        icon: Layers,
        badge: "TEMPORAL LEAKAGE",
        badgeColor: "bg-teal-500/15 text-teal-300 border-teal-500/30",
        details: {
          protocol: "Strict Dual-Window Windowing",
          runtime: "Feature: [-120 to -30] · Target: [-30 to 0]",
          parameters: "Zero forward look-ahead bias",
          status: "PARTITIONED",
        },
      },
      {
        id: "features",
        type: "agent",
        title: "12 Dyadic Feature Extractor",
        subtitle: "Pairwise Behavioral Signals",
        icon: LineChart,
        badge: "FEATURE ENG",
        badgeColor: "bg-blue-500/15 text-blue-300 border-blue-500/30",
        details: {
          protocol: "Dyadic Interaction Math",
          runtime: "Recency, baseline rate, Jaccard overlap",
          parameters: "Weekend bridge leave metrics",
          status: ">78% IMPORTANCE",
        },
      },
      {
        id: "model",
        type: "inference",
        title: "Random Forest Ensemble",
        subtitle: "100 Estimators · Stratified 80/20",
        icon: Cpu,
        badge: "CLASSIFIER",
        badgeColor: "bg-purple-500/15 text-purple-300 border-purple-500/30",
        details: {
          protocol: "Supervised Tree Ensemble",
          runtime: "Scikit-learn RandomForestClassifier",
          parameters: "30-day forward co-absence risk",
          status: "EVALUATED",
        },
      },
      {
        id: "clustering",
        type: "tool",
        title: "Complete-Linkage Clustering",
        subtitle: "Agglomerative Jaccard Distance",
        icon: Workflow,
        badge: "t=0.75 GUARANTEE",
        badgeColor: "bg-indigo-500/15 text-indigo-300 border-indigo-500/30",
        details: {
          protocol: "Hierarchical Maximum-Distance Linkage",
          runtime: "Cut at threshold t=0.75",
          parameters: "Guarantees >=0.25 pairwise overlap",
          status: "147 CLUSTERS",
        },
      },
      {
        id: "explain",
        type: "database",
        title: "Operational Heuristics",
        subtitle: "Plain-Language Risk Drivers",
        icon: CheckCircle2,
        badge: "EXPLAINABILITY",
        badgeColor: "bg-sky-500/15 text-sky-300 border-sky-500/30",
        details: {
          protocol: "Transparent Heuristic Decision Engine",
          runtime: "Weekend bridge & recency flags",
          parameters: "Actionable departmental shift insights",
          status: "EXPLAINED",
        },
      },
    ],
  },
};

export function N8nFlowCanvas({ systemSlug }: N8nFlowCanvasProps) {
  const config = FLOW_CONFIGS[systemSlug] || FLOW_CONFIGS["agentic-erp"];
  const [selectedNodeId, setSelectedNodeId] = useState<string>(config.nodes[0].id);

  const selectedNode = config.nodes.find((n) => n.id === selectedNodeId) || config.nodes[0];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-zinc-400 pb-2 border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-zinc-200 font-semibold">{config.title}</span>
        </div>
        <span className="text-zinc-500">INTERACTIVE GRAPH PIPELINE · CLICK TO INSPECT NODE</span>
      </div>

      {/* n8n-style Node Graph Board */}
      <div className="rounded-2xl border border-zinc-200 dark:border-white/[0.1] bg-white dark:bg-[#06070a] overflow-hidden shadow-xl dark:shadow-2xl">
        {/* Upper Track: Horizontal Scrollable Nodes (Scrollbar Strictly Hidden Cross-Browser) */}
        <div
          className="relative p-6 sm:p-10 overflow-x-auto scrollbar-none no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden bg-[radial-gradient(rgba(0,0,0,0.06)_1px,transparent_1px)] dark:bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:24px_24px]"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {/* Horizontal Node Track */}
          <div className="flex items-center gap-6 min-w-max py-4">
            {config.nodes.map((node, index) => {
              const Icon = node.icon;
              const isSelected = selectedNodeId === node.id;

              return (
                <React.Fragment key={node.id}>
                  {/* Node Box */}
                  <button
                    type="button"
                    onClick={() => setSelectedNodeId(node.id)}
                    className={`relative w-[210px] text-left rounded-xl border p-4 transition-all duration-200 cursor-pointer group shadow-sm ${
                      isSelected
                        ? "bg-blue-50/70 dark:bg-[#0d121c] border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.25)] ring-1 ring-blue-500"
                        : "bg-zinc-50/80 dark:bg-[#0b0d13]/90 border-zinc-200 dark:border-white/[0.1] hover:border-zinc-400 dark:hover:border-white/[0.3] hover:bg-white dark:hover:bg-[#0f1118]"
                    }`}
                  >
                    {/* Left Input Port Pin */}
                    {index > 0 && (
                      <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full border-2 border-white dark:border-[#06070a] bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.7)]" />
                    )}

                    {/* Right Output Port Pin */}
                    {index < config.nodes.length - 1 && (
                      <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full border-2 border-white dark:border-[#06070a] bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.7)]" />
                    )}

                    {/* Header: Icon + Badge */}
                    <div className="flex items-center justify-between mb-3">
                      <div
                        className={`p-2 rounded-lg border ${
                          isSelected
                            ? "bg-blue-500/15 border-blue-400 text-blue-600 dark:text-blue-300"
                            : "bg-black/[0.03] dark:bg-white/[0.04] border-zinc-200 dark:border-white/[0.08] text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>

                      <span
                        className={`text-[9px] font-mono px-2 py-0.5 rounded border uppercase font-bold tracking-wider ${node.badgeColor}`}
                      >
                        {node.badge}
                      </span>
                    </div>

                    {/* Title & Subtitle */}
                    <div className="space-y-0.5">
                      <h5
                        className={`text-xs font-sans font-semibold truncate ${
                          isSelected ? "text-zinc-900 dark:text-white" : "text-zinc-800 dark:text-zinc-200 group-hover:text-zinc-900 dark:group-hover:text-white"
                        }`}
                      >
                        {node.title}
                      </h5>
                      <p className="text-[10px] text-zinc-500 dark:text-zinc-400 font-sans truncate">
                        {node.subtitle}
                      </p>
                    </div>

                    {/* Live Status Indicator */}
                    <div className="mt-3 pt-2.5 border-t border-zinc-200 dark:border-white/[0.06] flex items-center justify-between text-[9px] font-mono text-zinc-500 dark:text-zinc-400">
                      <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping" />
                        <span>{node.details.status}</span>
                      </span>
                      <span className="text-zinc-400 dark:text-zinc-500">STAGE 0{index + 1}</span>
                    </div>
                  </button>

                  {/* Animated n8n Connector Wire */}
                  {index < config.nodes.length - 1 && (
                    <div className="relative flex items-center px-1">
                      <div className="w-8 h-0.5 bg-gradient-to-r from-blue-500/70 to-blue-400/70 relative overflow-hidden">
                        <div className="absolute inset-0 bg-blue-300 dark:bg-blue-200 animate-pulse opacity-80" />
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400 -ml-1 shrink-0" />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Node Parameter Inspection Drawer (Pinned & Full-Width, Never scrolls horizontally!) */}
        <div className="p-6 sm:p-8 border-t border-zinc-200 dark:border-white/[0.08] bg-zinc-50 dark:bg-[#040507] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs font-mono">
          <div className="space-y-1">
            <span className="text-[10px] text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block">INSPECTED NODE</span>
            <div className="text-zinc-900 dark:text-white font-semibold font-sans text-sm">{selectedNode.title}</div>
            <div className="text-zinc-500 dark:text-zinc-400 text-xs font-sans">{selectedNode.subtitle}</div>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] text-blue-600 dark:text-blue-400 uppercase tracking-wider block">PROTOCOL / INTERFACE</span>
            <div className="text-zinc-800 dark:text-zinc-200">{selectedNode.details.protocol}</div>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block">RUNTIME / MODULE</span>
            <div className="text-zinc-800 dark:text-zinc-200">{selectedNode.details.runtime}</div>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block">ACTIVE PARAMETERS</span>
            <div className="text-zinc-700 dark:text-zinc-300 break-words" title={selectedNode.details.parameters}>
              {selectedNode.details.parameters}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
