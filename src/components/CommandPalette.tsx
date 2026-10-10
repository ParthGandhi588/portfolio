"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Terminal,
  FileCode2,
  LineChart,
  Briefcase,
  FileText,
  Mail,
  X,
  ArrowRight,
  Bot,
  Layers,
  Compass,
  Cpu,
  User,
} from "lucide-react";
import { LinkedinIcon, GithubIcon } from "@/components/icons";
import { PERSONAL_INFO } from "@/data/portfolioData";

interface CommandItem {
  id: string;
  label: string;
  category: string;
  icon: React.ElementType;
  action: () => void;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const commands: CommandItem[] = [
    {
      id: "agentic-erp",
      label: "Agentic ERP (Enterprise AI Case Study)",
      category: "Systems",
      icon: Terminal,
      action: () => {
        router.push("/work/agentic-erp");
        onClose();
      },
    },
    {
      id: "codebase-rag",
      label: "CodeBase RAG (Tree-sitter AST Case Study)",
      category: "Systems",
      icon: FileCode2,
      action: () => {
        router.push("/work/codebase-rag");
        onClose();
      },
    },
    {
      id: "absence-risk",
      label: "Absence Risk Prediction (Applied ML Case Study)",
      category: "Systems",
      icon: LineChart,
      action: () => {
        router.push("/work/absence-risk");
        onClose();
      },
    },
    {
      id: "systems",
      label: "Selected Systems & Works",
      category: "Navigation",
      icon: Layers,
      action: () => {
        const el = document.getElementById("systems");
        if (el) el.scrollIntoView({ behavior: "smooth" });
        else router.push("/#systems");
        onClose();
      },
    },
    {
      id: "architecture",
      label: "Four Engineering Pillars",
      category: "Navigation",
      icon: Cpu,
      action: () => {
        const el = document.getElementById("architecture");
        if (el) el.scrollIntoView({ behavior: "smooth" });
        else router.push("/#architecture");
        onClose();
      },
    },
    {
      id: "inquiry",
      label: "Evaluate System Reasoning (Interactive Codex)",
      category: "Interactive",
      icon: Bot,
      action: () => {
        const el = document.getElementById("inquiry");
        if (el) el.scrollIntoView({ behavior: "smooth" });
        else router.push("/#inquiry");
        onClose();
      },
    },
    {
      id: "inventory",
      label: "Production Technical Inventory",
      category: "Navigation",
      icon: Cpu,
      action: () => {
        const el = document.getElementById("inventory");
        if (el) el.scrollIntoView({ behavior: "smooth" });
        else router.push("/#inventory");
        onClose();
      },
    },
    {
      id: "doctrine",
      label: "System Doctrine & Philosophy",
      category: "Navigation",
      icon: Compass,
      action: () => {
        const el = document.getElementById("doctrine");
        if (el) el.scrollIntoView({ behavior: "smooth" });
        else router.push("/#doctrine");
        onClose();
      },
    },
    {
      id: "chronology",
      label: "Career Chronology & Education",
      category: "Navigation",
      icon: Briefcase,
      action: () => {
        const el = document.getElementById("chronology");
        if (el) el.scrollIntoView({ behavior: "smooth" });
        else router.push("/#chronology");
        onClose();
      },
    },
    {
      id: "about",
      label: "About Parth Gandhi & Laboratory Focus",
      category: "Navigation",
      icon: User,
      action: () => {
        const el = document.getElementById("about");
        if (el) el.scrollIntoView({ behavior: "smooth" });
        else router.push("/#about");
        onClose();
      },
    },
    {
      id: "contact",
      label: "Direct Dispatch & Contact",
      category: "Navigation",
      icon: Mail,
      action: () => {
        const el = document.getElementById("contact");
        if (el) el.scrollIntoView({ behavior: "smooth" });
        else router.push("/#contact");
        onClose();
      },
    },
    {
      id: "resume",
      label: "Download Technical Resume (PDF)",
      category: "Actions",
      icon: FileText,
      action: () => {
        const link = document.createElement("a");
        link.href = PERSONAL_INFO.resumePdf;
        link.download = "ParthGandhi_Resume.pdf";
        link.click();
        onClose();
      },
    },
    {
      id: "github",
      label: "Open GitHub Profile",
      category: "External",
      icon: GithubIcon,
      action: () => {
        window.open(PERSONAL_INFO.github, "_blank");
        onClose();
      },
    },
    {
      id: "linkedin",
      label: "Open LinkedIn Profile",
      category: "External",
      icon: LinkedinIcon,
      action: () => {
        window.open(PERSONAL_INFO.linkedin, "_blank");
        onClose();
      },
    },
  ];

  const filteredCommands = commands.filter(
    (cmd) =>
      cmd.label.toLowerCase().includes(query.toLowerCase()) ||
      cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleClose = useCallback(() => {
    setQuery("");
    setSelectedIndex(0);
    onClose();
  }, [onClose]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !listRef.current) return;
    const selectedItem = itemRefs.current[selectedIndex];
    const container = listRef.current;
    if (!selectedItem) return;

    const containerRect = container.getBoundingClientRect();
    const itemRect = selectedItem.getBoundingClientRect();
    const padding = 8;

    if (itemRect.bottom > containerRect.bottom - padding) {
      container.scrollTop += itemRect.bottom - (containerRect.bottom - padding);
    } else if (itemRect.top < containerRect.top + padding) {
      container.scrollTop -= containerRect.top + padding - itemRect.top;
    }
  }, [selectedIndex, isOpen, filteredCommands.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) handleClose();
        return;
      }

      if (!isOpen) return;

      if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
        return;
      }

      if (filteredCommands.length === 0) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredCommands.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredCommands.length - 1
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleClose, filteredCommands, selectedIndex]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-900/25 dark:bg-black/80 backdrop-blur-md animate-in fade-in duration-150"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
    >
      <div
        className="w-full max-w-xl rounded-2xl border border-zinc-200/90 dark:border-white/[0.12] bg-white dark:bg-[#0c0d10] shadow-[0_20px_50px_rgba(0,0,0,0.12)] dark:shadow-[0_30px_70px_rgba(0,0,0,0.9)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-zinc-100 dark:border-white/[0.08]">
          <Search className="w-4 h-4 text-zinc-400 dark:text-zinc-500 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search systems, chapters, or actions..."
            className="w-full bg-transparent text-sm font-sans text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none"
          />
          <button
            type="button"
            onClick={handleClose}
            className="p-1 rounded-md text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 dark:hover:bg-white/[0.08] dark:hover:text-white transition-colors cursor-pointer"
            aria-label="Close command palette"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div
          ref={listRef}
          className="max-h-[380px] overflow-y-auto p-2 space-y-0.5 text-xs font-sans scrollbar-none"
        >
          {filteredCommands.length === 0 ? (
            <div className="py-8 text-center text-zinc-500 font-sans">
              No matching records found.
            </div>
          ) : (
            filteredCommands.map((cmd, idx) => {
              const isSelected = selectedIndex === idx;
              const Icon = cmd.icon;

              return (
                <button
                  key={cmd.id}
                  ref={(el) => {
                    itemRefs.current[idx] = el;
                  }}
                  type="button"
                  onClick={cmd.action}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-blue-50/90 dark:bg-white/[0.08] text-blue-700 dark:text-white font-medium border border-blue-100 dark:border-transparent"
                      : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-white/[0.04] hover:text-zinc-950 dark:hover:text-white border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3 truncate">
                    <Icon className={`w-4 h-4 shrink-0 ${isSelected ? "text-blue-600 dark:text-white" : "text-zinc-400 dark:text-zinc-500"}`} />
                    <span className="truncate">{cmd.label}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-mono shrink-0">
                    <span className="uppercase text-[9px] font-mono tracking-wider px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-white/[0.05] text-zinc-500 dark:text-zinc-400">
                      {cmd.category}
                    </span>
                    {isSelected && <ArrowRight className="w-3.5 h-3.5 text-blue-600 dark:text-white" />}
                  </div>
                </button>
              );
            })
          )}
        </div>

        <div className="px-4 py-2.5 border-t border-zinc-100 dark:border-white/[0.06] text-[10px] font-mono text-zinc-500 dark:text-zinc-400 flex items-center justify-between bg-zinc-50/80 dark:bg-zinc-950/40">
          <span>Navigate with ↑ ↓ · Enter to select</span>
          <span>ESC to dismiss</span>
        </div>
      </div>
    </div>
  );
}
