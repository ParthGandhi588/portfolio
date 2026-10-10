"use client";

import React, { useEffect, useState, useRef } from "react";

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  const cursorDotRef = useRef<HTMLDivElement | null>(null);
  const cursorRingRef = useRef<HTMLDivElement | null>(null);

  // Position and velocity reference
  const pos = useRef({
    x: -100,
    y: -100,
    ringX: -100,
    ringY: -100,
    vx: 0,
    vy: 0,
    speed: 0,
    angle: 0,
  });

  useEffect(() => {
    // Strictly disable on any touch device or mobile screen
    if (
      typeof window === "undefined" ||
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {
      setEnabled(false);
      return;
    }
    setEnabled(true);

    const handleMouseMove = (e: MouseEvent) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;

      // Immediate precision dot positioning (strictly 1:1 with mouse, zero lag)
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Check if hovering clickable elements
      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable = Boolean(
          target.closest("button, a, input, textarea, [role='button'], [tabindex='0'], select")
        );
        setHovered(isClickable);
      }
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    // Physics render loop for inertia and "effort" stretch
    let animId: number;
    const render = () => {
      // Calculate delta and inertia for trailing ring
      const dx = pos.current.x - pos.current.ringX;
      const dy = pos.current.y - pos.current.ringY;

      // Inertial lag (spring follow)
      pos.current.ringX += dx * 0.22;
      pos.current.ringY += dy * 0.22;

      // Velocity and angle of motion
      const vx = dx * 0.22;
      const vy = dy * 0.22;
      pos.current.vx = vx;
      pos.current.vy = vy;

      const speed = Math.min(Math.hypot(vx, vy), 35);
      const angle = Math.atan2(dy, dx);

      // Velocity-based physical elongation ("effort on moving")
      const stretch = 1 + speed * 0.035;
      const squeeze = 1 / Math.sqrt(stretch);

      if (cursorRingRef.current) {
        const baseScale = hovered ? 1.6 : clicked ? 0.75 : 1;
        cursorRingRef.current.style.transform = `
          translate3d(${pos.current.ringX}px, ${pos.current.ringY}px, 0)
          rotate(${angle}rad)
          scale(${baseScale * stretch}, ${baseScale * squeeze})
        `;
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      cancelAnimationFrame(animId);
    };
  }, [hovered, clicked]);

  if (!enabled) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {/* 1. Trailing Inertial Ring with Velocity Stretch ("Effort" Physics) */}
      <div
        ref={cursorRingRef}
        className={`cursor-ring fixed top-0 left-0 -ml-4 -mt-4 w-8 h-8 rounded-full pointer-events-none will-change-transform transition-[border-color,background-color] duration-150 ${
          hovered ? "cursor-hovered" : ""
        }`}
      />

      {/* 2. Sharp Inner Precision Dot (Strictly Centered on Mouse) */}
      <div
        ref={cursorDotRef}
        className={`cursor-dot fixed top-0 left-0 -ml-1 -mt-1 w-2 h-2 rounded-full pointer-events-none will-change-transform transition-[background-color] duration-150 ${
          hovered ? "cursor-hovered" : ""
        }`}
      />
    </div>
  );
}
