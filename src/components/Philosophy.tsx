"use client";

import React from "react";
import { PHILOSOPHY } from "@/data/portfolioData";

export function Philosophy() {
  return (
    <section id="doctrine" className="py-24 sm:py-36 border-t border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-10 border-b border-white/[0.08] gap-6">
          <div className="space-y-2">
            <span className="text-xs font-mono text-blue-400 tracking-wider uppercase">
              INDEX 05 // SYSTEM DOCTRINE & PRINCIPLES
            </span>
            <h2 className="text-3xl sm:text-5xl font-sans font-light text-white tracking-tight">
              Engineering <span className="font-serif italic text-white">Doctrine</span>
            </h2>
          </div>
          <p className="text-sm text-zinc-400 font-sans max-w-md leading-relaxed">
            The core design philosophy governing how probabilistic reasoning models are bound to deterministic software systems.
          </p>
        </div>

        {/* The 5 Tenets (Editorial Manifesto Format, Zero Cards) */}
        <div className="divide-y divide-white/[0.08]">
          {PHILOSOPHY.map((item) => (
            <div
              key={item.number}
              className="py-10 sm:py-14 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-baseline"
            >
              <div className="lg:col-span-2 flex items-baseline gap-3">
                <span className="font-mono text-xs text-blue-400">0{item.number}</span>
                <span className="font-mono text-xs uppercase tracking-wider text-zinc-400">
                  {item.principle}
                </span>
              </div>

              <div className="lg:col-span-6 space-y-2">
                <h3 className="text-xl sm:text-2xl font-serif italic text-white leading-snug">
                  &quot;{item.statement}&quot;
                </h3>
              </div>

              <div className="lg:col-span-4">
                <p className="text-sm text-zinc-400 font-sans leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
