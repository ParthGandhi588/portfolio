import React from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, LineChart, Network, Layers, BarChart2 } from "lucide-react";
import { PROJECTS } from "@/data/portfolioData";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Absence Risk Prediction Case Study — Parth Gandhi",
  description:
    "An applied ML workflow that analyzes employee leave and attendance patterns to identify co-leave relationships and predict short-term co-leave risk.",
};

export default function AbsenceRiskPage() {
  const project = PROJECTS.find((p) => p.slug === "absence-risk")!;

  return (
    <div className="min-h-screen bg-[#090a0e] text-[#f3f4f6]">
      {/* Top Navigation */}
      <nav className="border-b border-white/[0.08] bg-[#090a0e]/90 backdrop-blur-md sticky top-0 z-40 py-3.5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>BACK TO SYSTEMS</span>
          </Link>

          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
            <span>ENTERPRISE ML WORKFLOW</span>
          </div>
        </div>
      </nav>

      {/* Case Study Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20 space-y-14">
        {/* Header Block */}
        <header className="space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 font-semibold tracking-wider uppercase">
            <span>{project.category}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-mono font-bold tracking-tight text-white">
            {project.title}
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed font-sans">
            {project.description}
          </p>

          <div className="p-4 rounded-lg border border-cyan-500/25 bg-cyan-950/20 font-mono text-sm text-cyan-300 flex items-start gap-3 mt-6">
            <span className="text-cyan-400 font-bold shrink-0">CORE RULE //</span>
            <span>&quot;Moving beyond heuristics: engineering pairwise behavioral features into explainable ML predictions.&quot;</span>
          </div>
        </header>

        {/* Technical Overview Metadata Grid */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-lg border border-white/[0.08] bg-[#0c0e15]/80 font-mono text-xs">
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
          <h2 className="text-xl font-mono font-bold text-white tracking-wide border-b border-white/[0.08] pb-2">
            01 // PROBLEM & FORMULATION
          </h2>
          <div className="text-sm sm:text-base text-zinc-300 space-y-3 leading-relaxed font-sans">
            <p>
              In enterprise operations, unscheduled absences often do not happen in isolation. When interdependent team members
              or correlated pairs take concurrent unscheduled leave, production shifts stall and operational bottlenecks emerge.
            </p>
            <p>
              Traditional HR systems only count retrospective individual absences without capturing relational correlation.
              The objective of this engineering workflow was to mathematically model pairwise leave dynamics,
              extract behavioral signals from historical attendance logs, and provide early warning predictions along with
              interpretable cluster structures.
            </p>
          </div>
        </section>

        {/* 2. System Architecture & Pipeline */}
        <section className="space-y-5">
          <h2 className="text-xl font-mono font-bold text-white tracking-wide border-b border-white/[0.08] pb-2">
            02 // ML PIPELINE ARCHITECTURE
          </h2>
          <p className="text-sm text-zinc-300 font-sans leading-relaxed">
            The data pipeline transitions from raw attendance records into an engineered pairwise feature matrix,
            supervised classification, and unsupervised cluster dendrograms.
          </p>

          {/* ASCII Architecture Flow */}
          <div className="p-5 rounded-lg border border-white/[0.08] bg-black/60 font-mono text-xs overflow-x-auto">
            <div className="text-zinc-500 mb-3">// ABSENCE RISK PREDICTION PIPELINE</div>
            <pre className="text-cyan-300 leading-snug">
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
          <h2 className="text-xl font-mono font-bold text-white tracking-wide border-b border-white/[0.08] pb-2">
            03 // TECHNICAL SPECIFICATIONS
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded border border-white/[0.08] bg-[#0c0e15]/70 space-y-2">
              <span className="text-xs font-mono font-bold text-cyan-300">
                12 PAIRWISE TEMPORAL & BEHAVIORAL FEATURES
              </span>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                Engineered dyadic features capturing past joint leaves, interval between concurrent leaves,
                ratio of joint leaves to total individual leaves, and shift schedule dependencies.
              </p>
            </div>

            <div className="p-4 rounded border border-white/[0.08] bg-[#0c0e15]/70 space-y-2">
              <span className="text-xs font-mono font-bold text-cyan-300">
                90-DAY FEATURE WINDOW / 30-DAY TARGET
              </span>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                Predictive separation ensuring no data leakage: rolling 90-day observation window predicting binary
                co-occurrence in the subsequent 30-day operational period.
              </p>
            </div>

            <div className="p-4 rounded border border-white/[0.08] bg-[#0c0e15]/70 space-y-2">
              <span className="text-xs font-mono font-bold text-cyan-300">
                RANDOM FOREST ENSEMBLE (80/20 SPLIT)
              </span>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                Trained on pairwise feature vectors with stratified 80% train and 20% validation split, mitigating
                individual variance and preserving non-linear interaction terms.
              </p>
            </div>

            <div className="p-4 rounded border border-white/[0.08] bg-[#0c0e15]/70 space-y-2">
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
          <h2 className="text-xl font-mono font-bold text-white tracking-wide border-b border-white/[0.08] pb-2">
            04 // EXPLAINABILITY & OPERATIONAL VALUE
          </h2>
          <div className="p-5 rounded-lg border border-white/[0.08] bg-[#0c0e15]/80 space-y-3">
            <p className="text-sm text-zinc-300 leading-relaxed font-sans">
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
