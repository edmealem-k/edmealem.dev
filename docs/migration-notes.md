# Migration Notes — edmealem.dev

This document records the architectural changes, dependency upgrades, file removals, and package manager migration performed while adapting `victoreke.com` into `edmealem.dev`.

## 1. Package Manager Migration (npm → Bun)

- **Old Manager:** npm with `package-lock.json`
- **New Manager:** Bun (`1.3.14`), pinned in `package.json` (`packageManager: "bun@1.3.14"`)
- **Lockfile:** Generated and committed `bun.lock` (text format); removed `package-lock.json`.
- **CI Workflow:** Created `.github/workflows/ci.yml` using `oven-sh/setup-bun@v2` with `bun install --frozen-lockfile`.
- **Production Server:** Kept Next.js production build and runtime running on Node.js.

## 2. Dependencies Removed

The following CMS and studio-specific packages were completely removed:

| Package | Reason for Removal |
|---|---|
| `sanity` | Replaced by local MDX content pipeline |
| `next-sanity` | Replaced by local file readers and Zod |
| `@sanity/code-input` | Code input was only needed inside Sanity Studio |
| `@sanity/image-url` | Images are served from local static assets or Next.js Image |
| `@sanity/table` | Tables are rendered via standard Markdown / MDX |
| `@sanity/vision` | GROQ query playground; no longer relevant |
| `@portabletext/react` | Replaced by `next-mdx-remote/rsc` |
| `react-refractor` | Replaced by `rehype-prism-plus` |
| `@types/refractor` | No longer needed without `react-refractor` |
| `styled-components` | Only required by legacy Sanity Studio |

## 3. Dependencies Added

| Package | Purpose |
|---|---|
| `gray-matter` | Parse YAML frontmatter from local `.mdx` files |
| `zod` | Build-time schema validation for post and project metadata |
| `next-mdx-remote` | React Server Component compilation for MDX |
| `reading-time` | Accurate reading-time calculation from rendered article prose |
| `rehype-prism-plus` | Build-time syntax highlighting for code fences |
| `rehype-slug` | Automatic slug anchor IDs for article headings |
| `remark-gfm` | GitHub Flavored Markdown (tables, task lists, autolinks) |
| `vitest` | Unit testing framework |
| `@vitejs/plugin-react` | React support for Vitest |
| `jsdom` | DOM environment for component tests |
| `@testing-library/react` | React component testing utilities |
| `@testing-library/jest-dom` | Custom DOM element matchers |
| `@playwright/test` | End-to-end browser smoke test suite |

## 4. Route & Data Source Migration Matrix

| Upstream Route | Data Source (Old) | Replacement (New) | Status |
|---|---|---|---|
| `/` | `profileQuery` via Sanity | `config/site.ts` + `app/data/experience.ts` | Complete |
| `/about` | `profileQuery` via Sanity | `config/site.ts` + `app/data/usage.ts` + `app/data/heroes.ts` | Complete |
| `/projects` | `projectsQuery` via Sanity | `getAllProjects()` (`lib/content`) | Complete |
| `/projects/[project]` | `singleProjectQuery` via Sanity | `getProjectBySlug()` + `MDXContent` | Complete |
| `/blog` | `postsQuery` via Sanity | `getAllPosts()` (`lib/content`) | Complete |
| `/blog/[post]` | `singlePostQuery` via Sanity | `getPostBySlug()` + `MDXContent` | Complete |
| `/photos` | Hardcoded Unsplash links | Preserved with owner metadata | Complete |
| `/studio` | Embedded Sanity Studio | Removed (returns 404) | Complete |
| `/api/revalidate` | Sanity webhook handler | Removed (deploy triggers rebuild) | Complete |

## 5. Files Removed

- `sanity.config.ts`
- `schemas/*` (all 10 schema files: author, job, post, project, quiz, table, etc.)
- `lib/sanity.client.ts`, `lib/sanity.query.ts`, `lib/sanity.image.ts`, `lib/env.api.ts`
- `app/studio/[[...index]]/page.tsx`
- `app/api/revalidate/route.ts`
- `app/components/widgets/*` (`TableWidget.tsx`, `YoutubeWidget.tsx`)
- `app/components/shared/CustomPortableText.tsx`, `CustomPortableTextFavicon.tsx`, `PortableImage.tsx`, `ImageComponent.tsx`, `CodeBlock.tsx`, `Quiz.tsx`, `Table.tsx`, `YoutubeIframe.tsx`
- `app/components/global/Unmount.tsx`
- `public/sanity.png`, `public/studio.png`

## 6. Security & Privacy Changes

1. **No Secrets in Client Builds:** Removed `NEXT_PUBLIC_SANITY_ACCESS_TOKEN` and `NEXT_PUBLIC_SANITY_HOOK_SECRET`.
2. **Optional Integrations:** Giscus comments and Umami analytics are gracefully disabled by default unless user IDs are supplied via environment variables.
3. **Safe External Links:** `RefLink` applies `rel="noopener noreferrer"`.
4. **No Remote Code Execution:** MDX is strictly compiled from verified local files within the repository.

## 7. Next.js 16 & React 19 Modernization

- **Next.js:** Upgraded from `14.2.5` to `16.4.5` (Turbopack production build default).
- **React:** Migrated to React `19.3.1` and `react-dom@19.3.1` with updated `@types/react@^19.3.0` and `@types/react-dom@^19.3.0`.
- **Async Route Params:** Converted dynamic route parameters (`app/blog/[post]/page.tsx` and `app/projects/[project]/page.tsx`) to asynchronous promises (`params: Promise<{ slug: string }>`), in accordance with Next.js 15/16 conventions.
- **ESLint 9 Flat Config:** Replaced legacy `.eslintrc.json` and `next lint` with standard `eslint .` utilizing native flat config (`eslint.config.mjs`) extending `eslint-config-next@16.4.5`.
- **Framer Motion 12:** Upgraded to `framer-motion@12.43.0` and streamlined animation prop typings in `app/animation/Slide.tsx`.
- **React 19 Safe Mount State:** Replaced cascading `useEffect` mount states with `useSyncExternalStore` in `Theme.tsx` and `ContributionGraph.tsx`.
- **React GitHub Calendar:** Updated to `react-github-calendar@5.0.9` with named `{ GitHubCalendar }` export.

