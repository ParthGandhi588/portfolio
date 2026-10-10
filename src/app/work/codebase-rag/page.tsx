"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Database,
  GitBranch,
  FileCode2,
  Cpu,
  ChevronDown,
  ChevronUp,
  Terminal,
  ArrowUpRight,
} from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { PROJECTS } from "@/data/portfolioData";
import { ProjectNav } from "@/components/ProjectNav";
import { N8nFlowCanvas } from "@/components/N8nFlowCanvas";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SoundToggle } from "@/components/SoundProvider";

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
    shortRole: "Multi-Tenant Partitioning",
    desc: "Enforces metadata-filtered pgvector searches partitioned by repository source_key and MD5-hashed session_key to guarantee strict isolation between repositories.",
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
  const [activeStageIndex, setActiveStageIndex] = useState(2);
  const [deepDiveOpen, setDeepDiveOpen] = useState(true);
  const [activeDeepDiveTab, setActiveDeepDiveTab] = useState<"schematic" | "treesitter" | "hnsw" | "manifest">("schematic");

  const activeStage = CODEBASE_STAGES[activeStageIndex];

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/* Minimalist Editorial Navigation */}
      <nav className="header-scrolled backdrop-blur-md sticky top-0 z-40 py-4 border-b border-zinc-200 dark:border-white/[0.08]">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 flex items-center justify-between">
          <Link
            href="/#systems"
            className="inline-flex items-center gap-2 text-xs font-sans text-zinc-400 hover:text-white transition-colors editorial-link"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-blue-400" />
            <span>01 / Systems Monograph</span>
          </Link>

          <div className="flex items-center gap-3">
            <SoundToggle />
            <ThemeToggle />
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.1] hover:border-white/[0.3] text-xs font-sans text-zinc-300 hover:text-white transition-all"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub Repository</span>
                <ArrowUpRight className="w-3 h-3 text-zinc-500" />
              </a>
            )}
          </div>
        </div>
      </nav>

      {/* Main Editorial Monograph Content */}
      <main className="max-w-6xl mx-auto px-6 sm:px-10 py-16 sm:py-24 space-y-20">
        {/* ========================================================================= */}
        {/* LEVEL 1: TITLE & PRINCIPLE                                                */}
        {/* ========================================================================= */}
        <header className="space-y-8 pb-12 border-b border-white/[0.08]">
          <div className="space-y-3">
            <span className="text-xs font-mono text-blue-400 tracking-wider uppercase">
              CASE STUDY 02 // CODE INTELLIGENCE & RAG
            </span>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-sans font-light tracking-tight text-white leading-tight">
              CodeBase <span className="font-serif italic text-white">RAG</span>
            </h1>
            <p className="text-lg sm:text-2xl text-zinc-400 font-sans font-normal leading-relaxed max-w-3xl">
              Repository-aware code intelligence with Tree-sitter AST chunking, incremental indexing, and pgvector HNSW search.
            </p>
          </div>

          {/* Architectural Rule Callout */}
          <div className="py-6 px-8 border-l-2 border-blue-500 bg-white/[0.01]">
            <span className="text-[10px] font-mono uppercase tracking-wider text-blue-400 block mb-1">
              CORE ARCHITECTURAL DOCTRINE
            </span>
            <p className="text-xl sm:text-2xl font-serif italic text-white leading-relaxed">
              &quot;AST-aware semantic retrieval grounded in exact repository syntax and verified file paths.&quot;
            </p>
          </div>

          {/* Executive Telemetry Ledger (Zero Box Cards) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 pt-4">
            <div className="space-y-1 border-l border-white/[0.1] pl-5">
              <span className="text-[10px] font-mono text-zinc-400 uppercase">AST CHUNKING</span>
              <div className="text-base font-sans font-medium text-white">10 Languages</div>
              <p className="text-xs text-zinc-400 font-sans">Tree-sitter structural units</p>
            </div>
            <div className="space-y-1 border-l border-white/[0.1] pl-5">
              <span className="text-[10px] font-mono text-zinc-400 uppercase">VECTOR ENGINE</span>
              <div className="text-base font-sans font-medium text-white">pgvector (HNSW)</div>
              <p className="text-xs text-zinc-400 font-sans">Drop & rebuild bulk writes</p>
            </div>
            <div className="space-y-1 border-l border-white/[0.1] pl-5">
              <span className="text-[10px] font-mono text-zinc-400 uppercase">CHANGE DETECTION</span>
              <div className="text-base font-sans font-medium text-white">SHA-256 + mtime</div>
              <p className="text-xs text-zinc-400 font-sans">Incremental manifest table</p>
            </div>
            <div className="space-y-1 border-l border-white/[0.1] pl-5">
              <span className="text-[10px] font-mono text-blue-400 uppercase">MODEL SERVING</span>
              <div className="text-base font-sans font-medium text-blue-400">Gemini + Ollama</div>
              <p className="text-xs text-zinc-400 font-sans">Seamless offline fallback</p>
            </div>
          </div>
        </header>

        {/* ========================================================================= */}
        {/* LEVEL 2: REQUEST LIFECYCLE & EXECUTION BOUNDARY                           */}
        {/* ========================================================================= */}
        <section className="space-y-8 pb-16 border-b border-white/[0.08]">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-mono text-blue-400 tracking-wider uppercase">
                INDEXING LIFECYCLE
              </span>
              <h2 className="text-2xl sm:text-3xl font-sans font-light text-white">
                AST Code Parsing & Retrieval Pipeline
              </h2>
            </div>
            <span className="text-xs font-mono text-zinc-400">
              STAGE 0{activeStageIndex + 1} OF 0{CODEBASE_STAGES.length}
            </span>
          </div>

          <p className="text-sm text-zinc-400 font-sans leading-relaxed max-w-3xl">
            Raw text sliding windows break syntax boundaries. Tree-sitter parses complete ASTs across 10 programming languages, tagging vectors with relative paths and line numbers.
          </p>

          {/* Minimalist Horizontal Stage Stepper (Zero Box Cards) */}
          <div className="space-y-6">
            <div className="flex flex-wrap gap-4 sm:gap-6 border-b border-white/[0.08] pb-3 text-xs font-mono">
              {CODEBASE_STAGES.map((stage, idx) => {
                const isActive = activeStageIndex === idx;
                return (
                  <button
                    key={stage.step}
                    type="button"
                    onClick={() => setActiveStageIndex(idx)}
                    className={`pb-3 transition-colors cursor-pointer flex items-baseline gap-2 relative ${
                      isActive ? "text-white font-medium" : "text-zinc-500 hover:text-zinc-300"
                    }`}
                  >
                    <span className="text-blue-400">0{idx + 1}</span>
                    <span>{stage.step}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Stage Detail Drawer */}
            <div className="py-6 px-8 border-l border-white/[0.1] bg-white/[0.01] space-y-2">
              <div className="text-xs font-mono text-blue-400 uppercase tracking-wider">
                STAGE 0{activeStageIndex + 1}: {activeStage.title} · {activeStage.shortRole}
              </div>
              <p className="text-base text-zinc-300 font-sans leading-relaxed max-w-3xl">
                {activeStage.desc}
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* LEVEL 3: FOUR CORE SUBSYSTEMS                                             */}
        {/* ========================================================================= */}
        <section className="space-y-10 pb-16 border-b border-white/[0.08]">
          <div className="space-y-1">
            <span className="text-xs font-mono text-blue-400 tracking-wider uppercase">
              SUBSYSTEM SPECIFICATIONS
            </span>
            <h2 className="text-2xl sm:text-3xl font-sans font-light text-white">
              Architectural Subsystems & Vector Algorithms
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            <div className="space-y-2 border-l border-white/[0.1] pl-5">
              <div className="text-xs font-mono text-blue-400 uppercase">
                01 / TREE-SITTER AST CHUNKING
              </div>
              <h4 className="text-base font-sans font-medium text-white">
                Multi-Language Syntax Integrity
              </h4>
              <p className="text-sm text-zinc-400 font-sans leading-relaxed">
                LlamaIndex <code className="text-blue-400 font-mono">CodeSplitter</code> tuned for 10 languages (Python, JS, TS, Java, Go, Rust, C++, C, C#, PHP) with 50-line bounds and 10-line overlap, keeping class and function declarations intact.
              </p>
            </div>

            <div className="space-y-2 border-l border-white/[0.1] pl-5">
              <div className="text-xs font-mono text-blue-400 uppercase">
                02 / HNSW INGESTION OPTIMIZATION
              </div>
              <h4 className="text-base font-sans font-medium text-white">
                Index Drop & Post-Embedding Rebuild
              </h4>
              <p className="text-sm text-zinc-400 font-sans leading-relaxed">
                Drops HNSW vector indexes prior to large ingestion runs, writes dense vectors in high-throughput batches, and reconstructs the HNSW graph post-embedding to avoid per-row graph rebalances.
              </p>
            </div>

            <div className="space-y-2 border-l border-white/[0.1] pl-5">
              <div className="text-xs font-mono text-blue-400 uppercase">
                03 / INCREMENTAL MANIFEST TABLE
              </div>
              <h4 className="text-base font-sans font-medium text-white">
                Dual-Store SHA-256 & mtime Scanner
              </h4>
              <p className="text-sm text-zinc-400 font-sans leading-relaxed">
                PostgreSQL manifest table tracks file path, SHA-256 hash, and mtime. Small git commits only trigger chunking and embedding for modified files, skipping unchanged files entirely.
              </p>
            </div>

            <div className="space-y-2 border-l border-white/[0.1] pl-5">
              <div className="text-xs font-mono text-blue-400 uppercase">
                04 / HYBRID SERVING & ISOLATION
              </div>
              <h4 className="text-base font-sans font-medium text-white">
                Partitioned Keys & Local Fallback
              </h4>
              <p className="text-sm text-zinc-400 font-sans leading-relaxed">
                Vectors are tagged with repository source keys and MD5-hashed session IDs. Reasoning runs on Gemini API with automatic fallback to local Ollama (<code className="text-blue-400 font-mono">llama3.2</code>) for offline codebases.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* LEVEL 4: EXPANDABLE TECHNICAL DEEP DIVE (Zero Box Cards)                   */}
        {/* ========================================================================= */}
        <section className="space-y-6 pb-16 border-b border-white/[0.08]">
          <button
            type="button"
            onClick={() => setDeepDiveOpen(!deepDiveOpen)}
            className="w-full flex items-baseline justify-between text-left group cursor-pointer focus-visible:outline-none"
          >
            <div className="space-y-1">
              <span className="text-xs font-mono text-blue-400 uppercase tracking-wider">
                DEEP DIVE PROTOCOLS
              </span>
              <h3 className="text-xl sm:text-2xl font-sans font-light text-white group-hover:text-blue-400 transition-colors">
                Implementation Schematics & Technical Specifications
              </h3>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 shrink-0">
              <span>{deepDiveOpen ? "Collapse Specs" : "Expand Specs"}</span>
              {deepDiveOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </div>
          </button>

          {deepDiveOpen && (
            <div className="pt-6 space-y-8 animate-in fade-in duration-200">
              <div className="flex flex-wrap gap-4 border-b border-white/[0.08] pb-3 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setActiveDeepDiveTab("schematic")}
                  className={`pb-2 cursor-pointer transition-colors ${
                    activeDeepDiveTab === "schematic" ? "text-white font-medium border-b border-blue-500" : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  Pipeline Schematic
                </button>
                <button
                  type="button"
                  onClick={() => setActiveDeepDiveTab("treesitter")}
                  className={`pb-2 cursor-pointer transition-colors ${
                    activeDeepDiveTab === "treesitter" ? "text-white font-medium border-b border-blue-500" : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  Tree-sitter Specs
                </button>
                <button
                  type="button"
                  onClick={() => setActiveDeepDiveTab("hnsw")}
                  className={`pb-2 cursor-pointer transition-colors ${
                    activeDeepDiveTab === "hnsw" ? "text-white font-medium border-b border-blue-500" : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  HNSW Optimization
                </button>
                <button
                  type="button"
                  onClick={() => setActiveDeepDiveTab("manifest")}
                  className={`pb-2 cursor-pointer transition-colors ${
                    activeDeepDiveTab === "manifest" ? "text-white font-medium border-b border-blue-500" : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  Manifest Hashing
                </button>
              </div>

              {activeDeepDiveTab === "schematic" && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-zinc-500">
                    <span>// INTERACTIVE AST INGESTION & PGVECTOR FLOW</span>
                    <span className="text-blue-400">CLICK ANY NODE TO INSPECT SPECS</span>
                  </div>
                  <N8nFlowCanvas systemSlug="codebase-rag" />
                </div>
              )}

              {activeDeepDiveTab === "treesitter" && (
                <div className="space-y-4 font-sans text-sm text-zinc-300 leading-relaxed max-w-3xl">
                  <h4 className="font-mono text-xs uppercase text-blue-400">
                    AST-Aware Syntax Chunking Across 10 Languages
                  </h4>
                  <p>
                    Standard character or line chunkers cut through class declarations and loop bodies. CodeBase-RAG uses language grammars to extract syntax trees:
                  </p>
                  <ul className="space-y-2 pl-4 text-xs text-zinc-400 list-disc">
                    <li><strong>Supported Languages:</strong> Python, JavaScript, TypeScript, Java, Go, Rust, C++, C, C#, and PHP.</li>
                    <li><strong>Tuning Parameters:</strong> <code className="text-blue-400 font-mono">chunk_lines=50</code>, <code className="text-blue-400 font-mono">chunk_lines_overlap=10</code>, <code className="text-blue-400 font-mono">max_chars=1500</code>.</li>
                    <li><strong>Documentation Fallback:</strong> Non-code files (Markdown, JSON, YAML, configs) fall back to sentence boundary chunking (<code className="text-blue-400 font-mono">chunk_size=500</code>, <code className="text-blue-400 font-mono">chunk_overlap=50</code>).</li>
                  </ul>
                </div>
              )}

              {activeDeepDiveTab === "hnsw" && (
                <div className="space-y-4 font-sans text-sm text-zinc-300 leading-relaxed max-w-3xl">
                  <h4 className="font-mono text-xs uppercase text-blue-400">
                    HNSW Graph Drop and Rebuild Lifecycle
                  </h4>
                  <p>
                    Writing vectors row-by-row into a populated HNSW index causes severe latency due to continuous neighbor graph rebalancing.
                  </p>
                  <ul className="space-y-2 pl-4 text-xs text-zinc-400 list-disc">
                    <li><strong>Index drop:</strong> Prior to bulk embedding writes, <code className="text-blue-400 font-mono">drop_hnsw_indexes()</code> executes on the PostgreSQL vector table.</li>
                    <li><strong>Batched insertion:</strong> Vectors are inserted in bulk rows without index contention overhead.</li>
                    <li><strong>Post-embedding build:</strong> <code className="text-blue-400 font-mono">create_hnsw_index()</code> executes with cosine similarity distance metric, creating the full navigation graph in a single pass.</li>
                  </ul>
                </div>
              )}

              {activeDeepDiveTab === "manifest" && (
                <div className="space-y-4 font-sans text-sm text-zinc-300 leading-relaxed max-w-3xl">
                  <h4 className="font-mono text-xs uppercase text-blue-400">
                    Dual-Store SHA-256 & Modification Time Hashing
                  </h4>
                  <p>
                    Re-embedding an entire repository on minor commits wastes compute. CodeBase-RAG tracks two distinct file attributes:
                  </p>
                  <ul className="space-y-2 pl-4 text-xs text-zinc-400 list-disc">
                    <li><strong>Fast filter:</strong> First compares disk modification time (<code className="text-blue-400 font-mono">mtime</code>); if unchanged, the file is skipped instantly.</li>
                    <li><strong>Exact verification:</strong> If mtime changed, computes SHA-256 hash. If content matches the database record, timestamp is updated without re-chunking.</li>
                    <li><strong>Selective purge:</strong> When a file truly changes, only that file&apos;s chunks are deleted from the vector table and re-embedded.</li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </section>

        {/* ========================================================================= */}
        {/* TECHNOLOGIES & CASE STUDY NAVIGATION                                      */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 block">
            DEPLOYED TECHNOLOGIES
          </span>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="text-xs font-mono px-3 py-1.5 rounded border border-white/[0.08] bg-white/[0.02] text-zinc-300"
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
