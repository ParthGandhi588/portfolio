"use client";

import React from "react";
import { ArrowDown, ArrowUpRight, FileText } from "lucide-react";
import { LinkedinIcon, GithubIcon } from "@/components/icons";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { SystemVisualization } from "./SystemVisualization";

export function Hero() {
  return (
    <section className="relative pt-24 pb-14 sm:pt-36 sm:pb-24 overflow-hidden">
      {/* Subtle top ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[450px] bg-gradient-to-b from-cyan-950/20 via-transparent to-transparent pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl space-y-5 sm:space-y-6">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/25 bg-cyan-950/25 backdrop-blur-sm max-w-full">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shrink-0" />
            <span className="text-[10px] sm:text-xs font-mono font-medium tracking-normal sm:tracking-widest text-cyan-300 uppercase truncate">
              {PERSONAL_INFO.eyebrow}
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-5xl font-semibold tracking-tight text-white leading-[1.15]">
            I build AI systems that turn complex workflows into intelligent software.
          </h1>

          {/* Supporting Copy */}
          <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-sans max-w-2xl">
            {PERSONAL_INFO.supportingCopy}
          </p>

          {/* CTAs and Direct Links with Comfortable Touch Targets (min 44px) */}
          <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4 font-mono text-xs">
            {/* Primary CTA */}
            <a
              href="#work"
              className="min-h-[44px] inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-zinc-100 text-zinc-950 font-bold hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] active:bg-zinc-200 active:opacity-90 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 touch-manipulation cursor-pointer"
            >
              <span>VIEW SYSTEMS</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </a>

            {/* Secondary CTA */}
            <a
              href="#contact"
              className="min-h-[44px] inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/[0.12] bg-white/[0.03] text-zinc-200 hover:bg-white/[0.08] hover:border-cyan-400/40 hover:text-white active:bg-white/[0.1] active:border-cyan-400 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 touch-manipulation cursor-pointer"
            >
              <span>LET&apos;S CONNECT</span>
            </a>

            <div className="h-5 w-px bg-white/[0.1] hidden sm:block mx-1" />

            {/* Resume & Profile Links */}
            <div className="flex items-center gap-2 sm:gap-3 text-zinc-400">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center gap-1.5 p-2 rounded-lg hover:text-white hover:bg-white/[0.05] transition-colors touch-manipulation"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="w-4 h-4" />
                <span className="hidden sm:inline text-xs">GitHub</span>
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center gap-1.5 p-2 rounded-lg hover:text-white hover:bg-white/[0.05] transition-colors touch-manipulation"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="w-4 h-4" />
                <span className="hidden sm:inline text-xs">LinkedIn</span>
              </a>
              <a
                href={PERSONAL_INFO.resumePdf}
                download
                className="min-h-[44px] inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-cyan-400 hover:text-cyan-300 hover:bg-cyan-950/30 transition-colors touch-manipulation font-semibold"
                aria-label="Download Resume"
              >
                <FileText className="w-4 h-4" />
                <span>Resume</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Technical System Visualization Section */}
        <div className="mt-10 sm:mt-16">
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="text-xs font-mono tracking-widest text-zinc-400 uppercase">
              ARCHITECTURAL PIPELINE // MODELS CONNECTED TO REAL SYSTEMS
            </span>
            <span className="text-[11px] font-mono text-zinc-400 hidden sm:inline">
              PARTH GANDHI · SYSTEM STACK
            </span>
          </div>
          <SystemVisualization />
        </div>
      </div>
    </section>
  );
}
