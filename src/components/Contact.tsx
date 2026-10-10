"use client";

import React, { useState } from "react";
import { ArrowUpRight, Check, Copy, FileText, Mail, Send } from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { LinkedinIcon, GithubIcon } from "@/components/icons";

export function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(PERSONAL_INFO.email);
      } else {
        const ta = document.createElement("textarea");
        ta.value = PERSONAL_INFO.email;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section id="contact" className="py-24 sm:py-36 border-t border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="max-w-4xl space-y-10">
          <div className="space-y-2">
            <span className="text-xs font-mono text-blue-400 tracking-wider uppercase">
              INDEX 08 // DIRECT DISPATCH & INQUIRY
            </span>
            <h2 className="text-4xl sm:text-6xl font-sans font-light text-white tracking-tight leading-tight">
              Have an AI system <span className="font-serif italic text-white">worth building?</span> Let&apos;s connect.
            </h2>
          </div>

          <p className="text-base sm:text-xl text-zinc-400 font-sans leading-relaxed max-w-2xl">
            Interested in AI systems engineering, Generative AI agent architectures, and production machine learning roles.
          </p>

          {/* Large Editorial Email Action (Zero Box Card) */}
          <div className="pt-4 flex flex-col sm:flex-row sm:items-center gap-6">
            <button
              type="button"
              onClick={handleCopy}
              className="text-2xl sm:text-3xl font-sans font-light text-white hover:text-blue-400 transition-colors flex items-center gap-3 cursor-pointer group text-left"
              title="Click to copy email address"
            >
              <span className="underline underline-offset-8 decoration-white/[0.2] group-hover:decoration-blue-400">
                {PERSONAL_INFO.email}
              </span>
              <span className="text-xs font-mono px-2.5 py-1 rounded-full border border-white/[0.1] text-zinc-400 group-hover:text-blue-400 transition-colors">
                {copied ? "COPIED TO CLIPBOARD" : "CLICK TO COPY"}
              </span>
            </button>
          </div>

          {/* Direct Line Links */}
          <div className="pt-8 border-t border-white/[0.08] flex flex-wrap items-center gap-8 text-sm font-sans">
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white text-zinc-950 font-medium hover:bg-zinc-200 transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Direct Email</span>
            </a>

            <a
              href={PERSONAL_INFO.resumePdf}
              download
              className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors editorial-link py-1"
            >
              <FileText className="w-4 h-4" />
              <span>Resume (PDF)</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
            </a>

            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors editorial-link py-1"
            >
              <LinkedinIcon className="w-4 h-4" />
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
            </a>

            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors editorial-link py-1"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
