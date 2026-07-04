import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";
import type { GitHubData } from "@/lib/github";

const LEVEL_CLASSES = [
  "bg-surface-2",
  "bg-blue/25",
  "bg-blue/45",
  "bg-blue/70",
  "bg-blue",
];

export function GitHubActivity({ data }: { data: GitHubData }) {
  return (
    <Section
      id="github"
      eyebrow="GitHub Activity"
      title="A year of contributions"
      intro={`${data.totalContributions.toLocaleString()} contributions in the last year across ${data.publicRepos} public repositories.`}
    >
      <Reveal>
        <div className="gradient-border overflow-x-auto rounded-2xl p-6">
          <div
            className="flex min-w-max gap-[3px]"
            role="img"
            aria-label={`GitHub contribution calendar: ${data.totalContributions} contributions in the last year`}
          >
            {data.weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[3px]">
                {week.map((day) => (
                  <span
                    key={day.date}
                    title={`${day.date}: ${day.count} contributions`}
                    className={`h-[11px] w-[11px] rounded-[3px] ${LEVEL_CLASSES[day.level]}`}
                  />
                ))}
              </div>
            ))}
          </div>
          <p className="mt-5 text-sm text-muted">
            Data captured at build time ·{" "}
            <a
              href={site.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue underline-offset-4 hover:underline"
            >
              @{data.user}
            </a>
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
