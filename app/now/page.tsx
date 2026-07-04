import type { Metadata } from "next";
import { getNow } from "@/lib/content";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Now",
  description: "What Yogesh is focused on right now.",
  alternates: { canonical: "/now/" },
};

export default function NowPage() {
  const now = getNow();
  return (
    <main id="main" className="mx-auto w-full max-w-4xl px-6 pt-36 pb-24">
      <header className="mb-12">
        <p className="mb-3 font-mono text-sm tracking-widest uppercase text-cyan">Now</p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">What I&apos;m doing now</h1>
        <p className="mt-4 text-lg text-muted">{now.intro}</p>
        <p className="mt-2 font-mono text-xs text-muted">Updated {now.updated}</p>
      </header>
      <div className="grid gap-6">
        {now.items.map((item, i) => (
          <Reveal key={item.title} delay={i * 0.08}>
            <Card>
              <h2 className="font-semibold">{item.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
            </Card>
          </Reveal>
        ))}
      </div>
    </main>
  );
}
