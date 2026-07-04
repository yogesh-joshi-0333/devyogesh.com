"use client";

import dynamic from "next/dynamic";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Typing } from "@/components/hero/Typing";

const ParticleField = dynamic(
  () => import("@/components/hero/ParticleField").then((m) => m.ParticleField),
  { ssr: false }
);

type Props = {
  sub: string;
  typingRoles: string[];
};

export function Hero({ sub, typingRoles }: Props) {
  return (
    <section className="relative flex min-h-svh items-center overflow-hidden" id="top">
      <div className="aurora" aria-hidden />
      <ParticleField />
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pt-24 pb-16">
        <p className="hero-in mb-5 font-mono text-sm tracking-widest uppercase text-muted" style={{ animationDelay: "0.05s" }}>
          Yogesh Joshi · <Typing roles={typingRoles} />
        </p>
        <h1
          className="hero-in max-w-4xl text-5xl font-semibold leading-[1.05] tracking-tight sm:text-7xl text-balance"
          style={{ animationDelay: "0.15s" }}
        >
          I build <span className="text-gradient">intelligent systems</span> that ship.
        </h1>
        <p
          className="hero-in mt-8 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl"
          style={{ animationDelay: "0.3s" }}
        >
          {sub}
        </p>
        <div className="hero-in mt-10 flex flex-wrap items-center gap-4" style={{ animationDelay: "0.45s" }}>
          <MagneticButton href="/#projects">View my work</MagneticButton>
          <MagneticButton href="/#contact" variant="ghost">
            Get in touch
          </MagneticButton>
        </div>
      </div>
      <div
        className="hero-in absolute bottom-8 left-1/2 -translate-x-1/2 text-muted"
        style={{ animationDelay: "1.2s" }}
        aria-hidden
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="animate-bounce">
          <path d="M12 5v14m0 0-6-6m6 6 6-6" />
        </svg>
      </div>
    </section>
  );
}
