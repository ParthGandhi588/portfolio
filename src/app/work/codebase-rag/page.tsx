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
} from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { PROJECTS } from "@/data/portfolioData";

const CODEBASE_STAGES = [
  {
    step: "REPOSITORY",
    title: "Target Repository Scanner",
    desc: "Scans local or cloned git repositories with GitPython, respecting .gitignore rules and filtering binary blobs, lockfiles, and minified bundles.",
  },
  {
    step: "MANIFEST SCANNER",
    title: "Dual Manifest & Incremental Hashing",
    desc: "Compares file modification time (mtime) and SHA-256 hashes against PostgreSQL manifest table to skip unchanged files and re-index only mutated source files.",
  },
  {
    step: "TREE-SITTER AST",
    title: "Language-Aware AST Splitting",
    desc: "Parses syntax trees across 10 languages (Python, JS, TS, Java, Go, Rust, C++, C, C#, PHP) using 50-line bounds with 10-line overlap to preserve logical code units.",
  },
  {
    step: "CODE CHUNKS",
    title: "Metadata-Enriched Chunks",
    desc: "Chunks tagged with relative file path, start/end line numbers, syntax scope, and repository identifier for source grounding.",
  },
  {
    step: "FASTEMBED",
    title: "Local FastEmbed Engine",
    desc: "Generates 384-dimensional dense vector embeddings locally without cloud API rate limits, egress latency, or token expenses.",
  },
  {
    step: "PGVECTOR (HNSW)",
    title: "HNSW Drop & Rebuild Optimization",
    desc: "Drops the HNSW vector index prior to bulk insertion, executes high-throughput batch writes, and reconstructs the HNSW graph post-embedding.",
  },
  {
    step: "ISOLATED RETRIEVER",
    title: "Session & Multi-Repo Isolation",
    desc: "Enforces metadata-filtered pgvector searches partitioned by repository source key and MD5-hashed session key to prevent cross-tenant code leakage.",
  },
  {
    step: "HYBRID LLM",
    title: "Gemini with Local Ollama Fallback",
    desc: "Synthesizes code context using Gemini API with automatic fallback to local Ollama (llama3.2) for air-gapped or private repositories.",
  },
  {
    step: "GROUNDED RESPONSE",
    title: "Source-Attributed Citing",
    desc: "Emits verified answers directly citing repository file paths, function signatures, and line ranges used in retrieval.",
  },
];

export default function CodeBaseRagPage() {
  const project = PROJECTS.find((p) => p.slug === "codebase-rag")!;
  const [activeStageIndex, setActiveStageIndex] = useState(2); // Default to Tree-sitter
  const [signalIndex, setSignalIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSignalIndex((prev) => (prev + 1) % CODEBASE_STAGES.length);
    }, 2200);
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
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-12 sm:space-y-16">
        {/* Header Block */}
        <header className="space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 font-semibold tracking-wider uppercase">
            <span>{project.category}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-mono font-bold tracking-tight text-white">
            {project.title}
          </h1>

          <p className="text-base sm:text-xl text-zinc-300 leading-relaxed font-sans">
            {project.description}
          </p>

          <div className="p-4 rounded-lg border border-cyan-500/25 bg-cyan-950/20 font-mono text-xs sm:text-sm text-cyan-300 flex items-start gap-3 mt-6">
            <span className="text-cyan-400 font-bold shrink-0">CORE RULE //</span>
            <span>&quot;AST-aware semantic retrieval grounded in exact repository syntax and verified file paths.&quot;</span>
          </div>
        </header>

        {/* Technical Overview Metadata Grid */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-5 rounded-lg border border-white/[0.08] bg-[#0c0e15]/80 font-mono text-xs">
          <div>
            <span className="text-zinc-500 uppercase tracking-wider block text-[10px]">Parser / Splitter</span>
            <span className="text-zinc-200 mt-1 block">Tree-sitter (10 Languages)</span>
          </div>
          <div>
            <span className="text-zinc-500 uppercase tracking-wider block text-[10px]">Vector Database</span>
            <span className="text-zinc-200 mt-1 block">pgvector (HNSW Rebuild)</span>
          </div>
          <div>
            <span className="text-zinc-500 uppercase tracking-wider block text-[10px]">Change Detection</span>
            <span className="text-zinc-200 mt-1 block">SHA-256 + mtime Manifest</span>
          </div>
          <div>
            <span className="text-zinc-500 uppercase tracking-wider block text-[10px]">Reasoning Routing</span>
            <span className="text-zinc-200 mt-1 block">Gemini + Ollama Fallback</span>
          </div>
        </section>

        {/* 1. The Code Retrieval Challenge */}
        <section className="space-y-4">
          <h2 className="text-lg sm:text-xl font-mono font-bold text-white tracking-wide border-b border-white/[0.08] pb-2">
            01 // THE CODE INTELLIGENCE CHALLENGE
          </h2>
          <div className="text-sm sm:text-base text-zinc-300 space-y-3 leading-relaxed font-sans">
            <p>
              Standard document RAG pipelines fail when applied to software codebases. Source code is not prose;
              it possesses strict syntax hierarchies, nested scopes, function signatures, docstrings, and cross-file dependencies:
            </p>
            <ul className="space-y-2 pl-2 sm:pl-4 text-xs sm:text-sm text-zinc-300">
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 font-mono text-xs mt-0.5">▹</span>
                <span><strong>Naive Character Splitting Destroys Code:</strong> Arbitrary character slicing splits control flow statements in half, isolates function headers from bodies, and breaks AST comprehension.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 font-mono text-xs mt-0.5">▹</span>
                <span><strong>Expensive Full-Repository Re-Indexing:</strong> Re-computing dense embeddings across an entire repository on every small git commit wastes compute and slows down continuous iteration.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 font-mono text-xs mt-0.5">▹</span>
                <span><strong>Vector Index Rebalancing Bottlenecks:</strong> Adding vectors row-by-row into an active HNSW index incurs significant graph rebalancing overhead during bulk ingestion runs.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 font-mono text-xs mt-0.5">▹</span>
                <span><strong>Multi-Project Context Pollution:</strong> Without strict tenant partitioning, vector similarity searches cross-pollinate files from unrelated codebases.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* 2. Interactive Retrieval Architecture */}
        <section className="space-y-5">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-2">
            <h2 className="text-lg sm:text-xl font-mono font-bold text-white tracking-wide">
              02 // INTERACTIVE RETRIEVAL ARCHITECTURE
            </h2>
            <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-400">
              <Activity className="w-3.5 h-3.5 animate-pulse" />
              <span className="text-[11px] hidden sm:inline">LIVE SIGNAL PROGRESSION</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
            The indexing and retrieval pipeline separates file tracking from vector storage and respects code syntax boundaries.
            Tap or hover any stage below to inspect its role:
          </p>

          {/* Interactive Stepper Ribbon */}
          <div className="p-4 sm:p-5 rounded-xl border border-white/[0.08] bg-[#0c0e15]/90 space-y-4">
            <div className="overflow-x-auto pb-2 scrollbar-none">
              <div className="flex items-center gap-2 min-w-max">
                {CODEBASE_STAGES.map((stage, idx) => {
                  const isActive = activeStageIndex === idx;
                  const isCarryingSignal = signalIndex === idx;

                  return (
                    <React.Fragment key={stage.step}>
                      <button
                        type="button"
                        onClick={() => setActiveStageIndex(idx)}
                        onMouseEnter={() => setActiveStageIndex(idx)}
                        className={`p-3 rounded-lg text-left transition-all duration-200 border cursor-pointer min-w-[140px] max-w-[170px] min-h-[72px] touch-manipulation focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 ${
                          isActive
                            ? "bg-cyan-950/40 border-cyan-400/80 shadow-[0_0_12px_rgba(6,182,212,0.2)] text-white scale-[1.02]"
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
                      </button>

                      {idx < CODEBASE_STAGES.length - 1 && (
                        <span className="text-zinc-600 font-mono text-xs px-0.5">→</span>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>

            {/* Explanation box */}
            <div className="p-4 rounded-lg border border-cyan-500/20 bg-black/60 flex items-start gap-3">
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

          {/* ASCII Architecture Flow */}
          <div className="p-4 sm:p-5 rounded-lg border border-white/[0.08] bg-black/60 font-mono text-xs overflow-x-auto touch-pan-x">
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
        </section>

        {/* 3. Deep Technical Engineering Highlights */}
        <section className="space-y-4">
          <h2 className="text-lg sm:text-xl font-mono font-bold text-white tracking-wide border-b border-white/[0.08] pb-2">
            03 // KEY DATA ENGINEERING DECISIONS
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Tree-sitter AST */}
            <div className="p-4 rounded-lg border border-white/[0.08] bg-[#0c0e15]/70 space-y-2.5">
              <div className="text-xs font-mono font-bold text-cyan-300 flex items-center gap-2">
                <FileCode2 className="w-4 h-4 text-cyan-400" />
                <span>TREE-SITTER AST CHUNKING (10 LANGUAGES)</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                Rather than arbitrary character chunking, CodeBase-RAG employs LlamaIndex <code className="text-cyan-300 font-mono">CodeSplitter</code> tuned for 10 languages: Python, JavaScript, TypeScript, Java, Go, Rust, C++, C, C#, and PHP (50-line window, 10-line overlap, 1500 max characters). Documentation files gracefully fall back to sentence-boundary chunking.
              </p>
            </div>

            {/* HNSW Bulk Rebuild */}
            <div className="p-4 rounded-lg border border-white/[0.08] bg-[#0c0e15]/70 space-y-2.5">
              <div className="text-xs font-mono font-bold text-cyan-300 flex items-center gap-2">
                <Database className="w-4 h-4 text-cyan-400" />
                <span>HNSW BULK INGESTION OPTIMIZATION</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                Inserting vectors row-by-row into an active HNSW graph causes continuous rebalancing. The pipeline executes <code className="text-cyan-300 font-mono">drop_hnsw_indexes()</code> before large ingestion runs, writes dense vectors in batches, and reconstructs the HNSW index once ingestion completes, maximizing database write throughput.
              </p>
            </div>

            {/* Incremental Manifest */}
            <div className="p-4 rounded-lg border border-white/[0.08] bg-[#0c0e15]/70 space-y-2.5">
              <div className="text-xs font-mono font-bold text-cyan-300 flex items-center gap-2">
                <GitBranch className="w-4 h-4 text-cyan-400" />
                <span>DUAL-STORE INCREMENTAL INDEXING</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                Maintains a dedicated PostgreSQL <code className="text-cyan-300 font-mono">manifest</code> table tracking file path, SHA-256 hash, and mtime alongside the <code className="text-cyan-300 font-mono">code_embeddings</code> table. Small git commits only trigger chunking and re-embedding for the exact files modified, skipping unchanged files entirely.
              </p>
            </div>

            {/* Multi-Repo Isolation & Fallback */}
            <div className="p-4 rounded-lg border border-white/[0.08] bg-[#0c0e15]/70 space-y-2.5">
              <div className="text-xs font-mono font-bold text-cyan-300 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span>HYBRID SERVING & SESSION ISOLATION</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                Every node is tagged with a repository <code className="text-cyan-300 font-mono">source_key</code> and MD5-hashed <code className="text-cyan-300 font-mono">session_key</code> to enforce scoped similarity filters. Reasoning runs on Gemini API with automatic fallback to local Ollama (<code className="text-cyan-300 font-mono">llama3.2</code>) when working in offline or air-gapped environments.
              </p>
            </div>
          </div>
        </section>

        {/* 4. Challenges & Design Decisions */}
        <section className="space-y-4">
          <h2 className="text-lg sm:text-xl font-mono font-bold text-white tracking-wide border-b border-white/[0.08] pb-2">
            04 // KEY DESIGN DECISIONS
          </h2>
          <div className="space-y-4">
            {project.challengesAndDecisions.map((item, idx) => (
              <div key={idx} className="p-4 rounded-lg border border-white/[0.08] bg-[#0c0e15]/70 space-y-2">
                <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                  Challenge #{idx + 1}
                </div>
                <p className="text-xs sm:text-sm font-semibold text-zinc-200">
                  {item.challenge}
                </p>
                <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider pt-2">
                  Engineering Resolution
                </div>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
                  {item.decision}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Technologies Grid */}
        <section className="space-y-4 pt-4 border-t border-white/[0.08]">
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
      </main>
    </div>
  );
}
