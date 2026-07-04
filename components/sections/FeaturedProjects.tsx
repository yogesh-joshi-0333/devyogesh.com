import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";
import type { Project } from "@/lib/content";

export function FeaturedProjects({ projects }: { projects: Project[] }) {
  return (
    <Section
      id="projects"
      eyebrow="Featured Projects"
      title="Selected work"
      intro="Systems with a problem, an architecture, and lessons learned — not just screenshots."
    >
      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 2) * 0.08}>
            <TiltCard className="h-full">
              <Link
                href={`/projects/${p.slug}/`}
                className="gradient-border group flex h-full flex-col rounded-2xl p-7 transition-shadow hover:shadow-xl"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-mono text-xs tracking-widest uppercase text-cyan">
                    {p.domain}
                  </span>
                  <span className="font-mono text-xs text-muted">{p.year}</span>
                </div>
                <h3 className="text-xl font-semibold tracking-tight group-hover:text-gradient">
                  {p.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{p.summary}</p>
                <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
                  {p.tech.slice(0, 5).map((t) => (
                    <li key={t} className="rounded-full bg-surface-2 px-3 py-1 font-mono text-xs text-muted">
                      {t}
                    </li>
                  ))}
                </ul>
                <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-blue">
                  Read case study
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform group-hover:translate-x-1" aria-hidden>
                    <path d="M5 12h14m0 0-6-6m6 6-6 6" />
                  </svg>
                </span>
              </Link>
            </TiltCard>
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-10">
        <Link href="/projects/" className="text-sm font-medium text-muted underline-offset-4 hover:text-ink hover:underline">
          Browse all projects →
        </Link>
      </Reveal>
    </Section>
  );
}
