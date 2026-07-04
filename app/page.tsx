import { Hero } from "@/components/hero/Hero";
import { Philosophy } from "@/components/sections/Philosophy";
import { Focus } from "@/components/sections/Focus";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Capabilities } from "@/components/sections/Capabilities";
import { Dashboard } from "@/components/sections/Dashboard";
import { Journey } from "@/components/sections/Journey";
import { Stack } from "@/components/sections/Stack";
import { GitHubActivity } from "@/components/sections/GitHubActivity";
import { Contact } from "@/components/sections/Contact";
import {
  getProfile,
  getPhilosophy,
  getFocus,
  getJourney,
  getStack,
  getAICapabilities,
  getSoftwareCapabilities,
  getFeaturedProjects,
} from "@/lib/content";
import { getGitHubData } from "@/lib/github";

export default async function Home() {
  const profile = getProfile();
  const github = await getGitHubData();

  return (
    <main id="main">
      <Hero sub={profile.heroSub} typingRoles={profile.typingRoles} />
      <Philosophy data={getPhilosophy()} brandMessage={profile.brandMessage} />
      <Focus data={getFocus()} />
      <FeaturedProjects projects={getFeaturedProjects()} />
      <Capabilities id="ai" eyebrow="AI Engineering" data={getAICapabilities()} />
      <Capabilities id="software" eyebrow="Software Engineering" data={getSoftwareCapabilities()} columns={3} />
      <Dashboard profile={profile} github={github} />
      <Journey data={getJourney()} />
      <Stack data={getStack()} />
      <GitHubActivity data={github} />
      <Contact />
    </main>
  );
}
