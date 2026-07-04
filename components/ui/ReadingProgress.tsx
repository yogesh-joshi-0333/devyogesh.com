"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? Math.min(window.scrollY / total, 1) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (reduce) return null;
  return (
    <div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-blue via-purple to-cyan"
      style={{ transform: `scaleX(${progress})` }}
    />
  );
}
