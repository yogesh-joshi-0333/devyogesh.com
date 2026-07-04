import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import type { Journey as JourneyContent } from "@/lib/content";

export function Journey({ data }: { data: JourneyContent }) {
  return (
    <Section
      id="journey"
      eyebrow="Engineering Journey"
      title="Eight years of shipping"
      intro="From PHP foundations to production AI systems."
    >
      <ol className="relative space-y-12 border-l border-line pl-8">
        {data.items.map((item, i) => (
          <Reveal key={item.period + item.org} delay={i * 0.05}>
            <li className="relative">
              <span
                className="absolute -left-[37px] top-1.5 h-3 w-3 rounded-full border-2 border-blue bg-bg"
                aria-hidden
              />
              <p className="font-mono text-xs tracking-widest uppercase text-cyan">{item.period}</p>
              <h3 className="mt-1 text-lg font-semibold">
                {item.role} <span className="text-muted font-normal">· {item.org}</span>
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{item.summary}</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {item.highlights.map((h) => (
                  <li key={h} className="rounded-full bg-surface-2 px-3 py-1 font-mono text-xs text-muted">
                    {h}
                  </li>
                ))}
              </ul>
            </li>
          </Reveal>
        ))}
      </ol>
      <Reveal className="mt-14">
        <h3 className="mb-4 font-mono text-sm tracking-widest uppercase text-muted">Education</h3>
        <ul className="space-y-2">
          {data.education.map((e) => (
            <li key={e.degree} className="text-sm text-muted">
              <span className="text-ink font-medium">{e.degree}</span> — {e.school}{" "}
              <span className="font-mono text-xs">({e.period})</span>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
