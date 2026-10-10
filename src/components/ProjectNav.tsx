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
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 font-sans text-xs">
        {/* Previous Project Link */}
        <Link
          href={`/work/${prevProject.slug}`}
          className="py-3 px-4 rounded border border-white/[0.08] hover:border-white/[0.25] text-zinc-300 hover:text-white transition-all flex items-center gap-3 touch-manipulation cursor-pointer flex-1 group"
          aria-label={`Previous System: ${prevProject.title}`}
        >
          <ArrowLeft className="w-4 h-4 text-blue-400 shrink-0 group-hover:-translate-x-1 transition-transform" />
          <div className="text-left overflow-hidden">
            <span className="text-[10px] font-mono text-zinc-400 block uppercase tracking-wider">
              PREVIOUS SYSTEM
            </span>
            <span className="font-medium text-white truncate block">
              {prevProject.title}
            </span>
          </div>
        </Link>

        {/* Center: Back to Systems */}
        <Link
          href="/#systems"
          className="py-3 px-4 rounded border border-white/[0.08] hover:border-white/[0.25] text-zinc-300 hover:text-white transition-all flex items-center justify-center gap-2 touch-manipulation cursor-pointer shrink-0"
          aria-label="Back to All Systems on Homepage"
        >
          <Grid className="w-3.5 h-3.5 text-blue-400" />
          <span className="tracking-wider uppercase text-[11px] font-mono font-medium">
            INDEX
          </span>
        </Link>

        {/* Next Project Link */}
        <Link
          href={`/work/${nextProject.slug}`}
          className="py-3 px-4 rounded border border-white/[0.08] hover:border-white/[0.25] text-zinc-300 hover:text-white transition-all flex items-center justify-between sm:justify-end gap-3 touch-manipulation cursor-pointer flex-1 group"
          aria-label={`Next System: ${nextProject.title}`}
        >
          <div className="text-left sm:text-right overflow-hidden">
            <span className="text-[10px] font-mono text-zinc-400 block uppercase tracking-wider">
              NEXT SYSTEM
            </span>
            <span className="font-medium text-white truncate block">
              {nextProject.title}
            </span>
          </div>
          <ArrowRight className="w-4 h-4 text-blue-400 shrink-0 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </nav>
  );
}
