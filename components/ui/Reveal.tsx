"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeRise, VIEWPORT } from "@/lib/motion";

type Props = {
  className?: string;
  delay?: number;
  children: React.ReactNode;
};

export function Reveal({ className, delay = 0, children }: Props) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      variants={fadeRise}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
