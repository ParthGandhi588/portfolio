import React from "react";
import { EXPERIENCE, EDUCATION, CERTIFICATIONS } from "@/data/portfolioData";
import { Briefcase, GraduationCap, Award, Calendar, MapPin, CheckCircle2 } from "lucide-react";

export function Experience() {
  return (
    <section id="experience" className="py-20 sm:py-28 border-t border-white/[0.08] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 tracking-wider mb-2 uppercase">
            <span>// CAREER HISTORY</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight text-white">
            EXPERIENCE
          </h2>
          <p className="mt-3 text-base sm:text-lg text-zinc-400 leading-relaxed font-sans">
            Professional roles focused on generative AI engineering, enterprise agents, and machine learning systems.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12">
          {/* Main Experience Column (7 cols) */}
          <div className="lg:col-span-8 space-y-8">
            <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-2">
              <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
              <span>ROLES & ENGINEERING RESPONSIBILITIES</span>
            </h3>

            {EXPERIENCE.map((exp, idx) => (
              <div
                key={exp.company}
                className={`p-6 sm:p-7 rounded-xl border transition-all duration-300 relative ${
                  exp.current
                    ? "bg-[#0d0f17]/90 border-cyan-500/40 shadow-lg shadow-cyan-950/20 ring-1 ring-cyan-500/20"
                    : "bg-[#0c0e15]/50 border-white/[0.06] opacity-85 hover:opacity-100"
                }`}
              >
                {/* Active Indicator for Current Role */}
                {exp.current && (
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-[10px] font-mono text-cyan-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    <span>CURRENT ROLE</span>
                  </div>
                )}

                {/* Company & Role Header */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-lg sm:text-xl font-mono font-bold text-white">
                      {exp.company}
                    </h4>
                  </div>
                  <div className="text-sm font-mono text-cyan-400 font-medium">
                    {exp.role}
                  </div>
                </div>

                {/* Metadata */}
                <div className="mt-2.5 flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {exp.period}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    {exp.location}
                  </span>
                </div>

                {/* Summary */}
                <p className="mt-4 text-sm text-zinc-300 leading-relaxed font-sans">
                  {exp.description}
                </p>

                {/* Bullets */}
                <ul className="mt-4 space-y-2 border-t border-white/[0.06] pt-4">
                  {exp.bullets.map((bullet, bIdx) => (
                    <li
                      key={bIdx}
                      className="text-xs text-zinc-300 font-sans flex items-start gap-2.5 leading-relaxed"
                    >
                      <span className="text-cyan-400 font-mono text-xs mt-0.5">▹</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Sidebar: Education & Certifications (4 cols) */}
          <div className="lg:col-span-4 space-y-8">
            {/* Education */}
            <div className="space-y-4">
              <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-2">
                <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
                <span>EDUCATION</span>
              </h3>

              {EDUCATION.map((edu, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-lg border border-white/[0.08] bg-[#0c0e15]/70 space-y-2"
                >
                  <h4 className="text-sm font-mono font-semibold text-white">
                    {edu.institution}
                  </h4>
                  <div className="text-xs text-zinc-300 font-sans">
                    {edu.degree}
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono text-zinc-400 pt-1">
                    <span>{edu.period}</span>
                    <span className="text-cyan-400/90">{edu.grade}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Certifications */}
            <div className="space-y-4">
              <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-2">
                <Award className="w-3.5 h-3.5 text-cyan-400" />
                <span>CREDENTIALS</span>
              </h3>

              <div className="space-y-3">
                {CERTIFICATIONS.map((cert, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-lg border border-white/[0.08] bg-[#0c0e15]/70 space-y-1.5"
                  >
                    <h4 className="text-xs font-mono font-semibold text-zinc-200">
                      {cert.title}
                    </h4>
                    <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
                      <span>{cert.issuer}</span>
                      <span className="text-zinc-500">{cert.date}</span>
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
