import React from "react";
import { CURRENTLY_EXPLORING } from "@/data/portfolioData";
import { Compass, Sparkles } from "lucide-react";

export function CurrentlyExploring() {
  return (
    <section className="py-16 sm:py-20 border-t border-white/[0.08] relative bg-black/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-8 sm:mb-10">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 tracking-wider mb-2 uppercase">
            <Compass className="w-3.5 h-3.5" />
            <span>CONTINUOUS ENGINEERING DEVELOPMENT</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-mono font-bold tracking-tight text-white">
            CURRENTLY EXPLORING
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
            Technical domains and methodologies I am actively studying and testing in personal lab projects to expand my engineering capabilities.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CURRENTLY_EXPLORING.map((item) => (
            <div
              key={item.topic}
              className="p-4 rounded-lg border border-white/[0.06] bg-[#0c0e15]/50 hover:border-cyan-500/30 transition-colors"
            >
              <div className="text-xs font-mono font-semibold text-zinc-200 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/80" />
                {item.topic}
              </div>
              <p className="mt-1.5 text-xs text-zinc-400 leading-relaxed font-sans">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
