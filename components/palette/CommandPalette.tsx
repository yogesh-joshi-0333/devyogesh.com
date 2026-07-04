"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { site } from "@/lib/site";

type Action = {
  id: string;
  label: string;
  hint: string;
  run: () => void;
};

type Props = { projects: { slug: string; title: string }[] };

export function CommandPalette({ projects }: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setIndex(0);
  }, []);

  const go = useCallback(
    (href: string) => {
      close();
      router.push(href);
    },
    [router, close]
  );

  const actions = useMemo<Action[]>(
    () => [
      { id: "home", label: "Go to Home", hint: "Page", run: () => go("/") },
      { id: "projects", label: "Go to Projects", hint: "Page", run: () => go("/projects/") },
      { id: "uses", label: "Go to Uses", hint: "Page", run: () => go("/uses/") },
      { id: "now", label: "Go to Now", hint: "Page", run: () => go("/now/") },
      { id: "ai", label: "AI Engineering", hint: "Section", run: () => go("/#ai") },
      { id: "journey", label: "Engineering Journey", hint: "Section", run: () => go("/#journey") },
      { id: "contact", label: "Contact", hint: "Section", run: () => go("/#contact") },
      ...projects.map((p) => ({
        id: `p-${p.slug}`,
        label: p.title,
        hint: "Project",
        run: () => go(`/projects/${p.slug}/`),
      })),
      {
        id: "email",
        label: "Copy email address",
        hint: "Action",
        run: () => {
          navigator.clipboard?.writeText(site.email);
          close();
        },
      },
      {
        id: "theme",
        label: "Toggle theme",
        hint: "Action",
        run: () => {
          setTheme(resolvedTheme === "dark" ? "light" : "dark");
          close();
        },
      },
      {
        id: "github",
        label: "Open GitHub profile",
        hint: "Link",
        run: () => {
          window.open(site.socials.github, "_blank", "noopener");
          close();
        },
      },
      {
        id: "linkedin",
        label: "Open LinkedIn profile",
        hint: "Link",
        run: () => {
          window.open(site.socials.linkedin, "_blank", "noopener");
          close();
        },
      },
    ],
    [projects, go, close, resolvedTheme, setTheme]
  );

  const filtered = useMemo(() => {
    if (!query.trim()) return actions;
    const q = query.toLowerCase();
    return actions.filter(
      (a) => a.label.toLowerCase().includes(q) || a.hint.toLowerCase().includes(q)
    );
  }, [actions, query]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") close();
    }
    function onOpen() {
      setOpen(true);
    }
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-palette", onOpen);
    };
  }, [close]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-start justify-center bg-black/50 p-4 pt-[15vh] backdrop-blur-sm"
      onClick={close}
      role="presentation"
    >
      <div
        className="glass w-full max-w-lg overflow-hidden rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
      >
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIndex(0);
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setIndex((i) => Math.min(i + 1, filtered.length - 1));
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setIndex((i) => Math.max(i - 1, 0));
            } else if (e.key === "Enter" && filtered[index]) {
              filtered[index].run();
            }
          }}
          placeholder="Type a command or search…"
          className="w-full border-b border-line bg-transparent px-5 py-4 text-sm outline-none placeholder:text-muted"
          role="combobox"
          aria-expanded="true"
          aria-controls="palette-list"
          aria-activedescendant={filtered[index]?.id}
        />
        <ul id="palette-list" role="listbox" className="max-h-72 overflow-y-auto p-2">
          {filtered.length === 0 && (
            <li className="px-4 py-6 text-center text-sm text-muted">No results</li>
          )}
          {filtered.map((a, i) => (
            <li key={a.id} id={a.id} role="option" aria-selected={i === index}>
              <button
                type="button"
                onClick={a.run}
                onMouseEnter={() => setIndex(i)}
                className={`flex w-full items-center justify-between rounded-lg px-4 py-2.5 text-left text-sm ${
                  i === index ? "bg-blue/15 text-ink" : "text-muted"
                }`}
              >
                <span>{a.label}</span>
                <span className="font-mono text-xs opacity-60">{a.hint}</span>
              </button>
            </li>
          ))}
        </ul>
        <p className="border-t border-line px-5 py-2.5 font-mono text-[11px] text-muted">
          ↑↓ navigate · ↵ select · esc close
        </p>
      </div>
    </div>
  );
}
