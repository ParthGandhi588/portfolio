import React from "react";
import { ABOUT_TEXT, PERSONAL_INFO } from "@/data/portfolioData";
import { MapPin, Terminal, CheckCircle2 } from "lucide-react";

export function About() {
  const paragraphs = ABOUT_TEXT.split("\n\n");

  return (
    <section id="about" className="py-20 sm:py-28 border-t border-white/[0.08] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
          {/* Header Column */}
          <div className="lg:col-span-4 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 tracking-wider uppercase">
              <span>// BACKGROUND</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight text-white">
              ABOUT
            </h2>
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 pt-1">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>Based in {PERSONAL_INFO.location}</span>
            </div>
          </div>

          {/* Copy Column */}
          <div className="lg:col-span-8 p-6 sm:p-8 rounded-xl border border-white/[0.08] bg-[#0c0e15]/70 space-y-5">
            {paragraphs.map((para, idx) => (
              <p
                key={idx}
                className="text-base sm:text-lg text-zinc-300 leading-relaxed font-sans"
              >
                {para}
              </p>
            ))}

            <div className="pt-4 border-t border-white/[0.06] flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400">
              <div className="flex items-center gap-1.5 text-zinc-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Enterprise Systems Focus</span>
              </div>
              <span className="text-zinc-600">·</span>
              <div className="flex items-center gap-1.5 text-zinc-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Deterministic Tool Execution</span>
              </div>
              <span className="text-zinc-600">·</span>
              <div className="flex items-center gap-1.5 text-zinc-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Production-Oriented Backend</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
