"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { GlassHero } from "@/components/GlassHero";
import { TelemetryLedger } from "@/components/TelemetryLedger";
import { NeuralBackground } from "@/components/NeuralBackground";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SoundToggle } from "@/components/SoundProvider";
import { Footer } from "@/components/Footer";
import { CommandPalette } from "@/components/CommandPalette";

export default function InteractiveShowcasePage() {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative min-h-screen bg-[var(--background)] text-[var(--foreground)] selection:bg-blue-600/30 selection:text-blue-200">
      <NeuralBackground />

      {/* Top Prototype Notification Banner */}
      <aside className="relative z-50 bg-blue-950/40 border-b border-blue-500/20 backdrop-blur-md px-4 sm:px-8 py-2.5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono">
          <div className="flex items-center gap-2 text-blue-300">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span className="font-semibold uppercase tracking-wider">Experimental Prototype</span>
            <span className="text-zinc-600 dark:text-zinc-500">|</span>
            <span className="text-zinc-400 hidden sm:inline">Interactive Liquid-Glass Reveal Lens & Portrait</span>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-zinc-300 hover:text-white transition-colors underline decoration-blue-500/50 hover:decoration-blue-400"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Clean Portfolio</span>
          </Link>
        </div>
      </aside>

      {/* Showcase Minimal Header */}
      <nav className="relative z-40 py-4 px-6 sm:px-10 border-b border-zinc-200 dark:border-white/[0.08] backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-sans font-medium text-zinc-900 dark:text-white hover:opacity-80 transition-opacity"
          >
            <span className="font-mono text-blue-500 font-bold">&larr;</span>
            <span>Parth Gandhi</span>
            <span className="text-xs font-mono text-zinc-500">/ interactive showcase</span>
          </Link>

          <div className="flex items-center gap-3">
            <SoundToggle />
            <ThemeToggle />
            <button
              onClick={() => setCommandPaletteOpen(true)}
              className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-300 dark:border-white/[0.12] bg-white/5 text-xs font-mono text-zinc-400 hover:text-white hover:border-blue-400/50 transition-colors"
            >
              <span>⌘K</span>
            </button>
          </div>
        </div>
      </nav>

      {/* The Interactive Glass Hero & Telemetry */}
      <main className="relative z-10 flex flex-col">
        <GlassHero />
        <TelemetryLedger />
      </main>

      <Footer />

      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
      />
    </div>
  );
}
