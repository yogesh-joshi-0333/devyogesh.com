import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Card } from "@/components/ui/Card";
import type { Focus as FocusContent } from "@/lib/content";

export function Focus({ data }: { data: FocusContent }) {
  return (
    <Section id="focus" eyebrow="Current Focus" title={data.title} intro={data.intro}>
      <div className="grid gap-6 sm:grid-cols-3">
        {data.items.map((item, i) => (
          <Reveal key={item.title} delay={i * 0.08}>
            <Card className="h-full">
              <span className="mb-4 inline-block rounded-full border border-line px-3 py-1 font-mono text-xs text-cyan">
                {item.tag}
              </span>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
