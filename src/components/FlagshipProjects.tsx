import React from "react";
import Link from "next/link";
import { PROJECTS } from "@/data/portfolioData";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { GithubIcon } from "@/components/icons";

export function FlagshipProjects() {
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
          {PROJECTS.map((project) => (
            <article
              key={project.slug}
              className="rounded-xl border border-white/[0.08] bg-[#0c0e15]/80 hover:border-cyan-500/30 transition-all duration-300 p-6 sm:p-8 relative overflow-hidden shadow-xl"
            >
              {/* Subtle accent corner glow */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

              {/* Header: Category + Action Buttons */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.06] pb-5">
                <div>
                  <span className="font-mono text-xs font-semibold text-cyan-400 tracking-wider uppercase">
                    {project.category}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-mono font-bold tracking-tight text-white mt-1">
                    {project.title}
                  </h3>
                </div>

                <div className="flex items-center gap-3">
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono border border-white/[0.1] bg-white/[0.03] text-zinc-300 hover:text-white hover:bg-white/[0.06] transition-colors"
                      aria-label={`${project.title} GitHub Repository`}
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      <span>Source</span>
                    </a>
                  )}

                  <Link
                    href={`/work/${project.slug}`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded text-xs font-mono font-semibold bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-900/60 hover:text-white transition-all shadow-[0_0_12px_rgba(6,182,212,0.15)]"
                  >
                    <span>Read Case Study</span>
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
                  <div className="p-3 rounded border border-cyan-500/20 bg-cyan-950/20 font-mono text-xs text-cyan-300 flex items-center gap-2">
                    <span className="font-bold text-cyan-400">ARCHITECTURAL RULE:</span>
                    <span>&quot;{project.heroPrinciple}&quot;</span>
                  </div>
                )}
              </div>

              {/* Architecture Flow Pipeline Ribbon */}
              <div className="mt-6 pt-5 border-t border-white/[0.06]">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                    System Architecture Flow
                  </span>
                  <span className="text-[10px] font-mono text-zinc-400 hidden sm:inline">
                    Deterministic pipeline
                  </span>
                </div>

                <div className="overflow-x-auto pb-2 -mx-2 px-2 scrollbar-none">
                  <div className="flex items-center gap-1.5 min-w-max">
                    {project.architectureFlow.map((node, nodeIdx) => (
                      <React.Fragment key={nodeIdx}>
                        <div className="flex flex-col p-2.5 rounded border border-white/[0.08] bg-black/40 text-left min-w-[130px] max-w-[170px]">
                          <span className="text-[9px] font-mono text-cyan-400 font-semibold mb-0.5">
                            0{nodeIdx + 1} //
                          </span>
                          <span className="text-xs font-mono font-semibold text-zinc-200 truncate">
                            {node.step}
                          </span>
                          <span className="text-[10px] text-zinc-400 font-sans mt-1 line-clamp-2 leading-tight">
                            {node.description}
                          </span>
                        </div>
                        {nodeIdx < project.architectureFlow.length - 1 && (
                          <span className="text-zinc-500 font-mono text-xs px-0.5">→</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>

              {/* Key Features & Metrics Highlight */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.keyFeatures.slice(0, 4).map((feature, fIdx) => (
                  <div
                    key={fIdx}
                    className="p-3.5 rounded border border-white/[0.05] bg-white/[0.02]"
                  >
                    <div className="text-xs font-mono font-semibold text-zinc-200 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      {feature.title}
                    </div>
                    <p className="mt-1 text-xs text-zinc-400 leading-normal font-sans">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Metrics Note if applicable */}
              {project.metricsNote && (
                <div className="mt-4 p-3 rounded border border-emerald-500/20 bg-emerald-950/20 text-xs font-mono text-emerald-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span>{project.metricsNote}</span>
                </div>
              )}

              {/* Technologies Badges */}
              <div className="mt-6 pt-5 border-t border-white/[0.06] flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] font-mono text-zinc-400 uppercase mr-2 tracking-wider">
                  Stack:
                </span>
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-[11px] font-mono px-2 py-0.5 rounded border border-white/[0.08] bg-white/[0.03] text-zinc-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
