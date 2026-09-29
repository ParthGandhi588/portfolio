"use client";

import React, { useState, useEffect, useRef } from "react";
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
} from "lucide-react";
import { LinkedinIcon, GithubIcon } from "@/components/icons";
import { PERSONAL_INFO } from "@/data/portfolioData";

interface CommandItem {
  id: string;
  label: string;
  category: string;
  icon: React.ElementType;
  action: () => void;
  shortcut?: string;
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

  const commands: CommandItem[] = [
    {
      id: "agentic-erp",
      label: "Agentic ERP (Case Study)",
      category: "Systems",
      icon: Terminal,
      action: () => {
        router.push("/work/agentic-erp");
        onClose();
      },
    },
    {
      id: "codebase-rag",
      label: "CodeBase RAG (Case Study)",
      category: "Systems",
      icon: FileCode2,
      action: () => {
        router.push("/work/codebase-rag");
        onClose();
      },
    },
    {
      id: "absence-risk",
      label: "Absence Risk Prediction (Case Study)",
      category: "Systems",
      icon: LineChart,
      action: () => {
        router.push("/work/absence-risk");
        onClose();
      },
    },
    {
      id: "experience",
      label: "View Experience",
      category: "Navigation",
      icon: Briefcase,
      action: () => {
        const el = document.getElementById("experience");
        if (el) el.scrollIntoView({ behavior: "smooth" });
        else router.push("/#experience");
        onClose();
      },
    },
    {
      id: "contact",
      label: "Get in Touch / Contact",
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
    {
      id: "resume",
      label: "Download Resume (PDF)",
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
  ];

  const filteredCommands = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(query.toLowerCase()) ||
    cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Global keyboard listener for Cmd+K and Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Handle arrow navigation and Enter inside dialog
  const handleDialogKeyDown = (e: React.KeyboardEvent) => {
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

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-28 px-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150 touch-manipulation"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
    >
      <div
        className="w-full max-w-xl rounded-xl border border-white/[0.12] bg-[#0c0e15] shadow-2xl shadow-black overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleDialogKeyDown}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/[0.08] bg-white/[0.02]">
          <Search className="w-4 h-4 text-cyan-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a command or search portfolio..."
            className="w-full bg-transparent text-sm font-mono text-zinc-100 placeholder-zinc-500 focus:outline-none"
            aria-label="Search command palette"
          />
          <button
            type="button"
            onClick={onClose}
            className="min-w-[40px] min-h-[40px] flex items-center justify-center p-1.5 text-zinc-400 hover:text-zinc-200 rounded-lg hover:bg-white/[0.05] transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filteredCommands.length === 0 ? (
            <div className="p-4 text-center text-xs font-mono text-zinc-500">
              No matching commands found.
            </div>
          ) : (
            filteredCommands.map((cmd, index) => {
              const Icon = cmd.icon;
              const isSelected = index === selectedIndex;

              return (
                <button
                  key={cmd.id}
                  type="button"
                  onClick={cmd.action}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`w-full text-left px-3.5 py-3 rounded-lg flex items-center justify-between transition-colors font-mono text-xs cursor-pointer min-h-[48px] touch-manipulation border ${
                    isSelected
                      ? "bg-cyan-950/40 text-cyan-200 border-cyan-500/30"
                      : "text-zinc-300 hover:bg-white/[0.03] border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-1.5 rounded ${
                        isSelected
                          ? "bg-cyan-500/20 text-cyan-300"
                          : "bg-white/[0.04] text-zinc-400"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-medium">{cmd.label}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-zinc-500 uppercase tracking-wider hidden sm:inline">
                      {cmd.category}
                    </span>
                    {isSelected && (
                      <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
                    )}
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer info bar */}
        <div className="px-4 py-2.5 border-t border-white/[0.06] bg-black/40 flex items-center justify-between text-[11px] font-mono text-zinc-500">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <span className="text-zinc-600">⌘K to toggle</span>
        </div>
      </div>
    </div>
  );
}
