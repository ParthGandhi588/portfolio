"use client";

import React from "react";
import { EXPERIENCE, EDUCATION, CERTIFICATIONS } from "@/data/portfolioData";

export function Experience() {
  return (
    <section id="chronology" className="py-24 sm:py-36 border-t border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-10 border-b border-white/[0.08] gap-6">
          <div className="space-y-2">
            <span className="text-xs font-mono text-blue-400 tracking-wider uppercase">
              INDEX 06 // CAREER CHRONOLOGY & PEDIGREE
            </span>
            <h2 className="text-3xl sm:text-5xl font-sans font-light text-white tracking-tight">
              Experience & <span className="font-serif italic text-white">Education</span>
            </h2>
          </div>
          <p className="text-sm text-zinc-400 font-sans max-w-md leading-relaxed">
            Professional track record engineering production AI layers, agentic workflows, and machine learning pipelines.
          </p>
        </div>

        {/* Split Chronology Layout (Zero Box Cards) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 pt-12 items-start">
          {/* Main Professional Roles (8 cols) */}
          <div className="lg:col-span-8 space-y-16">
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 block pb-4 border-b border-white/[0.08]">
              PRODUCTION ROLES & DELIVERABLES
            </span>

            <div className="space-y-16">
              {EXPERIENCE.map((exp, idx) => (
                <div key={exp.company} className="space-y-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <div className="flex items-baseline gap-3">
                      <h3 className="text-2xl font-sans font-medium text-white">
                        {exp.company}
                      </h3>
                      <span className="text-sm font-serif italic text-blue-400">
                        {exp.role}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-zinc-400">
                      {exp.period} · {exp.location}
                    </span>
                  </div>

                  <p className="text-sm text-zinc-300 font-sans leading-relaxed">
                    {exp.description}
                  </p>

                  <ul className="space-y-2 pt-2">
                    {exp.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="text-xs sm:text-sm text-zinc-400 font-sans flex items-start gap-3">
                        <span className="text-blue-400 shrink-0">―</span>
                        <span className="leading-relaxed">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Credentials Column (4 cols) */}
          <div className="lg:col-span-4 space-y-12 border-l border-white/[0.08] pl-0 lg:pl-10">
            {/* Academic Pedigree */}
            <div className="space-y-6">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 block pb-4 border-b border-white/[0.08]">
                ACADEMIC FOUNDATION
              </span>

              <div className="space-y-6">
                {EDUCATION.map((edu) => (
                  <div key={edu.institution} className="space-y-1">
                    <div className="flex items-baseline justify-between text-xs font-mono text-zinc-400">
                      <span>{edu.period}</span>
                      <span className="text-blue-400">{edu.grade}</span>
                    </div>
                    <h4 className="text-sm font-sans font-medium text-white">
                      {edu.institution}
                    </h4>
                    <p className="text-xs text-zinc-400 font-sans">
                      {edu.degree} · {edu.location}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="space-y-6 pt-6 border-t border-white/[0.08]">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 block pb-4 border-b border-white/[0.08]">
                VERIFIED CREDENTIALS
              </span>

              <div className="space-y-4">
                {CERTIFICATIONS.map((cert) => (
                  <div key={cert.title} className="space-y-1">
                    <h4 className="text-xs font-sans font-medium text-white leading-snug">
                      {cert.title}
                    </h4>
                    <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
                      <span>{cert.issuer}</span>
                      <span>{cert.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
