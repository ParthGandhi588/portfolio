"use client";

import React from "react";
import { ABOUT_TEXT, PERSONAL_INFO, CURRENTLY_EXPLORING } from "@/data/portfolioData";

export function About() {
  const paragraphs = ABOUT_TEXT.split("\n\n");

  return (
    <section id="about" className="py-24 sm:py-36 border-t border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-10 border-b border-white/[0.08] gap-6">
          <div className="space-y-2">
            <span className="text-xs font-mono text-blue-400 tracking-wider uppercase">
              INDEX 07 // CONTEXT & ACTIVE RESEARCH
            </span>
            <h2 className="text-3xl sm:text-5xl font-sans font-light text-white tracking-tight">
              About & <span className="font-serif italic text-white">Laboratory</span> Focus
            </h2>
          </div>
          <p className="text-sm text-zinc-400 font-sans max-w-md leading-relaxed">
            Personal engineering philosophy and active technical domains currently being benchmarked.
          </p>
        </div>

        {/* 2-Column Split: Context & Explorations (Zero Box Cards) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 pt-12 items-start">
          {/* Left Column: About Narrative (6 cols) */}
          <div className="lg:col-span-6 space-y-8">
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 block pb-4 border-b border-white/[0.08]">
              ENGINEER DOSSIER // AHMEDABAD, IN
            </span>

            <div className="space-y-6 text-base sm:text-lg text-zinc-300 font-sans leading-relaxed">
              {paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            <div className="pt-6 border-t border-white/[0.08] space-y-2">
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">
                LOCATION & AVAILABILITY
              </span>
              <p className="text-sm text-zinc-300 font-sans">
                Stationed in {PERSONAL_INFO.location}. Open to senior engineering discussions and AI systems roles.
              </p>
            </div>
          </div>

          {/* Right Column: Currently Exploring List (6 cols) */}
          <div className="lg:col-span-6 space-y-8 border-l border-white/[0.08] pl-0 lg:pl-10">
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 block pb-4 border-b border-white/[0.08]">
              ACTIVE LABORATORY R&D DOMAINS
            </span>

            <div className="divide-y divide-white/[0.06]">
              {CURRENTLY_EXPLORING.map((item, idx) => (
                <div key={item.topic} className="py-4 space-y-1">
                  <div className="flex items-baseline justify-between">
                    <h4 className="text-sm font-sans font-medium text-white">
                      {item.topic}
                    </h4>
                    <span className="font-mono text-[10px] text-blue-400">
                      R&D 0{idx + 1}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
