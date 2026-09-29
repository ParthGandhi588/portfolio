"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Activity,
  Info,
  GitBranch,
  Database,
  Layers,
  FileCode2,
  ShieldCheck,
  Cpu,
  ChevronDown,
  ChevronUp,
  Terminal,
} from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { PROJECTS } from "@/data/portfolioData";
import { ProjectNav } from "@/components/ProjectNav";

const CODEBASE_STAGES = [
  {
    step: "REPOSITORY",
    title: "Target Repository Scanner",
    shortRole: "Path Discovery",
    desc: "Scans local or cloned git repositories with GitPython, respecting .gitignore rules and filtering binary blobs, lockfiles, and minified bundles.",
  },
  {
    step: "MANIFEST SCANNER",
    title: "Dual Manifest & Change Detection",
    shortRole: "Incremental Hashing",
    desc: "Compares file modification time (mtime) and SHA-256 hashes against PostgreSQL manifest table to skip unchanged files and re-index only mutated source files.",
  },
  {
    step: "TREE-SITTER AST",
    title: "Language-Aware AST Splitting",
    shortRole: "Syntax Boundary Chunking",
    desc: "Parses syntax trees across 10 languages (Python, JS, TS, Java, Go, Rust, C++, C, C#, PHP) using 50-line bounds with 10-line overlap to preserve logical code units.",
  },
  {
    step: "FASTEMBED",
    title: "Local FastEmbed Engine",
    shortRole: "Dense Embeddings",
    desc: "Generates 384-dimensional dense vector embeddings locally without cloud API rate limits, egress latency, or token expenses.",
  },
  {
    step: "PGVECTOR (HNSW)",
    title: "HNSW Drop & Rebuild Optimization",
    shortRole: "Bulk Index Optimization",
    desc: "Drops the HNSW vector index prior to bulk insertion, executes high-throughput batch writes, and reconstructs the HNSW graph post-embedding.",
  },
  {
    step: "ISOLATED RETRIEVER",
    title: "Repository + Session Isolation",
    shortRole: "Repository + Session Isolation",
    desc: "Enforces metadata-filtered pgvector searches partitioned by repository source_key and MD5-hashed session_key to guarantee strict isolation between distinct repositories and user sessions.",
  },
  {
    step: "HYBRID LLM",
    title: "Gemini with Local Ollama Fallback",
    shortRole: "Context Synthesis",
    desc: "Synthesizes code context using Gemini API with automatic fallback to local Ollama (llama3.2) for air-gapped or private repositories.",
  },
];

export default function CodeBaseRagPage() {
  const project = PROJECTS.find((p) => p.slug === "codebase-rag")!;
  const [activeStageIndex, setActiveStageIndex] = useState(2); // Default to Tree-sitter
  const [signalIndex, setSignalIndex] = useState(0);
  const [deepDiveOpen, setDeepDiveOpen] = useState(false);
  const [activeDeepDiveTab, setActiveDeepDiveTab] = useState<"schematic" | "treesitter" | "hnsw" | "manifest">("schematic");

  useEffect(() => {
    const timer = setInterval(() => {
      setSignalIndex((prev) => (prev + 1) % CODEBASE_STAGES.length);
    }, 2400);
    return () => clearInterval(timer);
  }, []);

  const activeStage = CODEBASE_STAGES[activeStageIndex];

  return (
    <div className="min-h-screen bg-[#090a0e] text-[#f3f4f6]">
      {/* Top Navigation */}
      <nav className="border-b border-white/[0.08] bg-[#090a0e]/95 backdrop-blur-md sticky top-0 z-40 py-3">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <Link
            href="/#work"
            className="min-h-[44px] inline-flex items-center gap-2 text-xs font-mono text-zinc-300 hover:text-white transition-colors touch-manipulation py-2"
          >
            <ArrowLeft className="w-4 h-4 text-cyan-400" />
            <span>BACK TO SYSTEMS</span>
          </Link>

          <div className="flex items-center gap-3">
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono border border-white/[0.1] bg-white/[0.03] text-zinc-300 hover:text-white hover:bg-white/[0.08] transition-colors touch-manipulation"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub Repo</span>
              </a>
            )}
          </div>
        </div>
      </nav>

      {/* Case Study Main */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-14 space-y-10 sm:space-y-14">
        {/* ========================================================================= */}
        {/* LEVEL 1: 10-SECOND UNDERSTANDING (What is CodeBase RAG?)                  */}
        {/* ========================================================================= */}
        <header className="space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 font-semibold tracking-wider uppercase">
            <span>{project.category}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-mono font-bold tracking-tight text-white">
            {project.title}
          </h1>

          <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-sans">
            Repository-aware code intelligence with Tree-sitter AST chunking, incremental indexing, and pgvector HNSW search.
          </p>

          <div className="p-3.5 sm:p-4 rounded-lg border border-cyan-500/25 bg-cyan-950/20 font-mono text-xs sm:text-sm text-cyan-300 flex items-start gap-3 mt-4">
            <span className="text-cyan-400 font-bold shrink-0">CORE RULE //</span>
            <span>&quot;AST-aware semantic retrieval grounded in exact repository syntax and verified file paths.&quot;</span>
          </div>

          {/* Executive Quick-Metric Chips */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
            <div className="p-3 rounded-lg border border-white/[0.08] bg-[#0c0e15]/80 font-mono text-xs">
              <span className="text-zinc-500 block text-[10px] uppercase">AST Chunking</span>
              <span className="text-zinc-200 font-semibold mt-0.5 block">10 Languages</span>
            </div>
            <div className="p-3 rounded-lg border border-white/[0.08] bg-[#0c0e15]/80 font-mono text-xs">
              <span className="text-zinc-500 block text-[10px] uppercase">Vector Engine</span>
              <span className="text-zinc-200 font-semibold mt-0.5 block">pgvector (HNSW)</span>
            </div>
            <div className="p-3 rounded-lg border border-white/[0.08] bg-[#0c0e15]/80 font-mono text-xs">
              <span className="text-zinc-500 block text-[10px] uppercase">Change Detection</span>
              <span className="text-zinc-200 font-semibold mt-0.5 block">SHA-256 + mtime</span>
            </div>
            <div className="p-3 rounded-lg border border-emerald-500/25 bg-emerald-950/20 font-mono text-xs">
              <span className="text-emerald-400 block text-[10px] uppercase">Model Fallback</span>
              <span className="text-emerald-200 font-semibold mt-0.5 block">Gemini + Ollama</span>
            </div>
          </div>
        </header>

        {/* ========================================================================= */}
        {/* LEVEL 2: 30-SECOND UNDERSTANDING (What makes the architecture interesting?) */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-2">
            <h2 className="text-base sm:text-lg font-mono font-bold text-white tracking-wide">
              INTERACTIVE RETRIEVAL ARCHITECTURE
            </h2>
            <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-400">
              <Activity className="w-3.5 h-3.5 animate-pulse" />
              <span className="text-[11px] hidden sm:inline">LIVE SIGNAL</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
            The pipeline decouples file tracking from vector storage and respects code syntax boundaries. Tap any stage to inspect its role:
          </p>

          {/* Interactive Stepper Ribbon */}
          <div className="p-3.5 sm:p-5 rounded-xl border border-white/[0.08] bg-[#0c0e15]/90 space-y-3.5">
            <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 pb-1">
              <span>
                STAGE 0{activeStageIndex + 1} OF 0{CODEBASE_STAGES.length} // TAP TO INSPECT
              </span>
              <span className="sm:hidden text-cyan-400 text-[10px]">
                SWIPE &rarr;
              </span>
            </div>
            <div className="overflow-x-auto pb-2 scrollbar-none -mx-1 px-1">
              <div className="flex items-center gap-2 min-w-max">
                {CODEBASE_STAGES.map((stage, idx) => {
                  const isActive = activeStageIndex === idx;
                  const isCarryingSignal = signalIndex === idx;

                  return (
                    <React.Fragment key={stage.step}>
                      <button
                        type="button"
                        onClick={() => setActiveStageIndex(idx)}
                        className={`p-3 rounded-lg text-left transition-all duration-200 border cursor-pointer min-w-[140px] max-w-[170px] min-h-[68px] touch-manipulation focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 active:bg-cyan-900/40 ${
                          isActive
                            ? "bg-cyan-950/50 border-cyan-400/80 shadow-[0_0_12px_rgba(6,182,212,0.25)] text-white ring-1 ring-cyan-400/40"
                            : "bg-black/50 border-white/[0.08] text-zinc-300 hover:bg-white/[0.05]"
                        }`}
                        aria-pressed={isActive}
                      >
                        <div className="flex items-center justify-between text-[9px] font-mono mb-1">
                          <span className={isActive ? "text-cyan-300 font-bold" : "text-zinc-500"}>
                            0{idx + 1} //
                          </span>
                          {isCarryingSignal && (
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                          )}
                        </div>
                        <span className="text-xs font-mono font-semibold truncate block">
                          {stage.step}
                        </span>
                        <span className="text-[10px] text-zinc-400 font-sans truncate block mt-0.5">
                          {stage.shortRole}
                        </span>
                      </button>

                      {idx < CODEBASE_STAGES.length - 1 && (
                        <span className="text-zinc-600 font-mono text-xs px-0.5">→</span>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>

            {/* Stage Detail Drawer */}
            <div className="p-3.5 sm:p-4 rounded-lg border border-cyan-500/20 bg-black/60 flex items-start gap-3">
              <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <div className="text-xs font-mono font-bold text-cyan-300 uppercase">
                  STAGE 0{activeStageIndex + 1}: {activeStage.title}
                </div>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
                  {activeStage.desc}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* LEVEL 3: 60-90 SECOND UNDERSTANDING (What was engineered & measured result) */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <h2 className="text-base sm:text-lg font-mono font-bold text-white tracking-wide border-b border-white/[0.08] pb-2">
            KEY DATA ENGINEERING DECISIONS
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Tree-sitter AST */}
            <div className="p-4 rounded-lg border border-white/[0.08] bg-[#0c0e15]/70 space-y-2">
              <div className="text-xs font-mono font-bold text-cyan-300 flex items-center gap-2">
                <FileCode2 className="w-4 h-4 text-cyan-400" />
                <span>TREE-SITTER AST CHUNKING (10 LANGUAGES)</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                LlamaIndex <code className="text-cyan-300 font-mono">CodeSplitter</code> tuned for 10 languages (Python, JS, TS, Java, Go, Rust, C++, C, C#, PHP) with 50-line bounds and 10-line overlap, keeping class and function declarations intact.
              </p>
            </div>

            {/* HNSW Bulk Rebuild */}
            <div className="p-4 rounded-lg border border-white/[0.08] bg-[#0c0e15]/70 space-y-2">
              <div className="text-xs font-mono font-bold text-cyan-300 flex items-center gap-2">
                <Database className="w-4 h-4 text-cyan-400" />
                <span>HNSW BULK INGESTION OPTIMIZATION</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                Drops HNSW vector indexes prior to large ingestion runs, writes dense vectors in high-throughput batches, and reconstructs the HNSW graph post-embedding to avoid per-row graph rebalances.
              </p>
            </div>

            {/* Incremental Manifest */}
            <div className="p-4 rounded-lg border border-white/[0.08] bg-[#0c0e15]/70 space-y-2">
              <div className="text-xs font-mono font-bold text-cyan-300 flex items-center gap-2">
                <GitBranch className="w-4 h-4 text-cyan-400" />
                <span>DUAL-STORE INCREMENTAL INDEXING</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                PostgreSQL manifest table tracks file path, SHA-256 hash, and mtime. Small git commits only trigger chunking and embedding for modified files, skipping unchanged files entirely.
              </p>
            </div>

            {/* Multi-Repo Isolation & Fallback */}
            <div className="p-4 rounded-lg border border-white/[0.08] bg-[#0c0e15]/70 space-y-2">
              <div className="text-xs font-mono font-bold text-cyan-300 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span>HYBRID SERVING & SESSION ISOLATION</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                Vectors are tagged with repository source keys and MD5-hashed session IDs. Reasoning runs on Gemini API with automatic fallback to local Ollama (<code className="text-cyan-300 font-mono">llama3.2</code>) for offline codebases.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* LEVEL 4: EXPANDABLE TECHNICAL DEEP DIVE (Progressive Disclosure)          */}
        {/* ========================================================================= */}
        <section className="pt-2 border-t border-white/[0.08]">
          <div className="rounded-xl border border-white/[0.1] bg-[#0c0e15]/95 overflow-hidden">
            {/* Accordion Header */}
            <button
              type="button"
              onClick={() => setDeepDiveOpen(!deepDiveOpen)}
              className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors cursor-pointer touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              aria-expanded={deepDiveOpen}
            >
              <div className="flex items-center gap-2.5">
                <Terminal className="w-4 h-4 text-cyan-400 shrink-0" />
                <div>
                  <span className="text-xs font-mono font-bold text-white tracking-wider uppercase block">
                    TECHNICAL DEEP DIVE // SPECIFICATIONS & SCHEMATICS
                  </span>
                  <span className="text-[11px] text-zinc-400 font-sans block mt-0.5">
                    {deepDiveOpen ? "Click to collapse detailed specs" : "Click to expand pipeline schematic, AST parameters, and HNSW lifecycle"}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[11px] font-mono text-cyan-400 hidden sm:inline">
                  {deepDiveOpen ? "COLLAPSE" : "EXPAND"}
                </span>
                {deepDiveOpen ? (
                  <ChevronUp className="w-4 h-4 text-cyan-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-cyan-400" />
                )}
              </div>
            </button>

            {/* Expandable Body */}
            {deepDiveOpen && (
              <div className="p-4 sm:p-6 border-t border-white/[0.08] space-y-6 bg-black/40 animate-in fade-in duration-200">
                {/* Tabs */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                  <button
                    type="button"
                    onClick={() => setActiveDeepDiveTab("schematic")}
                    className={`min-h-[40px] px-3.5 py-1.5 rounded-lg text-xs font-mono transition-colors touch-manipulation cursor-pointer ${
                      activeDeepDiveTab === "schematic"
                        ? "bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 font-semibold"
                        : "bg-white/[0.02] border border-white/[0.06] text-zinc-400 hover:text-white"
                    }`}
                  >
                    Pipeline Schematic
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveDeepDiveTab("treesitter")}
                    className={`min-h-[40px] px-3.5 py-1.5 rounded-lg text-xs font-mono transition-colors touch-manipulation cursor-pointer ${
                      activeDeepDiveTab === "treesitter"
                        ? "bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 font-semibold"
                        : "bg-white/[0.02] border border-white/[0.06] text-zinc-400 hover:text-white"
                    }`}
                  >
                    Tree-sitter Specs
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveDeepDiveTab("hnsw")}
                    className={`min-h-[40px] px-3.5 py-1.5 rounded-lg text-xs font-mono transition-colors touch-manipulation cursor-pointer ${
                      activeDeepDiveTab === "hnsw"
                        ? "bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 font-semibold"
                        : "bg-white/[0.02] border border-white/[0.06] text-zinc-400 hover:text-white"
                    }`}
                  >
                    HNSW Optimization
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveDeepDiveTab("manifest")}
                    className={`min-h-[40px] px-3.5 py-1.5 rounded-lg text-xs font-mono transition-colors touch-manipulation cursor-pointer ${
                      activeDeepDiveTab === "manifest"
                        ? "bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 font-semibold"
                        : "bg-white/[0.02] border border-white/[0.06] text-zinc-400 hover:text-white"
                    }`}
                  >
                    Manifest Hashing
                  </button>
                </div>

                {/* Tab 1: Monospace Flow Diagram */}
                {activeDeepDiveTab === "schematic" && (
                  <div className="p-4 rounded-lg border border-white/[0.08] bg-black/80 font-mono text-xs overflow-x-auto">
                    <div className="text-zinc-500 mb-2">// REPOSITORY PIPELINE FLOW</div>
                    <pre className="text-cyan-300 text-[11px] leading-snug">
{`+-------------------------------------------------------------------------+
|  TARGET REPOSITORY (Cloned or local path via GitPython)                 |
+-----------------------------------+-------------------------------------+
                                    |
                                    v
+-------------------------------------------------------------------------+
|  POSTGRESQL MANIFEST TABLE (Incremental Change Detection)               |
|  - Compares (file_path, sha256_hash, mtime, language, chunk_count)      |
|  - Bypasses unchanged source files; drops and re-embeds only mutated files |
+-----------------------------------+-------------------------------------+
                                    |
                                    v
+-------------------------------------------------------------------------+
|  TREE-SITTER AST CODE SPLITTER (10 Languages Supported)                 |
|  - Python, JS, TS, Java, Go, Rust, C++, C, C#, PHP                      |
|  - chunk_lines=50, chunk_lines_overlap=10, max_chars=1500               |
|  - Fallback: SentenceSplitter(500, 50) for Markdown/configs             |
+-----------------------------------+-------------------------------------+
                                    |
                                    v
+-------------------------------------------------------------------------+
|  FASTEMBED DENSE VECTOR GENERATION (Local 384-dimensional embeddings)   |
+-----------------------------------+-------------------------------------+
                                    |
                                    v
+-------------------------------------------------------------------------+
|  PGVECTOR BULK INGESTION OPTIMIZATION                                   |
|  - Step 1: drop_hnsw_indexes()                                          |
|  - Step 2: Batch vector insertion                                       |
|  - Step 3: create_hnsw_index() post-embedding                           |
+-----------------------------------+-------------------------------------+
                                    |
                                    v
+-------------------------------------------------------------------------+
|  SESSION & MULTI-REPO ISOLATED RETRIEVAL                                |
|  - Filtered cosine similarity scoped by source_key and md5(session_key) |
|  - Hybrid LLM: Gemini API with local Ollama (llama3.2) fallback         |
+-------------------------------------------------------------------------+`}
                    </pre>
                  </div>
                )}

                {/* Tab 2: Tree-sitter Specs */}
                {activeDeepDiveTab === "treesitter" && (
                  <div className="space-y-3 font-sans text-xs sm:text-sm text-zinc-300">
                    <h3 className="font-mono text-xs font-bold text-white uppercase text-cyan-300">
                      AST-Aware Syntax Chunking Across 10 Languages
                    </h3>
                    <p>
                      Standard character or line chunkers cut through class declarations and loop bodies. CodeBase-RAG uses language grammars to extract syntax trees:
                    </p>
                    <ul className="space-y-1.5 pl-4 text-xs text-zinc-300 list-disc">
                      <li><strong>Supported Languages:</strong> Python, JavaScript, TypeScript, Java, Go, Rust, C++, C, C#, and PHP.</li>
                      <li><strong>Tuning Parameters:</strong> <code className="text-cyan-300 font-mono">chunk_lines=50</code>, <code className="text-cyan-300 font-mono">chunk_lines_overlap=10</code>, <code className="text-cyan-300 font-mono">max_chars=1500</code>.</li>
                      <li><strong>Documentation Fallback:</strong> Non-code files (Markdown, JSON, YAML, configs) fall back to sentence boundary chunking (<code className="text-cyan-300 font-mono">chunk_size=500</code>, <code className="text-cyan-300 font-mono">chunk_overlap=50</code>).</li>
                    </ul>
                  </div>
                )}

                {/* Tab 3: HNSW Optimization */}
                {activeDeepDiveTab === "hnsw" && (
                  <div className="space-y-3 font-sans text-xs sm:text-sm text-zinc-300">
                    <h3 className="font-mono text-xs font-bold text-white uppercase text-cyan-300">
                      HNSW Graph Drop and Post-Ingestion Reconstruction
                    </h3>
                    <p>
                      Hierarchical Navigable Small World (HNSW) indexes provide sub-millisecond approximate nearest neighbor lookups, but continuous graph updates during inserts cause heavy IO thrashing.
                    </p>
                    <ul className="space-y-1.5 pl-4 text-xs text-zinc-300 list-disc">
                      <li><strong>Index drop:</strong> Prior to bulk embedding writes, <code className="text-cyan-300 font-mono">drop_hnsw_indexes()</code> executes on the PostgreSQL vector table.</li>
                      <li><strong>Batch insert:</strong> 384-dimensional FastEmbed vectors are bulk-inserted directly into heap storage without index overhead.</li>
                      <li><strong>Post-embedding build:</strong> <code className="text-cyan-300 font-mono">create_hnsw_index()</code> executes with cosine similarity distance metric, creating the full navigation graph in a single pass.</li>
                    </ul>
                  </div>
                )}

                {/* Tab 4: Manifest Hashing */}
                {activeDeepDiveTab === "manifest" && (
                  <div className="space-y-3 font-sans text-xs sm:text-sm text-zinc-300">
                    <h3 className="font-mono text-xs font-bold text-white uppercase text-cyan-300">
                      Dual-Store Manifest State & Change Detection
                    </h3>
                    <p>
                      Code repositories undergo frequent small edits. The ingestion scanner prevents full-repo embedding recalculations:
                    </p>
                    <ul className="space-y-1.5 pl-4 text-xs text-zinc-300 list-disc">
                      <li><strong>Fast filter:</strong> First compares disk modification time (<code className="text-cyan-300 font-mono">mtime</code>); if unchanged, the file is skipped instantly.</li>
                      <li><strong>Checksum verification:</strong> If mtime changed, computes SHA-256 hash. If content matches, manifest timestamp updates without re-embedding.</li>
                      <li><strong>Surgical re-indexing:</strong> If content mutated, deletes old chunks for that specific file and inserts newly split vectors.</li>
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Technologies Grid */}
        <section className="space-y-3 pt-2">
          <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-400">
            SYSTEM TECHNOLOGIES
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="text-xs font-mono px-2.5 py-1 rounded border border-white/[0.1] bg-white/[0.03] text-zinc-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Case Study Bottom Navigation */}
        <ProjectNav currentSlug="codebase-rag" />
      </main>
    </div>
  );
}
