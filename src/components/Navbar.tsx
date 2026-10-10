"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Menu, X, ArrowUpRight, ShieldCheck, Cpu } from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { VisitorCounter } from "@/components/VisitorCounter";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SoundToggle } from "@/components/SoundProvider";

interface NavbarProps {
  onOpenCommandPalette: () => void;
}

export function Navbar({ onOpenCommandPalette }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md ${
          scrolled
            ? "header-scrolled py-3 shadow-xs"
            : "header-top bg-transparent py-4 sm:py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-10 flex items-center justify-between gap-4">
          {/* Left: Name and Title in Refined Editorial Typography */}
          <Link href="/" className="group flex items-baseline gap-2.5 select-none shrink-0" onClick={closeMenu}>
            <span className="font-sans font-semibold tracking-tight text-zinc-950 dark:text-white text-base">
              Parth Gandhi
            </span>
            <span className="text-zinc-500 dark:text-zinc-400 font-serif italic text-sm hidden sm:inline">
              / Systems Engineer
            </span>
          </Link>

          {/* Center: Live Station with In-Place Scrolled View Counter (Zero Congestion) */}
          <div className="hidden xl:flex items-center gap-3 text-xs text-zinc-600 dark:text-zinc-400 font-sans">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              <span className="font-medium text-zinc-800 dark:text-zinc-300">Hexylon Analytics</span>
            </div>
            <span className="text-zinc-300 dark:text-zinc-700">·</span>
            {scrolled ? (
              <div className="transition-all duration-200">
                <VisitorCounter variant="minimal" />
              </div>
            ) : (
              <span className="text-zinc-500 dark:text-zinc-400">{PERSONAL_INFO.location}</span>
            )}
          </div>

          {/* Right: Desktop Editorial Index Links, Theme, Sound & Search */}
          <nav className="flex items-center gap-3 sm:gap-6 text-xs font-sans tracking-wide">
            <a
              href="#systems"
              className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors editorial-link hidden md:inline"
            >
              01 / Systems
            </a>
            <a
              href="#architecture"
              className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors editorial-link hidden lg:inline"
            >
              02 / Architecture
            </a>
            <a
              href="#doctrine"
              className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors editorial-link hidden xl:inline"
            >
              03 / Doctrine
            </a>
            <a
              href="#contact"
              className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors editorial-link hidden sm:inline"
            >
              Contact
            </a>

            {/* Utility Toolbar: Sound FX + 1-Click Theme Toggle + Search */}
            <div className="flex items-center gap-2 pl-2 border-l border-zinc-200 dark:border-white/[0.1]">
              {/* Audio Feedback Toggle */}
              <SoundToggle />

              {/* 1-Click Dark/Light Theme Toggle */}
              <ThemeToggle />

              {/* Quick Command Palette Search */}
              <button
                type="button"
                onClick={onOpenCommandPalette}
                className="hidden sm:flex items-center gap-1.5 text-xs text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white px-2.5 py-1.5 rounded-full border border-zinc-200 dark:border-white/[0.1] hover:border-zinc-300 dark:hover:border-white/[0.25] transition-all cursor-pointer bg-black/[0.02] dark:bg-white/[0.02]"
                aria-label="Open command palette"
              >
                <Search className="w-3 h-3 text-zinc-500 dark:text-zinc-400" />
                <kbd className="font-mono text-[10px] text-zinc-500 dark:text-zinc-400">⌘K</kbd>
              </button>

              {/* Mobile Hamburger Drawer Trigger */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="sm:hidden p-1.5 rounded-full border border-zinc-200 dark:border-white/[0.1] text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors"
                aria-label="Toggle mobile menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Drawer Menu (Full Navigation for Touch Phones) */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm sm:hidden animate-in fade-in duration-200"
          onClick={closeMenu}
        >
          <div
            className="fixed top-16 left-0 right-0 max-h-[85vh] overflow-y-auto bg-[#fbfbfa] dark:bg-[#090a0f] border-b border-zinc-200 dark:border-white/[0.1] shadow-2xl p-6 space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Live Station & Visitor Counter in Mobile Drawer */}
            <div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-white/[0.08] text-xs font-mono">
              <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                <span>Hexylon Analytics</span>
              </div>
              <VisitorCounter variant="minimal" />
            </div>

            {/* Editorial Page Links */}
            <div className="space-y-4 font-sans text-sm">
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block">
                MONOGRAPH SECTIONS
              </span>
              <div className="space-y-3">
                <a
                  href="#systems"
                  onClick={closeMenu}
                  className="flex items-center justify-between text-zinc-900 dark:text-white py-1 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <span>01 / Flagship Systems & Architectures</span>
                  <span className="text-xs text-zinc-400 font-mono">#systems</span>
                </a>
                <a
                  href="#architecture"
                  onClick={closeMenu}
                  className="flex items-center justify-between text-zinc-900 dark:text-white py-1 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <span>02 / Four Architectural Pillars</span>
                  <span className="text-xs text-zinc-400 font-mono">#architecture</span>
                </a>
                <a
                  href="#inquiry"
                  onClick={closeMenu}
                  className="flex items-center justify-between text-zinc-900 dark:text-white py-1 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <span>03 / System Reasoning Console</span>
                  <span className="text-xs text-zinc-400 font-mono">#inquiry</span>
                </a>
                <a
                  href="#inventory"
                  onClick={closeMenu}
                  className="flex items-center justify-between text-zinc-900 dark:text-white py-1 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <span>04 / Production Tech Inventory</span>
                  <span className="text-xs text-zinc-400 font-mono">#inventory</span>
                </a>
                <a
                  href="#doctrine"
                  onClick={closeMenu}
                  className="flex items-center justify-between text-zinc-900 dark:text-white py-1 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <span>05 / Engineering Doctrine</span>
                  <span className="text-xs text-zinc-400 font-mono">#doctrine</span>
                </a>
                <a
                  href="#contact"
                  onClick={closeMenu}
                  className="flex items-center justify-between text-zinc-900 dark:text-white py-1 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <span>06 / Direct Dispatch & Contact</span>
                  <span className="text-xs text-zinc-400 font-mono">#contact</span>
                </a>
              </div>
            </div>

            {/* Direct Case Studies */}
            <div className="pt-4 border-t border-zinc-200 dark:border-white/[0.08] space-y-3 font-sans">
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block">
                FULL CASE STUDIES & PIPELINES
              </span>
              <div className="grid grid-cols-1 gap-2">
                <Link
                  href="/work/agentic-erp"
                  onClick={closeMenu}
                  className="p-3 rounded-lg border border-zinc-200 dark:border-white/[0.08] bg-zinc-50 dark:bg-white/[0.02] flex items-center justify-between hover:border-blue-500 transition-colors"
                >
                  <div>
                    <div className="text-xs font-semibold text-zinc-900 dark:text-white">Agentic ERP</div>
                    <div className="text-[11px] text-zinc-500">Autonomous workflow execution graph</div>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
                </Link>

                <Link
                  href="/work/codebase-rag"
                  onClick={closeMenu}
                  className="p-3 rounded-lg border border-zinc-200 dark:border-white/[0.08] bg-zinc-50 dark:bg-white/[0.02] flex items-center justify-between hover:border-blue-500 transition-colors"
                >
                  <div>
                    <div className="text-xs font-semibold text-zinc-900 dark:text-white">CodeBase RAG</div>
                    <div className="text-[11px] text-zinc-500">AST parser & pgvector retrieval graph</div>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
                </Link>

                <Link
                  href="/work/absence-risk"
                  onClick={closeMenu}
                  className="p-3 rounded-lg border border-zinc-200 dark:border-white/[0.08] bg-zinc-50 dark:bg-white/[0.02] flex items-center justify-between hover:border-blue-500 transition-colors"
                >
                  <div>
                    <div className="text-xs font-semibold text-zinc-900 dark:text-white">Absence Risk Prediction</div>
                    <div className="text-[11px] text-zinc-500">Temporal dyadic clustering pipeline</div>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
                </Link>
              </div>
            </div>

            {/* Quick Search Action */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  closeMenu();
                  onOpenCommandPalette();
                }}
                className="w-full flex items-center justify-center gap-2 p-2.5 rounded-lg border border-zinc-200 dark:border-white/[0.1] bg-black/[0.02] dark:bg-white/[0.03] text-xs font-mono text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Search Systems & Actions (Command Palette)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
