"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Activity, Info } from "lucide-react";
import { PROJECTS } from "@/data/portfolioData";

const ML_STAGES = [
  {
    step: "DATA",
    title: "Enterprise Absence Records",
    desc: "Daily punch logs, approved leave applications, and departmental shift rosters from PostgreSQL & MongoDB.",
  },
  {
    step: "90-DAY WINDOW",
    title: "Rolling Feature Window",
    desc: "A strictly partitioned 90-day observation window preventing temporal data leakage.",
  },
  {
    step: "12 PAIRWISE FEATURES",
    title: "Dyadic Feature Vector",
    desc: "Engineered interaction metrics: concurrent leave frequencies, shift concurrence, and proximity to weekends/holidays.",
  },
  {
    step: "RANDOM FOREST",
    title: "Random Forest Classifier",
    desc: "Supervised ensemble classifier trained with stratified 80/20 train/test split on pairwise historical vectors.",
  },
  {
    step: "30-DAY RISK",
    title: "Forward Risk Projection",
    desc: "Predicted probability score for pairwise co-leave in the subsequent 30-day operational period.",
  },
  {
    step: "CLUSTERING",
    title: "Hierarchical Discovery",
    desc: "Agglomerative clustering on Jaccard distance matrix with feature importance extraction for operational visibility.",
  },
];

export default function AbsenceRiskPage() {
  const project = PROJECTS.find((p) => p.slug === "absence-risk")!;
  const [activeStageIndex, setActiveStageIndex] = useState(2); // Default to 12 PAIRWISE FEATURES
  const [signalIndex, setSignalIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSignalIndex((prev) => (prev + 1) % ML_STAGES.length);
    }, 2200);
    return () => clearInterval(timer);
  }, []);

  const activeStage = ML_STAGES[activeStageIndex];

  return (
    <div className="min-h-screen bg-[#090a0e] text-[#f3f4f6]">
      {/* Top Navigation */}
      <nav className="border-b border-white/[0.08] bg-[#090a0e]/95 backdrop-blur-md sticky top-0 z-40 py-3">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <Link
            href="/#work"
            className="min-h-[44px] inline-flex items-center gap-2 text-xs font-mono text-zinc-300 hover:text-white transition-colors touch-manipulation py-2"
          >
            <ArrowLeft className="w-4 h-4 text-cyan-400" />
            <span>BACK TO SYSTEMS</span>
          </Link>

          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
            <span>ENTERPRISE ML WORKFLOW</span>
          </div>
        </div>
      </nav>

      {/* Case Study Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-12 sm:space-y-16">
        {/* Header Block */}
        <header className="space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 font-semibold tracking-wider uppercase">
            <span>{project.category}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-mono font-bold tracking-tight text-white">
            {project.title}
          </h1>

          <p className="text-base sm:text-xl text-zinc-300 leading-relaxed font-sans">
            {project.description}
          </p>

          <div className="p-4 rounded-lg border border-cyan-500/25 bg-cyan-950/20 font-mono text-xs sm:text-sm text-cyan-300 flex items-start gap-3 mt-6">
            <span className="text-cyan-400 font-bold shrink-0">CORE RULE //</span>
            <span>&quot;Moving beyond heuristics: engineering pairwise behavioral features into explainable ML predictions.&quot;</span>
          </div>
        </header>

        {/* Technical Overview Metadata Grid */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-5 rounded-lg border border-white/[0.08] bg-[#0c0e15]/80 font-mono text-xs">
          <div>
            <span className="text-zinc-500 uppercase tracking-wider block text-[10px]">Observation Window</span>
            <span className="text-zinc-200 mt-1 block">90-Day Rolling Window</span>
          </div>
          <div>
            <span className="text-zinc-500 uppercase tracking-wider block text-[10px]">Prediction Target</span>
            <span className="text-zinc-200 mt-1 block">30-Day Co-Leave Risk</span>
          </div>
          <div>
            <span className="text-zinc-500 uppercase tracking-wider block text-[10px]">Model & Split</span>
            <span className="text-zinc-200 mt-1 block">Random Forest (80/20)</span>
          </div>
          <div>
            <span className="text-zinc-500 uppercase tracking-wider block text-[10px]">Pattern Discovery</span>
            <span className="text-zinc-200 mt-1 block">Hierarchical + Jaccard</span>
          </div>
        </section>

        {/* 1. Problem Statement */}
        <section className="space-y-4">
          <h2 className="text-lg sm:text-xl font-mono font-bold text-white tracking-wide border-b border-white/[0.08] pb-2">
            01 // PROBLEM & FORMULATION
          </h2>
          <div className="text-sm sm:text-base text-zinc-300 space-y-3 leading-relaxed font-sans">
            <p>
              In enterprise operations, unscheduled absences rarely happen in complete isolation. When interdependent team members
              take concurrent unscheduled leave, shift handoffs collapse and operational bottlenecks emerge.
            </p>
            <p>
              Traditional HR systems only count retrospective individual absences without capturing relational correlation.
              The objective of this engineering workflow was to mathematically model pairwise leave dynamics,
              extract behavioral signals from historical attendance logs, and provide early warning predictions along with
              interpretable cluster structures.
            </p>
          </div>
        </section>

        {/* 2. Interactive Pipeline Flow */}
        <section className="space-y-5">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-2">
            <h2 className="text-lg sm:text-xl font-mono font-bold text-white tracking-wide">
              02 // INTERACTIVE APPLIED ML PIPELINE
            </h2>
            <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-400">
              <Activity className="w-3.5 h-3.5 animate-pulse" />
              <span className="text-[11px] hidden sm:inline">LIVE SIGNAL PROGRESSION</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
            The machine learning workflow transitions from temporal records to pairwise classification and hierarchical clustering.
            Tap or hover any stage below to inspect its mathematical role:
          </p>

          {/* Interactive Stepper Ribbon */}
          <div className="p-4 sm:p-5 rounded-xl border border-white/[0.08] bg-[#0c0e15]/90 space-y-4">
            <div className="overflow-x-auto pb-2 scrollbar-none">
              <div className="flex items-center gap-2 min-w-max">
                {ML_STAGES.map((stage, idx) => {
                  const isActive = activeStageIndex === idx;
                  const isCarryingSignal = signalIndex === idx;

                  return (
                    <React.Fragment key={stage.step}>
                      <button
                        type="button"
                        onClick={() => setActiveStageIndex(idx)}
                        onMouseEnter={() => setActiveStageIndex(idx)}
                        className={`p-3 rounded-lg text-left transition-all duration-200 border cursor-pointer min-w-[140px] max-w-[170px] min-h-[72px] touch-manipulation focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 ${
                          isActive
                            ? "bg-cyan-950/40 border-cyan-400/80 shadow-[0_0_12px_rgba(6,182,212,0.2)] text-white scale-[1.02]"
                            : "bg-black/50 border-white/[0.08] text-zinc-300 hover:bg-white/[0.05]"
                        }`}
                        aria-pressed={isActive}
                      >
                        <div className="flex items-center justify-between text-[9px] font-mono mb-1">
                          <span className={isActive ? "text-cyan-300 font-bold" : "text-zinc-500"}>
                            0{idx + 1} //
                          </span>
                          {isCarryingSignal && (
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                          )}
                        </div>
                        <span className="text-xs font-mono font-semibold truncate block">
                          {stage.step}
                        </span>
                      </button>

                      {idx < ML_STAGES.length - 1 && (
                        <span className="text-zinc-600 font-mono text-xs px-0.5">→</span>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>

            {/* Explanation box */}
            <div className="p-4 rounded-lg border border-cyan-500/20 bg-black/60 flex items-start gap-3">
              <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <div className="text-xs font-mono font-bold text-cyan-300 uppercase">
                  STAGE 0{activeStageIndex + 1}: {activeStage.title}
                </div>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
                  {activeStage.desc}
                </p>
              </div>
            </div>
          </div>

          {/* ASCII Architecture Flow */}
          <div className="p-4 sm:p-5 rounded-lg border border-white/[0.08] bg-black/60 font-mono text-xs overflow-x-auto touch-pan-x">
            <div className="text-zinc-500 mb-2">// ML EXECUTION SCHEMATIC</div>
            <pre className="text-cyan-300 text-[11px] leading-snug">
{`+-------------------------------------------------------------------------+
|  ENTERPRISE DATA SOURCES                                                |
|  - Daily attendance punch logs & leave applications (PostgreSQL/MongoDB) |
|  - Departmental hierarchy & shift schedules                             |
+-----------------------------------+-------------------------------------+
                                    |
                                    v
+-------------------------------------------------------------------------+
|  90-DAY ROLLING OBSERVATION WINDOW                                      |
|  - Aggregates historical leave overlap & temporal patterns              |
+-----------------------------------+-------------------------------------+
                                    |
                                    v
+-------------------------------------------------------------------------+
|  PAIRWISE FEATURE EXTRACTION (12 Features)                              |
|  - Historical co-leave frequency & Jaccard overlap index                |
|  - Consecutive leave proximity & weekend/holiday adjacency              |
|  - Departmental pairing & shift concurrence indices                     |
+-----------------------------------+-------------------------------------+
                                    |
                                    v
+-------------------------------------------------------------------------+
|  RANDOM FOREST CLASSIFICATION (80/20 Train/Test Split)                   |
|  - Supervised learning targeting 30-day forward co-absence occurrence    |
|  - Gini impurity-based feature importance ranking                       |
+-----------------------------------+-------------------------------------+
                                    |
                                    v
+-------------------------------------------------------------------------+
|  UNSUPERVISED CLUSTERING & EXPLAINABILITY                               |
|  - Hierarchical agglomerative clustering using Jaccard distance         |
|  - Identification of recurring absence syndicates and core drivers    |
+-------------------------------------------------------------------------+`}
            </pre>
          </div>
        </section>

        {/* 3. Supported Technical Specifications */}
        <section className="space-y-4">
          <h2 className="text-lg sm:text-xl font-mono font-bold text-white tracking-wide border-b border-white/[0.08] pb-2">
            03 // TECHNICAL SPECIFICATIONS
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg border border-white/[0.08] bg-[#0c0e15]/70 space-y-2">
              <span className="text-xs font-mono font-bold text-cyan-300">
                12 PAIRWISE TEMPORAL & BEHAVIORAL FEATURES
              </span>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                Engineered dyadic features capturing past joint leaves, interval between concurrent leaves,
                ratio of joint leaves to total individual leaves, and shift schedule dependencies.
              </p>
            </div>

            <div className="p-4 rounded-lg border border-white/[0.08] bg-[#0c0e15]/70 space-y-2">
              <span className="text-xs font-mono font-bold text-cyan-300">
                90-DAY FEATURE WINDOW / 30-DAY TARGET
              </span>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                Predictive separation ensuring no data leakage: rolling 90-day observation window predicting binary
                co-occurrence in the subsequent 30-day operational period.
              </p>
            </div>

            <div className="p-4 rounded-lg border border-white/[0.08] bg-[#0c0e15]/70 space-y-2">
              <span className="text-xs font-mono font-bold text-cyan-300">
                RANDOM FOREST ENSEMBLE (80/20 SPLIT)
              </span>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                Trained on pairwise feature vectors with stratified 80% train and 20% validation split, mitigating
                individual variance and preserving non-linear interaction terms.
              </p>
            </div>

            <div className="p-4 rounded-lg border border-white/[0.08] bg-[#0c0e15]/70 space-y-2">
              <span className="text-xs font-mono font-bold text-cyan-300">
                HIERARCHICAL CLUSTERING VIA JACCARD DISTANCE
              </span>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                Distance matrix built on pairwise Jaccard similarity coefficients, processed through Ward&apos;s linkage
                to identify organic groupings across organizational departments.
              </p>
            </div>
          </div>
        </section>

        {/* 4. Interpretability & Explainability */}
        <section className="space-y-4">
          <h2 className="text-lg sm:text-xl font-mono font-bold text-white tracking-wide border-b border-white/[0.08] pb-2">
            04 // EXPLAINABILITY & OPERATIONAL VALUE
          </h2>
          <div className="p-5 rounded-lg border border-white/[0.08] bg-[#0c0e15]/80 space-y-3">
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
              Rather than presenting a raw uninterpretable probability, the system extracts <strong>feature importance</strong> from
              the Random Forest trees to explain which interaction factors contributed most heavily to the prediction.
              When paired with the hierarchical clustering dendrogram, operations teams can quickly determine whether a predicted
              absence is driven by recurring shift alignments or cyclical calendar habits.
            </p>
          </div>
        </section>

        {/* Technologies Grid */}
        <section className="space-y-4 pt-4 border-t border-white/[0.08]">
          <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-400">
            SYSTEM TECHNOLOGIES
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="text-xs font-mono px-2.5 py-1 rounded border border-white/[0.1] bg-white/[0.03] text-zinc-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
