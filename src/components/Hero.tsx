"use client";

import React from "react";
import { ArrowDown, ArrowUpRight, FileText, Mail } from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { VisitorCounter } from "@/components/VisitorCounter";

export function Hero() {
  return (
    <section className="pt-32 sm:pt-44 pb-20 sm:pb-28 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Editorial Eyebrow Header */}
        <div className="flex items-center justify-between pb-6 border-b border-zinc-200 dark:border-white/[0.08] text-xs font-mono text-zinc-600 dark:text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-zinc-800 dark:text-zinc-300 font-sans tracking-wide">
              MONOGRAPH NO. 01 — PRODUCTION RUNTIMES
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-zinc-700 dark:text-zinc-400 font-sans">
              AI/ML Developer · Hexylon Analytics
            </span>
            <span className="text-zinc-400 dark:text-zinc-700 hidden sm:inline">·</span>
            <VisitorCounter variant="minimal" />
          </div>
        </div>

        {/* Large Statement Headline in Editorial Serif & Sans */}
        <div className="py-12 sm:py-20 space-y-8 max-w-5xl">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-sans font-light tracking-tight text-zinc-950 dark:text-white leading-[1.08]">
            I engineer <span className="font-serif italic font-normal text-zinc-950 dark:text-white">AI systems</span> where probabilistic models meet <span className="font-serif italic font-normal text-blue-600 dark:text-blue-400">deterministic</span> software.
          </h1>

          <p className="text-lg sm:text-2xl text-zinc-600 dark:text-zinc-400 font-sans font-normal leading-relaxed max-w-3xl">
            {PERSONAL_INFO.supportingCopy}
          </p>

          {/* Action Row */}
          <div className="pt-4 flex flex-wrap items-center gap-5 sm:gap-8 text-sm font-sans">
            <a
              href="#systems"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-sm"
            >
              <span>Explore Flagship Systems</span>
              <ArrowDown className="w-4 h-4" />
            </a>

            <a
              href={PERSONAL_INFO.resumePdf}
              download
              className="inline-flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors editorial-link py-1"
            >
              <FileText className="w-4 h-4" />
              <span>Resume (PDF)</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
            </a>

            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="inline-flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors editorial-link py-1"
            >
              <Mail className="w-4 h-4" />
              <span>{PERSONAL_INFO.email}</span>
            </a>
          </div>
        </div>

        {/* Minimalist Full-Width Telemetry Ledger (Zero Box Blocks) */}
        <div className="pt-10 border-t border-zinc-200 dark:border-white/[0.08]">
          <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-6 flex items-center justify-between">
            <span>VERIFIED PRODUCTION BENCHMARKS & ARCHITECTURAL HIGHLIGHTS</span>
            <span className="hidden sm:inline text-blue-600 dark:text-blue-400 font-mono">04 RUNTIME PROOFS</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-1.5 border-l border-zinc-300 dark:border-white/[0.1] pl-4 sm:pl-6">
              <span className="font-mono text-xs text-blue-600 dark:text-blue-400">01 / INFERENCE</span>
              <h2 className="text-lg font-sans font-medium text-zinc-950 dark:text-white">~15s → ~5s Latency</h2>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed">
                3x document workflow acceleration via local vLLM serving and async streaming.
              </p>
            </div>

            <div className="space-y-1.5 border-l border-zinc-300 dark:border-white/[0.1] pl-4 sm:pl-6">
              <span className="font-mono text-xs text-blue-600 dark:text-blue-400">02 / CODE RAG</span>
              <h2 className="text-lg font-sans font-medium text-zinc-950 dark:text-white">10 Languages AST</h2>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed">
                Language-aware Tree-sitter chunking preserving classes and functions intact.
              </p>
            </div>

            <div className="space-y-1.5 border-l border-zinc-300 dark:border-white/[0.1] pl-4 sm:pl-6">
              <span className="font-mono text-xs text-blue-600 dark:text-blue-400">03 / APPLIED ML</span>
              <h2 className="text-lg font-sans font-medium text-zinc-950 dark:text-white">120-Day Dual Window</h2>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed">
                Zero temporal data leakage with 12 dyadic behavioral interaction signals.
              </p>
            </div>

            <div className="space-y-1.5 border-l border-zinc-300 dark:border-white/[0.1] pl-4 sm:pl-6">
              <span className="font-mono text-xs text-blue-600 dark:text-blue-400">04 / ARCHITECTURE</span>
              <h2 className="text-lg font-sans font-medium text-zinc-950 dark:text-white">Deterministic State</h2>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed">
                Specialist agent boundaries with typed Pydantic tools and PostgreSQL queues.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
