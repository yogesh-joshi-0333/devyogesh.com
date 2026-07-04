"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/ui/Reveal";
import type { ProjectMeta } from "@/lib/content";

export function ProjectsExplorer({ projects }: { projects: ProjectMeta[] }) {
  const domains = useMemo(
    () => ["All", ...Array.from(new Set(projects.map((p) => p.domain)))],
    [projects]
  );
  const [active, setActive] = useState("All");

  const filtered =
    active === "All" ? projects : projects.filter((p) => p.domain === active);

  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label="Filter projects by domain">
        {domains.map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => setActive(d)}
            aria-pressed={active === d}
            className={cn(
              "rounded-full border px-4 py-2 text-sm transition-colors",
              active === d
                ? "border-blue bg-blue/10 text-ink"
                : "border-line text-muted hover:text-ink"
            )}
          >
            {d}
          </button>
        ))}
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        {filtered.map((p) => (
          <Reveal key={p.slug}>
            <Link
              href={`/projects/${p.slug}/`}
              className="gradient-border group flex h-full flex-col rounded-2xl p-7 transition-shadow hover:shadow-xl"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="font-mono text-xs tracking-widest uppercase text-cyan">{p.domain}</span>
                <span className="font-mono text-xs text-muted">{p.year}</span>
              </div>
              <h2 className="text-xl font-semibold tracking-tight">{p.title}</h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{p.summary}</p>
              <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
                {p.tech.map((t) => (
                  <li key={t} className="rounded-full bg-surface-2 px-3 py-1 font-mono text-xs text-muted">
                    {t}
                  </li>
                ))}
              </ul>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
