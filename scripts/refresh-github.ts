// Refreshes content/github-snapshot.json used as build-time fallback.
// Usage: GITHUB_TOKEN=... npx tsx scripts/refresh-github.ts
import fs from "node:fs";
import path from "node:path";
import { getGitHubData } from "../lib/github";

async function main() {
  const data = await getGitHubData();
  const out = path.join(process.cwd(), "content", "github-snapshot.json");
  fs.writeFileSync(out, JSON.stringify(data, null, 2));
  console.log(
    `Snapshot written: ${data.totalContributions} contributions, ${data.publicRepos} repos (fetched ${data.fetchedAt}).`
  );
}

main();
