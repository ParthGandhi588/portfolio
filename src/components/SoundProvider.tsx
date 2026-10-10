"use client";

import React, { createContext, useContext, useEffect, useState, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";

interface SoundContextType {
  soundEnabled: boolean;
  toggleSound: () => void;
  playClick: () => void;
}

const SoundContext = createContext<SoundContextType>({
  soundEnabled: true,
  toggleSound: () => {},
  playClick: () => {},
});

const SOUND_STORAGE_KEY = "pg_portfolio_sound_enabled";

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Initialize from localStorage (default to enabled)
  useEffect(() => {
    try {
      const saved = localStorage.getItem(SOUND_STORAGE_KEY);
      if (saved !== null) {
        setSoundEnabled(saved === "true");
      }
    } catch {
      // LocalStorage access fallback
    }
  }, []);

  // Web Audio Context initializer with auto-resume on first interaction
  const getAudioContext = (): AudioContext | null => {
    if (typeof window === "undefined") return null;
    if (!audioCtxRef.current) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  // Subtle, tactile mechanical click synthesis (velvety soft, never piercing)
  const playClick = () => {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;

      // Pitch sweep: fast decay from 680Hz to 140Hz in 22ms
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      // Soft bandpass filter to give high-end tactile dampened feel
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(1200, now);
      filter.Q.setValueAtTime(1.1, now);

      osc.type = "sine";
      osc.frequency.setValueAtTime(680, now);
      osc.frequency.exponentialRampToValueAtTime(130, now + 0.022);

      // Gain envelope: whisper-soft peak, rapid natural decay
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.026);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.028);
    } catch {
      // Audio playback gracefully ignored
    }
  };

  // Melodic affirmative / soft mute toggle sound
  const playToggleSound = (willBeEnabled: boolean) => {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      if (willBeEnabled) {
        // Crisp dual-frequency upward blip (480Hz -> 760Hz)
        osc.frequency.setValueAtTime(480, now);
        osc.frequency.exponentialRampToValueAtTime(760, now + 0.06);
      } else {
        // Soft descending blip (620Hz -> 380Hz)
        osc.frequency.setValueAtTime(620, now);
        osc.frequency.exponentialRampToValueAtTime(380, now + 0.06);
      }

      gain.gain.setValueAtTime(0.035, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.07);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.08);
    } catch {
      // Ignore
    }
  };

  const toggleSound = () => {
    setSoundEnabled((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(SOUND_STORAGE_KEY, String(next));
      } catch {
        // Ignore
      }
      playToggleSound(next);
      return next;
    });
  };

  // Global click listener across the website for interactive elements
  useEffect(() => {
    if (!soundEnabled) return;

    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Check if clicked element or parent is interactive
      const isInteractive = Boolean(
        target.closest(
          "button, a, input, textarea, select, [role='button'], [tabindex='0'], summary, .clickable"
        )
      );

      if (isInteractive) {
        playClick();
      }
    };

    window.addEventListener("click", handleGlobalClick, { capture: true, passive: true });
    return () => {
      window.removeEventListener("click", handleGlobalClick, { capture: true });
    };
  }, [soundEnabled]);

  return (
    <SoundContext.Provider value={{ soundEnabled, toggleSound, playClick }}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  return useContext(SoundContext);
}

export function SoundToggle({ className = "" }: { className?: string }) {
  const { soundEnabled, toggleSound } = useSound();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`w-8 h-8 rounded-full border border-zinc-200 dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.02] ${className}`} />
    );
  }

  const Icon = soundEnabled ? Volume2 : VolumeX;

  return (
    <button
      type="button"
      onClick={toggleSound}
      className={`w-8 h-8 rounded-full border border-zinc-200 dark:border-white/[0.1] bg-black/[0.02] dark:bg-white/[0.03] text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:border-zinc-300 dark:hover:border-white/[0.25] flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95 ${
        soundEnabled ? "text-blue-600 dark:text-blue-400" : ""
      } ${className}`}
      title={soundEnabled ? "Sound effects: ON (click to mute)" : "Sound effects: MUTED (click to enable)"}
      aria-label={soundEnabled ? "Mute website sounds" : "Enable website sounds"}
    >
      <Icon className="w-3.5 h-3.5 transition-transform" />
    </button>
  );
}
