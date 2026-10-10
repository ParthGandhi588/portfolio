"use client";

import React, { useState } from "react";
import { CAPABILITIES } from "@/data/portfolioData";
import { ArrowRight, Check } from "lucide-react";

const FLOWS: Record<string, string[]> = {
  "01": ["FastAPI Gateway", "Specialist Agent", "vLLM Inference", "Typed Pydantic Tools", "ERP State & Database"],
  "02": ["Git Tree Scan", "SHA-256 Manifest", "Tree-sitter AST (10L)", "FastEmbed Vectors", "pgvector HNSW Rebuild"],
  "03": ["PostgreSQL Queue", "Timezone Daemon", "Local vLLM / OCR", "PyMuPDF MIME Parser", "WebSockets Token Stream"],
  "04": ["Attendance Logs", "120-Day Partition", "12 Dyadic Features", "Random Forest (80/20)", "Complete-Linkage Clustering"],
};

export function WhatIBuild() {
  const [activeTab, setActiveTab] = useState<string>("01");
  const currentCap = CAPABILITIES.find((c) => c.number === activeTab) || CAPABILITIES[0];
  const currentFlow = FLOWS[currentCap.number] || [];

  return (
    <section id="architecture" className="py-24 sm:py-36 border-t border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-10 border-b border-white/[0.08] gap-6">
          <div className="space-y-2">
            <span className="text-xs font-mono text-blue-400 tracking-wider uppercase">
              INDEX 02 // ARCHITECTURAL SPECIALIZATION MATRIX
            </span>
            <h2 className="text-3xl sm:text-5xl font-sans font-light text-white tracking-tight">
              Four <span className="font-serif italic text-white">Engineering</span> Pillars
            </h2>
          </div>
          <p className="text-sm text-zinc-400 font-sans max-w-md leading-relaxed">
            The core competencies required to connect non-deterministic AI models with enterprise-grade production software.
          </p>
        </div>

        {/* Minimalist Tab Selectors (Zero Cards) */}
        <div className="pt-8 pb-4 flex flex-wrap gap-6 sm:gap-10 border-b border-white/[0.08] text-sm font-sans">
          {CAPABILITIES.map((cap) => {
            const isActive = activeTab === cap.number;
            return (
              <button
                key={cap.number}
                type="button"
                onClick={() => setActiveTab(cap.number)}
                className={`pb-4 transition-all cursor-pointer flex items-baseline gap-2 relative ${
                  isActive ? "text-white font-medium" : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                <span className="font-mono text-xs text-blue-400">{cap.number}</span>
                <span>{cap.title}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />
                )}
              </button>
            );
          })}
        </div>

        {/* Active Pillar Detailed Breakdown */}
        <div className="py-12 space-y-12 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Narrative */}
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 block">
                CORE DOCTRINE
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif italic text-white leading-snug">
                {currentCap.description}
              </h3>
            </div>

            {/* Right Verified Production Details */}
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 block">
                PRODUCTION IMPLEMENTATION DELIVERABLES
              </span>
              <div className="space-y-4">
                {currentCap.details.map((detail, dIdx) => (
                  <div key={dIdx} className="flex items-start gap-4 border-l border-white/[0.1] pl-5 py-1">
                    <span className="font-mono text-xs text-blue-400 mt-0.5">0{dIdx + 1}</span>
                    <p className="text-sm sm:text-base text-zinc-300 font-sans leading-relaxed">
                      {detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Linear Execution Timeline (Minimalist Hairlines, No Box Blocks) */}
          <div className="pt-8 border-t border-white/[0.06] space-y-4">
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 block">
              DETERMINISTIC PIPELINE ROUTING
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 pt-2">
              {currentFlow.map((step, idx) => (
                <div key={idx} className="border-t border-white/[0.1] pt-3 space-y-1">
                  <span className="text-[10px] font-mono text-blue-400 block">
                    STAGE 0{idx + 1}
                  </span>
                  <span className="text-xs font-sans font-medium text-white block">
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
