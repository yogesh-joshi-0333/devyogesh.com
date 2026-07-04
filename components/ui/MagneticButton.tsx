"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

type Props = {
  href: string;
  variant?: "primary" | "ghost";
  className?: string;
  children: React.ReactNode;
};

export function MagneticButton({ href, variant = "primary", className, children }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18 });
  const sy = useSpring(y, { stiffness: 200, damping: 18 });

  function onMouseMove(e: React.MouseEvent) {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.25);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.25);
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x: sx, y: sy }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors",
        variant === "primary"
          ? "bg-ink text-bg hover:bg-blue hover:text-white"
          : "border border-line text-ink hover:border-blue",
        className
      )}
    >
      {children}
    </motion.a>
  );
}
