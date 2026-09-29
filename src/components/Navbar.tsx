"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight, Search } from "lucide-react";
import { LinkedinIcon, GithubIcon } from "@/components/icons";
import { PERSONAL_INFO } from "@/data/portfolioData";

interface NavbarProps {
  onOpenCommandPalette: () => void;
}

const NAV_ITEMS = [
  { label: "WORK", href: "/#work", id: "work" },
  { label: "ABOUT", href: "/#about", id: "about" },
  { label: "EXPERIENCE", href: "/#experience", id: "experience" },
  { label: "CONTACT", href: "/#contact", id: "contact" },
];

export function Navbar({ onOpenCommandPalette }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Section spy
      const sections = ["work", "about", "experience", "contact"];
      const scrollPosition = window.scrollY + 120;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
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

  const handleMobileNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setMobileMenuOpen(false);
    // Smooth scroll if anchor
    if (href.startsWith("/#")) {
      const id = href.replace("/#", "");
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        scrolled
          ? "bg-[#090a0e]/90 backdrop-blur-md border-b border-white/[0.08] py-3 shadow-lg shadow-black/50"
          : "bg-transparent border-b border-transparent py-4 sm:py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand / Name */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 min-h-[44px] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 rounded py-1"
        >
          <div className="w-2 h-2 rounded-full bg-cyan-400 group-hover:scale-125 transition-transform duration-200 shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
          <span className="font-mono text-sm tracking-wider font-semibold text-zinc-100 group-hover:text-white transition-colors">
            {PERSONAL_INFO.name}
          </span>
          <span className="hidden lg:inline-flex items-center text-[10px] font-mono text-zinc-400 px-2 py-0.5 rounded border border-white/[0.06] bg-white/[0.02]">
            AI/ML DEVELOPER
          </span>
        </Link>

        {/* Desktop Nav Links with Active Section Indicator */}
        <nav
          className="hidden md:flex items-center gap-1 text-xs font-mono tracking-wide"
          aria-label="Main Navigation"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                className={`px-3.5 py-2 rounded-md transition-all duration-150 min-h-[40px] inline-flex items-center focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 ${
                  isActive
                    ? "text-cyan-300 font-semibold bg-cyan-950/40 border border-cyan-500/25"
                    : "text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.04] border border-transparent"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Right Action Items */}
        <div className="hidden md:flex items-center gap-2">
          {/* Command Palette trigger */}
          <button
            onClick={onOpenCommandPalette}
            type="button"
            className="min-h-[40px] flex items-center gap-2 px-3 py-1.5 text-xs font-mono rounded-lg border border-white/[0.08] bg-white/[0.03] text-zinc-400 hover:text-zinc-200 hover:border-cyan-500/40 hover:bg-white/[0.06] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 touch-manipulation"
            aria-label="Open Command Palette"
          >
            <Search className="w-3.5 h-3.5 text-cyan-400" />
            <span>Search</span>
            <kbd className="text-[10px] text-zinc-400 bg-black/60 px-1.5 py-0.5 rounded border border-white/[0.08]">
              ⌘K
            </kbd>
          </button>

          <div className="h-4 w-px bg-white/[0.08] mx-1" />

          {/* Social Links */}
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[40px] min-w-[40px] inline-flex items-center justify-center p-2 text-zinc-400 hover:text-white hover:bg-white/[0.05] rounded-lg border border-transparent hover:border-white/[0.08] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400"
            aria-label="GitHub Profile"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[40px] min-w-[40px] inline-flex items-center justify-center p-2 text-zinc-400 hover:text-white hover:bg-white/[0.05] rounded-lg border border-transparent hover:border-white/[0.08] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400"
            aria-label="LinkedIn Profile"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
        </div>

        {/* Mobile Menu & Command Toggle with min 44px touch targets */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onOpenCommandPalette}
            type="button"
            className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2 text-zinc-300 hover:text-white rounded-lg border border-white/[0.08] bg-white/[0.03] active:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 touch-manipulation"
            aria-label="Open Search Command Palette"
          >
            <Search className="w-4 h-4 text-cyan-400" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2 text-zinc-300 hover:text-white rounded-lg border border-white/[0.08] bg-white/[0.03] active:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 touch-manipulation"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-cyan-400" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer with full tap response and backdrop */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/[0.08] bg-[#090a0e]/98 backdrop-blur-xl px-5 py-5 space-y-4 shadow-2xl animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-1 font-mono text-sm tracking-wide">
            {NAV_ITEMS.map((item, idx) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleMobileNavClick(e, item.href)}
                  className={`min-h-[44px] flex items-center px-4 py-2.5 rounded-lg transition-colors touch-manipulation ${
                    isActive
                      ? "text-cyan-300 font-bold bg-cyan-950/40 border border-cyan-500/30"
                      : "text-zinc-300 hover:text-white hover:bg-white/[0.06]"
                  }`}
                >
                  <span className="text-cyan-400 font-semibold mr-2.5 text-xs">
                    0{idx + 1} //
                  </span>
                  <span>{item.label}</span>
                </a>
              );
            })}
          </nav>

          <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-zinc-400">
            <div className="flex items-center gap-2">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] flex items-center gap-1.5 px-3 py-2 rounded-lg hover:text-white transition-colors touch-manipulation"
              >
                <GithubIcon className="w-4 h-4" /> GITHUB
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] flex items-center gap-1.5 px-3 py-2 rounded-lg hover:text-white transition-colors touch-manipulation"
              >
                <LinkedinIcon className="w-4 h-4" /> LINKEDIN
              </a>
            </div>
            <a
              href={PERSONAL_INFO.resumePdf}
              download
              className="min-h-[44px] flex items-center gap-1.5 px-3 py-2 text-cyan-400 hover:text-cyan-300 font-semibold touch-manipulation"
            >
              RESUME <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
