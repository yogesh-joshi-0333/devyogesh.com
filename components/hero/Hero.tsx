"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Typing } from "@/components/hero/Typing";
import { EASE } from "@/lib/motion";

const ParticleField = dynamic(
  () => import("@/components/hero/ParticleField").then((m) => m.ParticleField),
  { ssr: false }
);

type Props = {
  sub: string;
  typingRoles: string[];
};

export function Hero({ sub, typingRoles }: Props) {
  const reduce = useReducedMotion();
  const anim = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, ease: EASE, delay },
        };

  return (
    <section className="relative flex min-h-svh items-center overflow-hidden" id="top">
      <div className="aurora" aria-hidden />
      <ParticleField />
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pt-24 pb-16">
        <motion.p {...anim(0.1)} className="mb-5 font-mono text-sm tracking-widest uppercase text-muted">
          Yogesh Joshi · <Typing roles={typingRoles} />
        </motion.p>
        <motion.h1
          {...anim(0.25)}
          className="max-w-4xl text-5xl font-semibold leading-[1.05] tracking-tight sm:text-7xl text-balance"
        >
          I build <span className="text-gradient">intelligent systems</span> that ship.
        </motion.h1>
        <motion.p {...anim(0.4)} className="mt-8 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
          {sub}
        </motion.p>
        <motion.div {...anim(0.55)} className="mt-10 flex flex-wrap items-center gap-4">
          <MagneticButton href="/#projects">View my work</MagneticButton>
          <MagneticButton href="/#contact" variant="ghost">
            Get in touch
          </MagneticButton>
        </motion.div>
      </div>
      <motion.div
        {...(reduce ? {} : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 1.4, duration: 1 } })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted"
        aria-hidden
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="animate-bounce">
          <path d="M12 5v14m0 0-6-6m6 6 6-6" />
        </svg>
      </motion.div>
    </section>
  );
}
