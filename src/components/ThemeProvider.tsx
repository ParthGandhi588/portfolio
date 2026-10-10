"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Theme = "light" | "dark" | "system";

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "system",
  resolvedTheme: "dark",
  setTheme: () => {},
});

const STORAGE_KEY = "pg_portfolio_theme";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("system");
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("dark");
  const [mounted, setMounted] = useState(false);

  // Initialize theme from localStorage or system
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem(STORAGE_KEY) as Theme | null;
      if (savedTheme && (savedTheme === "light" || savedTheme === "dark" || savedTheme === "system")) {
        setThemeState(savedTheme);
      }
    } catch {
      // Ignore localStorage errors in private mode
    }
    setMounted(true);
  }, []);

  // Update DOM and resolved theme
  useEffect(() => {
    const root = document.documentElement;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const computeResolved = (currentTheme: Theme): "light" | "dark" => {
      if (currentTheme === "system") {
        return mediaQuery.matches ? "dark" : "light";
      }
      return currentTheme;
    };

    const resolved = computeResolved(theme);
    setResolvedTheme(resolved);

    // Apply class to <html>
    if (resolved === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
      root.style.colorScheme = "dark";
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
      root.style.colorScheme = "light";
    }

    // Media query listener when system is selected
    const handleSystemChange = (e: MediaQueryListEvent) => {
      if (theme === "system") {
        const nextResolved = e.matches ? "dark" : "light";
        setResolvedTheme(nextResolved);
        if (nextResolved === "dark") {
          root.classList.add("dark");
          root.classList.remove("light");
          root.style.colorScheme = "dark";
        } else {
          root.classList.remove("dark");
          root.classList.add("light");
          root.style.colorScheme = "light";
        }
      }
    };

    mediaQuery.addEventListener("change", handleSystemChange);
    return () => mediaQuery.removeEventListener("change", handleSystemChange);
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem(STORAGE_KEY, newTheme);
    } catch {
      // Ignore
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
