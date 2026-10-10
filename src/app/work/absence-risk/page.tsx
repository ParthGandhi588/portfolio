"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  LineChart,
  Network,
  Calendar,
  Layers,
  ShieldAlert,
  ChevronDown,
  ChevronUp,
  Terminal,
  ArrowUpRight,
} from "lucide-react";
import { PROJECTS } from "@/data/portfolioData";
import { ProjectNav } from "@/components/ProjectNav";
import { N8nFlowCanvas } from "@/components/N8nFlowCanvas";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SoundToggle } from "@/components/SoundProvider";

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
  const [activeStageIndex, setActiveStageIndex] = useState(2);
  const [deepDiveOpen, setDeepDiveOpen] = useState(true);
  const [activeDeepDiveTab, setActiveDeepDiveTab] = useState<"schematic" | "features" | "clustering" | "rules">("schematic");

  const activeStage = ML_STAGES[activeStageIndex];

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/* Minimalist Editorial Navigation */}
      <nav className="header-scrolled backdrop-blur-md sticky top-0 z-40 py-4 border-b border-zinc-200 dark:border-white/[0.08]">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 flex items-center justify-between">
          <Link
            href="/#systems"
            className="inline-flex items-center gap-2 text-xs font-sans text-zinc-400 hover:text-white transition-colors editorial-link"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-blue-400" />
            <span>01 / Systems Monograph</span>
          </Link>

          <div className="flex items-center gap-3">
            <SoundToggle />
            <ThemeToggle />
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
              <span>ENTERPRISE ML WORKFLOW</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Editorial Monograph Content */}
      <main className="max-w-6xl mx-auto px-6 sm:px-10 py-16 sm:py-24 space-y-20">
        {/* ========================================================================= */}
        {/* LEVEL 1: TITLE & PRINCIPLE                                                */}
        {/* ========================================================================= */}
        <header className="space-y-8 pb-12 border-b border-white/[0.08]">
          <div className="space-y-3">
            <span className="text-xs font-mono text-blue-400 tracking-wider uppercase">
              CASE STUDY 03 // APPLIED MACHINE LEARNING
            </span>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-sans font-light tracking-tight text-white leading-tight">
              Absence Risk <span className="font-serif italic text-white">Prediction</span>
            </h1>
            <p className="text-lg sm:text-2xl text-zinc-400 font-sans font-normal leading-relaxed max-w-3xl">
              An applied machine learning workflow analyzing leave and attendance data to forecast pairwise co-absence risk and cluster patterns.
            </p>
          </div>

          {/* Architectural Rule Callout */}
          <div className="py-6 px-8 border-l-2 border-blue-500 bg-white/[0.01]">
            <span className="text-[10px] font-mono uppercase tracking-wider text-blue-400 block mb-1">
              CORE ARCHITECTURAL DOCTRINE
            </span>
            <p className="text-xl sm:text-2xl font-serif italic text-white leading-relaxed">
              &quot;Moving beyond heuristics: engineering pairwise behavioral features into explainable ML predictions.&quot;
            </p>
          </div>

          {/* Executive Telemetry Ledger (Zero Box Cards) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 pt-4">
            <div className="space-y-1 border-l border-white/[0.1] pl-5">
              <span className="text-[10px] font-mono text-zinc-400 uppercase">OBSERVATION STRUCTURE</span>
              <div className="text-base font-sans font-medium text-white">120-Day Total Window</div>
              <p className="text-xs text-zinc-400 font-sans">Zero temporal data leakage</p>
            </div>
            <div className="space-y-1 border-l border-white/[0.1] pl-5">
              <span className="text-[10px] font-mono text-zinc-400 uppercase">TARGET HORIZON</span>
              <div className="text-base font-sans font-medium text-white">30-Day Forward Risk</div>
              <p className="text-xs text-zinc-400 font-sans">Upcoming operational period</p>
            </div>
            <div className="space-y-1 border-l border-white/[0.1] pl-5">
              <span className="text-[10px] font-mono text-zinc-400 uppercase">ENGINEERED SIGNALS</span>
              <div className="text-base font-sans font-medium text-white">12 Dyadic Features</div>
              <p className="text-xs text-zinc-400 font-sans">Pairwise behavioral signals</p>
            </div>
            <div className="space-y-1 border-l border-white/[0.1] pl-5">
              <span className="text-[10px] font-mono text-blue-400 uppercase">CLUSTERING GUARANTEE</span>
              <div className="text-base font-sans font-medium text-blue-400">Complete Linkage (t=0.75)</div>
              <p className="text-xs text-zinc-400 font-sans">&ge;0.25 similarity guarantee</p>
            </div>
          </div>
        </header>

        {/* ========================================================================= */}
        {/* LEVEL 2: REQUEST LIFECYCLE & EXECUTION BOUNDARY                           */}
        {/* ========================================================================= */}
        <section className="space-y-8 pb-16 border-b border-white/[0.08]">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-mono text-blue-400 tracking-wider uppercase">
                MODEL PIPELINE
              </span>
              <h2 className="text-2xl sm:text-3xl font-sans font-light text-white">
                ML Pipeline & Clustering Architecture
              </h2>
            </div>
            <span className="text-xs font-mono text-zinc-400">
              STAGE 0{activeStageIndex + 1} OF 0{ML_STAGES.length}
            </span>
          </div>

          <p className="text-sm text-zinc-400 font-sans leading-relaxed max-w-3xl">
            Individual leave statistics miss critical workforce dependencies. Dyadic modeling captures behavioral synchronization across employee pairs while preventing forward leakage.
          </p>

          {/* Minimalist Horizontal Stage Stepper (Zero Box Cards) */}
          <div className="space-y-6">
            <div className="flex flex-wrap gap-4 sm:gap-6 border-b border-white/[0.08] pb-3 text-xs font-mono">
              {ML_STAGES.map((stage, idx) => {
                const isActive = activeStageIndex === idx;
                return (
                  <button
                    key={stage.step}
                    type="button"
                    onClick={() => setActiveStageIndex(idx)}
                    className={`pb-3 transition-colors cursor-pointer flex items-baseline gap-2 relative ${
                      isActive ? "text-white font-medium" : "text-zinc-500 hover:text-zinc-300"
                    }`}
                  >
                    <span className="text-blue-400">0{idx + 1}</span>
                    <span>{stage.step}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Stage Detail Drawer */}
            <div className="py-6 px-8 border-l border-white/[0.1] bg-white/[0.01] space-y-2">
              <div className="text-xs font-mono text-blue-400 uppercase tracking-wider">
                STAGE 0{activeStageIndex + 1}: {activeStage.title} · {activeStage.shortRole}
              </div>
              <p className="text-base text-zinc-300 font-sans leading-relaxed max-w-3xl">
                {activeStage.desc}
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* LEVEL 3: FOUR CORE SUBSYSTEMS                                             */}
        {/* ========================================================================= */}
        <section className="space-y-10 pb-16 border-b border-white/[0.08]">
          <div className="space-y-1">
            <span className="text-xs font-mono text-blue-400 tracking-wider uppercase">
              SUBSYSTEM SPECIFICATIONS
            </span>
            <h2 className="text-2xl sm:text-3xl font-sans font-light text-white">
              Pairwise Feature Engineering & Clustering Rigor
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            <div className="space-y-2 border-l border-white/[0.1] pl-5">
              <div className="text-xs font-mono text-blue-400 uppercase">
                01 / DUAL-WINDOW PARTITIONING
              </div>
              <h4 className="text-base font-sans font-medium text-white">
                Temporal Data Leakage Prevention
              </h4>
              <p className="text-sm text-zinc-400 font-sans leading-relaxed">
                Aggregates 12 interaction features strictly over Days -120 to -30, evaluating ground-truth predictions over Days -30 to 0. Guarantees zero look-ahead bias in model evaluation.
              </p>
            </div>

            <div className="space-y-2 border-l border-white/[0.1] pl-5">
              <div className="text-xs font-mono text-blue-400 uppercase">
                02 / COMPLETE-LINKAGE CLUSTERING
              </div>
              <h4 className="text-base font-sans font-medium text-white">
                Mathematical Distance Guarantee (t=0.75)
              </h4>
              <p className="text-sm text-zinc-400 font-sans leading-relaxed">
                Hierarchical agglomerative clustering on pairwise Jaccard distance with maximum-distance linkage guarantees every pair within a cluster shares at least 25% co-absence overlap.
              </p>
            </div>

            <div className="space-y-2 border-l border-white/[0.1] pl-5">
              <div className="text-xs font-mono text-blue-400 uppercase">
                03 / DYADIC INTERACTION SIGNALS
              </div>
              <h4 className="text-base font-sans font-medium text-white">
                12 Pairwise Temporal & Behavioral Features
              </h4>
              <p className="text-sm text-zinc-400 font-sans leading-relaxed">
                Historical interaction dynamics (recency of shared leaves, baseline leave rates, Jaccard overlap, weekend bridge leaves) accounted for &gt;78% of model predictive importance.
              </p>
            </div>

            <div className="space-y-2 border-l border-white/[0.1] pl-5">
              <div className="text-xs font-mono text-blue-400 uppercase">
                04 / RULE-BASED EXPLAINABILITY
              </div>
              <h4 className="text-base font-sans font-medium text-white">
                Operational Risk Driver Translation
              </h4>
              <p className="text-sm text-zinc-400 font-sans leading-relaxed">
                Maps ensemble probability scores into operational drivers (frequent weekend bridge pairings, synchronized unplanned absences) for proactive departmental shift planning.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* LEVEL 4: EXPANDABLE TECHNICAL DEEP DIVE (Zero Box Cards)                   */}
        {/* ========================================================================= */}
        <section className="space-y-6 pb-16 border-b border-white/[0.08]">
          <button
            type="button"
            onClick={() => setDeepDiveOpen(!deepDiveOpen)}
            className="w-full flex items-baseline justify-between text-left group cursor-pointer focus-visible:outline-none"
          >
            <div className="space-y-1">
              <span className="text-xs font-mono text-blue-400 uppercase tracking-wider">
                DEEP DIVE PROTOCOLS
              </span>
              <h3 className="text-xl sm:text-2xl font-sans font-light text-white group-hover:text-blue-400 transition-colors">
                Feature Importance Rankings & Clustering Schematics
              </h3>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 shrink-0">
              <span>{deepDiveOpen ? "Collapse Specs" : "Expand Specs"}</span>
              {deepDiveOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </div>
          </button>

          {deepDiveOpen && (
            <div className="pt-6 space-y-8 animate-in fade-in duration-200">
              <div className="flex flex-wrap gap-4 border-b border-white/[0.08] pb-3 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setActiveDeepDiveTab("schematic")}
                  className={`pb-2 cursor-pointer transition-colors ${
                    activeDeepDiveTab === "schematic" ? "text-white font-medium border-b border-blue-500" : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  Dual-Window Diagram
                </button>
                <button
                  type="button"
                  onClick={() => setActiveDeepDiveTab("features")}
                  className={`pb-2 cursor-pointer transition-colors ${
                    activeDeepDiveTab === "features" ? "text-white font-medium border-b border-blue-500" : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  Feature Importances
                </button>
                <button
                  type="button"
                  onClick={() => setActiveDeepDiveTab("clustering")}
                  className={`pb-2 cursor-pointer transition-colors ${
                    activeDeepDiveTab === "clustering" ? "text-white font-medium border-b border-blue-500" : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  Clustering Math
                </button>
                <button
                  type="button"
                  onClick={() => setActiveDeepDiveTab("rules")}
                  className={`pb-2 cursor-pointer transition-colors ${
                    activeDeepDiveTab === "rules" ? "text-white font-medium border-b border-blue-500" : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  Explainability Heuristics
                </button>
              </div>

              {activeDeepDiveTab === "schematic" && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-zinc-500">
                    <span>// INTERACTIVE 120-DAY DUAL WINDOW ML PIPELINE</span>
                    <span className="text-blue-400">CLICK ANY NODE TO INSPECT SPECS</span>
                  </div>
                  <N8nFlowCanvas systemSlug="absence-risk" />
                </div>
              )}

              {activeDeepDiveTab === "features" && (
                <div className="space-y-4 font-sans text-xs sm:text-sm text-zinc-300">
                  <h4 className="font-mono text-xs uppercase text-blue-400">
                    12 Dyadic Interaction Features & Importance Weights
                  </h4>
                  <div className="divide-y divide-white/[0.06]">
                    {FEATURE_IMPORTANCES.map((feat) => (
                      <div key={feat.name} className="py-2.5 flex items-baseline justify-between gap-4 font-mono text-xs">
                        <div>
                          <span className="text-zinc-500 mr-2">#{feat.rank}</span>
                          <span className="text-white font-medium">{feat.name}</span>
                          <span className="text-zinc-400 font-sans text-xs ml-3 hidden sm:inline">{feat.desc}</span>
                        </div>
                        <span className="text-blue-400 font-semibold shrink-0">{feat.importance}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeDeepDiveTab === "clustering" && (
                <div className="space-y-4 font-sans text-sm text-zinc-300 leading-relaxed max-w-3xl">
                  <h4 className="font-mono text-xs uppercase text-blue-400">
                    Complete-Linkage Clustering Proof & Guarantees
                  </h4>
                  <p>
                    Unlike average-linkage or single-linkage which permits chaining of dissimilar members, complete-linkage calculates cluster distance as the maximum pairwise distance between any pair:
                  </p>
                  <p className="font-mono text-xs text-blue-400 bg-white/[0.02] p-3 rounded border border-white/[0.06]">
                    D(A, B) = max &#123; d(x, y) : x &isin; A, y &isin; B &#125;
                  </p>
                  <p>
                    By cutting the dendrogram at distance threshold <strong>t = 0.75</strong>, the maximum pairwise distance between any two employees in a cluster is guaranteed to be &le; 0.75.
                    Since Jaccard Distance = 1 - Jaccard Similarity, this mathematically proves:
                  </p>
                  <p className="font-mono text-xs text-blue-400 bg-white/[0.02] p-3 rounded border border-white/[0.06]">
                    Similarity(x, y) = 1 - d(x, y) &ge; 1 - 0.75 = 0.25 (25% co-absence overlap)
                  </p>
                </div>
              )}

              {activeDeepDiveTab === "rules" && (
                <div className="space-y-4 font-sans text-sm text-zinc-300 leading-relaxed max-w-3xl">
                  <h4 className="font-mono text-xs uppercase text-blue-400">
                    Explainability Translation Heuristics
                  </h4>
                  <p>
                    To enable operations teams to act without machine learning expertise, prediction scores are paired with transparent heuristic explanations:
                  </p>
                  <ul className="space-y-2 pl-4 text-xs text-zinc-400 list-disc">
                    <li><strong>Recency Driver:</strong> If co-absence occurred within the last 14 days, flags active high-frequency synchronization.</li>
                    <li><strong>Bridge Pattern Driver:</strong> If weekend bridge ratio exceeds 40%, flags Friday/Monday extended weekend correlation.</li>
                    <li><strong>Cluster Impact:</strong> Identifies if both employees belong to one of the 147 workforce clusters, indicating departmental team risk.</li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </section>

        {/* ========================================================================= */}
        {/* TECHNOLOGIES & CASE STUDY NAVIGATION                                      */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 block">
            DEPLOYED TECHNOLOGIES
          </span>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="text-xs font-mono px-3 py-1.5 rounded border border-white/[0.08] bg-white/[0.02] text-zinc-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Case Study Bottom Navigation */}
        <ProjectNav currentSlug="absence-risk" />
      </main>
    </div>
  );
}
