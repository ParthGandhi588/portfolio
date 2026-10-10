"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, ChevronDown, ChevronUp, Layers, Check, GitBranch } from "lucide-react";
import { PROJECTS, Project } from "@/data/portfolioData";
import { GithubIcon } from "@/components/icons";

export function FlagshipProjects() {
  const [activeSlug, setActiveSlug] = useState<string>("agentic-erp");

  return (
    <section id="systems" className="py-24 sm:py-36 border-t border-white/[0.08] relative">
      <div id="work" className="absolute -top-20 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-10 border-b border-white/[0.08] gap-6">
          <div className="space-y-2">
            <span className="text-xs font-mono text-blue-400 tracking-wider uppercase">
              INDEX 01 // FLAGSHIP PRODUCTION ARCHITECTURES
            </span>
            <h2 className="text-3xl sm:text-5xl font-sans font-light text-white tracking-tight">
              Selected <span className="font-serif italic text-white">Systems</span> & Works
            </h2>
          </div>
          <p className="text-sm text-zinc-400 font-sans max-w-md leading-relaxed">
            Production systems engineered with deterministic state boundaries, verified context retrieval, and measured performance benchmarks.
          </p>
        </div>

        {/* Master Project Rows (Editorial Monograph Index) */}
        <div className="divide-y divide-white/[0.08]">
          {PROJECTS.map((project, idx) => {
            const isOpen = activeSlug === project.slug;

            return (
              <div key={project.slug} className="py-8 sm:py-12 transition-colors">
                {/* Clickable Row Header */}
                <button
                  type="button"
                  onClick={() => setActiveSlug(isOpen ? "" : project.slug)}
                  className="w-full text-left flex flex-col md:flex-row md:items-baseline justify-between gap-4 cursor-pointer group focus-visible:outline-none"
                >
                  <div className="flex items-baseline gap-4 sm:gap-8">
                    <span className="font-mono text-sm sm:text-base text-zinc-400 group-hover:text-blue-400 transition-colors">
                      0{idx + 1}
                    </span>
                    <div>
                      <h3 className="text-2xl sm:text-4xl font-sans font-light text-white group-hover:text-blue-400 transition-colors tracking-tight">
                        {project.title}
                      </h3>
                      <p className="text-sm sm:text-base text-zinc-400 font-sans mt-1">
                        {project.tagline}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 sm:gap-6 text-xs font-mono text-zinc-400 shrink-0">
                    <span className="hidden sm:inline uppercase text-zinc-400">{project.category}</span>
                    <Link
                      href={`/work/${project.slug}`}
                      onClick={(e) => e.stopPropagation()}
                      className="px-3 py-1 rounded-full bg-blue-600/10 hover:bg-blue-600/20 text-blue-600 dark:text-blue-400 border border-blue-500/30 transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <span>Case Study</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </Link>
                    <span className="px-2.5 py-1 rounded-full border border-zinc-200 dark:border-white/[0.1] group-hover:border-zinc-400 dark:group-hover:border-white/[0.3] text-zinc-700 dark:text-zinc-300 transition-all flex items-center gap-1.5">
                      <span>{isOpen ? "Collapse" : "Overview"}</span>
                      {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </span>
                  </div>
                </button>

                {/* Expanded Monograph Detail (Zero Box Block Cards) */}
                {isOpen && (
                  <div className="mt-10 pt-10 border-t border-white/[0.06] space-y-12 animate-in fade-in duration-300">
                    {/* Architectural Principle Callout */}
                    {project.heroPrinciple && (
                      <div className="py-6 px-8 border-l-2 border-blue-500 bg-white/[0.01]">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-blue-400 block mb-1">
                          ARCHITECTURAL RULE & OPERATIONAL DOCTRINE
                        </span>
                        <p className="text-xl sm:text-2xl font-serif italic text-white leading-relaxed">
                          &quot;{project.heroPrinciple}&quot;
                        </p>
                      </div>
                    )}

                    {/* Main Technical Narrative: Problem & Decision */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                      <div className="lg:col-span-5 space-y-4">
                        <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 block">
                          SYSTEM OVERVIEW
                        </span>
                        <p className="text-base text-zinc-300 font-sans leading-relaxed">
                          {project.description}
                        </p>

                        {project.metricsNote && (
                          <div className="pt-2">
                            <span className="text-xs font-mono text-blue-400 font-medium">
                              BENCHMARK:
                            </span>
                            <p className="text-sm text-zinc-300 font-sans mt-0.5">
                              {project.metricsNote}
                            </p>
                          </div>
                        )}

                        <div className="pt-4 flex items-center gap-4 text-xs font-sans">
                          <Link
                            href={`/work/${project.slug}`}
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white text-zinc-950 font-medium hover:bg-zinc-200 transition-colors"
                          >
                            <span>Read Full Case Study</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>

                          {project.repoUrl && (
                            <a
                              href={project.repoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors editorial-link"
                            >
                              <GithubIcon className="w-3.5 h-3.5" />
                              <span>GitHub Repository</span>
                              <ArrowUpRight className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Technical Challenges & Decisions */}
                      <div className="lg:col-span-7 space-y-6">
                        <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 block">
                          ENGINEERING DECISIONS & TRADE-OFFS
                        </span>

                        <div className="space-y-6">
                          {project.challengesAndDecisions.map((item, cIdx) => (
                            <div key={cIdx} className="space-y-2 border-l border-white/[0.1] pl-5">
                              <span className="text-xs font-mono text-zinc-400 block">
                                CHALLENGE: {item.challenge}
                              </span>
                              <p className="text-sm text-zinc-300 font-sans leading-relaxed">
                                <strong className="text-white font-medium">Engineered Solution: </strong>
                                {item.decision}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Execution Pipeline Flow */}
                    <div className="space-y-4 pt-6 border-t border-white/[0.06]">
                      <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 block">
                        REQUEST LIFECYCLE & EXECUTION FLOW
                      </span>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
                        {project.architectureFlow.map((step, sIdx) => (
                          <div key={sIdx} className="space-y-1.5 border-t border-white/[0.1] pt-3">
                            <span className="text-[10px] font-mono text-blue-400 block">
                              STEP 0{sIdx + 1}
                            </span>
                            <h4 className="text-sm font-sans font-medium text-white">
                              {step.step}
                            </h4>
                            <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                              {step.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Key Features & Tech Ledger */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-6 border-t border-white/[0.06]">
                      <div className="lg:col-span-8 space-y-4">
                        <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 block">
                          PRODUCTION HIGHLIGHTS
                        </span>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {project.engineeringHighlights.map((hl, hIdx) => (
                            <li key={hIdx} className="text-xs text-zinc-300 font-sans flex items-start gap-2.5">
                              <span className="text-blue-400 mt-0.5">―</span>
                              <span className="leading-relaxed">{hl}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="lg:col-span-4 space-y-4">
                        <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 block">
                          TECHNOLOGY STACK
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((t) => (
                            <span
                              key={t}
                              className="text-xs font-mono text-zinc-300 py-1 px-2.5 rounded border border-white/[0.08] bg-white/[0.02]"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Full Case Study Action Banner */}
                    <div className="pt-6 border-t border-zinc-200 dark:border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
                      <Link
                        href={`/work/${project.slug}`}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-sans text-xs font-medium transition-all shadow-md hover:shadow-blue-500/20"
                      >
                        <span>Inspect Full Technical Monograph & Interactive n8n Pipeline</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                      {project.repoUrl && (
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-xs font-mono text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors"
                        >
                          <GithubIcon className="w-3.5 h-3.5" />
                          <span>GitHub Repository</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
