# edmealem.dev

Personal portfolio and technical writing website for **Edmealem Kassahun**, a full-stack and backend developer working primarily with TypeScript, Node.js, Next.js, and PostgreSQL.

**Website:** [edmealem.dev](https://edmealem.dev) *(planned custom domain; deployment and DNS to be confirmed)*  
**Repository:** [edmealem-k/edmealem.dev](https://github.com/edmealem-k/edmealem.dev)

> **Development status:** This repository has been adapted from [Victor Eke's open-source portfolio](https://github.com/Evavic44/victoreke.com). The architecture migration from Sanity CMS to local MDX, typed configuration, and Bun package management is complete, preserving the original visual UI and layout.

## Goals

- Present professional background, work experience, and developer projects in a clean, accessible portfolio.
- Publish technical articles and engineering notes using version-controlled MDX.
- Document project architecture and engineering decisions in detailed case studies.
- Make it easy for prospective clients, collaborators, and employers to explore my work and get in touch.

## Technology Stack

| Concern | Technology |
| --- | --- |
| Package Manager | **Bun** (pinned `1.3.14`, committed `bun.lock`) |
| Framework | Next.js App Router (16.4.5) + React 19.3 + TypeScript |
| Styling | Tailwind CSS 3.3, preserving original layout and theme tokens |
| Content | Local Markdown/MDX with Zod frontmatter validation and `next-mdx-remote/rsc` |
| Code Syntax Highlighting | Prism CSS + `rehype-prism-plus` with copy-to-clipboard |
| Blog Comments | Giscus + GitHub Discussions *(optional, gracefully disabled until configured)* |
| Analytics | Umami *(optional, activated via `NEXT_PUBLIC_UMAMI_WEBSITE_ID`)* |
| Unit Testing | Vitest + React Testing Library + JSDOM |
| E2E Testing | Playwright (Chromium smoke test suite) |
| CI / Automation | GitHub Actions (`bun install --frozen-lockfile`) |

The portfolio is a **self-contained Next.js application**. It requires no external CMS, database, or backend server for core operation.

## Sections & Routes

| Route | Content |
| --- | --- |
| `/` | Hero introduction, social links, GitHub contribution graph, experience |
| `/about` | Background biography, education, experience, usage stack |
| `/projects` | Compact project card listing |
| `/projects/hono-commerce` | Multi-tenant e-commerce platform case study |
| `/projects/devvault` | Developer knowledge workspace case study |
| `/blog` | Technical writing index |
| `/blog/tenant-isolation-in-saas` | Tenant isolation architecture article |
| `/blog/reliable-background-jobs-nodejs` | Asynchronous processing and idempotency article |
| `/photos` | Visual gallery section (preserved from upstream layout) |

## Local Development

```bash
# Clone the repository
git clone https://github.com/edmealem-k/edmealem.dev.git
cd edmealem.dev

# Install dependencies using Bun
bun install

# Start development server
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Verified Quality Scripts

```bash
# Code style and Next.js linting
bun run lint

# TypeScript strict type checking
bun run typecheck

# Unit tests (Vitest)
bun run test

# Production build
bun run build

# End-to-end browser tests (Playwright)
bun run test:e2e
```

## Content Organization

```text
app/                         # Next.js App Router pages and global components
components/                  # Shared UI components
content/
  blog/                      # Local .mdx technical articles
  projects/                  # Local .mdx project case studies
config/
  site.ts                    # Central site metadata, author profile, and integrations
lib/
  content/                   # Content loaders, Zod schemas, and MDX renderer
public/                      # Static assets and placeholder imagery
tests/
  unit/                      # Vitest unit test suite
  e2e/                       # Playwright browser smoke tests
```

### Adding a Blog Post

Create a `.mdx` file under `content/blog/` with frontmatter:

```mdx
---
title: "Article Title"
slug: "article-slug"
description: "Brief summary of the post."
date: "2026-11-09"
author: "edmealem"
tags: ["TypeScript", "Backend"]
featured: false
published: true
coverImage: "/images/blog/cover-placeholder.webp"
---

## Overview

Your article content goes here...
```

The content system automatically validates frontmatter with Zod and computes reading time from the prose. Unpublished posts (`published: false`) are excluded from public listings and static route generation.

### Adding a Project Case Study

Create a `.mdx` file under `content/projects/`:

```mdx
---
title: "Project Name"
slug: "project-slug"
tagline: "Short tagline"
summary: "Longer project summary"
category: "Full-stack / SaaS"
status: "In development"
featured: true
order: 1
tags: ["TypeScript", "Next.js", "PostgreSQL"]
coverImage: "/images/projects/cover-placeholder.webp"
repositoryUrl: "https://github.com/edmealem-k/..."
liveUrl: null
published: true
---

## Overview

Case study details...
```

## Integrations

- **Giscus Comments:** Enabled via GitHub Discussions on the public `edmealem-k/edmealem.dev` repository. Configure `NEXT_PUBLIC_GISCUS_REPOID` and `NEXT_PUBLIC_GISCUS_CATEGORYID` in `.env.local` or `config/site.ts`. The comments section gracefully displays a disabled placeholder until these IDs are supplied.
- **Umami Analytics:** Optional; provide `NEXT_PUBLIC_UMAMI_WEBSITE_ID` to activate the analytics script.
- **Support / Buy Me a Coffee:** Optional; configure `siteConfig.supportUrl` in `config/site.ts`. Displays an unobtrusive placeholder when unset.

## Design and Attribution

This project is adapted from [Evavic44/victoreke.com](https://github.com/Evavic44/victoreke.com) by **Victor Eke**. The initial adaptation intentionally preserves the original site's visual geometry, fonts, colors, component hierarchy, animations, and responsive behavior.

The original source code is licensed under the **MIT License, Copyright (c) 2023 Victor Eke**. The original license notice is preserved intact in [`LICENSE`](LICENSE). Original additions and content are copyright &copy; 2026 Edmealem Kassahun. A discreet footer link to [victoreke.com](https://victoreke.com) honors the original author's attribution request.

## Contact

- **Website:** [edmealem.dev](https://edmealem.dev)
- **GitHub:** [edmealem-k](https://github.com/edmealem-k)
- **LinkedIn:** [edmealem-k](https://linkedin.com/in/edmealem-k)
- **X:** [@edmealem_k](https://x.com/edmealem_k)
