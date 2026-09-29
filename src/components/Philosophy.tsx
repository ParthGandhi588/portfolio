import React from "react";
import { PHILOSOPHY } from "@/data/portfolioData";

export function Philosophy() {
  return (
    <section id="philosophy" className="py-20 sm:py-28 border-t border-white/[0.08] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 tracking-wider mb-2 uppercase">
            <span>// CORE ENGINEERING TENETS</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight text-white">
            HOW I THINK ABOUT AI SYSTEMS
          </h2>
          <p className="mt-3 text-base sm:text-lg text-zinc-400 leading-relaxed font-sans">
            Principles guiding how reasoning engines, tools, data pipelines, and systems of record interface safely.
          </p>
        </div>

        {/* 5 Distinctive Principles Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PHILOSOPHY.map((item, idx) => (
            <div
              key={item.number}
              className={`p-6 sm:p-7 rounded-xl border border-white/[0.08] bg-[#0c0e15]/80 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between ${
                idx === 0 ? "md:col-span-2 lg:col-span-1 border-cyan-500/20 bg-cyan-950/10" : ""
              }`}
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] mb-4">
                  <span className="font-mono text-xs font-bold text-cyan-400">
                    {item.number} // {item.principle}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60" />
                </div>

                <h3 className="text-base sm:text-lg font-mono font-semibold text-white leading-snug">
                  &quot;{item.statement}&quot;
                </h3>

                <p className="mt-3 text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-white/[0.04] text-[10px] font-mono text-zinc-400">
                TENET · SYSTEM DESIGN
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
