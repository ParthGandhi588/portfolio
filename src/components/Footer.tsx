import React from "react";
import { PERSONAL_INFO } from "@/data/portfolioData";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.08] py-12 bg-[#090a0e] text-zinc-400 font-mono text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="font-semibold text-zinc-200 tracking-wider">
            {PERSONAL_INFO.name}
          </div>
          <div className="text-[11px] text-zinc-400">
            AI/ML DEVELOPER · GENERATIVE AI
          </div>
        </div>

        <div className="flex items-center gap-6 text-[11px]">
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            GitHub
          </a>
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            LinkedIn
          </a>
          <span className="text-zinc-400">© 2026 Parth Gandhi</span>
        </div>
      </div>
    </footer>
  );
}
