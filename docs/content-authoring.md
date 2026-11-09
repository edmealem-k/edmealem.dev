# Content Authoring Guide — edmealem.dev

This guide explains how to write and publish articles and project case studies using the local MDX content system.

## 1. Directory Structure

```text
content/
├── blog/
│   ├── tenant-isolation-in-saas.mdx
│   └── reliable-background-jobs-nodejs.mdx
└── projects/
    ├── hono-commerce.mdx
    └── devvault.mdx
```

- Every article in `content/blog/` maps to `/blog/[slug]`.
- Every case study in `content/projects/` maps to `/projects/[slug]`.
- Files must use the `.mdx` extension.

## 2. Writing a Blog Article

Create a file named `content/blog/<slug>.mdx`. Add frontmatter delimited by `---` at the top:

```mdx
---
title: "Title of the Article"
slug: "title-of-the-article"
description: "A 1-2 sentence description used for cards and search metadata."
date: "2026-11-09"
updatedAt: null
author: "edmealem"
tags: ["TypeScript", "Backend", "Architecture"]
featured: true
published: true
coverImage: "/images/blog/cover-placeholder.webp"
coverImageAlt: "Accessible alt text for the cover image"
canonicalLink: null
---

Introductory paragraph of your article.

## First Section

Article content with code snippets and technical examples...
```

### Blog Frontmatter Schema

| Field | Type | Required | Description |
|---|---|---|---|
| `title` | string | Yes | Article title (used in page header, SEO, cards) |
| `slug` | string | Yes | URL slug matching the filename (e.g. `my-article`) |
| `description` | string | Yes | Summary shown in the blog index and Open Graph description |
| `date` | string | Yes | ISO publication date (`YYYY-MM-DD`) |
| `updatedAt` | string / null | No | Optional ISO date of last revision |
| `author` | string | No | Defaults to `edmealem` (resolved from `config/site.ts`) |
| `tags` | string[] | Yes | Array of topic tags displayed as chips |
| `featured` | boolean | No | If `true`, post appears in the sidebar featured list |
| `published` | boolean | Yes | Set to `false` to mark as draft (hidden from index and routes) |
| `coverImage` | string | No | Path under `/public` for the article hero image |
| `coverImageAlt` | string | No | Accessible description of the cover image |
| `canonicalLink` | string | No | Optional external canonical URL if published elsewhere |

## 3. Writing a Project Case Study

Create a file named `content/projects/<slug>.mdx`:

```mdx
---
title: "Project Name"
slug: "project-name"
tagline: "Short one-sentence summary for the projects listing card"
summary: "Longer summary explaining the motivation and architecture"
category: "Full-stack / SaaS"
status: "In development"
featured: true
order: 1
tags: ["TypeScript", "Next.js", "PostgreSQL", "Drizzle"]
coverImage: "/images/projects/cover-placeholder.webp"
repositoryUrl: "https://github.com/edmealem-k/project-name"
liveUrl: null
published: true
---

*Short italicized subtitle beneath the title.*

## Overview

Case study details explaining architecture, engineering choices, and next steps...
```

### Project Frontmatter Schema

| Field | Type | Required | Description |
|---|---|---|---|
| `title` | string | Yes | Project name |
| `slug` | string | Yes | Unique URL slug |
| `tagline` | string | Yes | Tagline displayed on compact project list cards |
| `summary` | string | No | Detailed summary |
| `category` | string | No | High-level category (e.g. `Full-stack / SaaS`) |
| `status` | string | No | Project status (e.g. `In development`, `Completed`) |
| `featured` | boolean | No | Controls prioritization |
| `order` | number | No | Numerical sort order on `/projects` (lower numbers appear first) |
| `tags` | string[] | Yes | Technologies utilized in the project |
| `coverImage` | string | No | Cover image path under `/public` |
| `repositoryUrl` | string / null | No | Public GitHub link, or `null` if private (renders "No Repo") |
| `liveUrl` | string / null | No | Public demo URL, or `null` (renders "Coming Soon") |
| `published` | boolean | Yes | Set `false` to keep unpublished |

## 4. Supported Markdown / MDX Features

- **Headings (`##`, `###`, `####`):** Rendered with Incognito typography and automatic hoverable `#` anchor link scrolling.
- **Code Fences:** Code blocks with language specification (` ```ts `, ` ```http `, ` ```bash `) receive Prism syntax highlighting and a copy-to-clipboard button.
- **Blockquotes (`>`):** Rendered with border and quote graphic.
- **Tables:** GitHub Flavored Markdown tables are wrapped in a responsive overflow container.
- **External Links:** Automatically annotated with an external icon and safe `rel="noopener noreferrer"`.
- **Inline Code:** Highlighted with subtle background styling.

## 5. Preview & Validation Workflow

```bash
# Start the local development server
bun run dev

# Run frontmatter and unit test validation
bun run test

# Verify production build compilation
bun run build
```
