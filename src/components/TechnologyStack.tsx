import React from "react";
import { TECHNOLOGIES } from "@/data/portfolioData";
import { Cpu, Server, HardDrive, Wrench } from "lucide-react";

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  "AI / ML": Cpu,
  "Backend": Server,
  "AI Infrastructure": HardDrive,
  "Frameworks & Tools": Wrench,
};

export function TechnologyStack() {
  return (
    <section id="technology" className="py-20 sm:py-28 border-t border-white/[0.08] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 tracking-wider mb-2 uppercase">
            <span>// TOOLCHAIN & INFRASTRUCTURE</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight text-white">
            TECHNOLOGY
          </h2>
          <p className="mt-3 text-base sm:text-lg text-zinc-400 leading-relaxed font-sans">
            Organized by real system usage across model orchestration, backend services, vector storage, and data pipelines.
          </p>
        </div>

        {/* 4 Clean Columns / Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TECHNOLOGIES.map((techGroup) => {
            const Icon = CATEGORY_ICONS[techGroup.category] || Cpu;
            return (
              <div
                key={techGroup.category}
                className="p-6 rounded-xl border border-white/[0.08] bg-[#0c0e15]/70 hover:border-cyan-500/30 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2.5 pb-4 border-b border-white/[0.06] mb-4">
                    <div className="p-1.5 rounded border border-white/[0.08] bg-white/[0.02] text-cyan-400">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="font-mono text-sm font-semibold tracking-wide text-zinc-200">
                      {techGroup.category}
                    </h3>
                  </div>

                  {/* List of Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {techGroup.items.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 text-xs font-mono rounded border border-white/[0.08] bg-white/[0.02] text-zinc-300 hover:text-white hover:border-cyan-500/30 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/[0.04] text-[10px] font-mono text-zinc-400 flex items-center justify-between">
                  <span>USAGE: PRODUCTION / DEV</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
