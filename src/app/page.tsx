"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { WhatIBuild } from "@/components/WhatIBuild";
import { FlagshipProjects } from "@/components/FlagshipProjects";
import { Experience } from "@/components/Experience";
import { TechnologyStack } from "@/components/TechnologyStack";
import { Philosophy } from "@/components/Philosophy";
import { About } from "@/components/About";
import { CurrentlyExploring } from "@/components/CurrentlyExploring";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { CommandPalette } from "@/components/CommandPalette";

export default function Home() {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  // Global hotkey listener in page root
  React.useEffect(() => {
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
    <div className="relative min-h-screen bg-[#090a0e] text-[#f3f4f6] selection:bg-cyan-500/20 selection:text-white bg-tech-grid">
      {/* Background ambient lighting */}
      <div className="ambient-glow fixed inset-0 pointer-events-none -z-10" />
      <div className="ambient-glow-bottom fixed inset-0 pointer-events-none -z-10" />

      {/* Global Navigation */}
      <Navbar onOpenCommandPalette={() => setCommandPaletteOpen(true)} />

      {/* Main Content Sections */}
      <main className="relative z-10 flex flex-col">
        <Hero />
        <WhatIBuild />
        <FlagshipProjects />
        <Experience />
        <TechnologyStack />
        <Philosophy />
        <About />
        <CurrentlyExploring />
        <Contact />
      </main>

      {/* Minimal Footer */}
      <Footer />

      {/* Command Palette Modal */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
      />
    </div>
  );
}
