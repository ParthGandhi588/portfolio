"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Grid } from "lucide-react";
import { PROJECTS } from "@/data/portfolioData";

interface ProjectNavProps {
  currentSlug: string;
}

export function ProjectNav({ currentSlug }: ProjectNavProps) {
  const currentIndex = PROJECTS.findIndex((p) => p.slug === currentSlug);
  const prevProject =
    currentIndex > 0 ? PROJECTS[currentIndex - 1] : PROJECTS[PROJECTS.length - 1];
  const nextProject =
    currentIndex < PROJECTS.length - 1 ? PROJECTS[currentIndex + 1] : PROJECTS[0];

  return (
    <nav
      aria-label="Case Study Navigation"
      className="pt-10 sm:pt-14 border-t border-white/[0.08]"
    >
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 font-mono text-xs">
        {/* Previous Project Link */}
        <Link
          href={`/work/${prevProject.slug}`}
          className="min-h-[48px] p-3.5 rounded-lg border border-white/[0.08] bg-[#0c0e15]/80 hover:bg-white/[0.04] hover:border-cyan-500/40 text-zinc-300 hover:text-white transition-all flex items-center gap-2.5 touch-manipulation cursor-pointer select-none flex-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 group"
          aria-label={`Previous System: ${prevProject.title}`}
        >
          <ArrowLeft className="w-4 h-4 text-cyan-400 shrink-0 group-hover:-translate-x-0.5 transition-transform" />
          <div className="text-left overflow-hidden">
            <span className="text-[10px] text-zinc-500 block uppercase tracking-wider">
              PREVIOUS SYSTEM
            </span>
            <span className="font-semibold text-zinc-200 group-hover:text-cyan-200 truncate block">
              {prevProject.title}
            </span>
          </div>
        </Link>

        {/* Center: Back to Systems */}
        <Link
          href="/#work"
          className="min-h-[48px] px-4 py-3 rounded-lg border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/[0.2] text-zinc-300 hover:text-white transition-all flex items-center justify-center gap-2 touch-manipulation cursor-pointer select-none shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          aria-label="Back to All Systems on Homepage"
        >
          <Grid className="w-3.5 h-3.5 text-cyan-400" />
          <span className="tracking-wider uppercase text-[11px] font-semibold">
            ALL SYSTEMS
          </span>
        </Link>

        {/* Next Project Link */}
        <Link
          href={`/work/${nextProject.slug}`}
          className="min-h-[48px] p-3.5 rounded-lg border border-white/[0.08] bg-[#0c0e15]/80 hover:bg-white/[0.04] hover:border-cyan-500/40 text-zinc-300 hover:text-white transition-all flex items-center justify-between sm:justify-end gap-2.5 touch-manipulation cursor-pointer select-none flex-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 group"
          aria-label={`Next System: ${nextProject.title}`}
        >
          <div className="text-left sm:text-right overflow-hidden">
            <span className="text-[10px] text-zinc-500 block uppercase tracking-wider">
              NEXT SYSTEM
            </span>
            <span className="font-semibold text-zinc-200 group-hover:text-cyan-200 truncate block">
              {nextProject.title}
            </span>
          </div>
          <ArrowRight className="w-4 h-4 text-cyan-400 shrink-0 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </nav>
  );
}
