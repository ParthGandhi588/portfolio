"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Activity,
  Info,
  LineChart,
  Network,
  Calendar,
  Layers,
  ShieldAlert,
} from "lucide-react";
import { PROJECTS } from "@/data/portfolioData";

const ML_STAGES = [
  {
    step: "ATTENDANCE LOGS",
    title: "Enterprise Absence Logs",
    desc: "Daily punch logs, approved leave applications, and departmental rosters aggregated from PostgreSQL and MongoDB.",
  },
  {
    step: "120-DAY WINDOW",
    title: "Dual Observation Architecture",
    desc: "120-day total window partitioned into a 90-day feature window (Days -120 to -30) and a distinct 30-day ground-truth target window (Days -30 to 0) to eliminate temporal data leakage.",
  },
  {
    step: "12 PAIRWISE FEATURES",
    title: "Dyadic Interaction Features",
    desc: "12 engineered temporal and behavioral interaction features: recency (days since last co-leave), individual baseline leave rates, Jaccard overlap, and Monday/Friday weekend bridges.",
  },
  {
    step: "RANDOM FOREST",
    title: "Random Forest Ensemble (100 Trees)",
    desc: "Supervised classifier trained with stratified 80/20 train/test split on pairwise dyadic employee records to project 30-day forward co-absence occurrence.",
  },
  {
    step: "COMPLETE CLUSTERING",
    title: "Complete-Linkage Clustering",
    desc: "Agglomerative clustering on Jaccard distance cut at threshold t=0.75, mathematically guaranteeing all cluster members share >=0.25 pairwise Jaccard similarity.",
  },
  {
    step: "EXPLAINABILITY",
    title: "Rule-Based Decision Heuristics",
    desc: "Transparent rule mapping translates feature contributions into plain-language operational risk drivers (e.g. weekend bridge habits, unplanned absence overlap).",
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
            <span className="text-zinc-200 mt-1 block">120-Day Total Structure</span>
          </div>
          <div>
            <span className="text-zinc-500 uppercase tracking-wider block text-[10px]">Prediction Target</span>
            <span className="text-zinc-200 mt-1 block">30-Day Forward Co-Leave</span>
          </div>
          <div>
            <span className="text-zinc-500 uppercase tracking-wider block text-[10px]">Model Architecture</span>
            <span className="text-zinc-200 mt-1 block">Random Forest (80/20)</span>
          </div>
          <div>
            <span className="text-zinc-500 uppercase tracking-wider block text-[10px]">Cluster Guarantee</span>
            <span className="text-zinc-200 mt-1 block">Complete Linkage (t=0.75)</span>
          </div>
        </section>

        {/* 1. Problem Statement */}
        <section className="space-y-4">
          <h2 className="text-lg sm:text-xl font-mono font-bold text-white tracking-wide border-b border-white/[0.08] pb-2">
            01 // PROBLEM & FORMULATION
          </h2>
          <div className="text-sm sm:text-base text-zinc-300 space-y-3 leading-relaxed font-sans">
            <p>
              In enterprise operations and manufacturing, unscheduled absences rarely happen in complete isolation.
              When interdependent team members take synchronized unscheduled leave, shift handoffs collapse and
              operational bottlenecks emerge.
            </p>
            <p>
              Traditional HR analytics merely sum retrospective individual absence counts without capturing dyadic
              relationships or temporal correlation. The objective of this engineering workflow was to mathematically
              model pairwise leave dynamics across all employee dyads, extract behavioral signals from historical
              attendance logs, and provide early warning predictions along with mathematically guaranteed cluster groupings.
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
            The machine learning workflow transitions from historical attendance records to pairwise dyadic classification
            and hierarchical clustering. Tap or hover any stage below to inspect its mathematical role:
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
            <div className="text-zinc-500 mb-2">// MATHEMATICAL WORKFLOW SCHEMATIC</div>
            <pre className="text-cyan-300 text-[11px] leading-snug">
{`+-------------------------------------------------------------------------+
|  ENTERPRISE DATA SOURCES (PostgreSQL / MongoDB)                         |
|  - Daily attendance punch logs, approved leave slips, shift rosters     |
+-----------------------------------+-------------------------------------+
                                    |
                                    v
+-------------------------------------------------------------------------+
|  120-DAY TOTAL OBSERVATION STRUCTURE                                    |
|  +-------------------------------------+-------------------------------+|
|  |  90-DAY FEATURE WINDOW              |  30-DAY TARGET WINDOW         ||
|  |  (Days -120 to -30)                 |  (Days -30 to 0)              ||
|  |  Aggregates temporal interactions   |  Ground truth co-absence target||
|  +-------------------------------------+-------------------------------+|
+-----------------------------------+-------------------------------------+
                                    |
                                    v
+-------------------------------------------------------------------------+
|  12 PAIRWISE INTERACTION FEATURES (Top 4 account for >78% importance)    |
|  - Recency (days_since_last_co_leave: 26.2%)                            |
|  - Individual baseline frequencies (leave_rate_e1: 17.9%, e2: 17.5%)    |
|  - Jaccard leave similarity (|E1 ∩ E2| / |E1 ∪ E2|: 17.0%)              |
|  - Personal overlap (5.3%), weekend bridge ratio (4.4%), co-leaves (4.1%)|
|  - Weekend bridge count (3.2%), medical (2.8%), unplanned (1.7%)        |
|  - Organizational metadata (dept: 0.0%, desig: 0.0%)                    |
+-----------------------------------+-------------------------------------+
                                    |
                                    v
+-------------------------------------------------------------------------+
|  RANDOM FOREST CLASSIFICATION (100 Trees, Stratified 80/20 Split)       |
|  - Supervised binary classification projecting 30-day forward risk      |
+-----------------------------------+-------------------------------------+
                                    |
                                    v
+-------------------------------------------------------------------------+
|  COMPLETE-LINKAGE CLUSTERING & EXPLAINABILITY                           |
|  - Jaccard Distance D(i, j) = 1.0 - Jaccard Similarity                  |
|  - Complete Linkage with threshold t=0.75                              |
|  - Mathematical guarantee: all cluster members share >=0.25 similarity  |
|  - 147 clusters discovered across enterprise workforce data            |
+-------------------------------------------------------------------------+`}
            </pre>
          </div>
        </section>

        {/* 3. Deep Technical Specifications */}
        <section className="space-y-4">
          <h2 className="text-lg sm:text-xl font-mono font-bold text-white tracking-wide border-b border-white/[0.08] pb-2">
            03 // TECHNICAL SPECIFICATIONS & IMPLEMENTATION DECISIONS
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Temporal Windowing */}
            <div className="p-4 rounded-lg border border-white/[0.08] bg-[#0c0e15]/70 space-y-2.5">
              <div className="text-xs font-mono font-bold text-cyan-300 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-cyan-400" />
                <span>120-DAY DUAL-WINDOW PARTITION</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                To prevent data leakage, the historical timeline is partitioned into a 90-day feature extraction window (Days -120 to -30) and an observation target window (Days -30 to 0). Features never observe target-window events, ensuring valid out-of-time evaluation for the upcoming 30-day risk projection.
              </p>
            </div>

            {/* Complete-linkage guarantee */}
            <div className="p-4 rounded-lg border border-white/[0.08] bg-[#0c0e15]/70 space-y-2.5">
              <div className="text-xs font-mono font-bold text-cyan-300 flex items-center gap-2">
                <Network className="w-4 h-4 text-cyan-400" />
                <span>COMPLETE-LINKAGE CLUSTERING GUARANTEE</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                Agglomerative hierarchical clustering operates on Jaccard distance <code className="text-cyan-300 font-mono">D(i, j) = 1.0 - J(i, j)</code> cut at <code className="text-cyan-300 font-mono">t = 0.75</code>. Complete linkage evaluates the maximum pairwise distance between elements, mathematically guaranteeing that every employee pair in a cluster shares at least a 25% Jaccard similarity.
              </p>
            </div>

            {/* 12 Features Breakdown */}
            <div className="p-4 rounded-lg border border-white/[0.08] bg-[#0c0e15]/70 space-y-2.5">
              <div className="text-xs font-mono font-bold text-cyan-300 flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>12 PAIRWISE INTERACTION FEATURES</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                Engineered pairwise dyadic features: recency (26.2%), individual baseline leave rates (17.9% and 17.5%), Jaccard similarity (17.0%), personal leave overlap (5.3%), weekend bridge ratio (4.4%), raw co-leave counts (4.1%), Monday/Friday bridge count (3.2%), medical leave overlap (2.8%), and unplanned absences (1.7%).
              </p>
            </div>

            {/* Operational Explainability */}
            <div className="p-4 rounded-lg border border-white/[0.08] bg-[#0c0e15]/70 space-y-2.5">
              <div className="text-xs font-mono font-bold text-cyan-300 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-cyan-400" />
                <span>RULE-BASED EXPLAINABILITY HEURISTICS</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                Rather than treating the ensemble as a black box, rule-based decision heuristics translate feature threshold crossings into operational risk drivers: e.g. &quot;Frequent Monday/Friday Weekend Bridge Co-Leaves&quot; or &quot;High Overlap in Unplanned Absences&quot;, giving shift supervisors actionable context.
              </p>
            </div>
          </div>
        </section>

        {/* 4. Empirical Feature Observation */}
        <section className="space-y-4">
          <h2 className="text-lg sm:text-xl font-mono font-bold text-white tracking-wide border-b border-white/[0.08] pb-2">
            04 // EMPIRICAL FEATURE OBSERVATION
          </h2>
          <div className="p-5 rounded-lg border border-cyan-500/20 bg-cyan-950/15 space-y-3">
            <div className="flex items-center gap-2 text-cyan-300 font-mono text-xs font-semibold">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>EMPIRICAL PATTERN: TEMPORAL DYNAMICS OVER ORGANIZATIONAL METADATA</span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
              In model evaluations, organizational metadata features (<code className="text-cyan-300 font-mono">same_department</code> and <code className="text-cyan-300 font-mono">same_designation</code>) registered 0.00% feature importance. In contrast, historical temporal interaction signals (recency, individual absence rates, and Jaccard overlap) accounted for <strong>over 78% of the total model importance</strong>.
            </p>
            <div className="text-[11px] font-mono text-zinc-400 pt-1">
              * Note: Documented empirical distribution of Random Forest Gini importance in the trained model; not presented as causal proof.
            </div>
          </div>
        </section>

        {/* 5. Challenges & Design Decisions */}
        <section className="space-y-4">
          <h2 className="text-lg sm:text-xl font-mono font-bold text-white tracking-wide border-b border-white/[0.08] pb-2">
            05 // KEY DESIGN DECISIONS
          </h2>
          <div className="space-y-4">
            {project.challengesAndDecisions.map((item, idx) => (
              <div key={idx} className="p-4 rounded-lg border border-white/[0.08] bg-[#0c0e15]/70 space-y-2">
                <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                  Challenge #{idx + 1}
                </div>
                <p className="text-xs sm:text-sm font-semibold text-zinc-200">
                  {item.challenge}
                </p>
                <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider pt-2">
                  Engineering Resolution
                </div>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
                  {item.decision}
                </p>
              </div>
            ))}
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
