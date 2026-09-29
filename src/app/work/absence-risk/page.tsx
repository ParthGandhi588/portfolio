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
  ChevronDown,
  ChevronUp,
  Terminal,
} from "lucide-react";
import { PROJECTS } from "@/data/portfolioData";

const ML_STAGES = [
  {
    step: "ATTENDANCE LOGS",
    title: "Enterprise Absence Logs",
    shortRole: "Data Ingestion",
    desc: "Daily punch logs, approved leave applications, and departmental rosters aggregated from PostgreSQL and MongoDB.",
  },
  {
    step: "120-DAY WINDOW",
    title: "Dual Observation Architecture",
    shortRole: "90d Feat / 30d Tgt",
    desc: "120-day total window partitioned into a 90-day feature window (Days -120 to -30) and a distinct 30-day ground-truth target window (Days -30 to 0) to eliminate temporal data leakage.",
  },
  {
    step: "12 PAIRWISE FEATURES",
    title: "Dyadic Interaction Features",
    shortRole: "Relational Signals",
    desc: "12 engineered temporal and behavioral interaction features: recency (days since last co-leave), individual baseline leave rates, Jaccard overlap, and Monday/Friday weekend bridges.",
  },
  {
    step: "RANDOM FOREST",
    title: "Random Forest Ensemble (100 Trees)",
    shortRole: "Supervised Modeling",
    desc: "Supervised classifier trained with stratified 80/20 train/test split on pairwise dyadic employee records to project 30-day forward co-absence occurrence.",
  },
  {
    step: "COMPLETE CLUSTERING",
    title: "Complete-Linkage Clustering",
    shortRole: "t=0.75 Guarantee",
    desc: "Agglomerative clustering on Jaccard distance cut at threshold t=0.75, mathematically guaranteeing all cluster members share >=0.25 pairwise Jaccard similarity.",
  },
  {
    step: "EXPLAINABILITY",
    title: "Rule-Based Decision Heuristics",
    shortRole: "Operational Context",
    desc: "Transparent rule mapping translates feature contributions into plain-language operational risk drivers (e.g. weekend bridge habits, unplanned absence overlap).",
  },
];

const FEATURE_IMPORTANCES = [
  { rank: 1, name: "days_since_last_co_leave", desc: "Recency of shared absence", importance: "26.20%" },
  { rank: 2, name: "leave_rate_e1", desc: "Baseline absence frequency (Employee 1)", importance: "17.87%" },
  { rank: 3, name: "leave_rate_e2", desc: "Baseline absence frequency (Employee 2)", importance: "17.45%" },
  { rank: 4, name: "jaccard_leave_similarity", desc: "|E1 ∩ E2| / |E1 ∪ E2| over 90 days", importance: "17.04%" },
  { rank: 5, name: "personal_leave_overlap", desc: "Concurrent casual/personal leaves", importance: "5.32%" },
  { rank: 6, name: "weekend_bridge_ratio", desc: "Weekend bridge leaves / Total co-leaves", importance: "4.41%" },
  { rank: 7, name: "co_leave_count_90d", desc: "Raw concurrent leave days", importance: "4.14%" },
  { rank: 8, name: "weekend_bridge_co_leaves", desc: "Adjacent Monday/Friday co-leaves", importance: "3.15%" },
  { rank: 9, name: "medical_leave_overlap", desc: "Concurrent sick/medical leaves", importance: "2.75%" },
  { rank: 10, name: "unplanned_absence_overlap", desc: "Concurrent unscheduled absences", importance: "1.67%" },
  { rank: 11, name: "same_department", desc: "Department match (binary indicator)", importance: "0.00%" },
  { rank: 12, name: "same_designation", desc: "Designation match (binary indicator)", importance: "0.00%" },
];

export default function AbsenceRiskPage() {
  const project = PROJECTS.find((p) => p.slug === "absence-risk")!;
  const [activeStageIndex, setActiveStageIndex] = useState(2); // Default to 12 PAIRWISE FEATURES
  const [signalIndex, setSignalIndex] = useState(0);
  const [deepDiveOpen, setDeepDiveOpen] = useState(false);
  const [activeDeepDiveTab, setActiveDeepDiveTab] = useState<"schematic" | "features" | "clustering" | "rules">("schematic");

  useEffect(() => {
    const timer = setInterval(() => {
      setSignalIndex((prev) => (prev + 1) % ML_STAGES.length);
    }, 2400);
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
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-14 space-y-10 sm:space-y-14">
        {/* ========================================================================= */}
        {/* LEVEL 1: 10-SECOND UNDERSTANDING (What is Absence Risk Prediction?)       */}
        {/* ========================================================================= */}
        <header className="space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 font-semibold tracking-wider uppercase">
            <span>{project.category}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-mono font-bold tracking-tight text-white">
            {project.title}
          </h1>

          <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-sans">
            An applied machine learning workflow analyzing leave and attendance data to forecast pairwise co-absence risk and cluster patterns.
          </p>

          <div className="p-3.5 sm:p-4 rounded-lg border border-cyan-500/25 bg-cyan-950/20 font-mono text-xs sm:text-sm text-cyan-300 flex items-start gap-3 mt-4">
            <span className="text-cyan-400 font-bold shrink-0">CORE RULE //</span>
            <span>&quot;Moving beyond heuristics: engineering pairwise behavioral features into explainable ML predictions.&quot;</span>
          </div>

          {/* Executive Quick-Metric Chips */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
            <div className="p-3 rounded-lg border border-white/[0.08] bg-[#0c0e15]/80 font-mono text-xs">
              <span className="text-zinc-500 block text-[10px] uppercase">Observation Structure</span>
              <span className="text-zinc-200 font-semibold mt-0.5 block">120-Day Total Window</span>
            </div>
            <div className="p-3 rounded-lg border border-white/[0.08] bg-[#0c0e15]/80 font-mono text-xs">
              <span className="text-zinc-500 block text-[10px] uppercase">Target Window</span>
              <span className="text-zinc-200 font-semibold mt-0.5 block">30-Day Forward Risk</span>
            </div>
            <div className="p-3 rounded-lg border border-white/[0.08] bg-[#0c0e15]/80 font-mono text-xs">
              <span className="text-zinc-500 block text-[10px] uppercase">Engineered Features</span>
              <span className="text-zinc-200 font-semibold mt-0.5 block">12 Dyadic Features</span>
            </div>
            <div className="p-3 rounded-lg border border-emerald-500/25 bg-emerald-950/20 font-mono text-xs">
              <span className="text-emerald-400 block text-[10px] uppercase">Cluster Guarantee</span>
              <span className="text-emerald-200 font-semibold mt-0.5 block">Complete Linkage (t=0.75)</span>
            </div>
          </div>
        </header>

        {/* ========================================================================= */}
        {/* LEVEL 2: 30-SECOND UNDERSTANDING (What makes the architecture interesting?) */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-2">
            <h2 className="text-base sm:text-lg font-mono font-bold text-white tracking-wide">
              INTERACTIVE APPLIED ML PIPELINE
            </h2>
            <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-400">
              <Activity className="w-3.5 h-3.5 animate-pulse" />
              <span className="text-[11px] hidden sm:inline">LIVE SIGNAL</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
            The workflow models pairwise dyadic relationships rather than individual leave counts. Tap any stage to inspect its role:
          </p>

          {/* Interactive Stepper Ribbon */}
          <div className="p-3.5 sm:p-5 rounded-xl border border-white/[0.08] bg-[#0c0e15]/90 space-y-3.5">
            <div className="overflow-x-auto pb-2 scrollbar-none touch-pan-x -mx-1 px-1">
              <div className="flex items-center gap-2 min-w-max">
                {ML_STAGES.map((stage, idx) => {
                  const isActive = activeStageIndex === idx;
                  const isCarryingSignal = signalIndex === idx;

                  return (
                    <React.Fragment key={stage.step}>
                      <button
                        type="button"
                        onClick={() => setActiveStageIndex(idx)}
                        className={`p-3 rounded-lg text-left transition-all duration-200 border cursor-pointer min-w-[140px] max-w-[170px] min-h-[68px] touch-manipulation focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 active:scale-[0.98] ${
                          isActive
                            ? "bg-cyan-950/50 border-cyan-400/80 shadow-[0_0_12px_rgba(6,182,212,0.25)] text-white scale-[1.02]"
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
                        <span className="text-[10px] text-zinc-400 font-sans truncate block mt-0.5">
                          {stage.shortRole}
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

            {/* Stage Detail Drawer */}
            <div className="p-3.5 sm:p-4 rounded-lg border border-cyan-500/20 bg-black/60 flex items-start gap-3">
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
        </section>

        {/* ========================================================================= */}
        {/* LEVEL 3: 60-90 SECOND UNDERSTANDING (What was engineered & measured result) */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <h2 className="text-base sm:text-lg font-mono font-bold text-white tracking-wide border-b border-white/[0.08] pb-2">
            CORE METHODOLOGY & EMPIRICAL FINDINGS
          </h2>

          {/* Empirical Observation Callout */}
          <div className="p-4 sm:p-5 rounded-lg border border-cyan-500/20 bg-cyan-950/15 space-y-2">
            <div className="flex items-center gap-2 text-cyan-300 font-mono text-xs font-semibold">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>EMPIRICAL PATTERN: TEMPORAL INTERACTION OVER ORGANIZATIONAL METADATA</span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
              Organizational metadata (<code className="text-cyan-300 font-mono">same_department</code> and <code className="text-cyan-300 font-mono">same_designation</code>) registered 0.00% feature importance. Historical temporal interaction signals (recency, individual baseline rates, and Jaccard overlap) accounted for <strong>over 78% of the total model importance</strong>.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Temporal Windowing */}
            <div className="p-4 rounded-lg border border-white/[0.08] bg-[#0c0e15]/70 space-y-2">
              <div className="text-xs font-mono font-bold text-cyan-300 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-cyan-400" />
                <span>120-DAY DUAL-WINDOW PARTITION</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                Timeline is strictly partitioned into a 90-day feature extraction window (Days -120 to -30) and an observation target window (Days -30 to 0) to eliminate temporal data leakage.
              </p>
            </div>

            {/* Complete-linkage guarantee */}
            <div className="p-4 rounded-lg border border-white/[0.08] bg-[#0c0e15]/70 space-y-2">
              <div className="text-xs font-mono font-bold text-cyan-300 flex items-center gap-2">
                <Network className="w-4 h-4 text-cyan-400" />
                <span>COMPLETE-LINKAGE CLUSTERING GUARANTEE</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                Agglomerative clustering on Jaccard distance with distance threshold <code className="text-cyan-300 font-mono">t = 0.75</code> mathematically guarantees that every employee pair in a cluster shares at least 25% Jaccard similarity (147 clusters detected).
              </p>
            </div>

            {/* 12 Features Breakdown */}
            <div className="p-4 rounded-lg border border-white/[0.08] bg-[#0c0e15]/70 space-y-2">
              <div className="text-xs font-mono font-bold text-cyan-300 flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>12 PAIRWISE INTERACTION FEATURES</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                Engineered dyadic features capturing recency (26.2%), individual baseline leave rates (17.9% and 17.5%), Jaccard overlap (17.0%), and Monday/Friday weekend bridges (3.2%).
              </p>
            </div>

            {/* Operational Explainability */}
            <div className="p-4 rounded-lg border border-white/[0.08] bg-[#0c0e15]/70 space-y-2">
              <div className="text-xs font-mono font-bold text-cyan-300 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-cyan-400" />
                <span>RULE-BASED EXPLAINABILITY HEURISTICS</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                Decision heuristics translate feature threshold crossings into operational risk drivers (&quot;Frequent Monday/Friday Weekend Bridges&quot;, &quot;High Unplanned Absence Overlap&quot;) without black-box opacity.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* LEVEL 4: EXPANDABLE TECHNICAL DEEP DIVE (Progressive Disclosure)          */}
        {/* ========================================================================= */}
        <section className="pt-2 border-t border-white/[0.08]">
          <div className="rounded-xl border border-white/[0.1] bg-[#0c0e15]/95 overflow-hidden">
            {/* Accordion Header */}
            <button
              type="button"
              onClick={() => setDeepDiveOpen(!deepDiveOpen)}
              className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors cursor-pointer touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              aria-expanded={deepDiveOpen}
            >
              <div className="flex items-center gap-2.5">
                <Terminal className="w-4 h-4 text-cyan-400 shrink-0" />
                <div>
                  <span className="text-xs font-mono font-bold text-white tracking-wider uppercase block">
                    TECHNICAL DEEP DIVE // MATHEMATICAL SPECS & FEATURE IMPORTANCE
                  </span>
                  <span className="text-[11px] text-zinc-400 font-sans block mt-0.5">
                    {deepDiveOpen ? "Click to collapse detailed specs" : "Click to expand exact feature rankings, clustering proofs, and explainability trees"}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[11px] font-mono text-cyan-400 hidden sm:inline">
                  {deepDiveOpen ? "COLLAPSE" : "EXPAND"}
                </span>
                {deepDiveOpen ? (
                  <ChevronUp className="w-4 h-4 text-cyan-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-cyan-400" />
                )}
              </div>
            </button>

            {/* Expandable Body */}
            {deepDiveOpen && (
              <div className="p-4 sm:p-6 border-t border-white/[0.08] space-y-6 bg-black/40 animate-in fade-in duration-200">
                {/* Tabs */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none touch-pan-x">
                  <button
                    type="button"
                    onClick={() => setActiveDeepDiveTab("schematic")}
                    className={`min-h-[40px] px-3.5 py-1.5 rounded-lg text-xs font-mono transition-colors touch-manipulation ${
                      activeDeepDiveTab === "schematic"
                        ? "bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 font-semibold"
                        : "bg-white/[0.02] border border-white/[0.06] text-zinc-400 hover:text-white"
                    }`}
                  >
                    Workflow Schematic
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveDeepDiveTab("features")}
                    className={`min-h-[40px] px-3.5 py-1.5 rounded-lg text-xs font-mono transition-colors touch-manipulation ${
                      activeDeepDiveTab === "features"
                        ? "bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 font-semibold"
                        : "bg-white/[0.02] border border-white/[0.06] text-zinc-400 hover:text-white"
                    }`}
                  >
                    Feature Table
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveDeepDiveTab("clustering")}
                    className={`min-h-[40px] px-3.5 py-1.5 rounded-lg text-xs font-mono transition-colors touch-manipulation ${
                      activeDeepDiveTab === "clustering"
                        ? "bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 font-semibold"
                        : "bg-white/[0.02] border border-white/[0.06] text-zinc-400 hover:text-white"
                    }`}
                  >
                    Clustering Proof
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveDeepDiveTab("rules")}
                    className={`min-h-[40px] px-3.5 py-1.5 rounded-lg text-xs font-mono transition-colors touch-manipulation ${
                      activeDeepDiveTab === "rules"
                        ? "bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 font-semibold"
                        : "bg-white/[0.02] border border-white/[0.06] text-zinc-400 hover:text-white"
                    }`}
                  >
                    Decision Heuristics
                  </button>
                </div>

                {/* Tab 1: Monospace Flow Diagram */}
                {activeDeepDiveTab === "schematic" && (
                  <div className="p-4 rounded-lg border border-white/[0.08] bg-black/80 font-mono text-xs overflow-x-auto touch-pan-x">
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
                )}

                {/* Tab 2: Feature Importance Table */}
                {activeDeepDiveTab === "features" && (
                  <div className="space-y-3 font-mono text-xs">
                    <div className="text-zinc-400 font-sans text-xs">
                      Measured Gini feature importances extracted from the trained 100-estimator Random Forest classifier:
                    </div>
                    <div className="overflow-x-auto touch-pan-x">
                      <table className="w-full text-left border-collapse border border-white/[0.08] min-w-[500px]">
                        <thead>
                          <tr className="bg-white/[0.04] text-cyan-300 text-[11px] border-b border-white/[0.08]">
                            <th className="p-2.5">#</th>
                            <th className="p-2.5">Feature Name</th>
                            <th className="p-2.5">Description</th>
                            <th className="p-2.5 text-right">Importance</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.05] text-[11px]">
                          {FEATURE_IMPORTANCES.map((f) => (
                            <tr key={f.name} className="hover:bg-white/[0.02]">
                              <td className="p-2.5 text-zinc-500 font-bold">{f.rank}</td>
                              <td className="p-2.5 text-cyan-300 font-semibold">{f.name}</td>
                              <td className="p-2.5 text-zinc-300 font-sans">{f.desc}</td>
                              <td className="p-2.5 text-right font-bold text-white">{f.importance}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Tab 3: Clustering Proof */}
                {activeDeepDiveTab === "clustering" && (
                  <div className="space-y-3 font-sans text-xs sm:text-sm text-zinc-300">
                    <h3 className="font-mono text-xs font-bold text-white uppercase text-cyan-300">
                      Complete-Linkage Agglomerative Distance Guarantee
                    </h3>
                    <p>
                      Rather than heuristic k-means, clustering utilizes complete linkage over pairwise Jaccard distance:
                    </p>
                    <div className="p-3 rounded-lg bg-black/60 font-mono text-xs text-cyan-300">
                      D(i, j) = 1.0 - Jaccard_Similarity(i, j)
                    </div>
                    <p>
                      Because complete linkage defines inter-cluster distance as the <em>maximum</em> pairwise distance between elements:
                    </p>
                    <div className="p-3 rounded-lg bg-black/60 font-mono text-xs text-cyan-300">
                      max(D(x, y)) &le; 0.75  ==&gt;  min(Jaccard_Similarity(x, y)) &ge; 0.25
                    </div>
                    <p>
                      Every pair inside an assigned cluster is mathematically guaranteed to share at least 25% co-absence overlap, eliminating spurious cluster membership.
                    </p>
                  </div>
                )}

                {/* Tab 4: Decision Heuristics */}
                {activeDeepDiveTab === "rules" && (
                  <div className="space-y-3 font-sans text-xs sm:text-sm text-zinc-300">
                    <h3 className="font-mono text-xs font-bold text-white uppercase text-cyan-300">
                      Operational Rule Mappings for Shift Managers
                    </h3>
                    <p>
                      The explainability module routes Random Forest probability scores and top feature contributions through deterministic heuristic rules:
                    </p>
                    <ul className="space-y-1.5 pl-4 text-xs text-zinc-300 list-disc">
                      <li><strong>Weekend bridge flag:</strong> Triggered when <code className="text-cyan-300 font-mono">weekend_bridge_ratio &gt; 0.40</code> (&quot;High concentration of Monday/Friday synchronized absences&quot;).</li>
                      <li><strong>Medical co-leave flag:</strong> Triggered when <code className="text-cyan-300 font-mono">medical_leave_overlap &ge; 2</code> (&quot;Recurring overlapping sick leaves&quot;).</li>
                      <li><strong>Unplanned absence risk:</strong> Triggered when <code className="text-cyan-300 font-mono">unplanned_absence_overlap &ge; 2</code> (&quot;Synchronized unnotified absence pattern&quot;).</li>
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Technologies Grid */}
        <section className="space-y-3 pt-2">
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
