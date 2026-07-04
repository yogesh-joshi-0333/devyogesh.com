# DevYogesh.com v1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and verify the complete static DevYogesh.com v1 — cinematic homepage, project case studies, /uses, /now, 404 — deployable to Hostinger.

**Architecture:** Next.js 15 App Router with `output: 'export'`, all content from local `content/` MDX/JSON files, GitHub stats fetched at build time with committed fallback snapshot, Framer Motion for animation, Tailwind v4 tokens for the design system. Heavy islands (particle hero, command palette) are client components loaded dynamically.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS v4, Framer Motion, next-themes, MDX (next-mdx-remote or gray-matter+react-markdown), Geist font.

## Global Constraints

- Static export only: `output: 'export'` in next.config; no server APIs, no ISR, `images.unoptimized: true`.
- Dark-first theme; base background `#0A0A0F`; accents electric blue / purple / cyan used sparingly.
- All motion gated behind `prefers-reduced-motion` (via Framer Motion `useReducedMotion` or CSS media query) with static fallbacks.
- Lighthouse targets 100/100/100/100 on built output; semantic HTML; keyboard navigable; visible focus states.
- All copy/data lives in `content/` — no hardcoded prose inside components.
- Repositioned identity: "Yogesh Joshi — Senior AI & Software Engineer".
- Commit after every task with a conventional message.

---

### Task 1: Scaffold Next.js project with static export + design tokens
**Files:** create app via `create-next-app` (TypeScript, Tailwind, App Router, src dir OFF), then `next.config.ts` (`output: 'export'`, `images.unoptimized: true`), `app/globals.css` (CSS variables for dark/light tokens: `--bg`, `--surface`, `--border`, `--text`, `--muted`, `--accent-blue #3B82F6`, `--accent-purple #8B5CF6`, `--accent-cyan #22D3EE`), `app/layout.tsx` (Geist via `next/font`, metadata base), `lib/site.ts` (site constants: name, title, url, socials, email).
**Verify:** `npm run build` produces `out/index.html`. Commit.

### Task 2: Content layer
**Files:** `content/profile.json` (identity, bio, brand message, socials, stats numbers), `content/philosophy.json`, `content/focus.json`, `content/journey.json` (Hashscript 2018-19 → Spark Tech → Hunani 2019-22 → IndiaNIC 2022-24 → TechArk 2024-present), `content/stack.json` (groups: AI, Backend, Frontend, Data, Cloud/DevOps, Tools), `content/ai-capabilities.json` (the 10 capability cards from spec), `content/software-capabilities.json`, `content/projects/*.mdx` (5 case studies with frontmatter: title, slug, summary, domain, tech[], featured, order, problem/architecture/challenges/performance/lessons/future sections; clearly-labeled DRAFT metrics), `lib/content.ts` (typed loaders: `getProjects()`, `getProject(slug)`, JSON getters).
**Verify:** unit-ish check via a small `scripts/validate-content.ts` run with tsx that loads every file and asserts required fields; run it. Commit.

### Task 3: GitHub build-time data
**Files:** `lib/github.ts` — fetch contribution calendar (GraphQL if `GITHUB_TOKEN` set, else REST events approximation) and repo/star counts for `yogesh-joshi-0333`; retry once; on failure load `content/github-snapshot.json` (committed fallback). `scripts/refresh-github.ts` writes the snapshot.
**Verify:** run script without token → snapshot fallback works; build passes. Commit.

### Task 4: UI primitives + motion system
**Files:** `components/ui/Section.tsx` (semantic section + heading pattern), `components/ui/Card.tsx` (glass/gradient-border variants), `components/ui/Button.tsx` + `MagneticButton.tsx`, `components/ui/Reveal.tsx` (scroll-triggered fade/rise, reduced-motion aware), `components/ui/Counter.tsx` (count-up on in-view), `components/ui/TiltCard.tsx`, `lib/motion.ts` (shared variants/durations/easing).
**Verify:** typecheck + build. Commit.

### Task 5: Navbar, footer, theme, spotlight cursor
**Files:** `components/layout/Navbar.tsx` (shrinks on scroll, section links, ⌘K hint, theme toggle), `components/layout/Footer.tsx`, `components/theme/ThemeProvider.tsx` (next-themes, class strategy, defaultTheme dark), `components/fx/Spotlight.tsx` (mouse-follow radial glow, disabled on touch/reduced-motion), wire into `app/layout.tsx`.
**Verify:** build; no hydration warnings in dev console. Commit.

### Task 6: Hero — particle network + aurora
**Files:** `components/hero/Hero.tsx`, `components/hero/ParticleField.tsx` (canvas 2D: nodes + proximity edges, mouse attraction; DPR capped at 2; IntersectionObserver pause; reduced-motion/no-canvas → static aurora only), `components/hero/Typing.tsx` (rotating typed roles), aurora via CSS gradient animation in globals.
**Verify:** build; manual check dev server renders and animates; CPU sane. Commit.

### Task 7: Homepage sections
**Files:** `components/sections/Philosophy.tsx`, `Focus.tsx`, `FeaturedProjects.tsx`, `AIEngineering.tsx` (10-card grid), `SoftwareEngineering.tsx`, `Dashboard.tsx` (counters), `Journey.tsx` (scroll-animated timeline), `Stack.tsx`, `GitHubActivity.tsx` (contribution heatmap from build data), `Contact.tsx` (copy-email button, socials, magnetic CTA); assemble in `app/page.tsx`.
**Verify:** build; visual pass of every section. Commit per logical chunk if large.

### Task 8: Projects index + case-study pages
**Files:** `app/projects/page.tsx` (filter chips by domain/tech — client component over static list), `app/projects/[slug]/page.tsx` + `generateStaticParams`, `components/projects/CaseStudy.tsx` (renders MDX sections: Problem→Architecture→Tech→Challenges→Performance→Screenshots→Links→Lessons→Future), `components/ui/ReadingProgress.tsx`, `components/ui/CodeBlock.tsx` (copy button).
**Verify:** build emits one HTML per project; internal links valid. Commit.

### Task 9: Command palette + keyboard shortcuts
**Files:** `components/palette/CommandPalette.tsx` (Ctrl/⌘+K; actions: navigate sections/pages/projects, copy email, toggle theme, open socials; fuzzy filter; full keyboard nav + ARIA combobox semantics), dynamic import from layout.
**Verify:** build; manual: open with ⌘K, arrow-navigate, Enter executes, Esc closes. Commit.

### Task 10: /uses, /now, custom 404
**Files:** `content/uses.json`, `content/now.json`, `app/uses/page.tsx`, `app/now/page.tsx`, `app/not-found.tsx` (animated 404).
**Verify:** build; pages render. Commit.

### Task 11: SEO layer
**Files:** `app/sitemap.ts`, `app/robots.ts`, `components/seo/JsonLd.tsx` (Person + WebSite on home, BreadcrumbList on project pages), per-page `metadata` exports (title template, description, canonical, OG/Twitter), static OG image `public/og/*.png` generated via a `scripts/generate-og.ts` (satori or canvas) or hand-built images.
**Verify:** built HTML contains JSON-LD and OG tags (grep `out/`); sitemap.xml + robots.txt exist in `out/`. Commit.

### Task 12: Accessibility & performance hardening
**Steps:** keyboard-only audit (skip link, focus states, palette trap), contrast check on tokens, `font-display: swap` + subsetting, lazy-load below-fold sections' images, ensure particle/palette are dynamically imported, `npx @lhci/cli autorun` or `lighthouse` against `npx serve out` — iterate until 100/100/100/100 (or document any platform-limited residual). Axe scan via `@axe-core/cli` on key pages.
**Verify:** recorded Lighthouse + axe results. Commit fixes.

### Task 13: Final verification + deploy readiness
**Steps:** full `npm run build`; link check over `out/` (script or `linkinator`); reduced-motion manual pass; mobile viewport pass; light-theme pass; write `README.md` (edit content → rebuild → deploy to Hostinger instructions, GITHUB_TOKEN note); final commit. Deployment to Hostinger performed only after user reviews the site.

## Self-review
- Spec coverage: all routes, all 11 homepage sections, 10 AI capability cards, interactive layer, SEO/a11y/perf, GitHub fallback, content plan — mapped to tasks 1–13. Blog/AI Lab intentionally out (phase 2).
- No placeholders in plan tasks; code-level detail resolved during execution with verification gates per task.
- Naming consistent: `lib/content.ts` loaders consumed by tasks 7–10; `lib/github.ts` consumed by task 7 GitHubActivity.
