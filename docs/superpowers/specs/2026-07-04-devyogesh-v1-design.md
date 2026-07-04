# DevYogesh.com v1 — Design Spec

Date: 2026-07-04
Status: Approved pending user review
Owner: Yogesh Kumar Joshi

## Vision

The digital identity of Yogesh — Senior AI & Software Engineer. Not a résumé: a premium, cinematic, technically impressive product experience. Brand: engineer not influencer, builder not marketer, minimal but not empty. Target impression: "This engineer understands modern software architecture and pays attention to every detail."

## Scope

**V1 (this build):** Homepage + project case studies + core pages, full interactive layer, SEO/a11y/performance hardening.

**Phase 2 (separate spec):** Blog (`/blog`, MDX articles, RSS, Article schema, TOC, reading time, code-copy), AI Lab (`/lab`).

**Phase 3:** Testimonials, background audio toggle, live integrations beyond build-time GitHub data.

## Architecture

- **Stack:** Next.js 15, App Router, TypeScript, `output: 'export'` (fully static), Tailwind CSS v4, Framer Motion, `next-themes`.
- **Content:** MDX + JSON files under `content/` (projects, timeline, stats, philosophy, stack). No CMS. Edit → rebuild → redeploy.
- **GitHub data:** Fetched at build time (contribution calendar + repo/star/commit counts via GitHub API), baked into static HTML. Zero client-side API calls. Build succeeds with cached/fallback data if API unavailable.
- **Deploy:** Static `out/` directory to existing Hostinger hosting at devyogesh.com.

## Routes

| Route | Content |
|---|---|
| `/` | Cinematic homepage (sections below) |
| `/projects` | Filterable project index (filter by domain/tech) |
| `/projects/[slug]` | Case study: Problem → Architecture → Technologies → Challenges → Performance → Screenshots → Demo/GitHub → Lessons Learned → Future Improvements |
| `/uses` | Hardware/software/tools |
| `/now` | Current focus, updated periodically |
| 404 | Custom animated page |

## Homepage sections (order)

1. **Hero** — AI neural-network particle canvas (mouse-reactive nodes/edges) over slow aurora gradient; large typographic statement; typing line; scroll cue. Canvas pauses off-screen, caps DPR, disabled under `prefers-reduced-motion` (static gradient fallback).
2. **Engineering Philosophy** — large statements revealed on scroll.
3. **Current Focus** — what's being built/explored now.
4. **Featured Projects** — 4–5 cards, progressive reveal, link to case studies.
5. **AI Engineering** — comprehensive capability grid (see below).
6. **Software Engineering** — architecture, APIs, Laravel/FastAPI/Next.js, databases, cloud, performance, team leadership.
7. **Engineering Dashboard** — animated counters: years of experience, projects delivered, GitHub commits, repositories, technologies explored, AI experiments, certifications.
8. **Engineering Journey** — scroll-animated timeline from real history (Hashscript 2018 → Spark Tech → Hunani 2019–2022 → IndiaNIC 2022–2024 → TechArk/current).
9. **Technology Stack** — grouped (AI, Backend, Frontend, Data, Cloud/DevOps, Tools), hover states.
10. **GitHub Activity** — contribution graph (build-time data).
11. **Contact** — email, socials, magnetic CTA.

## AI Engineering section — complete coverage

Capability cards, each with a one-line proof point linking to a project/experiment where possible:

1. **LLM Application Development** — production apps on Claude/GPT/Gemini APIs; streaming, structured outputs, tool calling.
2. **Agentic AI & Multi-Agent Systems** — autonomous agents, CrewAI/LangGraph orchestration, planner–executor patterns.
3. **RAG & Vector Search** — retrieval pipelines, embeddings, chunking, hybrid search, pgvector/Pinecone/Qdrant.
4. **MCP (Model Context Protocol)** — building and integrating MCP servers and tools.
5. **Prompt Engineering** — system-prompt design, prompt libraries, few-shot patterns, guardrails.
6. **Fine-tuning & Local LLMs** — LoRA/PEFT, Ollama, private/on-prem deployments.
7. **AI Evals & Observability** — output testing, regression evals, tracing, cost/latency monitoring.
8. **Intelligent Automation** — AI workflow pipelines, document intelligence, content automation.
9. **Voice & Multimodal AI** — STT/TTS, vision-model integrations.
10. **AI + Product Engineering** — shipping AI features in real products: FastAPI/Laravel backends, queues, caching, cost control.

The same taxonomy drives the Tech Stack AI group and phase-2 AI Lab categories.

## Design system

- **Theme:** dark-first (`#0A0A0F` base, dark-gray elevated surfaces); light theme via CSS variables + `next-themes`, no flash-of-wrong-theme, respects OS preference.
- **Accents:** electric blue, purple, cyan, white — used only to guide attention.
- **Type:** one self-hosted variable sans (Geist or Inter) + mono accent; huge hero headings, short paragraphs, generous line spacing.
- **Components:** selective glassmorphism, subtle gradient borders, rounded-xl cards, large spacing scale, consistent design tokens.

## Interactive layer

- Command palette (Ctrl/⌘+K): navigate sections & projects, copy email, theme toggle, social links.
- Spotlight cursor, magnetic buttons, 3D card tilt, hover lift.
- Animated counters, scroll-triggered reveals, navbar shrink on scroll, reading progress bar on case studies.
- Copy-to-clipboard on email/code, keyboard shortcuts, smooth page transitions.
- **All motion gated behind `prefers-reduced-motion`** with dignified static fallbacks.

## Performance / SEO / Accessibility

- Targets: Lighthouse 100/100/100/100; excellent Core Web Vitals.
- Static export; self-hosted fonts (`font-display: swap`, subset); AVIF/WebP pre-optimized images; lazy loading; code-split heavy islands (particles, palette).
- JSON-LD: Person, WebSite, BreadcrumbList (Article schema in phase 2). Open Graph + Twitter cards with per-page generated OG images. sitemap.xml, robots.txt, canonical URLs, human-readable URLs, semantic HTML, internal linking.
- Full keyboard navigation, visible focus states, ARIA where needed, contrast-checked palette, screen-reader friendly.

## Content plan

- Repositioned identity: **Yogesh Joshi — Senior AI & Software Engineer** (8+ years). Old-site facts reused: experience timeline, education (MCA Marwadi Univ.), GitHub (yogesh-joshi-0333), LinkedIn.
- Brand message: "I don't build software just to make applications work…" (from vision doc) woven into Philosophy section.
- 4–5 case-study drafts authored from history (topspinclub.in, EventApp, newra.ai support, AI automation pipeline work) as structured placeholders — **user replaces/approves all copy, metrics, and screenshots before launch.**
- Contact email to confirm with user before launch.

## Error handling & resilience

- GitHub build-time fetch: retry once, then fall back to committed snapshot JSON; never fail the build.
- Particle canvas: feature-detects, falls back to static gradient; capped DPR and pause-when-offscreen.
- 404 page; all internal links checked at build (static export fails on broken links).

## Testing & verification

- `next build` static export must pass with zero errors.
- Lighthouse CI run against built output; budget assertions on the four 100 targets.
- Axe accessibility scan on key pages.
- Manual pass: keyboard-only navigation, reduced-motion mode, mobile viewport, theme toggle, command palette.

## Project location

`C:\Users\joshi\projects\devyogesh.com` — fresh git repo.
