import React from "react";
import { CAPABILITIES } from "@/data/portfolioData";
import { Bot, FileCode2, Server, LineChart, ArrowRight } from "lucide-react";

const CAPABILITY_ICONS = [Bot, FileCode2, Server, LineChart];

export function WhatIBuild() {
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
            Systems where models are connected to data, tools, workflows and real software.
          </p>
        </div>

        {/* 4 Capability Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {CAPABILITIES.map((cap, idx) => {
            const Icon = CAPABILITY_ICONS[idx];
            return (
              <div
                key={cap.number}
                className="group relative p-6 sm:p-7 rounded-lg border border-white/[0.08] bg-[#0d0f17]/60 hover:bg-[#0d0f17]/90 hover:border-cyan-500/30 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar: Number + Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold text-zinc-400 tracking-wider">
                      {cap.number}
                    </span>
                    <div className="p-2 rounded border border-white/[0.06] bg-white/[0.02] text-zinc-400 group-hover:text-cyan-400 group-hover:border-cyan-500/30 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-mono font-semibold tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                    {cap.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2.5 text-sm text-zinc-300 leading-relaxed font-sans">
                    {cap.description}
                  </p>
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
