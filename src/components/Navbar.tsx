"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight, Search } from "lucide-react";
import { LinkedinIcon, GithubIcon } from "@/components/icons";
import { PERSONAL_INFO } from "@/data/portfolioData";

interface NavbarProps {
  onOpenCommandPalette: () => void;
}

export function Navbar({ onOpenCommandPalette }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        scrolled
          ? "bg-[#090a0e]/85 backdrop-blur-md border-b border-white/[0.08] py-3.5 shadow-lg shadow-black/40"
          : "bg-transparent border-b border-transparent py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand / Name */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 rounded"
        >
          <div className="w-2 h-2 rounded-full bg-cyan-400 group-hover:scale-125 transition-transform duration-200 shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
          <span className="font-mono text-sm tracking-wider font-semibold text-zinc-100 group-hover:text-white transition-colors">
            {PERSONAL_INFO.name}
          </span>
          <span className="hidden lg:inline-flex items-center text-[11px] font-mono text-zinc-400 px-2 py-0.5 rounded border border-white/[0.06] bg-white/[0.02]">
            AI/ML DEVELOPER
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav
          className="hidden md:flex items-center gap-1 text-xs font-mono tracking-wide"
          aria-label="Main Navigation"
        >
          <a
            href="/#work"
            className="px-3 py-1.5 rounded text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.04] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400"
          >
            WORK
          </a>
          <a
            href="/#about"
            className="px-3 py-1.5 rounded text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.04] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400"
          >
            ABOUT
          </a>
          <a
            href="/#experience"
            className="px-3 py-1.5 rounded text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.04] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400"
          >
            EXPERIENCE
          </a>
          <a
            href="/#contact"
            className="px-3 py-1.5 rounded text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.04] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400"
          >
            CONTACT
          </a>
        </nav>

        {/* Right Action Items */}
        <div className="hidden md:flex items-center gap-2">
          {/* Command Palette trigger */}
          <button
            onClick={onOpenCommandPalette}
            type="button"
            className="flex items-center gap-2 px-2.5 py-1.5 text-xs font-mono rounded border border-white/[0.08] bg-white/[0.03] text-zinc-400 hover:text-zinc-200 hover:border-cyan-500/40 hover:bg-white/[0.06] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400"
            aria-label="Open Command Palette"
          >
            <Search className="w-3 h-3 text-cyan-400/80" />
            <span>Search</span>
            <kbd className="text-[10px] text-zinc-500 bg-black/40 px-1.5 py-0.5 rounded border border-white/[0.06]">
              ⌘K
            </kbd>
          </button>

          <div className="h-4 w-px bg-white/[0.08] mx-1" />

          {/* Social Links */}
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 text-zinc-400 hover:text-white hover:bg-white/[0.05] rounded border border-transparent hover:border-white/[0.06] transition-colors"
            aria-label="GitHub Profile"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 text-zinc-400 hover:text-white hover:bg-white/[0.05] rounded border border-transparent hover:border-white/[0.06] transition-colors"
            aria-label="LinkedIn Profile"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
        </div>

        {/* Mobile Menu & Command Toggle */}
        <div className="flex md:hidden items-center gap-1.5">
          <button
            onClick={onOpenCommandPalette}
            type="button"
            className="p-2 text-zinc-400 hover:text-zinc-200 rounded border border-white/[0.08] bg-white/[0.03] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400"
            aria-label="Open Search Command Palette"
          >
            <Search className="w-4 h-4 text-cyan-400/80" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            className="p-2 text-zinc-400 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 rounded border border-white/[0.08] bg-white/[0.03]"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/[0.08] bg-[#090a0e]/98 backdrop-blur-xl px-5 py-5 space-y-4">
          <nav className="flex flex-col space-y-2 font-mono text-sm tracking-wide">
            <a
              href="/#work"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded text-zinc-300 hover:text-white hover:bg-white/[0.06] transition-colors"
            >
              01 // WORK
            </a>
            <a
              href="/#about"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded text-zinc-300 hover:text-white hover:bg-white/[0.06] transition-colors"
            >
              02 // ABOUT
            </a>
            <a
              href="/#experience"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded text-zinc-300 hover:text-white hover:bg-white/[0.06] transition-colors"
            >
              03 // EXPERIENCE
            </a>
            <a
              href="/#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded text-zinc-300 hover:text-white hover:bg-white/[0.06] transition-colors"
            >
              04 // CONTACT
            </a>
          </nav>

          <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-zinc-400">
            <div className="flex items-center gap-3">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <GithubIcon className="w-3.5 h-3.5" /> GITHUB
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <LinkedinIcon className="w-3.5 h-3.5" /> LINKEDIN
              </a>
            </div>
            <a
              href={PERSONAL_INFO.resumePdf}
              download
              className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300"
            >
              RESUME <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
