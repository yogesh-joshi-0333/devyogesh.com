import {
  getProfile,
  getPhilosophy,
  getFocus,
  getJourney,
  getStack,
  getAICapabilities,
  getSoftwareCapabilities,
  getUses,
  getNow,
  getProjects,
} from "../lib/content";

function assert(cond: unknown, msg: string): asserts cond {
  if (!cond) throw new Error(`Content validation failed: ${msg}`);
}

const profile = getProfile();
assert(profile.name && profile.role && profile.heroStatement, "profile fields");
assert(profile.typingRoles.length > 0, "typingRoles");
assert(profile.stats.length >= 3, "stats");

assert(getPhilosophy().statements.length >= 3, "philosophy statements");
assert(getFocus().items.length >= 2, "focus items");

const journey = getJourney();
assert(journey.items.length >= 4, "journey items");
assert(journey.education.length >= 1, "education");

assert(getStack().groups.length >= 5, "stack groups");
assert(getAICapabilities().items.length === 10, "10 AI capabilities");
assert(getSoftwareCapabilities().items.length >= 5, "software capabilities");
assert(getUses().sections.length >= 3, "uses sections");
assert(getNow().items.length >= 2, "now items");

const projects = getProjects();
assert(projects.length >= 4, "at least 4 projects");
for (const p of projects) {
  assert(p.title && p.slug && p.summary && p.domain, `project fields: ${p.slug}`);
  assert(Array.isArray(p.tech) && p.tech.length > 0, `tech: ${p.slug}`);
  assert(typeof p.order === "number", `order: ${p.slug}`);
  assert(p.body.includes("## Problem"), `Problem section: ${p.slug}`);
  assert(p.body.includes("## Architecture"), `Architecture section: ${p.slug}`);
  assert(p.body.includes("## Lessons Learned"), `Lessons section: ${p.slug}`);
}

console.log(
  `Content OK: ${projects.length} projects, ${getAICapabilities().items.length} AI capabilities, ${journey.items.length} journey items.`
);
