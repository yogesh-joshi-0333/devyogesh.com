# DevYogesh.com — Portfolio Website (v1)

[![Deploy Portfolio Website](https://github.com/yogesh-joshi-0333/devyogesh.com/actions/workflows/deploy.yml/badge.svg)](https://github.com/yogesh-joshi-0333/devyogesh.com/actions/workflows/deploy.yml)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

A cinematic, dark-first, and highly optimized professional portfolio website for **Yogesh Joshi — Senior AI & Software Engineer**. 

The site is built as a Next.js 16 Static Export (`output: 'export'`) and automated to deploy securely to Hostinger via GitHub Actions CI/CD.

---

## 🏗️ Architecture & Tech Stack

*   **Framework:** Next.js 16 (App Router)
*   **Rendering:** SSG (Static Site Generation / Prerendered Static HTML)
*   **Styling:** Tailwind CSS v4 using CSS variables for dark-first design tokens
*   **Animations:** Framer Motion (optimized using `LazyMotion` and `m` tags to minimize initial bundle size)
*   **Interactive FX:** Canvas-based 2D particle node field (pauses when out of focus to save CPU) and mouse-following spotlight radial glow
*   **Data Layer:** Managed entirely via local JSON configuration and MDX case study files (decoupled from the component files)
*   **Dynamic Data:** Build-time fetched GitHub contribution activity and repository stats with committed snapshot fallback

---

## 📁 Repository Structure

```text
devyogesh.com/
├── .github/workflows/
│   └── deploy.yml          # Dual-branch CI/CD deploy pipeline (SSH/rsync)
├── app/
│   ├── globals.css         # Styling, Tailwind imports, and design tokens
│   ├── layout.tsx          # Root HTML shell, next-themes, and layout structure
│   ├── page.tsx            # Main cinematic landing page combining all sections
│   ├── opengraph-image.tsx # Dynamic OpenGraph / Twitter meta card generator
│   └── projects/
│       ├── page.tsx        # Projects index explorer with category filters
│       └── [slug]/
│           └── page.tsx    # SSG MDX case studies rendered dynamic-to-static
├── components/
│   ├── fx/                 # Interactive visual effects (Spotlight cursor)
│   ├── hero/               # Hero particle canvas and typewriter components
│   ├── layout/             # Shared layout chrome (Navbar, Footer)
│   ├── palette/            # Modal Command Palette (Cmd+K)
│   ├── sections/           # Individual landing page sections (Journey, Stack, etc.)
│   └── ui/                 # Reusable primitive blocks (TiltCard, Reveal, Section)
├── content/                # The Content Layer (JSON schema configs and MDX files)
├── lib/                    # Shared helper functions, configurations, and loaders
├── public/                 # Static assets, icons, and favicon configurations
├── scripts/                # Utility node scripts for content validation and APIs
└── package.json            # Scripts, dependency mappings, and project metadata
```

---

## 🚀 Getting Started

### 1. Installation
Install the project dependencies:
```bash
npm install
```

### 2. Local Development
Start the Next.js Turbopack dev server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the site.

---

## ⚙️ Development Commands

### Validate Content Schemas
To ensure all JSON and MDX projects conform to the site's TypeScript data definitions:
```bash
npm run validate-content
```

### Refresh GitHub Stats Snapshot
Stats are fetched at build-time. Set a `GITHUB_TOKEN` environment variable to use the GraphQL API, or run without one to query public REST fallback APIs. This script refreshes the local cache snapshot file:
```bash
npm run refresh-github
```

### Run Linter
Scan for TypeScript type correctness and code styling issues:
```bash
npm run lint
```

### Build Project
Compile the site and export it as static files in the `out/` folder:
```bash
npm run build
```

---

## 🌐 CI/CD & Automated Deployment

Deployments are automated using GitHub Actions (`.github/workflows/deploy.yml`) which compiles the Next.js site and securely syncs files to Hostinger via **SFTP/SSH** using `rsync` over port `65002`.

### Branching Strategy
*   **`preview` branch:** Pushes auto-deploy to the staging subdomain: **[preview.devyogesh.com](http://preview.devyogesh.com)**
*   **`main` branch:** Pushes auto-deploy to the live production site: **[devyogesh.com](http://devyogesh.com)**

### Required Secrets
Add your SSH password to your GitHub Repository Secrets (**Settings > Secrets and variables > Actions**):
*   `SSH_PASSWORD` - Your Hostinger SSH Account Password

*(Other details: `SSH_HOST`, `SSH_PORT`, and `SSH_USER` have already been securely configured automatically via the GitHub CLI).*
