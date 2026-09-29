"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Activity, Info, ArrowRight } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { PROJECTS } from "@/data/portfolioData";

const ERP_STAGES = [
  {
    step: "USER",
    title: "User / Workflow Trigger",
    desc: "Natural language business queries, invoice documents, or automated scheduler triggers.",
  },
  {
    step: "FASTAPI",
    title: "FastAPI / WebSocket Server",
    desc: "Session validation, MIME detection, rate-limiting, and asynchronous token streaming.",
  },
  {
    step: "SPECIALIST AGENT",
    title: "Specialist Agent",
    desc: "Domain-specific agent with scoped instructions, role boundaries, and restricted tool bindings.",
  },
  {
    step: "LLM",
    title: "LLM Reasoning Engine",
    desc: "Served via local vLLM to formulate structured tool invocation parameters.",
  },
  {
    step: "TOOL CALL",
    title: "Tool Call Schema",
    desc: "Strict Pydantic JSON schema output representing deterministic action intent.",
  },
  {
    step: "PYTHON EXECUTION",
    title: "Typed Python Tools",
    desc: "LLM decisions are translated into controlled Python operations with error handling.",
  },
  {
    step: "ERP / DATABASE",
    title: "Enterprise Systems",
    desc: "Deterministic execution against the enterprise system of record and database persistence.",
  },
];

export default function AgenticErpPage() {
  const project = PROJECTS.find((p) => p.slug === "agentic-erp")!;
  const [activeStageIndex, setActiveStageIndex] = useState(2); // Default to SPECIALIST AGENT
  const [signalIndex, setSignalIndex] = useState(0);

  // Subtle signal loop
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
            <span className="text-zinc-500 uppercase tracking-wider block text-[10px]">Architecture</span>
            <span className="text-zinc-200 mt-1 block">Specialist Agents</span>
          </div>
          <div>
            <span className="text-zinc-500 uppercase tracking-wider block text-[10px]">Execution Layer</span>
            <span className="text-zinc-200 mt-1 block">FastAPI / Typed Tools</span>
          </div>
          <div>
            <span className="text-zinc-500 uppercase tracking-wider block text-[10px]">Model Serving</span>
            <span className="text-zinc-200 mt-1 block">vLLM Engine</span>
          </div>
          <div>
            <span className="text-zinc-500 uppercase tracking-wider block text-[10px]">Persistence</span>
            <span className="text-zinc-200 mt-1 block">PostgreSQL / MongoDB</span>
          </div>
        </section>

        {/* 1. Problem Statement */}
        <section className="space-y-4">
          <h2 className="text-lg sm:text-xl font-mono font-bold text-white tracking-wide border-b border-white/[0.08] pb-2">
            01 // PROBLEM & CONSTRAINTS
          </h2>
          <div className="text-sm sm:text-base text-zinc-300 space-y-3 leading-relaxed font-sans">
            <p>
              Enterprise ERP software is burdened with hundreds of fragmented forms, transaction screens,
              and tabular interfaces. While generative AI enables natural language interfaces, unconstrained
              generalist agent implementations create severe operational hazards:
            </p>
            <ul className="space-y-2 pl-2 sm:pl-4 text-xs sm:text-sm text-zinc-300">
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 font-mono text-xs mt-0.5">▹</span>
                <span><strong>Unchecked Mutations:</strong> LLMs attempting direct database writes can corrupt transactional balance tables.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 font-mono text-xs mt-0.5">▹</span>
                <span><strong>Unbounded Reasoning:</strong> Broad &quot;do everything&quot; generalist agents wander into irrelevant domains and fail on specialized enterprise workflows.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 font-mono text-xs mt-0.5">▹</span>
                <span><strong>High Latency:</strong> Unoptimized multi-step model calls can take 15–20 seconds per user turn, making interactive operational software frustrating.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* 2. Interactive Architecture Flow */}
        <section className="space-y-5">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-2">
            <h2 className="text-lg sm:text-xl font-mono font-bold text-white tracking-wide">
              02 // INTERACTIVE SYSTEM ARCHITECTURE
            </h2>
            <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-400">
              <Activity className="w-3.5 h-3.5 animate-pulse" />
              <span className="text-[11px] hidden sm:inline">LIVE SIGNAL PROGRESSION</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
            Rather than granting an LLM direct mutation rights, the system employs a specialist-agent architecture.
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
                        className={`p-3 rounded-lg text-left transition-all duration-200 border cursor-pointer min-w-[135px] max-w-[160px] min-h-[72px] touch-manipulation focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 ${
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

          {/* ASCII / Monospace Flow Diagram (with overflow-x-auto & touch-pan-x) */}
          <div className="p-4 sm:p-5 rounded-lg border border-white/[0.08] bg-black/60 font-mono text-xs overflow-x-auto touch-pan-x">
            <div className="text-zinc-500 mb-2">// FULL SPECIFICATION SCHEMATIC</div>
            <pre className="text-cyan-300 text-[11px] leading-snug">
{`+-----------------------------------------------------------------------+
|  USER (Browser / WebSockets / Document Ingestion)                    |
+-----------------------------------+-----------------------------------+
                                    |
                                    v
+-----------------------------------------------------------------------+
|  FASTAPI GATEWAY & WEBSOCKET SERVER                                  |
|  - Session Validation & MIME Routing                                 |
|  - Rate-limiting & Asynchronous Token Streaming                      |
+-----------------------------------+-----------------------------------+
                                    |
                                    v
+-----------------------------------------------------------------------+
|  SPECIALIST AGENT DISPATCHER                                         |
|  - Intent classification & Domain Scoping                            |
|  - Injects scoped role prompt & typed tool schemas                   |
+-----------------------------------+-----------------------------------+
                                    |
                                    v
+-----------------------------------------------------------------------+
|  LLM REASONING LAYER (Served via vLLM)                                |
|  - Analyzes context & generates typed tool invocation plan            |
+-----------------------------------+-----------------------------------+
                                    |
                                    v
+-----------------------------------------------------------------------+
|  TYPED PYTHON TOOLS (Execution Boundary)                             |
|  - Strict Pydantic parameter schema validation                        |
|  - Error trapping & transactional safeguards                         |
+-----------------------------------+-----------------------------------+
                                    |
                                    v
+-----------------------------------------------------------------------+
|  ENTERPRISE ERP SERVICES & STORAGE                                   |
|  - PostgreSQL / MongoDB / File Store                                 |
|  - System of Record State Update & Webhook Notifications              |
+-----------------------------------------------------------------------+`}
            </pre>
          </div>
        </section>

        {/* 3. Core Capabilities */}
        <section className="space-y-4">
          <h2 className="text-lg sm:text-xl font-mono font-bold text-white tracking-wide border-b border-white/[0.08] pb-2">
            03 // CORE CAPABILITIES
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {project.keyFeatures.map((feat, idx) => (
              <div key={idx} className="p-4 rounded-lg border border-white/[0.08] bg-[#0c0e15]/70 space-y-2">
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

        {/* 4. Engineering Optimization: 15s to 5s */}
        <section className="space-y-4">
          <h2 className="text-lg sm:text-xl font-mono font-bold text-white tracking-wide border-b border-white/[0.08] pb-2">
            04 // WORKFLOW LATENCY OPTIMIZATION
          </h2>
          <div className="p-5 rounded-lg border border-emerald-500/20 bg-emerald-950/15 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-semibold">
              <CheckCircle2 className="w-4 h-4" />
              <span>MEASURED WORKFLOW IMPROVEMENT: ~15s → ~5s</span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
              Within a high-frequency ERP document analysis workflow, sequential inference and unoptimized token handling
              originally produced end-to-end execution latencies around 15 seconds. By orchestrating inference with local
              <strong> vLLM serving</strong> and asynchronous WebSocket streaming, the execution duration was
              brought down to approximately <strong>5 seconds</strong>.
            </p>
            <div className="text-[11px] font-mono text-zinc-400 pt-1">
              * Note: Documented engineering result for the specific model serving workflow; not presented as an unverified company-wide benchmark.
            </div>
          </div>
        </section>

        {/* 5. Challenges & Design Decisions */}
        <section className="space-y-4">
          <h2 className="text-lg sm:text-xl font-mono font-bold text-white tracking-wide border-b border-white/[0.08] pb-2">
            05 // KEY DESIGN DECISIONS
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
