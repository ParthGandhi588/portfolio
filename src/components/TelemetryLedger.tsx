"use client";

import React from "react";

export function TelemetryLedger() {
  return (
    <section className="py-12 border-b border-zinc-200 dark:border-white/[0.08] relative z-10 bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-6 flex items-center justify-between">
          <span>VERIFIED PRODUCTION BENCHMARKS & ARCHITECTURAL HIGHLIGHTS</span>
          <span className="hidden sm:inline text-blue-500 font-mono">04 RUNTIME PROOFS</span>
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
    </section>
  );
}
