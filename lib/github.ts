import fs from "node:fs";
import path from "node:path";
import { site } from "./site";

export type ContributionDay = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };

export type GitHubData = {
  user: string;
  totalContributions: number;
  publicRepos: number;
  followers: number;
  totalStars: number;
  weeks: ContributionDay[][];
  fetchedAt: string;
};

const SNAPSHOT_PATH = path.join(process.cwd(), "content", "github-snapshot.json");

function loadSnapshot(): GitHubData {
  return JSON.parse(fs.readFileSync(SNAPSHOT_PATH, "utf8")) as GitHubData;
}

function levelFor(count: number): ContributionDay["level"] {
  if (count === 0) return 0;
  if (count < 3) return 1;
  if (count < 6) return 2;
  if (count < 10) return 3;
  return 4;
}

async function fetchGraphQL(token: string): Promise<GitHubData> {
  const query = `
    query($login: String!) {
      user(login: $login) {
        followers { totalCount }
        repositories(first: 100, ownerAffiliations: OWNER, privacy: PUBLIC) {
          totalCount
          nodes { stargazerCount }
        }
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks { contributionDays { date contributionCount } }
          }
        }
      }
    }`;
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables: { login: site.githubUser } }),
  });
  if (!res.ok) throw new Error(`GitHub GraphQL ${res.status}`);
  const json = await res.json();
  const user = json.data?.user;
  if (!user) throw new Error("GitHub GraphQL: no user in response");
  const weeks = user.contributionsCollection.contributionCalendar.weeks.map(
    (w: { contributionDays: { date: string; contributionCount: number }[] }) =>
      w.contributionDays.map((d) => ({
        date: d.date,
        count: d.contributionCount,
        level: levelFor(d.contributionCount),
      }))
  );
  return {
    user: site.githubUser,
    totalContributions:
      user.contributionsCollection.contributionCalendar.totalContributions,
    publicRepos: user.repositories.totalCount,
    followers: user.followers.totalCount,
    totalStars: user.repositories.nodes.reduce(
      (sum: number, r: { stargazerCount: number }) => sum + r.stargazerCount,
      0
    ),
    weeks,
    fetchedAt: new Date().toISOString(),
  };
}

async function fetchRest(): Promise<GitHubData> {
  const res = await fetch(`https://api.github.com/users/${site.githubUser}`, {
    headers: { Accept: "application/vnd.github+json" },
  });
  if (!res.ok) throw new Error(`GitHub REST ${res.status}`);
  const u = await res.json();
  const snapshot = loadSnapshot();
  return {
    ...snapshot,
    publicRepos: u.public_repos ?? snapshot.publicRepos,
    followers: u.followers ?? snapshot.followers,
    fetchedAt: new Date().toISOString(),
  };
}

export async function getGitHubData(): Promise<GitHubData> {
  const token = process.env.GITHUB_TOKEN;
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      return token ? await fetchGraphQL(token) : await fetchRest();
    } catch {
      // retry once, then fall back
    }
  }
  return loadSnapshot();
}
