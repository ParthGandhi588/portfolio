"use client";

import React, { useState } from "react";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { Mail, FileText, ArrowUpRight, Copy, Check } from "lucide-react";
import { LinkedinIcon, GithubIcon } from "@/components/icons";

export function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-20 sm:py-28 border-t border-white/[0.08] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-950/20 text-cyan-300 font-mono text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>OPEN TO AI ENGINEERING OPPORTUNITIES</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-mono font-bold tracking-tight text-white leading-tight">
            HAVE AN AI SYSTEM WORTH BUILDING?
          </h2>

          <p className="text-base sm:text-lg text-zinc-300 font-sans max-w-xl mx-auto leading-relaxed">
            I&apos;m interested in AI engineering, Generative AI and applied ML opportunities.
          </p>

          {/* Quick email display and copy */}
          <div className="pt-2 flex justify-center">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-lg border border-white/[0.1] bg-[#0c0e15]/80 font-mono text-xs sm:text-sm text-zinc-200">
              <Mail className="w-4 h-4 text-cyan-400" />
              <span>{PERSONAL_INFO.email}</span>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="p-1 text-zinc-400 hover:text-white rounded hover:bg-white/[0.08] transition-colors ml-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400"
                aria-label="Copy email address"
                title="Copy email to clipboard"
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>

          {/* Four Action Buttons */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-4 font-mono text-xs">
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="inline-flex items-center gap-2 px-5 py-3 rounded bg-zinc-100 text-zinc-950 font-bold hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              <Mail className="w-4 h-4" />
              <span>EMAIL DIRECTLY</span>
            </a>

            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded border border-white/[0.12] bg-white/[0.03] text-zinc-200 hover:bg-white/[0.08] hover:border-cyan-400/40 hover:text-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              <LinkedinIcon className="w-4 h-4 text-cyan-400" />
              <span>LINKEDIN</span>
              <ArrowUpRight className="w-3 h-3 text-zinc-500" />
            </a>

            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded border border-white/[0.12] bg-white/[0.03] text-zinc-200 hover:bg-white/[0.08] hover:border-cyan-400/40 hover:text-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GITHUB</span>
              <ArrowUpRight className="w-3 h-3 text-zinc-500" />
            </a>

            <a
              href={PERSONAL_INFO.resumePdf}
              download
              className="inline-flex items-center gap-2 px-5 py-3 rounded border border-cyan-500/30 bg-cyan-950/30 text-cyan-300 hover:bg-cyan-900/40 hover:text-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>DOWNLOAD RESUME</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
