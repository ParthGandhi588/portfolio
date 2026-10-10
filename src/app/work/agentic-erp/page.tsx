"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  ShieldCheck,
  FileCheck,
  Server,
  Code2,
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
  const [activeStageIndex, setActiveStageIndex] = useState(2);
  const [deepDiveOpen, setDeepDiveOpen] = useState(true);
  const [activeDeepDiveTab, setActiveDeepDiveTab] = useState<"schematic" | "scheduler" | "tools" | "multimodal">("schematic");

  const activeStage = ERP_STAGES[activeStageIndex];

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
              CASE STUDY 01 // ENTERPRISE AI ARCHITECTURE
            </span>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-sans font-light tracking-tight text-white leading-tight">
              Agentic <span className="font-serif italic text-white">ERP</span>
            </h1>
            <p className="text-lg sm:text-2xl text-zinc-400 font-sans font-normal leading-relaxed max-w-3xl">
              An enterprise AI layer connecting operational workflows through specialist agents, typed Python tools, and persistent scheduling.
            </p>
          </div>

          {/* Architectural Rule Callout */}
          <div className="py-6 px-8 border-l-2 border-blue-500 bg-white/[0.01]">
            <span className="text-[10px] font-mono uppercase tracking-wider text-blue-400 block mb-1">
              CORE ARCHITECTURAL DOCTRINE
            </span>
            <p className="text-xl sm:text-2xl font-serif italic text-white leading-relaxed">
              &quot;The LLM plans. Python executes. The ERP remains the system of record.&quot;
            </p>
          </div>

          {/* Executive Telemetry Ledger (Zero Box Cards) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 pt-4">
            <div className="space-y-1 border-l border-white/[0.1] pl-5">
              <span className="text-[10px] font-mono text-zinc-400 uppercase">RUNTIME</span>
              <div className="text-base font-sans font-medium text-white">Specialist Agents</div>
              <p className="text-xs text-zinc-400 font-sans">Scoped domain boundaries</p>
            </div>
            <div className="space-y-1 border-l border-white/[0.1] pl-5">
              <span className="text-[10px] font-mono text-zinc-400 uppercase">EXECUTION</span>
              <div className="text-base font-sans font-medium text-white">Typed Python Tools</div>
              <p className="text-xs text-zinc-400 font-sans">Pydantic validation layers</p>
            </div>
            <div className="space-y-1 border-l border-white/[0.1] pl-5">
              <span className="text-[10px] font-mono text-zinc-400 uppercase">INFERENCE</span>
              <div className="text-base font-sans font-medium text-white">Local vLLM Engine</div>
              <p className="text-xs text-zinc-400 font-sans">Zero external network hops</p>
            </div>
            <div className="space-y-1 border-l border-white/[0.1] pl-5">
              <span className="text-[10px] font-mono text-blue-400 uppercase">MEASURED LATENCY</span>
              <div className="text-base font-sans font-medium text-blue-400">~15s → ~5s</div>
              <p className="text-xs text-zinc-400 font-sans">3x workflow acceleration</p>
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
                EXECUTION BOUNDARY
              </span>
              <h2 className="text-2xl sm:text-3xl font-sans font-light text-white">
                Request Lifecycle & Execution Pipeline
              </h2>
            </div>
            <span className="text-xs font-mono text-zinc-400">
              STAGE 0{activeStageIndex + 1} OF 0{ERP_STAGES.length}
            </span>
          </div>

          <p className="text-sm text-zinc-400 font-sans leading-relaxed max-w-3xl">
            The language model is never granted direct mutation rights. Reasoning plans are parsed into strongly typed parameter schemas and dispatched asynchronously in pure Python.
          </p>

          {/* Minimalist Horizontal Stage Stepper (Zero Box Cards) */}
          <div className="space-y-6">
            <div className="flex flex-wrap gap-4 sm:gap-6 border-b border-white/[0.08] pb-3 text-xs font-mono">
              {ERP_STAGES.map((stage, idx) => {
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
        {/* LEVEL 3: ARCHITECTURAL REALITY: PRODUCTION VS EXPERIMENTAL                */}
        {/* ========================================================================= */}
        <section className="space-y-8 pb-16 border-b border-white/[0.08]">
          <div className="space-y-1">
            <span className="text-xs font-mono text-blue-400 tracking-wider uppercase">
              ARCHITECTURAL EVALUATION
            </span>
            <h2 className="text-2xl sm:text-3xl font-sans font-light text-white">
              Production Runtime vs Experimental Supervisor
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-3 border-l border-white/[0.1] pl-6">
              <span className="text-xs font-mono text-blue-400 uppercase tracking-wider block">
                PRODUCTION RUNTIME // DEPLOYED
              </span>
              <h3 className="text-lg font-sans font-medium text-white">
                Specialist-Agent Architecture with Async Queue
              </h3>
              <p className="text-sm text-zinc-400 font-sans leading-relaxed">
                Each domain (Purchase, Stores, Planning, QC, Database) operates as an isolated specialist agent. Agents utilize scoped system prompts and bounded tools. Multiple tool calls emitted in a single turn are dispatched concurrently via an asynchronous task queue.
              </p>
            </div>

            <div className="space-y-3 border-l border-white/[0.1] pl-6">
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">
                EVALUATED PROTOTYPE // FEATURE BRANCH
              </span>
              <h3 className="text-lg font-sans font-medium text-white">
                Universal Leader Supervisor-Worker Team
              </h3>
              <p className="text-sm text-zinc-400 font-sans leading-relaxed">
                Evaluated a supervisor-worker team for cross-departmental coordination. A leader agent breaks down complex requests and delegates subtasks to specialist workers. Employs lazy schema context loading to avoid prompt token explosion.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* LEVEL 4: CORE SUBSYSTEMS & MEASURED OUTCOMES                              */}
        {/* ========================================================================= */}
        <section className="space-y-10 pb-16 border-b border-white/[0.08]">
          <div className="space-y-1">
            <span className="text-xs font-mono text-blue-400 tracking-wider uppercase">
              SUBSYSTEM SPECIFICATIONS
            </span>
            <h2 className="text-2xl sm:text-3xl font-sans font-light text-white">
              Measured Subsystems & Optimizations
            </h2>
          </div>

          {/* Measured Latency Highlight */}
          <div className="py-6 px-8 border-l-2 border-blue-500 bg-white/[0.01] space-y-2">
            <span className="text-xs font-mono text-blue-400 uppercase tracking-wider block">
              EMPIRICAL BENCHMARK: ~15s → ~5s WORKFLOW ACCELERATION
            </span>
            <p className="text-sm sm:text-base text-zinc-300 font-sans leading-relaxed max-w-3xl">
              Within a multi-step ERP document parsing workflow, sequential cloud API calls originally produced latencies around 15 seconds due to network round-trips and cold starts. By configuring local <strong>vLLM model serving</strong> (hosting Qwen at temperature zero) and token streaming over native WebSockets, total workflow completion time was reduced to approximately <strong>5 seconds</strong>.
            </p>
          </div>

          {/* 4 Crisp Subsystem Specifications */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            <div className="space-y-2 border-l border-white/[0.1] pl-5">
              <div className="text-xs font-mono text-blue-400 uppercase">
                01 / PERSISTENT AI SCHEDULER
              </div>
              <h4 className="text-base font-sans font-medium text-white">
                PostgreSQL Queue with Background Daemons
              </h4>
              <p className="text-sm text-zinc-400 font-sans leading-relaxed">
                Relational PostgreSQL backing for AI task schedules with background worker daemon, timezone handling, failure retry states, and automated WhatsApp/email alert delivery.
              </p>
            </div>

            <div className="space-y-2 border-l border-white/[0.1] pl-5">
              <div className="text-xs font-mono text-blue-400 uppercase">
                02 / TYPED CONSTRAINED EXECUTION
              </div>
              <h4 className="text-base font-sans font-medium text-white">
                Pydantic Validation & Task Queues
              </h4>
              <p className="text-sm text-zinc-400 font-sans leading-relaxed">
                Model decisions translate into validated Pydantic tool schemas before invoking internal authenticated ERP services. Eliminates raw SQL generation and database mutation risks.
              </p>
            </div>

            <div className="space-y-2 border-l border-white/[0.1] pl-5">
              <div className="text-xs font-mono text-blue-400 uppercase">
                03 / MULTIMODAL INGESTION
              </div>
              <h4 className="text-base font-sans font-medium text-white">
                MIME Detection & OCR Caching
              </h4>
              <p className="text-sm text-zinc-400 font-sans leading-relaxed">
                Automated MIME detection, PyMuPDF text extraction, and vision OCR fallbacks for operational documents, with SHA-256 payload caching to skip redundant processing.
              </p>
            </div>

            <div className="space-y-2 border-l border-white/[0.1] pl-5">
              <div className="text-xs font-mono text-blue-400 uppercase">
                04 / DATA INTEGRITY SAFEGUARDS
              </div>
              <h4 className="text-base font-sans font-medium text-white">
                Intersite Transfer & Master Sheet Validation
              </h4>
              <p className="text-sm text-zinc-400 font-sans leading-relaxed">
                Validation pipelines for Item Master sheets, process sheets, and intersite transfer notes, catching malformed business records before database commitment.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* LEVEL 5: EXPANDABLE TECHNICAL DEEP DIVE (Zero Box Cards)                   */}
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
                  Full Schematic
                </button>
                <button
                  type="button"
                  onClick={() => setActiveDeepDiveTab("scheduler")}
                  className={`pb-2 cursor-pointer transition-colors ${
                    activeDeepDiveTab === "scheduler" ? "text-white font-medium border-b border-blue-500" : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  Scheduler Architecture
                </button>
                <button
                  type="button"
                  onClick={() => setActiveDeepDiveTab("tools")}
                  className={`pb-2 cursor-pointer transition-colors ${
                    activeDeepDiveTab === "tools" ? "text-white font-medium border-b border-blue-500" : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  Tool Queue & Schemas
                </button>
                <button
                  type="button"
                  onClick={() => setActiveDeepDiveTab("multimodal")}
                  className={`pb-2 cursor-pointer transition-colors ${
                    activeDeepDiveTab === "multimodal" ? "text-white font-medium border-b border-blue-500" : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  Multimodal Pipeline
                </button>
              </div>

              {activeDeepDiveTab === "schematic" && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-zinc-500">
                    <span>// INTERACTIVE NODE WORKFLOW GRAPH</span>
                    <span className="text-blue-400">CLICK ANY NODE TO INSPECT SPECS</span>
                  </div>
                  <N8nFlowCanvas systemSlug="agentic-erp" />
                </div>
              )}

              {activeDeepDiveTab === "scheduler" && (
                <div className="space-y-4 font-sans text-sm text-zinc-300 leading-relaxed max-w-3xl">
                  <h4 className="font-mono text-xs uppercase text-blue-400">
                    Persistent PostgreSQL Job Queue & Worker Daemon
                  </h4>
                  <p>
                    The scheduler replaces in-memory timers with persistent relational tables tracking job definitions, schedules, next execution timestamps, and execution runs.
                  </p>
                  <ul className="space-y-2 pl-4 text-xs text-zinc-400 list-disc">
                    <li><strong>Schema design:</strong> Relational tables separate job configuration (cron expressions, payload, timezone) from run instances (status, started_at, completed_at, error_log).</li>
                    <li><strong>Worker loop:</strong> Asynchronous worker polls for due jobs, calculates next execution times using Python <code className="text-blue-400 font-mono">ZoneInfo</code>, and sets status to running atomically.</li>
                    <li><strong>Fault tolerance:</strong> Unfinished jobs caused by server crashes are detected and rescheduled with retry increments.</li>
                    <li><strong>Natural language tool interface:</strong> Agents are provided typed CRUD tools (<code className="text-blue-400 font-mono">add_cron_job</code>, <code className="text-blue-400 font-mono">list_cron_jobs</code>, <code className="text-blue-400 font-mono">remove_cron_job</code>) to automate report schedules directly from conversation.</li>
                  </ul>
                </div>
              )}

              {activeDeepDiveTab === "tools" && (
                <div className="space-y-4 font-sans text-sm text-zinc-300 leading-relaxed max-w-3xl">
                  <h4 className="font-mono text-xs uppercase text-blue-400">
                    Asynchronous Task Queue & Schema Validation
                  </h4>
                  <p>
                    Language models often emit multiple independent tool calls in a single response turn. Rather than executing them serially, the runtime employs an asynchronous task queue.
                  </p>
                  <ul className="space-y-2 pl-4 text-xs text-zinc-400 list-disc">
                    <li><strong>Concurrent async execution:</strong> Validated tool calls are bundled as asynchronous tasks executed concurrently via <code className="text-blue-400 font-mono">asyncio.gather</code>, reducing tool turnaround latency.</li>
                    <li><strong>Pydantic validation layer:</strong> Tool arguments are parsed through strict Pydantic schemas. If validation fails, errors are returned back to the model for self-correction without touching backend services.</li>
                    <li><strong>Service separation:</strong> Tools call internal authenticated API services rather than executing direct SQL, keeping database transactions isolated.</li>
                  </ul>
                </div>
              )}

              {activeDeepDiveTab === "multimodal" && (
                <div className="space-y-4 font-sans text-sm text-zinc-300 leading-relaxed max-w-3xl">
                  <h4 className="font-mono text-xs uppercase text-blue-400">
                    MIME Detection, Extraction Fallback & Result Caching
                  </h4>
                  <p>
                    Operational ERP documents (invoices, purchase orders, mill test certificates) arrive in heterogeneous formats.
                  </p>
                  <ul className="space-y-2 pl-4 text-xs text-zinc-400 list-disc">
                    <li><strong>MIME sniffing:</strong> Files are routed based on content signatures rather than file extensions.</li>
                    <li><strong>Hybrid text extraction:</strong> Native digital PDFs are extracted using PyMuPDF for sub-second parsing; scanned documents fall back to local vision models for OCR.</li>
                    <li><strong>Payload caching:</strong> Document hashes (SHA-256) are matched against processed records to bypass re-OCR on identical files.</li>
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
        <ProjectNav currentSlug="agentic-erp" />
      </main>
    </div>
  );
}
