# DevYogesh.com — Portfolio Website (v1)

A cinematic, high-performance, dark-first portfolio website for **Yogesh Joshi — Senior AI & Software Engineer**. 

Built with Next.js 16 (Static Export), TypeScript, Tailwind CSS v4, Framer Motion (lazy-loaded), and MDX.

---

## 🛠️ Stack & Architecture

- **Framework:** Next.js 16 (App Router) using `output: 'export'` for full static generation.
- **Styling:** Tailwind CSS v4 with custom variables configured in `app/globals.css` for a premium dark interface.
- **Animations:** Framer Motion (optimized using `LazyMotion` and `m` tags to minimize the bundle size).
- **Interactive FX:** Custom cursor spotlight glow, typewriter role animators, and a canvas particle field that pauses when off-screen or out of focus.
- **Data Source:** Static JSON & MDX files stored inside the `content/` folder.
- **Dynamic Data:** Dynamic GitHub contribution calendar heatmap and repository statistics fetched at build-time (with REST APIs and static JSON fallbacks).

---

## 🚀 Getting Started

### 1. Installation
Install the project dependencies:
```bash
npm install
```

### 2. Run the Development Server
Launch the local Turbopack development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📄 Content Management

Prose and metadata are decoupled from layout files. To update content:

- **Identity & Biography:** Edit [content/profile.json](file:///c:/Users/joshi/projects/devyogesh.com/content/profile.json)
- **Engineering Philosophy:** Edit [content/philosophy.json](file:///c:/Users/joshi/projects/devyogesh.com/content/philosophy.json)
- **Focus Areas:** Edit [content/focus.json](file:///c:/Users/joshi/projects/devyogesh.com/content/focus.json)
- **Engineering Journey:** Edit [content/journey.json](file:///c:/Users/joshi/projects/devyogesh.com/content/journey.json)
- **Tech Stack:** Edit [content/stack.json](file:///c:/Users/joshi/projects/devyogesh.com/content/stack.json)
- **Capabilities (AI & Software):** Edit [content/ai-capabilities.json](file:///c:/Users/joshi/projects/devyogesh.com/content/ai-capabilities.json) and [content/software-capabilities.json](file:///c:/Users/joshi/projects/devyogesh.com/content/software-capabilities.json)
- **Case Studies (MDX):** Add or edit MDX files in [content/projects/](file:///c:/Users/joshi/projects/devyogesh.com/content/projects). Each file requires frontmatter metadata and structured section headers (e.g., `## Problem`, `## Architecture`, `## Lessons Learned`).

---

## ⚙️ Development Commands

### Validate Content
Verify that all JSON and MDX case study files conform to the project schema specifications:
```bash
npm run validate-content
```

### Refresh GitHub Statistics Snapshot
GitHub stats are loaded at build-time. Set a `GITHUB_TOKEN` environment variable to query the GraphQL API, or run the command without a token to query public REST endpoints. This command refreshes the local fallback snapshot:
```bash
npm run refresh-github
```

### Run Linter
Scan codebase for code style and syntax issues:
```bash
npm run lint
```

### Create Build
Export the project as a fully static website in the `out/` folder:
```bash
npm run build
```

---

## 🌐 Deployment to Hostinger

Since the project uses Next.js static exports, it can be deployed directly to Hostinger's static web servers.

### Steps to Deploy manually:
1. Run `npm run build` to generate the production static files in the `out/` directory.
2. Compress the contents of the `out/` directory into a `.zip` archive.
3. Upload the archive to your Hostinger server (main directory `/public_html` or subdomain folders like `/public_html/preview`) and extract.
