"use client";

import { useEffect } from "react";
import { useReducedMotion } from "framer-motion";

export function Spotlight() {
  const reduce = useReducedMotion();

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine || reduce) return;
    const el = document.getElementById("spotlight");
    const onMove = (e: MouseEvent) => {
      if (el) {
        el.style.background = `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, color-mix(in srgb, var(--accent-blue) 6%, transparent), transparent 70%)`;
      }
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduce]);

  return (
    <div
      id="spotlight"
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
    />
  );
}
