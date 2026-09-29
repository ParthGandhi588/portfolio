"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Activity,
  Info,
  Layers,
  Clock,
  ShieldCheck,
  FileCheck,
  Zap,
  Server,
  Code2,
} from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { PROJECTS } from "@/data/portfolioData";

const ERP_STAGES = [
  {
    step: "USER / TRIGGERS",
    title: "User Queries & Scheduled Triggers",
    desc: "Natural language business queries, invoice uploads via WebSockets, or automated execution triggers from the persistent PostgreSQL AI scheduler.",
  },
  {
    step: "FASTAPI GATEWAY",
    title: "FastAPI Gateway & Session Engine",
    desc: "Authenticates sessions, validates request schemas, handles MIME routing for documents, and manages asynchronous token streaming.",
  },
  {
    step: "SPECIALIST AGENT",
    title: "Domain Specialist Agent",
    desc: "Intent-scoped specialist agent (Purchase, Stores, Planning, Engineering, QC) loaded with bounded system prompts and restricted tool schemas.",
  },
  {
    step: "vLLM INFERENCE",
    title: "Local vLLM Model Serving",
    desc: "High-throughput local OpenAI-compatible endpoint hosting Qwen at temperature zero, generating validated tool invocation arguments without external API latency.",
  },
  {
    step: "TYPED PYTHON TOOLS",
    title: "Pydantic Validation & Async Task Queue",
    desc: "Model outputs are strictly validated against Pydantic schemas. Concurrent tool calls emitted in a single turn are scheduled through an asynchronous task queue.",
  },
  {
    step: "ERP & PERSISTENCE",
    title: "Deterministic ERP & Database State",
    desc: "Deterministic execution against internal ERP service endpoints, PostgreSQL, and document stores with audited rollback boundaries.",
  },
];

export default function AgenticErpPage() {
  const project = PROJECTS.find((p) => p.slug === "agentic-erp")!;
  const [activeStageIndex, setActiveStageIndex] = useState(2); // Default to SPECIALIST AGENT
  const [signalIndex, setSignalIndex] = useState(0);

  // Subtle request/signal loop
  useEffect(() => {
    const timer = setInterval(() => {
      setSignalIndex((prev) => (prev + 1) % ERP_STAGES.length);
    }, 2200);
    return () => clearInterval(timer);
  }, []);

  const activeStage = ERP_STAGES[activeStageIndex];

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

      {/* Case Study Content */}
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

          {/* Architectural Rule Callout */}
          <div className="p-4 rounded-lg border border-cyan-500/25 bg-cyan-950/20 font-mono text-xs sm:text-sm text-cyan-300 flex items-start gap-3 mt-6">
            <span className="text-cyan-400 font-bold shrink-0">CORE RULE //</span>
            <span>&quot;The LLM plans. Python executes. The ERP remains the system of record.&quot;</span>
          </div>
        </header>

        {/* Technical Overview Metadata Grid */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-5 rounded-lg border border-white/[0.08] bg-[#0c0e15]/80 font-mono text-xs">
          <div>
            <span className="text-zinc-500 uppercase tracking-wider block text-[10px]">Production Runtime</span>
            <span className="text-zinc-200 mt-1 block">Specialist Agents</span>
          </div>
          <div>
            <span className="text-zinc-500 uppercase tracking-wider block text-[10px]">Execution Boundary</span>
            <span className="text-zinc-200 mt-1 block">Pydantic / Async Queue</span>
          </div>
          <div>
            <span className="text-zinc-500 uppercase tracking-wider block text-[10px]">Model Serving</span>
            <span className="text-zinc-200 mt-1 block">Local vLLM Engine (~5s)</span>
          </div>
          <div>
            <span className="text-zinc-500 uppercase tracking-wider block text-[10px]">Scheduler Layer</span>
            <span className="text-zinc-200 mt-1 block">PostgreSQL Persistent Queue</span>
          </div>
        </section>

        {/* 1. Problem & Constraints */}
        <section className="space-y-4">
          <h2 className="text-lg sm:text-xl font-mono font-bold text-white tracking-wide border-b border-white/[0.08] pb-2">
            01 // PROBLEM & ARCHITECTURAL CONSTRAINTS
          </h2>
          <div className="text-sm sm:text-base text-zinc-300 space-y-3 leading-relaxed font-sans">
            <p>
              Enterprise ERP software is burdened with hundreds of fragmented forms, transaction screens,
              and complex relational balances. While generative AI provides natural language interaction,
              connecting language models directly to enterprise state creates critical engineering challenges:
            </p>
            <ul className="space-y-2 pl-2 sm:pl-4 text-xs sm:text-sm text-zinc-300">
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 font-mono text-xs mt-0.5">▹</span>
                <span><strong>Unchecked Database Mutations:</strong> Allowing models to generate raw SQL queries risks executing malformed updates, bypassing double-entry audit trails, or violating relational constraints.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 font-mono text-xs mt-0.5">▹</span>
                <span><strong>Prompt Bloat & Reasoning Drift:</strong> Stuffing an entire enterprise schema (hundreds of tables across Purchase, Stores, QC, Planning) into a single prompt blows out token limits and degrades reasoning accuracy.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 font-mono text-xs mt-0.5">▹</span>
                <span><strong>Multi-Turn Latency Bottlenecks:</strong> Cloud-hosted sequential model calls can take 15–20 seconds per user turn, frustrating operational staff who need responsive workflows.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 font-mono text-xs mt-0.5">▹</span>
                <span><strong>Ephemeral Automation:</strong> Background scheduled jobs held in ephemeral memory disappear when containers restart or crash during report generation.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* 2. Interactive System Architecture */}
        <section className="space-y-5">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-2">
            <h2 className="text-lg sm:text-xl font-mono font-bold text-white tracking-wide">
              02 // INTERACTIVE REQUEST LIFECYCLE
            </h2>
            <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-400">
              <Activity className="w-3.5 h-3.5 animate-pulse" />
              <span className="text-[11px] hidden sm:inline">LIVE SIGNAL PROGRESSION</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
            Every incoming request follows a deterministic pipeline where language models are restricted to
            formulating structured JSON schemas, while deterministic Python code executes all enterprise operations.
            Tap or hover any stage below to inspect its execution constraints:
          </p>

          {/* Interactive Flow Stepper Ribbon */}
          <div className="p-4 sm:p-5 rounded-xl border border-white/[0.08] bg-[#0c0e15]/90 space-y-4">
            <div className="overflow-x-auto pb-2 scrollbar-none">
              <div className="flex items-center gap-2 min-w-max">
                {ERP_STAGES.map((stage, idx) => {
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

                      {idx < ERP_STAGES.length - 1 && (
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

          {/* ASCII / Monospace Flow Diagram */}
          <div className="p-4 sm:p-5 rounded-lg border border-white/[0.08] bg-black/60 font-mono text-xs overflow-x-auto touch-pan-x">
            <div className="text-zinc-500 mb-2">// DETERMINISTIC LIFECYCLE SCHEMATIC</div>
            <pre className="text-cyan-300 text-[11px] leading-snug">
{`+-----------------------------------------------------------------------+
|  CLIENT & TRIGGERS (WebSockets / MIME Uploads / Persistent Cron)      |
+-----------------------------------+-----------------------------------+
                                    |
                                    v
+-----------------------------------------------------------------------+
|  FASTAPI GATEWAY (agent_ws.py)                                        |
|  - Session Validation & MIME Routing                                 |
|  - Asynchronous WebSocket Token Streaming                             |
+-----------------------------------+-----------------------------------+
                                    |
                                    v
+-----------------------------------------------------------------------+
|  DOMAIN SPECIALIST AGENT (Purchase / Stores / Planning / QC / etc.)   |
|  - Scoped role prompts & strict schema boundaries                     |
|  - Lazy schema context injection on demand                            |
+-----------------------------------+-----------------------------------+
                                    |
                                    v
+-----------------------------------------------------------------------+
|  vLLM INFERENCE ENGINE (Local OpenAI-compatible Qwen Endpoint)        |
|  - Temperature 0 structured reasoning                                 |
|  - Emits text OR strictly typed Pydantic tool call schemas            |
+-----------------------------------+-----------------------------------+
                                    |
                                    v
+-----------------------------------------------------------------------+
|  TYPED PYTHON TOOLS & ASYNC TASK QUEUE (RAW.agent.Agent)              |
|  - Bounded parameter schema validation (Pydantic)                     |
|  - Concurrent async tool dispatch without thread contention           |
+-----------------------------------+-----------------------------------+
                                    |
                                    v
+-----------------------------------------------------------------------+
|  ENTERPRISE SYSTEM OF RECORD                                          |
|  - Authenticated Internal REST APIs / PostgreSQL / MinIO Storage      |
|  - Audit logging, state persistence, and webhook delivery             |
+-----------------------------------------------------------------------+`}
            </pre>
          </div>
        </section>

        {/* 3. Production vs Experimental Architecture Comparison */}
        <section className="space-y-4">
          <h2 className="text-lg sm:text-xl font-mono font-bold text-white tracking-wide border-b border-white/[0.08] pb-2">
            03 // ARCHITECTURAL DISTINCTION: PRODUCTION VS EXPERIMENTAL
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Production Architecture Card */}
            <div className="p-5 rounded-lg border border-cyan-500/30 bg-cyan-950/15 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  PRODUCTION RUNTIME
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  DEPLOYED
                </span>
              </div>
              <h3 className="text-sm font-mono font-bold text-white">
                Specialist-Agent Architecture with Async Tooling
              </h3>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                Each operational department (Purchase, Stores, Planning, QC, Database) operates as an isolated specialist agent inheriting from a shared orchestrator. Agents operate with scoped system prompts and strictly bounded tool functions. When multiple tool calls are emitted in a single model turn, an asynchronous task queue executes them concurrently, preventing blocking bottlenecks.
              </p>
              <div className="text-[11px] font-mono text-cyan-400/90 pt-1">
                Deterministic routing · Scoped prompt boundaries · Parallel async tools
              </div>
            </div>

            {/* Experimental Architecture Card */}
            <div className="p-5 rounded-lg border border-amber-500/30 bg-amber-950/15 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-amber-400" />
                  EXPERIMENTAL PROTOTYPE
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  BRANCH: trying_leader_agent
                </span>
              </div>
              <h3 className="text-sm font-mono font-bold text-white">
                Universal Leader Supervisor-Worker System
              </h3>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                To evaluate cross-departmental coordination, Parth prototyped a supervisor-worker team. A universal leader agent evaluates complex multi-stage requests and delegates subtasks to specialist workers. To prevent context window explosion from injecting multiple database schemas, a lazy domain context tool dynamically reads schema files on demand.
              </p>
              <div className="text-[11px] font-mono text-amber-400/90 pt-1">
                Evaluated research branch · Dynamic lazy schema loading · Subtask delegation
              </div>
            </div>
          </div>
        </section>

        {/* 4. Core Engineering Highlights */}
        <section className="space-y-4">
          <h2 className="text-lg sm:text-xl font-mono font-bold text-white tracking-wide border-b border-white/[0.08] pb-2">
            04 // CORE SUBSYSTEM IMPLEMENTATIONS
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Scheduler Highlight */}
            <div className="p-4 rounded-lg border border-white/[0.08] bg-[#0c0e15]/70 space-y-2.5">
              <div className="text-xs font-mono font-bold text-cyan-300 flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span>PERSISTENT POSTGRESQL AI SCHEDULER</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                Engineered a persistent task scheduler with dedicated PostgreSQL tables (<code className="text-cyan-300 font-mono">cron_jobs</code> and <code className="text-cyan-300 font-mono">cron_job_runs</code>) for schedules and execution logs. A background worker daemon calculates future runtimes with explicit timezone handling (<code className="text-cyan-300 font-mono">ZoneInfo</code>), retries failed jobs, and dispatches automated WhatsApp and Email notifications upon completion.
              </p>
            </div>

            {/* Typed Tools Highlight */}
            <div className="p-4 rounded-lg border border-white/[0.08] bg-[#0c0e15]/70 space-y-2.5">
              <div className="text-xs font-mono font-bold text-cyan-300 flex items-center gap-2">
                <Code2 className="w-4 h-4 text-cyan-400" />
                <span>TYPED CONSTRAINED EXECUTION</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                Migrated all agent operations away from raw SQL query generation to strongly typed Python tools. Inputs are validated with strict Pydantic schemas before calling internal authenticated service endpoints, eliminating SQL injection and structural corruption risks.
              </p>
            </div>

            {/* Multimodal Ingestion */}
            <div className="p-4 rounded-lg border border-white/[0.08] bg-[#0c0e15]/70 space-y-2.5">
              <div className="text-xs font-mono font-bold text-cyan-300 flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-cyan-400" />
                <span>MULTIMODAL DOCUMENT PIPELINE</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                Built an ingestion pipeline that handles invoices and purchase orders via automated MIME sniffing, PyMuPDF native text extraction, and vision model OCR fallbacks. Extracted payloads are cached with SHA-256 hashes to prevent redundant processing.
              </p>
            </div>

            {/* Data Validation Pipeline */}
            <div className="p-4 rounded-lg border border-white/[0.08] bg-[#0c0e15]/70 space-y-2.5">
              <div className="text-xs font-mono font-bold text-cyan-300 flex items-center gap-2">
                <Server className="w-4 h-4 text-cyan-400" />
                <span>DATA INTEGRITY & VALIDATION RULES</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                Constructed verification layers for Excel bulk uploads (Item Master and Process Sheets) and multi-site transfer requests, catching malformed business records before they reach database persistence tables.
              </p>
            </div>
          </div>
        </section>

        {/* 5. Measured Workflow Latency Optimization */}
        <section className="space-y-4">
          <h2 className="text-lg sm:text-xl font-mono font-bold text-white tracking-wide border-b border-white/[0.08] pb-2">
            05 // MEASURED WORKFLOW LATENCY OPTIMIZATION
          </h2>
          <div className="p-5 rounded-lg border border-emerald-500/20 bg-emerald-950/15 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-semibold">
              <CheckCircle2 className="w-4 h-4" />
              <span>MEASURED WORKFLOW IMPROVEMENT: ~15s → ~5s</span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
              Within a multi-step ERP document parsing workflow, sequential cloud API calls originally produced end-to-end execution durations around 15 seconds due to network round-trips and cold starts. By orchestrating inference with local <strong>vLLM model serving</strong> (hosting Qwen at temperature zero) and streaming tokens over native WebSockets, total workflow completion time was brought down to approximately <strong>5 seconds</strong>.
            </p>
            <div className="text-[11px] font-mono text-zinc-400 pt-1">
              * Verified engineering outcome documented for the local model serving pipeline.
            </div>
          </div>
        </section>

        {/* 6. Challenges & Design Decisions */}
        <section className="space-y-4">
          <h2 className="text-lg sm:text-xl font-mono font-bold text-white tracking-wide border-b border-white/[0.08] pb-2">
            06 // KEY DESIGN DECISIONS
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
