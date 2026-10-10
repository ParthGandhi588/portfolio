"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  alpha: number;
}

export function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const spotlightRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; targetX: number; targetY: number; active: boolean }>({
    x: -1000,
    y: -1000,
    targetX: -1000,
    targetY: -1000,
    active: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Initialize subtle floating particles
    const particleCount = Math.min(Math.floor((width * height) / 22000), 55);
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 1.5 + 0.8,
        baseRadius: Math.random() * 1.5 + 0.8,
        alpha: Math.random() * 0.35 + 0.15,
      });
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
      mouseRef.current.active = true;

      // Update the CSS spotlight directly for 60fps performance
      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        spotlightRef.current.style.opacity = "1";
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
      if (spotlightRef.current) {
        spotlightRef.current.style.opacity = "0";
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    // Main kinetic render loop
    const render = () => {
      // Smooth lerp mouse coordinates
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      ctx.clearRect(0, 0, width, height);

      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;
      const mouseActive = mouseRef.current.active;

      // Check current dark mode status
      const isDark = typeof document !== "undefined" ? document.documentElement.classList.contains("dark") : true;

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Normal drift
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around boundaries
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Interactive mouse reaction: gentle deflection & radius expansion
        let distMouse = 9999;
        if (mouseActive) {
          const dx = mouseX - p.x;
          const dy = mouseY - p.y;
          distMouse = Math.sqrt(dx * dx + dy * dy);

          if (distMouse < 180) {
            const force = (180 - distMouse) / 180;
            // Subtle magnetic repulsion
            p.x -= (dx / distMouse) * force * 1.5;
            p.y -= (dy / distMouse) * force * 1.5;
            p.radius = p.baseRadius + force * 2.2;
          } else {
            p.radius = p.baseRadius;
          }
        }

        // Draw particle node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = distMouse < 180
          ? isDark
            ? `rgba(96, 165, 250, ${p.alpha + 0.3})`
            : `rgba(37, 99, 235, ${p.alpha + 0.35})`
          : isDark
            ? `rgba(228, 228, 231, ${p.alpha})`
            : `rgba(100, 116, 139, ${p.alpha * 0.85})`;
        ctx.fill();

        // Connect nearby nodes with delicate hairlines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const distNodes = Math.hypot(p.x - p2.x, p.y - p2.y);

          if (distNodes < 110) {
            const lineAlpha = (1 - distNodes / 110) * 0.12;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = isDark
              ? `rgba(255, 255, 255, ${lineAlpha})`
              : `rgba(15, 23, 42, ${lineAlpha * 0.85})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }

        // Connect to mouse pointer with ethereal light beam when nearby
        if (mouseActive && distMouse < 150) {
          const pointerLineAlpha = (1 - distMouse / 150) * 0.22;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouseX, mouseY);
          ctx.strokeStyle = isDark
            ? `rgba(59, 130, 246, ${pointerLineAlpha})`
            : `rgba(37, 99, 235, ${pointerLineAlpha * 1.1})`;
          ctx.lineWidth = 0.9;
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
      {/* 1. Kinetic Mouse Spotlight Aura */}
      <div
        ref={spotlightRef}
        className="absolute -top-[300px] -left-[300px] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.12)_0%,rgba(59,130,246,0.05)_40%,transparent_75%)] blur-2xl transition-opacity duration-300 opacity-0 pointer-events-none will-change-transform"
      />

      {/* 2. Ambient Atmosphere Flares */}
      <div className="absolute -top-[20vw] left-[10vw] w-[55vw] h-[45vw] rounded-full bg-blue-600/[0.04] dark:bg-blue-900/[0.07] blur-[150px]" />
      <div className="absolute top-[45vh] -right-[10vw] w-[40vw] h-[40vw] rounded-full bg-indigo-600/[0.03] dark:bg-indigo-900/[0.04] blur-[160px]" />

      {/* 3. Interactive Kinetic Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* 4. Delicate Noise Texture */}
      <div className="absolute inset-0 opacity-[0.015] bg-[radial-gradient(#000_1px,transparent_1px)] dark:bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
    </div>
  );
}
