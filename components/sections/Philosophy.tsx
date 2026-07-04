import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import type { Philosophy as PhilosophyContent } from "@/lib/content";

export function Philosophy({ data, brandMessage }: { data: PhilosophyContent; brandMessage: string }) {
  return (
    <Section id="philosophy" eyebrow="Engineering Philosophy" title="How I think about software">
      <div className="grid gap-14 sm:gap-20">
        {data.statements.map((s, i) => (
          <Reveal key={s.lead} delay={i * 0.05}>
            <blockquote className="max-w-3xl">
              <p className="text-2xl font-semibold tracking-tight sm:text-4xl text-balance">
                {s.lead}
              </p>
              <p className="mt-3 max-w-xl text-muted leading-relaxed">{s.body}</p>
            </blockquote>
          </Reveal>
        ))}
        <Reveal>
          <p className="max-w-3xl border-l-2 border-purple pl-6 text-lg italic text-muted leading-relaxed">
            {brandMessage}
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
