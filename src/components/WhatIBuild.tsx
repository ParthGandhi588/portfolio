"use client";

import React, { useState } from "react";
import { CAPABILITIES } from "@/data/portfolioData";
import { Bot, FileCode2, Server, LineChart, ArrowRight } from "lucide-react";

interface FlowStep {
  label: string;
  sub: string;
}

const CAPABILITY_FLOWS: Record<string, FlowStep[]> = {
  "01": [
    { label: "GATEWAY", sub: "FastAPI & Auth" },
    { label: "SPECIALIST", sub: "Domain Scoping" },
    { label: "vLLM ENGINE", sub: "Local Inference" },
    { label: "TYPED TOOL", sub: "Pydantic Validation" },
    { label: "APPLICATION", sub: "Deterministic State" },
  ],
  "02": [
    { label: "MANIFEST", sub: "SHA-256 + mtime" },
    { label: "AST PARSER", sub: "Tree-sitter 10L" },
    { label: "FASTEMBED", sub: "Dense Vectors" },
    { label: "PGVECTOR", sub: "HNSW Rebuild" },
    { label: "RETRIEVAL", sub: "Source Isolated" },
  ],
  "03": [
    { label: "TRIGGERS", sub: "Cron / WebSockets" },
    { label: "SCHEDULER", sub: "PostgreSQL Queue" },
    { label: "WORKER", sub: "Timezone Daemon" },
    { label: "vLLM / OCR", sub: "Local Pipelines" },
    { label: "SERVICES", sub: "Delivery & APIs" },
  ],
  "04": [
    { label: "LOGS", sub: "Attendance & Leaves" },
    { label: "120d WINDOW", sub: "90d Feat / 30d Tgt" },
    { label: "12 FEATURES", sub: "Dyadic Tensors" },
    { label: "RANDOM FOREST", sub: "80/20 Stratified" },
    { label: "CLUSTERS", sub: "Complete-Linkage" },
  ],
};

const CAPABILITY_ICONS = [Bot, FileCode2, Server, LineChart];

export function WhatIBuild() {
  const [activeCard, setActiveCard] = useState<string>("01");

  return (
    <section id="capabilities" className="py-20 sm:py-28 border-t border-white/[0.08] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 tracking-wider mb-2 uppercase">
            <span>// CAPABILITIES & FOCUS</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight text-white">
            WHAT I BUILD
          </h2>
          <p className="mt-3 text-base sm:text-lg text-zinc-400 leading-relaxed font-sans">
            Systems where models are connected to data, tools, workflows, and real software.
          </p>
        </div>

        {/* 4 Capability Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {CAPABILITIES.map((cap, idx) => {
            const Icon = CAPABILITY_ICONS[idx];
            const flow = CAPABILITY_FLOWS[cap.number] || [];
            const isActive = activeCard === cap.number;

            return (
              <div
                key={cap.number}
                onMouseEnter={() => setActiveCard(cap.number)}
                onClick={() => setActiveCard(cap.number)}
                className={`group relative p-6 sm:p-7 rounded-xl border transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                  isActive
                    ? "bg-[#0d101a] border-cyan-500/40 shadow-lg shadow-cyan-950/20 ring-1 ring-cyan-500/20"
                    : "bg-[#0d0f17]/70 border-white/[0.08] hover:bg-[#0d0f17]/95 hover:border-white/[0.18]"
                }`}
              >
                <div>
                  {/* Top Bar: Number + Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold text-zinc-400 tracking-wider">
                      {cap.number}
                    </span>
                    <div
                      className={`p-2 rounded border transition-colors ${
                        isActive
                          ? "border-cyan-500/40 bg-cyan-950/40 text-cyan-400"
                          : "border-white/[0.06] bg-white/[0.02] text-zinc-400 group-hover:text-zinc-200"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3
                    className={`text-lg font-mono font-semibold tracking-tight transition-colors ${
                      isActive ? "text-cyan-200" : "text-white group-hover:text-zinc-100"
                    }`}
                  >
                    {cap.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2.5 text-sm text-zinc-300 leading-relaxed font-sans">
                    {cap.description}
                  </p>

                  {/* Interactive Micro-Flow */}
                  <div className="mt-5 p-3 rounded-lg border border-white/[0.06] bg-black/40">
                    <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-2">
                      <span>Execution Pipeline</span>
                      <span className="text-cyan-400/80">Deterministic Flow</span>
                    </div>

                    <div className="overflow-x-auto pb-1 scrollbar-none">
                      <div className="flex items-center gap-1.5 min-w-max">
                        {flow.map((step, sIdx) => (
                          <React.Fragment key={sIdx}>
                            <div
                              className={`px-2 py-1 rounded text-center transition-all duration-200 border ${
                                isActive
                                  ? "border-cyan-500/30 bg-cyan-950/30 text-cyan-200"
                                  : "border-white/[0.06] bg-white/[0.02] text-zinc-400"
                              }`}
                            >
                              <div className="text-[10px] font-mono font-semibold tracking-wide">
                                {step.label}
                              </div>
                              <div className="text-[8px] text-zinc-400 font-mono mt-0.5">
                                {step.sub}
                              </div>
                            </div>

                            {sIdx < flow.length - 1 && (
                              <ArrowRight
                                className={`w-3 h-3 transition-colors ${
                                  isActive ? "text-cyan-400" : "text-zinc-600"
                                }`}
                              />
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Technical Bullet Details */}
                <div className="mt-6 pt-5 border-t border-white/[0.06] space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block">
                    Key Implementations
                  </span>
                  <ul className="space-y-1.5">
                    {cap.details.map((detail, dIdx) => (
                      <li
                        key={dIdx}
                        className="text-xs text-zinc-300 font-sans flex items-start gap-2"
                      >
                        <span className="text-cyan-400/80 font-mono text-[10px] mt-0.5">▹</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
