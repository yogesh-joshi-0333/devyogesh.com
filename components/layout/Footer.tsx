import Link from "next/link";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-10 sm:flex-row">
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} {site.name}. Built as a product, not a page.
        </p>
        <nav className="flex items-center gap-5 text-sm text-muted" aria-label="Footer">
          <Link prefetch={false} href="/uses/" className="hover:text-ink transition-colors">Uses</Link>
          <Link prefetch={false} href="/now/" className="hover:text-ink transition-colors">Now</Link>
          <a href={site.socials.github} rel="noopener noreferrer" target="_blank" className="hover:text-ink transition-colors">GitHub</a>
          <a href={site.socials.linkedin} rel="noopener noreferrer" target="_blank" className="hover:text-ink transition-colors">LinkedIn</a>
        </nav>
      </div>
    </footer>
  );
}
