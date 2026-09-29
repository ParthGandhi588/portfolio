"use client";

import React, { useState } from "react";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { Mail, FileText, ArrowUpRight, Copy, Check } from "lucide-react";
import { LinkedinIcon, GithubIcon } from "@/components/icons";

export function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(PERSONAL_INFO.email);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = PERSONAL_INFO.email;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
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

          {/* Quick email display and copy with comfortable tap target */}
          <div className="pt-2 flex justify-center">
            <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-lg border border-white/[0.1] bg-[#0c0e15]/90 font-mono text-xs sm:text-sm text-zinc-200">
              <Mail className="w-4 h-4 text-cyan-400" />
              <span>{PERSONAL_INFO.email}</span>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="min-w-[40px] min-h-[40px] flex items-center justify-center p-1.5 text-zinc-400 hover:text-white rounded-md hover:bg-white/[0.08] active:bg-white/[0.15] transition-colors ml-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 touch-manipulation cursor-pointer"
                aria-label="Copy email address"
                title="Copy email to clipboard"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Four Action Buttons with Minimum 44px (48px) touch targets */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-4 font-mono text-xs">
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="min-h-[48px] inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-zinc-100 text-zinc-950 font-bold hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] active:bg-zinc-200 active:opacity-90 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 touch-manipulation cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              <span>EMAIL DIRECTLY</span>
            </a>

            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[48px] inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-white/[0.12] bg-white/[0.03] text-zinc-200 hover:bg-white/[0.08] hover:border-cyan-400/40 hover:text-white active:bg-white/[0.1] active:border-cyan-400 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 touch-manipulation cursor-pointer"
            >
              <LinkedinIcon className="w-4 h-4 text-cyan-400" />
              <span>LINKEDIN</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
            </a>

            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[48px] inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-white/[0.12] bg-white/[0.03] text-zinc-200 hover:bg-white/[0.08] hover:border-cyan-400/40 hover:text-white active:bg-white/[0.1] active:border-cyan-400 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 touch-manipulation cursor-pointer"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GITHUB</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
            </a>

            <a
              href={PERSONAL_INFO.resumePdf}
              download
              className="min-h-[48px] inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-cyan-500/30 bg-cyan-950/30 text-cyan-200 hover:bg-cyan-900/40 hover:text-white active:bg-cyan-900/50 active:border-cyan-400 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 touch-manipulation cursor-pointer"
            >
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>DOWNLOAD RESUME</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
