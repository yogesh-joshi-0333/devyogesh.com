import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getProject, getProjects } from "@/lib/content";
import { ReadingProgress } from "@/components/ui/ReadingProgress";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/lib/site";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/projects/${slug}/` },
    openGraph: {
      title: project.title,
      description: project.summary,
      type: "article",
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Projects", item: `${site.url}/projects/` },
      { "@type": "ListItem", position: 3, name: project.title, item: `${site.url}/projects/${slug}/` },
    ],
  };

  return (
    <main id="main" className="mx-auto w-full max-w-3xl px-6 pt-36 pb-24">
      <ReadingProgress />
      <JsonLd data={breadcrumbs} />
      <nav aria-label="Breadcrumb" className="mb-8 font-mono text-xs text-muted">
        <Link href="/" className="hover:text-ink">Home</Link>
        <span aria-hidden> / </span>
        <Link href="/projects/" className="hover:text-ink">Projects</Link>
        <span aria-hidden> / </span>
        <span className="text-ink">{project.title}</span>
      </nav>
      <header className="mb-12">
        <div className="mb-4 flex items-center gap-4">
          <span className="font-mono text-xs tracking-widest uppercase text-cyan">{project.domain}</span>
          <span className="font-mono text-xs text-muted">{project.year}</span>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl text-balance">
          {project.title}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted">{project.summary}</p>
        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies">
          {project.tech.map((t) => (
            <li key={t} className="rounded-full bg-surface-2 px-3 py-1 font-mono text-xs text-muted">
              {t}
            </li>
          ))}
        </ul>
        {(project.links.demo || project.links.github) && (
          <div className="mt-6 flex gap-4 text-sm font-medium">
            {project.links.demo && (
              <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="text-blue underline-offset-4 hover:underline">
                Live demo ↗
              </a>
            )}
            {project.links.github && (
              <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="text-blue underline-offset-4 hover:underline">
                GitHub ↗
              </a>
            )}
          </div>
        )}
      </header>
      <article className="prose-custom">
        <MDXRemote source={project.body} />
      </article>
      <footer className="mt-16 border-t border-line pt-8">
        <Link href="/projects/" className="text-sm font-medium text-muted hover:text-ink">
          ← All projects
        </Link>
      </footer>
    </main>
  );
}
