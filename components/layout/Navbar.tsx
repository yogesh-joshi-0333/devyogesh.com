"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

const links = [
  { href: "/#projects", label: "Projects" },
  { href: "/#ai", label: "AI" },
  { href: "/#journey", label: "Journey" },
  { href: "/#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "py-2" : "py-4"
      )}
    >
      <nav
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full px-5 transition-all duration-300",
          scrolled ? "glass mx-4 sm:mx-auto max-w-4xl py-2 shadow-lg" : "py-3"
        )}
        aria-label="Main"
      >
        <Link prefetch={false} href="/" className="font-mono text-sm font-semibold tracking-tight">
          <span className="text-gradient">dev</span>yogesh
        </Link>
        <div className="hidden items-center gap-6 sm:flex">
          {links.map((l) => (
            <Link prefetch={false}
              key={l.href}
              href={l.href}
              className="text-sm text-muted transition-colors hover:text-ink"
            >
              {l.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="hidden items-center gap-1.5 rounded-full border border-line px-3 py-1.5 font-mono text-xs text-muted transition-colors hover:text-ink sm:flex"
            onClick={() => window.dispatchEvent(new CustomEvent("open-palette"))}
            aria-label="Open command palette"
          >
            <span>⌘</span>K
          </button>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
