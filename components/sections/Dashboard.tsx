import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";
import type { Profile } from "@/lib/content";
import type { GitHubData } from "@/lib/github";

export function Dashboard({ profile, github }: { profile: Profile; github: GitHubData }) {
  const stats = [
    ...profile.stats,
    { label: "Contributions (last year)", value: github.totalContributions, suffix: "" },
    { label: "Public Repositories", value: github.publicRepos, suffix: "" },
  ];
  return (
    <Section
      id="dashboard"
      eyebrow="Engineering Dashboard"
      title="Measured, not claimed"
      intro="Skills are easy to list. Activity is harder to fake."
    >
      <dl className="grid grid-cols-2 gap-5 lg:grid-cols-3">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={(i % 3) * 0.06}>
            <div className="gradient-border rounded-2xl p-6">
              <dd className="text-4xl font-semibold tracking-tight text-gradient sm:text-5xl">
                <Counter value={s.value} suffix={s.suffix ?? ""} />
              </dd>
              <dt className="mt-2 text-sm text-muted">{s.label}</dt>
            </div>
          </Reveal>
        ))}
      </dl>
    </Section>
  );
}
