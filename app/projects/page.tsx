import type { Metadata } from "next";
import { getProjects } from "@/lib/content";
import { ProjectsExplorer } from "@/components/projects/ProjectsExplorer";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Case studies in AI engineering and software architecture — problem, architecture, challenges, and lessons learned.",
  alternates: { canonical: "/projects/" },
};

export default function ProjectsPage() {
  const projects = getProjects().map((p) => {
    const { body, ...meta } = p;
    void body;
    return meta;
  });
  return (
    <main id="main" className="mx-auto w-full max-w-6xl px-6 pt-36 pb-24">
      <header className="mb-12 max-w-2xl">
        <p className="mb-3 font-mono text-sm tracking-widest uppercase text-cyan">Projects</p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Case studies</h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          Every project documented the way engineering deserves: the problem, the architecture,
          what went wrong, and what I&apos;d do differently.
        </p>
      </header>
      <ProjectsExplorer projects={projects} />
    </main>
  );
}
