import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");

export type ProjectLinks = { demo?: string; github?: string };

export type ProjectMeta = {
  title: string;
  slug: string;
  summary: string;
  domain: string;
  tech: string[];
  featured: boolean;
  order: number;
  year: number;
  status?: string;
  links: ProjectLinks;
};

export type Project = ProjectMeta & { body: string };

function readJson<T>(name: string): T {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, name), "utf8");
  return JSON.parse(raw) as T;
}

export type Profile = {
  name: string;
  role: string;
  heroStatement: string;
  heroSub: string;
  typingRoles: string[];
  brandMessage: string;
  stats: { label: string; value: number; suffix?: string }[];
};

export type Philosophy = { statements: { lead: string; body: string }[] };

export type Focus = {
  title: string;
  intro: string;
  items: { title: string; description: string; tag: string }[];
};

export type Journey = {
  items: {
    period: string;
    role: string;
    org: string;
    summary: string;
    highlights: string[];
  }[];
  education: { period: string; degree: string; school: string }[];
};

export type Stack = { groups: { name: string; items: string[] }[] };

export type Capabilities = {
  title: string;
  intro: string;
  items: { title: string; description: string; icon: string }[];
};

export type SimpleList = {
  title: string;
  intro?: string;
  sections: { name: string; items: string[] }[];
};

export type NowContent = {
  updated: string;
  intro: string;
  items: { title: string; description: string }[];
};

export const getProfile = () => readJson<Profile>("profile.json");
export const getPhilosophy = () => readJson<Philosophy>("philosophy.json");
export const getFocus = () => readJson<Focus>("focus.json");
export const getJourney = () => readJson<Journey>("journey.json");
export const getStack = () => readJson<Stack>("stack.json");
export const getAICapabilities = () =>
  readJson<Capabilities>("ai-capabilities.json");
export const getSoftwareCapabilities = () =>
  readJson<Capabilities>("software-capabilities.json");
export const getUses = () => readJson<SimpleList>("uses.json");
export const getNow = () => readJson<NowContent>("now.json");

const PROJECTS_DIR = path.join(CONTENT_DIR, "projects");

export function getProjects(): Project[] {
  const files = fs.readdirSync(PROJECTS_DIR).filter((f) => f.endsWith(".mdx"));
  const projects = files.map((file) => {
    const raw = fs.readFileSync(path.join(PROJECTS_DIR, file), "utf8");
    const { data, content } = matter(raw);
    return { ...(data as ProjectMeta), body: content };
  });
  return projects.sort((a, b) => a.order - b.order);
}

export function getFeaturedProjects(): Project[] {
  return getProjects().filter((p) => p.featured);
}

export function getProject(slug: string): Project | undefined {
  return getProjects().find((p) => p.slug === slug);
}
