import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getProjects } from "@/lib/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ["", "projects/", "uses/", "now/"].map((p) => ({
    url: `${site.url}/${p}`,
    changeFrequency: "monthly" as const,
    priority: p === "" ? 1 : 0.7,
  }));
  const projectPages = getProjects().map((p) => ({
    url: `${site.url}/projects/${p.slug}/`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));
  return [...staticPages, ...projectPages];
}
