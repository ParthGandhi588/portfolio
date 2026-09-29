import React from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { PROJECTS } from "@/data/portfolioData";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CodeBase RAG Case Study — Parth Gandhi",
  description:
    "A repository-aware RAG system designed to help developers understand unfamiliar codebases through source-aware retrieval and conversational querying.",
};

export default function CodeBaseRagPage() {
  const project = PROJECTS.find((p) => p.slug === "codebase-rag")!;

  return (
    <div className="min-h-screen bg-[#090a0e] text-[#f3f4f6]">
      {/* Top Navigation */}
      <nav className="border-b border-white/[0.08] bg-[#090a0e]/90 backdrop-blur-md sticky top-0 z-40 py-3.5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>BACK TO SYSTEMS</span>
          </Link>

          <div className="flex items-center gap-3">
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded text-xs font-mono border border-white/[0.1] bg-white/[0.03] text-zinc-300 hover:text-white transition-colors"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub Repo</span>
              </a>
            )}
          </div>
        </div>
      </nav>

      {/* Case Study Main */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20 space-y-14">
        {/* Header Block */}
        <header className="space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 font-semibold tracking-wider uppercase">
            <span>{project.category}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-mono font-bold tracking-tight text-white">
            {project.title}
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed font-sans">
            {project.description}
          </p>

          <div className="p-4 rounded-lg border border-cyan-500/25 bg-cyan-950/20 font-mono text-sm text-cyan-300 flex items-start gap-3 mt-6">
            <span className="text-cyan-400 font-bold shrink-0">CORE RULE //</span>
            <span>&quot;AST-aware semantic retrieval grounded in exact repository syntax and file paths.&quot;</span>
          </div>
        </header>

        {/* Technical Overview Metadata Grid */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-lg border border-white/[0.08] bg-[#0c0e15]/80 font-mono text-xs">
          <div>
            <span className="text-zinc-500 uppercase tracking-wider block text-[10px]">Parser / Splitter</span>
            <span className="text-zinc-200 mt-1 block">Tree-sitter AST</span>
          </div>
          <div>
            <span className="text-zinc-500 uppercase tracking-wider block text-[10px]">Vector Store</span>
            <span className="text-zinc-200 mt-1 block">pgvector (HNSW)</span>
          </div>
          <div>
            <span className="text-zinc-500 uppercase tracking-wider block text-[10px]">Embeddings</span>
            <span className="text-zinc-200 mt-1 block">FastEmbed (Local)</span>
          </div>
          <div>
            <span className="text-zinc-500 uppercase tracking-wider block text-[10px]">LLM Routing</span>
            <span className="text-zinc-200 mt-1 block">Gemini API / Ollama</span>
          </div>
        </section>

        {/* 1. Problem Statement */}
        <section className="space-y-4">
          <h2 className="text-xl font-mono font-bold text-white tracking-wide border-b border-white/[0.08] pb-2">
            01 // THE CODE RETRIEVAL CHALLENGE
          </h2>
          <div className="text-sm sm:text-base text-zinc-300 space-y-3 leading-relaxed font-sans">
            <p>
              Standard document RAG pipelines fail when applied to software repositories. Code is not natural language:
              it contains strict syntactical boundaries, nested scope hierarchies, caller/callee relationships, and rapidly mutating files.
            </p>
            <ul className="space-y-2 pl-4 text-sm text-zinc-300">
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-mono text-xs mt-0.5">✕</span>
                <span><strong>Naive Character Splitting:</strong> Slicing every 500 characters severs functions mid-statement, separates signatures from docstrings, and breaks syntax trees.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-mono text-xs mt-0.5">✕</span>
                <span><strong>Re-Indexing Waste:</strong> Re-calculating embeddings across thousands of repository files upon a 2-line commit wastes compute and increases indexing latency.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-mono text-xs mt-0.5">✕</span>
                <span><strong>Hallucinated Code References:</strong> Generic models produce fabricated methods when not explicitly grounded in verified relative file paths and line ranges.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* 2. System Architecture & Diagram */}
        <section className="space-y-5">
          <h2 className="text-xl font-mono font-bold text-white tracking-wide border-b border-white/[0.08] pb-2">
            02 // END-TO-END REPOSITORY RETRIEVAL ARCHITECTURE
          </h2>
          <p className="text-sm text-zinc-300 font-sans leading-relaxed">
            The system implements an AST-aware indexing engine with differential hashing, dense vector lookup via PostgreSQL + pgvector,
            and contextual citation grounding.
          </p>

          {/* ASCII Architecture Flow */}
          <div className="p-5 rounded-lg border border-white/[0.08] bg-black/60 font-mono text-xs overflow-x-auto">
            <div className="text-zinc-500 mb-3">// CODEBASE RAG REPOSITORY PIPELINE</div>
            <pre className="text-cyan-300 leading-snug">
{`+-------------------------------------------------------------------------+
|  TARGET REPOSITORY (Cloned or local path via GitPython)                 |
+-----------------------------------+-------------------------------------+
                                    |
                                    v
+-------------------------------------------------------------------------+
|  DIFFERENTIAL SCANNER & HASH CACHE                                      |
|  - Compares SHA-256 checksums & mtime against database                  |
|  - Filters ignored files (.git, node_modules, binary assets)             |
|  - Bypasses unchanged source files to avoid redundant embeddings        |
+-----------------------------------+-------------------------------------+
                                    |
                                    v
+-------------------------------------------------------------------------+
|  TREE-SITTER AST PARSER & CODE SPLITTER                                 |
|  - Language-aware grammar parsing (Python, TS, JS, Go, etc.)             |
|  - Segregates complete functions, classes, and cohesive modules         |
|  - Attaches file_path, start_line, end_line, and scope metadata         |
+-----------------------------------+-------------------------------------+
                                    |
                                    v
+-------------------------------------------------------------------------+
|  EMBEDDING & VECTOR STORAGE                                             |
|  - High-throughput local dense vectors via FastEmbed                     |
|  - Ingestion into PostgreSQL with pgvector (HNSW Indexing)              |
|  - Strictly isolated by repository / session namespaces                 |
+-----------------------------------+-------------------------------------+
                                    |
                                    v
+-------------------------------------------------------------------------+
|  RETRIEVAL & QUERY SYNTHESIS                                            |
|  - User conversational query -> vector similarity search                |
|  - Top-k AST chunks + Git history context injected into LLM            |
|  - Primary: Gemini API | Fallback: Local Ollama instance                |
|  - Output: Synthesized answer + verified source file & line citations   |
+-------------------------------------------------------------------------+`}
            </pre>
          </div>
        </section>

        {/* 3. Deep Engineering Highlights */}
        <section className="space-y-4">
          <h2 className="text-xl font-mono font-bold text-white tracking-wide border-b border-white/[0.08] pb-2">
            03 // TECHNICAL IMPLEMENTATION HIGHLIGHTS
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {project.keyFeatures.map((feat, idx) => (
              <div key={idx} className="p-4 rounded border border-white/[0.08] bg-[#0c0e15]/70 space-y-2">
                <div className="text-xs font-mono font-bold text-cyan-300 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  {feat.title}
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                  {feat.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Challenges & Design Decisions */}
        <section className="space-y-4">
          <h2 className="text-xl font-mono font-bold text-white tracking-wide border-b border-white/[0.08] pb-2">
            04 // KEY DESIGN DECISIONS
          </h2>
          <div className="space-y-4">
            {project.challengesAndDecisions.map((item, idx) => (
              <div key={idx} className="p-4 rounded border border-white/[0.08] bg-[#0c0e15]/70 space-y-2">
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
