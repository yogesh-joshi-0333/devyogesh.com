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
      <Reveal>
        <dl className="grid grid-cols-2 gap-5 lg:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} className="gradient-border flex flex-col rounded-2xl p-6">
              <dt className="order-2 mt-2 block text-sm text-muted">{s.label}</dt>
              <dd className="text-4xl font-semibold tracking-tight text-gradient sm:text-5xl">
                <Counter value={s.value} suffix={s.suffix ?? ""} />
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </Section>
  );
}
