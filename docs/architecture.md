# edmealem.dev — Architecture Documentation

## 1. System Overview

`edmealem.dev` is a personal portfolio and technical writing platform built as a static/server-rendered Next.js 16 application using React Server Components (RSC), React 19, TypeScript, and Tailwind CSS. The project was adapted from Victor Eke's open-source portfolio (`victoreke.com`), replacing its external Sanity CMS dependency with a local, version-controlled MDX content pipeline while preserving the visual design and layout.

### Architectural Tenets

1. **Zero External Runtime Dependencies:** The portfolio has no external runtime dependency on a CMS, database, or authentication system. All project case studies and technical articles are stored directly in Git as `.mdx` files.
2. **Server-Side Compilation & Static Generation:** All MDX compilation, frontmatter parsing, schema validation, and syntax highlighting occur during the build process on the server side using React Server Components. No raw MDX or client-side syntax-highlighter bundles are shipped to the browser.
3. **Strict Visual Parity:** The original visual identity, layout geometry, typography (Incognito and Gitlab Mono), dark/light theme tokens, animations, and responsive breakpoints are preserved.
4. **Bun Package Management:** Bun (pinned to `1.3.14`) serves as the package manager and task runner, while Next.js runs on standard Node.js LTS for production deployments.

## 2. Directory Structure

```text
edmealem.dev/
├── app/                         # Next.js App Router
│   ├── layout.tsx               # Root layout, theme provider, metadata
│   ├── page.tsx                 # Home page (Hero, Social, Contribution Graph, Experience)
│   ├── about/page.tsx           # About page (Biography, Education, Usage, Heroes)
│   ├── projects/
│   │   ├── page.tsx             # Projects index (compact grid)
│   │   ├── [project]/page.tsx   # Project case study detail (MDX)
│   │   └── not-found.tsx        # Project 404 handler
│   ├── blog/
│   │   ├── page.tsx             # Technical writing index
│   │   ├── [post]/page.tsx      # Article detail (MDX, reading time, sidebar, comments)
│   │   └── not-found.tsx        # Blog 404 handler
│   ├── photos/page.tsx          # Preserved visual gallery route
│   ├── sitemap.ts               # Automated static XML sitemap
│   └── robots.ts                # Robots.txt generator
├── config/
│   └── site.ts                  # Centralized identity, metadata, and integration configuration
├── content/
│   ├── projects/                # .mdx project case studies (hono-commerce, devvault)
│   └── blog/                    # .mdx technical articles
├── lib/
│   └── content/
│       ├── schema.ts            # Zod validation schemas for project & blog frontmatter
│       ├── index.ts             # File discovery, parsing, filtering, and sorting
│       └── mdx.tsx              # RSC MDX renderer with custom UI components
├── public/                      # Static assets, local placeholder graphics, fonts
├── tests/
│   ├── unit/                    # Vitest unit test suite (schema, reading time, filtering)
│   └── e2e/                     # Playwright smoke test suite (routes, metadata, 404s)
├── docs/                        # Architecture, authoring, migration, and integration guides
├── .github/workflows/ci.yml     # Automated CI workflow using Bun
├── bun.lock                     # Committed Bun lockfile
└── package.json                 # Pinned dependencies and packageManager
```

## 3. Content Pipeline (Sanity → MDX)

### Why Sanity Was Removed

The upstream repository depended on Sanity CMS, GROQ queries, Portable Text, Sanity Studio, and external webhooks for content management. For a personal developer portfolio, this added unnecessary architectural complexity, external network failure points, and token management requirements.

### The Local MDX Implementation

1. **Storage:** Articles and project case studies reside in `content/blog/*.mdx` and `content/projects/*.mdx`.
2. **Parsing & Validation:** `gray-matter` extracts frontmatter and Markdown body. Frontmatter is validated at build time using strict `zod` schemas (`lib/content/schema.ts`). Builds fail immediately with descriptive errors if required metadata is missing.
3. **Reading Time:** Calculated automatically from rendered prose via `reading-time` without counting frontmatter.
4. **Rendering:** Rendered via `next-mdx-remote/rsc` on the server. Custom React components map standard Markdown elements (`h2`, `h3`, `blockquote`, `pre`, `code`, `a`, `table`) to the exact classes and markup used by the original site.
5. **Syntax Highlighting:** Performed during compilation using `rehype-prism-plus` and `app/styles/prism.css`, with a custom client-side copy-to-clipboard component (`CodeBlockWrapper`).

## 4. State & Styling Architecture

- **Theming:** Handled by `next-themes` using a `class` strategy on the `html` element.
- **Styling:** Tailwind CSS 3.3 with customized color tokens (`primary-color`, `secondary-bg`, `primary-bg`) and local fonts (`incognito`, `gitlabmono`, `inter`).
- **Motion:** Micro-interactions and entrance reveals powered by `framer-motion` (`Slide` component).

## 5. Tooling & Package Management

- **Bun:** Configured via `packageManager: "bun@1.3.14"` in `package.json`. Bun executes `install`, `dev`, `lint`, `typecheck`, and `test`.
- **Node.js Compatibility:** Next.js production builds and production server execution maintain full Node.js compatibility (`node_modules/.bin/next start`), ensuring reliable deployment to Vercel, Node servers, or containerized environments.
