"use client";

import React, { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Avoid hydration mismatch
    return (
      <div className={`w-8 h-8 rounded-full border border-zinc-200 dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.02] ${className}`} />
    );
  }

  const isDark = resolvedTheme === "dark";
  const Icon = isDark ? Sun : Moon;

  const handleToggle = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={`w-8 h-8 rounded-full border border-zinc-200 dark:border-white/[0.1] bg-black/[0.02] dark:bg-white/[0.03] text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:border-zinc-300 dark:hover:border-white/[0.25] flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95 ${className}`}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <Icon className={`w-3.5 h-3.5 transition-transform duration-300 ${isDark ? "rotate-0 text-amber-400 dark:text-amber-300" : "-rotate-12 text-zinc-700"}`} />
    </button>
  );
}
