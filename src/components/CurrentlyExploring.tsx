import React from "react";
import { CURRENTLY_EXPLORING } from "@/data/portfolioData";
import { Compass, Sparkles, Radio } from "lucide-react";

export function CurrentlyExploring() {
  return (
    <section className="py-20 sm:py-28 border-t border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md border border-[#00f59b]/30 bg-[#00f59b]/10 text-xs font-mono text-[#00f59b] tracking-wider mb-3 uppercase font-semibold">
            <Radio className="w-3.5 h-3.5" />
            <span>LABORATORY // ACTIVE R&D</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white font-display">
            CURRENTLY EXPLORING
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400 leading-relaxed font-sans">
            Technical domains and methodologies actively being evaluated and benchmarked in internal laboratory experiments.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CURRENTLY_EXPLORING.map((item, idx) => (
            <div
              key={item.topic}
              className="blueprint-chassis corner-crosshair p-6 rounded-2xl group"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] mb-3">
                <span className="font-mono text-[10px] text-[#00f59b] font-bold">
                  EXP-{idx + 1}
                </span>
                <span className="w-2 h-2 rounded-full bg-[#00f59b] animate-ping" />
              </div>

              <div className="text-sm font-mono font-bold text-white flex items-center gap-2 group-hover:text-[#00f59b] transition-colors">
                {item.topic}
              </div>
              <p className="mt-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
