import type { Metadata } from "next";
import { getUses } from "@/lib/content";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Uses",
  description: "The hardware, software, and AI tooling behind the work.",
  alternates: { canonical: "/uses/" },
};

export default function UsesPage() {
  const uses = getUses();
  return (
    <main id="main" className="mx-auto w-full max-w-4xl px-6 pt-36 pb-24">
      <header className="mb-12">
        <p className="mb-3 font-mono text-sm tracking-widest uppercase text-cyan">Uses</p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{uses.title}</h1>
        {uses.intro && <p className="mt-4 text-lg text-muted">{uses.intro}</p>}
      </header>
      <div className="grid gap-6 sm:grid-cols-2">
        {uses.sections.map((s, i) => (
          <Reveal key={s.name} delay={(i % 2) * 0.08}>
            <Card className="h-full">
              <h2 className="mb-4 font-mono text-sm tracking-widest uppercase text-cyan">{s.name}</h2>
              <ul className="space-y-2">
                {s.items.map((item) => (
                  <li key={item} className="text-sm text-muted">{item}</li>
                ))}
              </ul>
            </Card>
          </Reveal>
        ))}
      </div>
    </main>
  );
}
