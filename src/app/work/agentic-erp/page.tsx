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
  ChevronDown,
  ChevronUp,
  Terminal,
} from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { PROJECTS } from "@/data/portfolioData";

const ERP_STAGES = [
  {
    step: "USER / TRIGGERS",
    title: "User Queries & Schedulers",
    shortRole: "Ingestion Trigger",
    desc: "Natural language business queries, invoice uploads via WebSockets, or automated execution triggers from the persistent PostgreSQL AI scheduler.",
  },
  {
    step: "FASTAPI GATEWAY",
    title: "FastAPI Gateway & Session Engine",
    shortRole: "Validation & Streaming",
    desc: "Authenticates sessions, validates request schemas, handles MIME routing for documents, and manages asynchronous token streaming.",
  },
  {
    step: "SPECIALIST AGENT",
    title: "Domain Specialist Agent",
    shortRole: "Scoped Intent Planning",
    desc: "Intent-scoped specialist agent (Purchase, Stores, Planning, Engineering, QC) loaded with bounded system prompts and restricted tool schemas.",
  },
  {
    step: "vLLM INFERENCE",
    title: "Local vLLM Model Serving",
    shortRole: "High-Throughput Reasoning",
    desc: "High-throughput local OpenAI-compatible endpoint hosting Qwen at temperature zero, generating validated tool invocation arguments without external API latency.",
  },
  {
    step: "TYPED PYTHON TOOLS",
    title: "Pydantic Validation & Task Queue",
    shortRole: "Deterministic Execution",
    desc: "Model outputs are strictly validated against Pydantic schemas. Concurrent tool calls emitted in a single turn are scheduled through an asynchronous task queue.",
  },
  {
    step: "ERP & PERSISTENCE",
    title: "Deterministic State & APIs",
    shortRole: "System of Record",
    desc: "Deterministic execution against internal ERP service endpoints, PostgreSQL, and document stores with audited rollback boundaries.",
  },
];

export default function AgenticErpPage() {
  const project = PROJECTS.find((p) => p.slug === "agentic-erp")!;
  const [activeStageIndex, setActiveStageIndex] = useState(2); // Default to SPECIALIST AGENT
  const [signalIndex, setSignalIndex] = useState(0);
  const [deepDiveOpen, setDeepDiveOpen] = useState(false);
  const [activeDeepDiveTab, setActiveDeepDiveTab] = useState<"schematic" | "scheduler" | "tools" | "multimodal">("schematic");

  // Subtle request/signal loop
  useEffect(() => {
    const timer = setInterval(() => {
      setSignalIndex((prev) => (prev + 1) % ERP_STAGES.length);
    }, 2400);
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
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-14 space-y-10 sm:space-y-14">
        {/* ========================================================================= */}
        {/* LEVEL 1: 10-SECOND UNDERSTANDING (What is Agentic ERP?)                    */}
        {/* ========================================================================= */}
        <header className="space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 font-semibold tracking-wider uppercase">
            <span>{project.category}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-mono font-bold tracking-tight text-white">
            {project.title}
          </h1>

          <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-sans">
            An enterprise AI layer connecting business workflows through specialist agents, typed Python tools, and persistent scheduling.
          </p>

          {/* Architectural Rule Callout */}
          <div className="p-3.5 sm:p-4 rounded-lg border border-cyan-500/25 bg-cyan-950/20 font-mono text-xs sm:text-sm text-cyan-300 flex items-start gap-3 mt-4">
            <span className="text-cyan-400 font-bold shrink-0">CORE RULE //</span>
            <span>&quot;The LLM plans. Python executes. The ERP remains the system of record.&quot;</span>
          </div>

          {/* Executive Quick-Metric Chips */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
            <div className="p-3 rounded-lg border border-white/[0.08] bg-[#0c0e15]/80 font-mono text-xs">
              <span className="text-zinc-500 block text-[10px] uppercase">Runtime</span>
              <span className="text-zinc-200 font-semibold mt-0.5 block">Specialist Agents</span>
            </div>
            <div className="p-3 rounded-lg border border-white/[0.08] bg-[#0c0e15]/80 font-mono text-xs">
              <span className="text-zinc-500 block text-[10px] uppercase">Execution</span>
              <span className="text-zinc-200 font-semibold mt-0.5 block">Typed Pydantic Tools</span>
            </div>
            <div className="p-3 rounded-lg border border-white/[0.08] bg-[#0c0e15]/80 font-mono text-xs">
              <span className="text-zinc-500 block text-[10px] uppercase">Inference</span>
              <span className="text-zinc-200 font-semibold mt-0.5 block">Local vLLM Engine</span>
            </div>
            <div className="p-3 rounded-lg border border-emerald-500/25 bg-emerald-950/20 font-mono text-xs">
              <span className="text-emerald-400 block text-[10px] uppercase">Measured Latency</span>
              <span className="text-emerald-200 font-semibold mt-0.5 block">~15s → ~5s</span>
            </div>
          </div>
        </header>

        {/* ========================================================================= */}
        {/* LEVEL 2: 30-SECOND UNDERSTANDING (What makes the architecture interesting?) */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-2">
            <h2 className="text-base sm:text-lg font-mono font-bold text-white tracking-wide">
              REQUEST LIFECYCLE & EXECUTION BOUNDARY
            </h2>
            <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-400">
              <Activity className="w-3.5 h-3.5 animate-pulse" />
              <span className="text-[11px] hidden sm:inline">LIVE SIGNAL</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
            The model is never granted direct mutation rights. Reasoning plans are validated into strongly typed function calls, executed asynchronously in pure Python. Tap any stage to inspect:
          </p>

          {/* Interactive Stepper Ribbon (Mobile Touch & Desktop Click) */}
          <div className="p-3.5 sm:p-5 rounded-xl border border-white/[0.08] bg-[#0c0e15]/90 space-y-3.5">
            <div className="overflow-x-auto pb-2 scrollbar-none -mx-1 px-1">
              <div className="flex items-center gap-2 min-w-max">
                {ERP_STAGES.map((stage, idx) => {
                  const isActive = activeStageIndex === idx;
                  const isCarryingSignal = signalIndex === idx;

                  return (
                    <React.Fragment key={stage.step}>
                      <button
                        type="button"
                        onClick={() => setActiveStageIndex(idx)}
                        className={`p-3 rounded-lg text-left transition-all duration-200 border cursor-pointer min-w-[135px] max-w-[165px] min-h-[68px] touch-manipulation focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 active:bg-cyan-900/40 ${
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

                      {idx < ERP_STAGES.length - 1 && (
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
        {/* ARCHITECTURAL DISTINCTION: PRODUCTION VS EXPERIMENTAL (High Signal)       */}
        {/* ========================================================================= */}
        <section className="space-y-3.5">
          <h2 className="text-base sm:text-lg font-mono font-bold text-white tracking-wide border-b border-white/[0.08] pb-2">
            ARCHITECTURAL REALITY: PRODUCTION VS EXPERIMENTAL
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Production Architecture Card */}
            <div className="p-4 sm:p-5 rounded-lg border border-cyan-500/30 bg-cyan-950/15 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  PRODUCTION RUNTIME
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  DEPLOYED
                </span>
              </div>
              <h3 className="text-sm font-mono font-semibold text-white">
                Specialist-Agent Architecture with Async Queue
              </h3>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                Each domain (Purchase, Stores, Planning, QC, Database) operates as an isolated specialist agent. Agents utilize scoped system prompts and bounded tools. Multiple tool calls emitted in a single turn are dispatched concurrently via an asynchronous task queue.
              </p>
            </div>

            {/* Experimental Architecture Card */}
            <div className="p-4 sm:p-5 rounded-lg border border-amber-500/30 bg-amber-950/15 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-amber-400" />
                  EVALUATED PROTOTYPE
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  RESEARCH PROTOTYPE
                </span>
              </div>
              <h3 className="text-sm font-mono font-semibold text-white">
                Universal Leader Supervisor-Worker Team
              </h3>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                Evaluated a supervisor-worker team for cross-departmental coordination. A leader agent breaks down complex requests and delegates subtasks to specialist workers. Employs lazy schema context loading to avoid prompt token explosion.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* LEVEL 3: 60-90 SECOND UNDERSTANDING (What was engineered & measured result) */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <h2 className="text-base sm:text-lg font-mono font-bold text-white tracking-wide border-b border-white/[0.08] pb-2">
            CORE SUBSYSTEMS & MEASURED OUTCOMES
          </h2>

          {/* Latency Result Callout */}
          <div className="p-4 sm:p-5 rounded-lg border border-emerald-500/20 bg-emerald-950/15 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-semibold">
              <CheckCircle2 className="w-4 h-4" />
              <span>MEASURED WORKFLOW OPTIMIZATION: ~15s → ~5s</span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
              Within a multi-step ERP document parsing workflow, sequential cloud API calls originally produced latencies around 15 seconds due to network hops and cold starts. By configuring local <strong>vLLM model serving</strong> (hosting Qwen at temperature zero) and token streaming over native WebSockets, total workflow completion time was reduced to approximately <strong>5 seconds</strong>.
            </p>
          </div>

          {/* 4 Crisp Subsystems */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="p-4 rounded-lg border border-white/[0.08] bg-[#0c0e15]/70 space-y-2">
              <div className="text-xs font-mono font-bold text-cyan-300 flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span>PERSISTENT AI SCHEDULER</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                Relational PostgreSQL backing for AI task schedules with background worker daemon, timezone handling, failure retry states, and automated WhatsApp/email alert delivery.
              </p>
            </div>

            <div className="p-4 rounded-lg border border-white/[0.08] bg-[#0c0e15]/70 space-y-2">
              <div className="text-xs font-mono font-bold text-cyan-300 flex items-center gap-2">
                <Code2 className="w-4 h-4 text-cyan-400" />
                <span>TYPED CONSTRAINED EXECUTION</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                Model decisions translate into validated Pydantic tool schemas before invoking internal authenticated ERP services. Eliminates raw SQL generation and mutation risks.
              </p>
            </div>

            <div className="p-4 rounded-lg border border-white/[0.08] bg-[#0c0e15]/70 space-y-2">
              <div className="text-xs font-mono font-bold text-cyan-300 flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-cyan-400" />
                <span>MULTIMODAL DOCUMENT PROCESSING</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                Automated MIME detection, PyMuPDF text extraction, and vision OCR fallbacks for operational documents, with SHA-256 payload caching to skip redundant processing.
              </p>
            </div>

            <div className="p-4 rounded-lg border border-white/[0.08] bg-[#0c0e15]/70 space-y-2">
              <div className="text-xs font-mono font-bold text-cyan-300 flex items-center gap-2">
                <Server className="w-4 h-4 text-cyan-400" />
                <span>DATA INTEGRITY SAFEGUARDS</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                Validation pipelines for Item Master sheets, process sheets, and intersite transfer notes, catching malformed business records before database commitment.
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
                    TECHNICAL DEEP DIVE // IMPLEMENTATION SCHEMATICS & PROTOCOLS
                  </span>
                  <span className="text-[11px] text-zinc-400 font-sans block mt-0.5">
                    {deepDiveOpen ? "Click to collapse detailed specs" : "Click to expand architecture schematic, scheduler tables, and async queues"}
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
                    Full Schematic
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveDeepDiveTab("scheduler")}
                    className={`min-h-[40px] px-3.5 py-1.5 rounded-lg text-xs font-mono transition-colors touch-manipulation cursor-pointer ${
                      activeDeepDiveTab === "scheduler"
                        ? "bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 font-semibold"
                        : "bg-white/[0.02] border border-white/[0.06] text-zinc-400 hover:text-white"
                    }`}
                  >
                    Scheduler Architecture
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveDeepDiveTab("tools")}
                    className={`min-h-[40px] px-3.5 py-1.5 rounded-lg text-xs font-mono transition-colors touch-manipulation cursor-pointer ${
                      activeDeepDiveTab === "tools"
                        ? "bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 font-semibold"
                        : "bg-white/[0.02] border border-white/[0.06] text-zinc-400 hover:text-white"
                    }`}
                  >
                    Tool Queue & Schemas
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveDeepDiveTab("multimodal")}
                    className={`min-h-[40px] px-3.5 py-1.5 rounded-lg text-xs font-mono transition-colors touch-manipulation cursor-pointer ${
                      activeDeepDiveTab === "multimodal"
                        ? "bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 font-semibold"
                        : "bg-white/[0.02] border border-white/[0.06] text-zinc-400 hover:text-white"
                    }`}
                  >
                    Multimodal Pipeline
                  </button>
                </div>

                {/* Tab 1: Monospace Flow Diagram */}
                {activeDeepDiveTab === "schematic" && (
                  <div className="p-4 rounded-lg border border-white/[0.08] bg-black/80 font-mono text-xs overflow-x-auto">
                    <div className="text-zinc-500 mb-2">// SPECIFICATION SCHEMATIC</div>
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
                )}

                {/* Tab 2: Scheduler Internals */}
                {activeDeepDiveTab === "scheduler" && (
                  <div className="space-y-3 font-sans text-xs sm:text-sm text-zinc-300">
                    <h3 className="font-mono text-xs font-bold text-white uppercase text-cyan-300">
                      Persistent PostgreSQL Job Queue & Worker Daemon
                    </h3>
                    <p>
                      The scheduler replaces in-memory timers with persistent relational tables tracking job definitions, schedules, next execution timestamps, and execution runs.
                    </p>
                    <ul className="space-y-1.5 pl-4 text-xs text-zinc-300 list-disc">
                      <li><strong>Schema design:</strong> Relational tables separate job configuration (cron expressions, payload, timezone) from run instances (status, started_at, completed_at, error_log).</li>
                      <li><strong>Worker loop:</strong> Asynchronous worker polls for due jobs, calculates next execution times using Python <code className="text-cyan-300 font-mono">ZoneInfo</code>, and sets status to running atomically.</li>
                      <li><strong>Fault tolerance:</strong> Unfinished jobs caused by server crashes are detected and rescheduled with retry increments.</li>
                      <li><strong>Natural language tool interface:</strong> Agents are provided typed CRUD tools (<code className="text-cyan-300 font-mono">add_cron_job</code>, <code className="text-cyan-300 font-mono">list_cron_jobs</code>, <code className="text-cyan-300 font-mono">remove_cron_job</code>) to automate report schedules directly from conversation.</li>
                    </ul>
                  </div>
                )}

                {/* Tab 3: Tool Queue & Schemas */}
                {activeDeepDiveTab === "tools" && (
                  <div className="space-y-3 font-sans text-xs sm:text-sm text-zinc-300">
                    <h3 className="font-mono text-xs font-bold text-white uppercase text-cyan-300">
                      Asynchronous Task Queue & Schema Validation
                    </h3>
                    <p>
                      Language models often emit multiple independent tool calls in a single response turn. Rather than executing them serially, the runtime employs an asynchronous task queue.
                    </p>
                    <ul className="space-y-1.5 pl-4 text-xs text-zinc-300 list-disc">
                      <li><strong>Concurrent async execution:</strong> Validated tool calls are bundled as asynchronous tasks executed concurrently via <code className="text-cyan-300 font-mono">asyncio.gather</code>, reducing tool turnaround latency.</li>
                      <li><strong>Pydantic validation layer:</strong> Tool arguments are parsed through strict Pydantic schemas. If validation fails, errors are returned back to the model for self-correction without touching backend services.</li>
                      <li><strong>Service separation:</strong> Tools call internal authenticated API services rather than executing direct SQL, keeping database transactions isolated.</li>
                    </ul>
                  </div>
                )}

                {/* Tab 4: Multimodal Pipeline */}
                {activeDeepDiveTab === "multimodal" && (
                  <div className="space-y-3 font-sans text-xs sm:text-sm text-zinc-300">
                    <h3 className="font-mono text-xs font-bold text-white uppercase text-cyan-300">
                      MIME Detection, Extraction Fallback & Result Caching
                    </h3>
                    <p>
                      Operational ERP documents (invoices, purchase orders, mill test certificates) arrive in heterogeneous formats.
                    </p>
                    <ul className="space-y-1.5 pl-4 text-xs text-zinc-300 list-disc">
                      <li><strong>MIME sniffing:</strong> Files are routed based on content signatures rather than file extensions.</li>
                      <li><strong>Hybrid text extraction:</strong> Native digital PDFs are extracted using PyMuPDF for sub-second parsing; scanned documents fall back to local vision models for OCR.</li>
                      <li><strong>Payload caching:</strong> Document hashes (SHA-256) are matched against processed records to bypass re-OCR on identical files.</li>
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
      </main>
    </div>
  );
}
