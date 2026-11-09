# edmealem.dev

Personal portfolio and technical writing website for **Edmealem Kassahun**, a full-stack and backend developer working primarily with TypeScript, Node.js, Next.js, and PostgreSQL.

**Website:** [edmealem.dev](https://edmealem.dev) *(planned custom domain; deployment and DNS to be confirmed)*  
**Repository:** [edmealem-k/edmealem.dev](https://github.com/edmealem-k/edmealem.dev)

> **Development status:** This repository is being adapted from [Victor Eke's open-source portfolio](https://github.com/Evavic44/victoreke.com). The target architecture below describes the migration plan; it should not be mistaken for a guarantee that every listed feature is already implemented.

## Goals

- Present my background, work experience, and developer projects in a clean, accessible portfolio.
- Publish technical articles and engineering notes using version-controlled MDX.
- Document project architecture and engineering decisions in detailed case studies.
- Make it easy for prospective clients, collaborators, and employers to explore my work and get in touch.

## Target technology stack

| Concern | Technology |
| --- | --- |
| Framework | Next.js App Router + React + TypeScript |
| Styling | Tailwind CSS, adapted from the original visual design |
| Content | Local Markdown/MDX files with validated frontmatter |
| Code examples | MDX components and syntax highlighting |
| Blog comments | Giscus + GitHub Discussions *(optional, requires setup)* |
| Analytics | Umami *(optional)* |
| Hosting | Vercel or another Next.js-compatible host |
| Quality | TypeScript, ESLint, Vitest, Playwright, GitHub Actions *(migration targets)* |

The portfolio is intended to be a **single Next.js application**. It does not require a separate API, CMS server, database, or authentication system.

## Planned sections

| Route | Content |
| --- | --- |
| `/` | Introduction, links, GitHub contribution graph, experience |
| `/about` | Background, skills, work, education, resume |
| `/projects` | Selected project listing |
| `/projects/hono-commerce` | Multi-tenant e-commerce SaaS case study |
| `/projects/devvault` | Developer knowledge platform case study |
| `/blog` | Technical writing index |
| `/blog/[slug]` | Full article, metadata, author, related posts, comments |

The initial content plan includes two project case studies and two sample technical articles. Unfinished projects and experimental features must be described accurately as **in development**.

## Local development

```bash
git clone https://github.com/edmealem-k/edmealem.dev.git
cd edmealem.dev
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

**Note:** The commands above assume npm is retained from the original template. If the migration adopts Bun or changes package scripts, update this README to match the verified project. During the original-to-MDX migration, Sanity configuration may still be required until that migration is finished. Consult the agent blueprint for migration-specific instructions.

## Planned content organization

```text
app/                         # Next.js App Router pages
components/                  # UI and MDX components (may remain in app/components/)
content/
  blog/                      # .mdx technical articles
  projects/                  # .mdx project case studies
config/                      # Owner details and integration settings
lib/                         # Content loading and helpers
public/                      # Owner-approved images and other static assets
```

This is a **target structure**; the final paths may be adjusted to keep the upstream UI intact.

### Adding a blog post

After the MDX migration, add a `.mdx` file under `content/blog/` with frontmatter, for example:

```mdx
---
title: "A Technical Article"
description: "A short summary of the article."
date: "2026-11-09"
tags: ["TypeScript", "Backend"]
featured: false
draft: true
---

# A Technical Article

Write the article here.
```

Set `draft: false` when it's ready to publish, subject to the final validated schema. The content loader should omit drafts from public lists and route generation.

### Adding a project

After migration, create a `.mdx` project case study and provide its title, summary, status, technology stack, optional screenshots, and optional repository/demo links. Avoid presenting planned features as shipped features.

## Integrations

**Giscus comments:** The GitHub repository is public, but comments require enabling GitHub Discussions, installing the Giscus GitHub App, choosing a category, and configuring the generated repository/category IDs. Until then, the blog should work without comments.

**Umami:** Optional analytics; enable only after supplying your own website ID.  
**Support button:** Optional creator-support link; do not reuse the original author's payment link. Confirm provider eligibility before enabling payouts.

Never commit API keys, access tokens, or secrets. Client-exposed `NEXT_PUBLIC_` variables must contain only values safe for public distribution.

## Quality checks

After migration, the implementation should expose and pass scripts equivalent to:

```bash
npm run lint
npm run typecheck
npm run build
npm run test
```

Browser E2E tests may use a separate `test:e2e` command. These are **planned checks**; verify actual script names in `package.json` before running them.

## Design and attribution

This project is adapted from [Evavic44/victoreke.com](https://github.com/Evavic44/victoreke.com) by **Victor Eke**. The initial adaptation intentionally preserves the original site's layout and visual style, with a separate redesign phase planned only if needed.

The original source is provided under the **MIT License, Copyright (c) 2023 Victor Eke**. Keep its full copyright and permission notice in the repository's `LICENSE` file. New original contributions may carry a separate copyright notice without removing the upstream notice. The original project's README also requests a visible footer attribution link to [victoreke.com](https://victoreke.com), which this adaptation intends to retain.

Personal photos, branding, third-party fonts, and images are not automatically covered by the source-code license; audit and replace as necessary.

## Contact

- GitHub: [edmealem-k](https://github.com/edmealem-k)
- LinkedIn: [edmealem-k](https://linkedin.com/in/edmealem-k)
- Portfolio: [edmealem.dev](https://edmealem.dev) *(once live)*

Additional contact details and the resume will be added after review.
