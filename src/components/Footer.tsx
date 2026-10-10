"use client";

import React from "react";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { VisitorCounter } from "@/components/VisitorCounter";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SoundToggle } from "@/components/SoundProvider";

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-white/[0.08] py-14 text-zinc-600 dark:text-zinc-500 font-sans text-xs">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 flex flex-col sm:flex-row items-baseline justify-between gap-6">
        <div className="space-y-1">
          <div className="text-zinc-950 dark:text-zinc-200 font-medium tracking-tight">
            Parth Gandhi
          </div>
          <p className="text-zinc-600 dark:text-zinc-400">
            AI/ML Developer · Generative AI & Systems Engineering · {PERSONAL_INFO.location}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-5 text-zinc-700 dark:text-zinc-400">
          <VisitorCounter variant="minimal" />
          <span className="text-zinc-300 dark:text-zinc-700">·</span>
          <div className="flex items-center gap-2">
            <SoundToggle />
            <ThemeToggle />
          </div>
          <span className="text-zinc-300 dark:text-zinc-700">·</span>
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-950 dark:hover:text-white transition-colors"
          >
            GitHub
          </a>
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-950 dark:hover:text-white transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="hover:text-zinc-950 dark:hover:text-white transition-colors"
          >
            Email
          </a>
          <span className="text-zinc-300 dark:text-zinc-700">·</span>
          <span>© 2026 Parth Gandhi</span>
        </div>
      </div>
    </footer>
  );
}
