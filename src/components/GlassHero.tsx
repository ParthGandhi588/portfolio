"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, FileText, Mail, Sparkles } from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolioData";

const DESKTOP_RADIUS = 235;
const MOBILE_RADIUS = 150;

export function GlassHero() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isRevealing, setIsRevealing] = useState(false);

  // Raw cursor target and smoothed interpolated values
  const rawPos = useRef({ x: -999, y: -999 });
  const smoothPos = useRef({ x: -999, y: -999 });
  const currentRadius = useRef(0);
  const targetRadius = useRef(0);
  const rafId = useRef<number | null>(null);
  const isTouchRef = useRef(false);

  useEffect(() => {
    setMounted(true);
    const container = containerRef.current;
    if (!container) return;

    // Center the initial point before first mouse interaction so it's ready
    const rect = container.getBoundingClientRect();
    rawPos.current = { x: rect.width * 0.65, y: rect.height * 0.45 };
    smoothPos.current = { x: rect.width * 0.65, y: rect.height * 0.45 };

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const posFactor = prefersReducedMotion ? 1 : 0.14;
    const radiusFactor = prefersReducedMotion ? 1 : 0.12;

    const updateFrame = () => {
      // Lerp smooth position towards raw cursor
      smoothPos.current.x += (rawPos.current.x - smoothPos.current.x) * posFactor;
      smoothPos.current.y += (rawPos.current.y - smoothPos.current.y) * posFactor;

      // Lerp reveal radius
      currentRadius.current += (targetRadius.current - currentRadius.current) * radiusFactor;

      if (containerRef.current) {
        containerRef.current.style.setProperty("--reveal-x", `${smoothPos.current.x.toFixed(2)}px`);
        containerRef.current.style.setProperty("--reveal-y", `${smoothPos.current.y.toFixed(2)}px`);
        containerRef.current.style.setProperty("--reveal-radius", `${currentRadius.current.toFixed(2)}px`);
      }

      rafId.current = requestAnimationFrame(updateFrame);
    };

    rafId.current = requestAnimationFrame(updateFrame);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  // Pointer event handlers (Desktop)
  const handlePointerEnter = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    rawPos.current = { x, y };
    targetRadius.current = DESKTOP_RADIUS;
    setIsRevealing(true);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    rawPos.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    if (targetRadius.current === 0) {
      targetRadius.current = DESKTOP_RADIUS;
      setIsRevealing(true);
    }
  };

  const handlePointerLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") return;
    targetRadius.current = 0;
    setIsRevealing(false);
  };

  // Touch event handlers (Mobile / Tablet)
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    isTouchRef.current = true;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect || !e.touches[0]) return;

    rawPos.current = {
      x: e.touches[0].clientX - rect.left,
      y: e.touches[0].clientY - rect.top,
    };
    targetRadius.current = MOBILE_RADIUS;
    setIsRevealing(true);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect || !e.touches[0]) return;

    rawPos.current = {
      x: e.touches[0].clientX - rect.left,
      y: e.touches[0].clientY - rect.top,
    };
  };

  const handleTouchEnd = () => {
    targetRadius.current = 0;
    setIsRevealing(false);
  };

  return (
    <section
      ref={containerRef}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-label="Interactive Liquid-Glass Portfolio Hero"
      className="relative w-full h-screen min-h-[640px] max-h-[1080px] overflow-hidden select-none bg-[var(--background)]"
      style={
        {
          "--reveal-x": "-999px",
          "--reveal-y": "-999px",
          "--reveal-radius": "0px",
        } as React.CSSProperties
      }
    >
      {/* ============================================================ */}
      {/* LAYER 1: BASE EDITORIAL PORTRAIT                             */}
      {/* ============================================================ */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-1000 ease-out pointer-events-none ${
          mounted ? "scale-100 opacity-100" : "scale-[1.035] opacity-0"
        }`}
        style={{
          backgroundImage: "url('/images/Base_imagae_Desktop.png')",
        }}
      />

      {/* High-key editorial soft gradient to ensure optimal contrast */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-white/75 via-white/20 to-transparent dark:from-black/75 dark:via-black/25 dark:to-transparent pointer-events-none"
      />

      {/* ============================================================ */}
      {/* LAYER 2: REVEAL LIQUID-GLASS PORTRAIT (CSS RADIAL MASK)      */}
      {/* ============================================================ */}
      <div
        aria-hidden="true"
        className="absolute inset-0 w-full h-full bg-cover bg-center pointer-events-none transition-opacity duration-300"
        style={{
          backgroundImage: "url('/images/Revel_image_Desktop.png')",
          maskImage:
            "radial-gradient(circle var(--reveal-radius, 0px) at var(--reveal-x, -999px) var(--reveal-y, -999px), black 0%, black 65%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(circle var(--reveal-radius, 0px) at var(--reveal-x, -999px) var(--reveal-y, -999px), black 0%, black 65%, transparent 100%)",
        }}
      />

      {/* Glowing cyan reveal boundary ring tracker */}
      <div
        aria-hidden="true"
        className="absolute rounded-full pointer-events-none transition-opacity duration-300 border border-cyan-500/50 dark:border-cyan-400/50 shadow-[0_0_30px_rgba(6,182,212,0.35)]"
        style={{
          left: "var(--reveal-x)",
          top: "var(--reveal-y)",
          width: "calc(var(--reveal-radius) * 2)",
          height: "calc(var(--reveal-radius) * 2)",
          transform: "translate(-50%, -50%)",
          opacity: isRevealing ? 0.85 : 0,
        }}
      />

      {/* Compact subtle bottom feather at the very edge to soften the transition */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-16 sm:h-24 pointer-events-none z-10 bg-gradient-to-b from-transparent via-[var(--background)]/50 to-[var(--background)]"
      />

      {/* ============================================================ */}
      {/* LAYER 3: TECHNICAL GRID & GEOMETRIC OVERLAY                  */}
      {/* ============================================================ */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-25"
      >
        {/* Subtle coordinate crossbars */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem]" />

        {/* Large technical circle blueprint accent */}
        <div className="absolute right-[8%] top-[12%] w-[480px] h-[480px] rounded-full border border-zinc-900/10 dark:border-white/10 hidden lg:block animate-[spin_120s_linear_infinite]" />
        <div className="absolute right-[12%] top-[18%] w-[380px] h-[380px] rounded-full border border-dashed border-cyan-500/20 dark:border-cyan-400/20 hidden lg:block" />
      </div>

      {/* ============================================================ */}
      {/* LAYER 4: HEADLINE, COPY & EDITORIAL METADATA                 */}
      {/* ============================================================ */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between px-6 sm:px-12 lg:px-20 pt-28 sm:pt-36 pb-8 pointer-events-none">
        {/* Top telemetry & status badge */}
        <div className="flex items-center justify-between pointer-events-auto">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-zinc-900/85 backdrop-blur-md border border-zinc-200/90 dark:border-white/15 text-xs font-mono text-zinc-800 dark:text-zinc-200 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 dark:bg-cyan-400 animate-pulse" />
            <span className="tracking-wider uppercase font-medium">01 // PRODUCTION RUNTIMES</span>
            <span className="text-zinc-300 dark:text-zinc-600 hidden sm:inline">|</span>
            <span className="text-zinc-600 dark:text-zinc-300 hidden sm:inline">{PERSONAL_INFO.status}</span>
          </div>

          {/* Right Manifesto (Fragment Mono Style) */}
          <div className="hidden md:flex flex-col text-right font-mono text-[11px] leading-tight tracking-wider text-zinc-800 dark:text-zinc-200 uppercase space-y-1 bg-white/90 dark:bg-zinc-900/85 backdrop-blur-md p-3 rounded-md border-r-2 border-cyan-500 shadow-xs">
            <span>BUILDING THE</span>
            <span>NEXT VERSION</span>
            <span className="text-cyan-600 dark:text-cyan-400 font-semibold">IN PUBLIC</span>
          </div>
        </div>

        {/* Main Editorial Statement Headline */}
        <div className="my-auto max-w-3xl pointer-events-auto">
          <p className="text-xs sm:text-sm font-mono tracking-widest uppercase text-cyan-600 dark:text-cyan-400 mb-4 flex items-center gap-2 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-300 animate-pulse" />
            <span>AI SYSTEMS & GENERATIVE ARCHITECTURE</span>
          </p>

          <h1 className="font-sans font-light tracking-[-0.065em] text-zinc-950 dark:text-white leading-[0.93] text-5xl sm:text-7xl lg:text-[5.5rem] xl:text-[6.2rem]">
            Building
            <br />
            Beyond
            <br />
            <span className="font-normal italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 dark:from-cyan-300 dark:via-blue-400 dark:to-indigo-300">
              Possible.
            </span>
          </h1>

          <p className="mt-6 sm:mt-8 text-base sm:text-xl text-zinc-700 dark:text-zinc-200 font-sans max-w-xl leading-relaxed">
            I engineer <span className="text-zinc-950 dark:text-white font-medium">AI systems</span> where probabilistic models meet{" "}
            <span className="text-cyan-600 dark:text-cyan-400 font-medium">deterministic software</span>. Turning complex workflows into
            autonomous, verifiable code.
          </p>

          {/* Interactive CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-4 text-sm font-sans">
            <a
              href="#systems"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 font-medium hover:bg-zinc-800 dark:hover:bg-cyan-50 hover:shadow-lg hover:shadow-cyan-500/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Explore Flagship Systems</span>
              <ArrowDown className="w-4 h-4 text-white dark:text-zinc-950" />
            </a>

            <a
              href={PERSONAL_INFO.resumePdf}
              download
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-white/90 dark:bg-zinc-800/80 backdrop-blur-md border border-zinc-300 dark:border-white/20 text-zinc-900 dark:text-white hover:border-cyan-500/60 dark:hover:border-cyan-400/60 hover:bg-white dark:hover:bg-zinc-700/80 transition-all shadow-xs"
            >
              <FileText className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span>Resume (PDF)</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />
            </a>

            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-white/90 dark:bg-zinc-800/80 backdrop-blur-md border border-zinc-300 dark:border-white/20 text-zinc-900 dark:text-white hover:border-cyan-500/60 dark:hover:border-cyan-400/60 hover:bg-white dark:hover:bg-zinc-700/80 transition-all shadow-xs"
            >
              <Mail className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span>Get in Touch</span>
            </a>
          </div>
        </div>

        {/* Bottom Navigation & Anchor */}
        <div className="relative z-20 flex items-center justify-end text-xs font-mono text-zinc-700 dark:text-zinc-300 pointer-events-auto">
          <a
            href="#systems"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-200/80 dark:border-white/10 shadow-xs text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:border-cyan-500/50 dark:hover:border-cyan-400/50 transition-all uppercase tracking-wider group"
          >
            <span>Scroll to explore monograph</span>
            <ArrowDown className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 group-hover:translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
