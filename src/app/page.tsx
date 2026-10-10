"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { FlagshipProjects } from "@/components/FlagshipProjects";
import { WhatIBuild } from "@/components/WhatIBuild";
import { InteractiveAgentConsole } from "@/components/InteractiveAgentConsole";
import { TechnologyStack } from "@/components/TechnologyStack";
import { Philosophy } from "@/components/Philosophy";
import { Experience } from "@/components/Experience";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { CommandPalette } from "@/components/CommandPalette";
import { NeuralBackground } from "@/components/NeuralBackground";

export default function Home() {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

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
    <div className="relative min-h-screen bg-[var(--background)] text-[var(--foreground)] selection:bg-blue-600/30 selection:text-blue-200">
      {/* Subtle Atmospheric Light Ambient Layer */}
      <NeuralBackground />

      {/* Global Minimalist Editorial Navigation */}
      <Navbar onOpenCommandPalette={() => setCommandPaletteOpen(true)} />

      {/* Main Editorial Content Monograph */}
      <main className="relative z-10 flex flex-col">
        <Hero />
        <FlagshipProjects />
        <WhatIBuild />
        <InteractiveAgentConsole />
        <TechnologyStack />
        <Philosophy />
        <Experience />
        <About />
        <Contact />
      </main>

      {/* Minimalist Editorial Footer */}
      <Footer />

      {/* Command Palette Modal (⌘K / Ctrl+K) */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
      />
    </div>
  );
}
