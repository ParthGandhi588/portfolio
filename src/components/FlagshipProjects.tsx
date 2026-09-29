"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PROJECTS, Project } from "@/data/portfolioData";
import { ArrowRight, CheckCircle2, Info, ArrowUpRight, Activity } from "lucide-react";
import { GithubIcon } from "@/components/icons";

export function FlagshipProjects() {
  // Track selected node for each project by slug
  const [selectedNodes, setSelectedNodes] = useState<Record<string, number>>({
    "agentic-erp": 2, // Default to specialist agent
    "codebase-rag": 2, // Default to tree-sitter
    "absence-risk": 3, // Default to pairwise features
  });

  const handleSelectNode = (projectSlug: string, index: number) => {
    setSelectedNodes((prev) => ({ ...prev, [projectSlug]: index }));
  };

  return (
    <section id="work" className="py-20 sm:py-28 border-t border-white/[0.08] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 tracking-wider mb-2 uppercase">
            <span>// FLAGSHIP SYSTEMS</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight text-white">
            SYSTEMS I&apos;VE BUILT
          </h2>
          <p className="mt-3 text-base sm:text-lg text-zinc-400 leading-relaxed font-sans">
            Selected systems spanning enterprise AI, code intelligence and applied machine learning.
          </p>
        </div>

        {/* Flagship Projects List */}
        <div className="space-y-12 sm:space-y-16">
          {PROJECTS.map((project, pIdx) => {
            const activeNodeIndex = selectedNodes[project.slug] ?? 0;
            const activeStep = project.architectureFlow[activeNodeIndex] || project.architectureFlow[0];

            return (
              <article
                key={project.slug}
                className="group/card rounded-xl border border-white/[0.08] bg-[#0c0e15]/90 hover:border-cyan-500/40 transition-all duration-300 p-6 sm:p-8 relative overflow-hidden shadow-xl"
              >
                {/* Subtle accent corner glow */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none -z-10 group-hover/card:bg-cyan-500/10 transition-colors duration-500" />

                {/* Header: Category + Action Buttons */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.06] pb-5">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-semibold text-cyan-400 tracking-wider uppercase">
                        {project.category}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-400 px-2 py-0.5 rounded border border-white/[0.06] bg-white/[0.02]">
                        SYSTEM 0{pIdx + 1}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-mono font-bold tracking-tight text-white mt-1 group-hover/card:text-cyan-200 transition-colors">
                      {project.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3">
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="min-h-[44px] inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono border border-white/[0.1] bg-white/[0.03] text-zinc-300 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.2] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 touch-manipulation"
                        aria-label={`${project.title} GitHub Repository`}
                      >
                        <GithubIcon className="w-4 h-4" />
                        <span>Source</span>
                        <ArrowUpRight className="w-3 h-3 text-zinc-500" />
                      </a>
                    )}

                    <Link
                      href={`/work/${project.slug}`}
                      className="min-h-[44px] inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-semibold bg-cyan-950/70 border border-cyan-500/40 text-cyan-200 hover:bg-cyan-900/60 hover:text-white hover:border-cyan-400 transition-all shadow-[0_0_15px_rgba(6,182,212,0.15)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 touch-manipulation"
                    >
                      <span>Explore System</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Project Description & Principle */}
                <div className="mt-5 space-y-3">
                  <p className="text-base text-zinc-300 leading-relaxed font-sans">
                    {project.description}
                  </p>

                  {project.heroPrinciple && (
                    <div className="p-3.5 rounded-lg border border-cyan-500/25 bg-cyan-950/20 font-mono text-xs text-cyan-300 flex items-start gap-2.5">
                      <span className="font-bold text-cyan-400 shrink-0">ARCHITECTURAL RULE //</span>
                      <span>&quot;{project.heroPrinciple}&quot;</span>
                    </div>
                  )}
                </div>

                {/* Interactive Architecture Flow Pipeline */}
                <div className="mt-7 pt-5 border-t border-white/[0.06]">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-2">
                      <Activity className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Interactive Pipeline // Tap/Hover node to inspect role</span>
                    </span>
                    <span className="text-[10px] font-mono text-zinc-400 hidden sm:inline">
                      {project.architectureFlow.length} Pipeline Stages
                    </span>
                  </div>

                  {/* Flow Steps List (Horizontal scroll on narrow mobile) */}
                  <div className="overflow-x-auto pb-2 -mx-2 px-2 scrollbar-none">
                    <div className="flex items-center gap-2 min-w-max">
                      {project.architectureFlow.map((node, nodeIdx) => {
                        const isNodeActive = activeNodeIndex === nodeIdx;
                        return (
                          <React.Fragment key={nodeIdx}>
                            <button
                              type="button"
                              onClick={() => handleSelectNode(project.slug, nodeIdx)}
                              onMouseEnter={() => handleSelectNode(project.slug, nodeIdx)}
                              className={`flex flex-col p-3 rounded-lg text-left transition-all duration-200 cursor-pointer min-w-[140px] max-w-[170px] min-h-[72px] touch-manipulation border focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 ${
                                isNodeActive
                                  ? "bg-cyan-950/40 border-cyan-400/80 shadow-[0_0_12px_rgba(6,182,212,0.2)] text-white scale-[1.02]"
                                  : "bg-black/50 border-white/[0.08] text-zinc-300 hover:bg-white/[0.05] hover:border-white/[0.18]"
                              }`}
                              aria-pressed={isNodeActive}
                              aria-label={`Inspect ${node.step}`}
                            >
                              <div className="flex items-center justify-between text-[9px] font-mono mb-1">
                                <span className={isNodeActive ? "text-cyan-300 font-bold" : "text-zinc-400"}>
                                  0{nodeIdx + 1} //
                                </span>
                                {isNodeActive && (
                                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                                )}
                              </div>
                              <span className="text-xs font-mono font-semibold truncate block">
                                {node.step}
                              </span>
                            </button>

                            {nodeIdx < project.architectureFlow.length - 1 && (
                              <span className="text-zinc-600 font-mono text-xs px-0.5">→</span>
                            )}
                          </React.Fragment>
                        );
                      })}
                    </div>
                  </div>

                  {/* Active Node Explanation Panel */}
                  <div className="mt-3 p-3.5 rounded-lg border border-cyan-500/20 bg-black/60 flex items-start gap-3">
                    <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <div className="space-y-0.5 font-sans">
                      <div className="text-xs font-mono font-semibold text-cyan-300">
                        STAGE 0{activeNodeIndex + 1}: {activeStep.step}
                      </div>
                      <p className="text-xs text-zinc-300 leading-relaxed">
                        {activeStep.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Key Features & Metrics */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {project.keyFeatures.slice(0, 4).map((feature, fIdx) => (
                    <div
                      key={fIdx}
                      className="p-3.5 rounded-lg border border-white/[0.06] bg-white/[0.02]"
                    >
                      <div className="text-xs font-mono font-semibold text-zinc-200 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        {feature.title}
                      </div>
                      <p className="mt-1 text-xs text-zinc-400 leading-relaxed font-sans">
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Metrics Note if applicable */}
                {project.metricsNote && (
                  <div className="mt-4 p-3 rounded-lg border border-emerald-500/20 bg-emerald-950/20 text-xs font-mono text-emerald-300 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                    <span>{project.metricsNote}</span>
                  </div>
                )}

                {/* Technologies Badges */}
                <div className="mt-6 pt-5 border-t border-white/[0.06] flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase mr-1 tracking-wider">
                    Technologies:
                  </span>
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-[11px] font-mono px-2.5 py-1 rounded border border-white/[0.08] bg-white/[0.02] text-zinc-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
