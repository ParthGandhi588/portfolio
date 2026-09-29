"use client";

import React, { useState } from "react";
import { PHILOSOPHY } from "@/data/portfolioData";
import { ArrowRight, CheckCircle2, Cpu, Compass, RefreshCw } from "lucide-react";

export function Philosophy() {
  const [activeStage, setActiveStage] = useState<number>(0);

  const currentPrinciple = PHILOSOPHY[activeStage] || PHILOSOPHY[0];

  return (
    <section id="philosophy" className="py-20 sm:py-28 border-t border-white/[0.08] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-2xl mb-10 sm:mb-14">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 tracking-wider mb-2 uppercase">
            <span>// ENGINEERING LIFECYCLE</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight text-white">
            HOW I THINK ABOUT AI SYSTEMS
          </h2>
          <p className="mt-3 text-base sm:text-lg text-zinc-400 leading-relaxed font-sans">
            An iterative engineering lifecycle connecting raw reasoning engines to stable, evaluated production systems.
          </p>
        </div>

        {/* Interactive Lifecycle Process Stepper */}
        <div className="rounded-xl border border-white/[0.08] bg-[#0c0e15]/90 p-5 sm:p-7 shadow-xl">
          <div className="flex items-center justify-between mb-4 border-b border-white/[0.06] pb-3">
            <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
              System Engineering Progression
            </span>
            <span className="text-[10px] font-mono text-cyan-400">
              STAGE 0{activeStage + 1} OF 05 // {currentPrinciple.principle}
            </span>
          </div>

          {/* Stepper Buttons (Horizontal Pipeline) */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3">
            {PHILOSOPHY.map((item, idx) => {
              const isActive = activeStage === idx;
              const isPast = idx < activeStage;

              return (
                <button
                  key={item.number}
                  type="button"
                  onClick={() => setActiveStage(idx)}
                  onMouseEnter={() => {
                    if (typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches) {
                      setActiveStage(idx);
                    }
                  }}
                  className={`p-3 sm:p-3.5 rounded-lg text-left transition-all duration-200 border cursor-pointer min-h-[58px] touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 active:bg-cyan-900/40 ${
                    isActive
                      ? "bg-cyan-950/40 border-cyan-400/80 shadow-[0_0_15px_rgba(6,182,212,0.2)] text-white ring-1 ring-cyan-400/40"
                      : isPast
                      ? "bg-white/[0.03] border-cyan-500/20 text-zinc-300 hover:bg-white/[0.06]"
                      : "bg-white/[0.02] border-white/[0.06] text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-200"
                  }`}
                  aria-pressed={isActive}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                    <span className={isActive ? "text-cyan-300 font-bold" : "text-zinc-400"}>
                      0{idx + 1} //
                    </span>
                    {isActive ? (
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    ) : isPast ? (
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/40" />
                    ) : null}
                  </div>
                  <div
                    className={`text-xs font-mono font-bold tracking-wider ${
                      isActive ? "text-cyan-200" : "text-zinc-300"
                    }`}
                  >
                    {item.principle}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detailed Stage Deep-Dive Card */}
          <div className="mt-6 p-5 sm:p-6 rounded-lg border border-cyan-500/25 bg-black/60 relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="space-y-3 max-w-3xl">
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span className="font-bold tracking-wider uppercase">
                    TENET 0{activeStage + 1} // {currentPrinciple.principle}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-mono font-semibold text-white leading-snug">
                  &quot;{currentPrinciple.statement}&quot;
                </h3>

                <p className="text-sm text-zinc-300 leading-relaxed font-sans">
                  {currentPrinciple.description}
                </p>
              </div>

              {/* Progress visual pill */}
              <div className="sm:self-center shrink-0 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveStage((prev) => (prev > 0 ? prev - 1 : 4))}
                  className="px-3 py-1.5 rounded text-xs font-mono border border-white/[0.1] bg-white/[0.04] text-zinc-300 hover:text-white hover:bg-white/[0.08] transition-colors touch-manipulation min-h-[38px]"
                  aria-label="Previous lifecycle stage"
                >
                  Prev
                </button>
                <button
                  type="button"
                  onClick={() => setActiveStage((prev) => (prev < 4 ? prev + 1 : 0))}
                  className="px-3 py-1.5 rounded text-xs font-mono border border-cyan-500/30 bg-cyan-950/40 text-cyan-200 hover:bg-cyan-900/40 transition-colors touch-manipulation min-h-[38px]"
                  aria-label="Next lifecycle stage"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
