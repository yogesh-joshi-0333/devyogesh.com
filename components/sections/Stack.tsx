import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Card } from "@/components/ui/Card";
import type { Stack as StackContent } from "@/lib/content";

export function Stack({ data }: { data: StackContent }) {
  return (
    <Section
      id="stack"
      eyebrow="Technology Stack"
      title="Tools that earn their place"
      intro="Kept because they survive production, not because they're trendy."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {data.groups.map((g, i) => (
          <Reveal key={g.name} delay={(i % 3) * 0.06}>
            <Card className="h-full">
              <h3 className="mb-4 font-mono text-sm tracking-widest uppercase text-cyan">
                {g.name}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full bg-surface-2 px-3 py-1.5 text-xs text-muted transition-colors hover:text-ink"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
