# Portfolio Rebuild — Agent Implementation Blueprint

**Source:** https://github.com/Evavic44/victoreke.com  
**Target:** `https://github.com/edmealem-k/edmealem.dev` — personal portfolio for `https://edmealem.dev`, built with Next.js, TypeScript, Tailwind CSS and local MDX.  
**Date prepared:** 2026-11-09  
**Scope:** Adapt an already copied local source tree, migrate Sanity to MDX, modernize tooling, integrate the separately supplied owner-approved content pack, preserve the upstream UI, and verify deployment readiness. Do not invent facts beyond the supplied content pack.

---

## 0. Instructions to the coding agent (read first)

You are adapting an existing open-source portfolio, **not** implementing a new SaaS or blindly rewriting the project. Preserve the **existing upstream UI, layouts, typography, spacing, theme, motion, and navigation** during this architecture-only adaptation, while replacing Sanity with typed, git-managed local MDX content. Only replace owner-specific branding/content with neutral placeholders. **Do not redesign the projects listing or blog pages.** UI customization is explicitly a future, separate phase requiring owner approval.

### Required operating method

1. Inspect the **actual cloned repository state** and read README, LICENSE, package.json, lockfile, Next config, `app/`, `lib/`, `schemas/`, `types/`, and CSS before editing. This document describes the inspected upstream `main` at planning time; if upstream changed, reconcile first.
2. Create a migration branch, e.g. `feat/portfolio-mdx-rebuild`. Keep commits incremental and reviewable.
3. Record baseline Node/package-manager versions, `npm install`/`npm ci`, `npm run build`, lint, typecheck output. The original may fail on recent Node versions; report failures and distinguish preexisting from newly introduced.
4. Use a **single** package manager and committed lockfile. Default to npm because upstream has `package-lock.json`; Bun is acceptable if consciously chosen, but do not commit both lockfiles. Pin the supported Node LTS via `.nvmrc` and `engines` after verifying the selected Next version's requirements.
5. Upgrade in a deliberate, compatible sequence; do not force-install packages to suppress peer dependency errors. Validate versions against official current docs at implementation time.
6. Change only what serves the portfolio goals. Avoid an unnecessary monorepo, backend API, database, Prisma/Drizzle, authentication, Redis, queues, or dashboard.
7. Don't invent the owner's experience, testimonials, employment, project capabilities, metrics, or personal details. Write TODO placeholders and track content required later.
8. After each phase: run formatting, lint, TypeScript checks, focused tests, and production build. Fix issues, don't hide them.
9. Document architectural decisions and dependency removals in `docs/migration-notes.md`.
10. **Public repository**: the adapted portfolio source repository is intended to be public. Do not design around private-only GitHub project access. Keep secrets out of Git; Giscus can use this public repository once Discussions is enabled. Do not publish the repository or deploy on the owner's behalf unless explicitly requested.
11. **Visual freeze**: no new UI, restyling, spacing adjustments, changed card designs, altered page hierarchy or navigation changes as part of adaptation. Preserve screenshots as baseline and obtain before/after visual comparison; repair only compatibility/accessibility regressions without changing intended appearance.
12. **Stop before production deployment** if the contact address, domain DNS ownership, and any enabled integrations have not been verified. A local or preview deployment with placeholders is okay.

### Non-negotiable acceptance criteria

- No runtime dependency on Sanity, GROQ, Portable Text, Sanity Studio, Sanity access token, or Sanity revalidation webhook.
- Blog posts and project case studies are local `.mdx` files; profile, social links, career experience, and site configuration are typed local data.
- Existing public routes `/`, `/about`, `/projects`, `/projects/[slug]`, `/blog`, `/blog/[slug]`, **and `/photos`** retain their routes and page layouts. Keep Photos in the navbar as upstream until owner explicitly approves removing it; replace upstream personal images with neutral placeholders or a temporary unlisted content state **without changing the visual structure**.
- All project/blog routes have correct 404 handling, metadata, indexing rules, and accessible layouts.
- Do not ship Victor's name, email, images, GitHub repository, analytics IDs, Giscus IDs, resume URLs, or branded copy.
- Preserve upstream license notices and add the requested upstream credit; don't claim sole authorship of upstream code.
- Production build, lint, typecheck, tests and critical Playwright paths pass.
- **Visual regression gate:** at equivalent desktop/mobile viewport and light/dark theme, homepage, projects index/detail, blog index/detail, About, navbar, and footer remain visually equivalent aside from placeholder/brand content, and browser screenshots are compared.
- **Blog parity:** date, reading time, author, tag chips, sharing, featured posts, Giscus comments, and optional support section work without Sanity.
- **Public repo:** Giscus configuration uses the owner's public repository or a dedicated public Discussions repository; no Victor-specific Giscus identifiers are retained.

---

## Owner decisions — locked for this migration

| Decision | Requirement |
|---|---|
| Website and source repository | **Public**; no private-repository assumption |
| Visual design | **Keep existing Victor Eke UI**; no redesign, including Projects listing |
| Blog and project content | Local MDX; authoring content later |
| Blog detail sections | Keep reading minutes, date, author sidebar, tags, share buttons, featured, comments, support |
| Blog comments | Giscus with owner's public GitHub Discussions repository; setup may remain disabled until IDs supplied |
| Support widget | Optional configurable Buy Me a Coffee/external URL; never reuse upstream payment link |
| Domain / brand | **edmealem.dev** — use a centralized config for canonical URLs and identity. Domain purchase/DNS verification is separate. |
| New features | Deferred; migration should be content/data plumbing and compatibility, not product redesign |

**Precedence:** These locked decisions and Section 6 override any wording elsewhere that might be interpreted as permission to redesign, restructure navigation, invent content, or deploy to production.

---

## 1. Source repository audit (observed in upstream)

The inspected project has a single Next.js App Router app (not a monorepo). At review time, `package.json` declared Next `^14.2.3`, React `^18.3.1`, Tailwind `3.3.3`, Sanity `^3.23.4`, `next-sanity`, `@portabletext/react`, Framer Motion, `next-themes`, Giscus, and Umami. It has:

- `app/page.tsx` home; `app/about/page.tsx` profile; `app/projects/page.tsx` and `app/projects/[project]/page.tsx`; `app/blog/page.tsx` and `app/blog/[post]/page.tsx`; `app/photos/page.tsx`; embedded `app/studio/[[...index]]/page.tsx`.
- `lib/sanity.client.ts`, `lib/sanity.query.ts`, `lib/sanity.image.ts`, `lib/env.api.ts`; `schemas/*`; `sanity.config.ts`; `app/api/revalidate/route.ts`.
- `app/components/shared/CustomPortableText.tsx`, `PortableImage`, `CodeBlock`, `Table`, `Quiz`, `YoutubeIframe`, etc. These must be reviewed for reuse vs removal in an MDX renderer.
- `app/components/pages/Job.tsx`, `Posts.tsx`, `FeaturedPosts.tsx`, `Heroes.tsx`, `GithubCalendarComponent.tsx` and `app/components/global/*`.
- User-specific hardcoded settings in `app/layout.tsx`, `app/about/page.tsx`, project/blog SEO, footer, `Comments.tsx`, social data, photos, logos and fonts.
- `lib/env.api.ts` expects `NEXT_PUBLIC_SANITY_ACCESS_TOKEN` and `NEXT_PUBLIC_SANITY_HOOK_SECRET`: **remove**, don't carry these into the new site. The public prefix is inappropriate for secrets.
- `app/projects/[project]/page.tsx` dereferences project fields without a null check: add `notFound()`.
- `app/components/shared/Comments.tsx` hardcodes `repo="evavic44/victoreke.com"`: replace with owner-specific optional Giscus config.
- `app/photos/page.tsx` contains placeholder images and text: remove from navigation and sitemap unless intentionally used later.
- `package.json` build script uses `next lint && next build`. Verify modern Next lint workflow; use direct ESLint CLI if needed.
- `postsQuery` returns all posts and `Posts.tsx` filters `isPublished` after fetching: in the new loader, hide unpublished content at the data layer.
- `LICENSE` is MIT, copyright Victor Eke. The README asks for a link to `victoreke.com` in the footer as attribution.

**Not verified:** Fresh production runtime, browser behavior, current accessibility, uptime or Web Vitals. Do not present planning observations as executable-test results.

---

## 2. Target architecture and design principles

**Preferred architecture:** One Next.js App Router app with React Server Components by default; local `.mdx` content; typed frontmatter/metadata parsed and validated at build time; shared MDX renderer; central site config; static pages generated from the filesystem.

### Suggested tree

```text
portfolio/
├── app/                         # Or src/app; choose one convention, do not mix
│   ├── layout.tsx
│   ├── page.tsx
│   ├── about/page.tsx
│   ├── projects/page.tsx
│   ├── projects/[slug]/page.tsx
│   ├── blog/page.tsx
│   ├── blog/[slug]/page.tsx
│   ├── contact/page.tsx         # FUTURE ONLY: do not add/change navigation or UI now
│   ├── not-found.tsx
│   ├── sitemap.ts
│   ├── robots.ts
│   └── opengraph-image.tsx      # Optional generated default OG image
├── components/
│   ├── layout/                  # navbar, footer, theme toggle, mobile menu
│   ├── portfolio/               # existing components preserved; no new layout/cards in this phase
│   ├── blog/                    # preserve article card, metadata bar, sidebar, comments, support
│   ├── mdx/                     # code block, callout, image, video, figure, diagram
│   └── ui/                      # generic UI primitives
├── content/
│   ├── blog/
│   │   └── example-post.mdx     # Placeholder only, marked draft
│   └── projects/
│       └── example-project.mdx  # Placeholder only, marked draft
├── config/
│   └── site.ts                  # owner identity, domain, socials, CTA, navigation
├── data/
│   ├── experience.ts            # typed placeholders
│   └── services.ts              # FUTURE ONLY, do not create new UI
├── lib/
│   ├── content/                 # schemas, discovery, sorting, parsing, filtering
│   │   ├── schema.ts
│   │   ├── blog.ts
│   │   ├── projects.ts
│   │   └── mdx.tsx
│   ├── seo.ts
│   ├── dates.ts
│   └── utils.ts
├── public/
│   ├── images/
│   └── resume/                  # Keep empty until actual resume supplied
├── tests/
│   ├── unit/
│   └── e2e/
├── docs/
│   ├── architecture.md
│   ├── migration-notes.md
│   ├── content-authoring.md
│   └── deployment.md
├── mdx-components.tsx           # If using @next/mdx, locate as required by docs
├── next.config.ts
├── eslint.config.mjs
├── playwright.config.ts
├── vitest.config.ts
├── .env.example
└── package.json
```

Prefer `app/` at root to minimize disruption if migrating in place. Don't move everything under `src/` unless it materially improves clarity.

### Separation of responsibility

- **Site configuration:** owner, headline placeholder, URL, social handles, nav, contact CTA; no secrets.
- **Content layer:** file discovery, frontmatter validation, draft filtering, slug safety, stable ordering.
- **Presentation:** reusable UI components; no direct filesystem reads in client components.
- **MDX:** compile only trusted local, repo-reviewed `.mdx`; avoid remote user-supplied MDX.
- **SEO:** centralized metadata helpers and consistent canonical URLs.

---

## 3. Existing local repository: preflight and Git safety (UPDATED)

**The owner has already run `git clone https://github.com/edmealem-k/edmealem.dev.git` and manually copied the source files from `Evavic44/victoreke.com` into that local clone.** Work *inside that existing local `edmealem.dev` directory*. Do not re-clone upstream, initialize another Git repository, remove `.git`, rewrite Git history, or switch `origin` away from the owner's repository.

```bash
cd /path/to/edmealem.dev
git remote -v
git status --short
git branch --show-current
ls -la
cat LICENSE  # if present
cat package.json
```

1. Confirm `origin` points to `https://github.com/edmealem-k/edmealem.dev.git` (or its SSH equivalent). If not, stop and report; do not silently change the remote.
2. The source files may exist only locally. The GitHub API reported the remote repository **empty at planning time**, so `404` for `package.json` on GitHub does not mean the user's local files are missing. **Do not push unless asked.**
3. Check for nested `.git` from upstream. Preserve the owner's root `.git`; do not commit a nested upstream Git repository. Do not delete any root Git data without owner approval.
4. Compare current local files with the earlier upstream audit before assuming paths still match. Take a baseline file listing and browser screenshots where practical.
5. Preserve `LICENSE` with Victor Eke's 2023 MIT notice *as-is* for copied upstream code; restore it from upstream if missing. Keep `NOTICE.md` or `docs/attribution.md` to explain adaptation and license obligations. Do not replace the upstream notice with a sole Edmealem copyright. The footer should display Edmealem's site copyright plus a discreet visible link to `https://victoreke.com` to honor the README's additional attribution request.
6. Audit source files, fonts, images, SVGs, and dependencies. MIT source license doesn't establish rights to all third-party photos/fonts; replace uncertain assets with owner-approved, properly licensed ones without unnecessary layout changes.
7. Do not commit `.env.local`, secrets, generated caches, `node_modules`, or personal data copied from upstream. Confirm `.gitignore` covers them.
8. Use an implementation branch and incremental commits *after* confirming the owner repository's current state. Do not force push.
9. Keep the planned public repository's README accurate: migration status and working scripts must be verified rather than implied.

Then follow the dependency and content-migration phases below.

## 4. Dependency audit, upgrade and removal plan

**Version policy:** The upstream dependencies are old enough that you should not simply run `npm update` and assume compatibility. Check current stable release notes, engine requirements and peer dependencies. Use the latest mutually compatible stable releases, not automatically prerelease/canary.

### Upgrade sequence

1. Capture installed versions: `npm ls --depth=0`; baseline the current scripts.
2. Choose supported Node LTS based on current Next.js requirements and pin it in `.nvmrc`/`package.json`.
3. Run the official Next upgrade/codemod appropriate for 14 → current stable; migrate API signatures (`params` / `searchParams` as promises when required), caching, `next/image`, middleware conventions, route handlers, config and linting as needed. Don't skip major-version guides.
4. Upgrade React/React DOM, `eslint-config-next`, TypeScript and type packages in compatible groups.
5. Choose whether to remain on Tailwind 3 or migrate to current Tailwind. **Recommend migrating to supported Tailwind 4** only after validating styles, PostCSS integration, theme tokens, custom fonts, and dark mode. Document any deliberate decision to retain v3.
6. Upgrade `framer-motion` to its currently supported equivalent (potentially `motion`), `next-themes`, `react-icons`, GitHub calendar, and any retained UI libraries. Don't replace components solely because a newer library exists.
7. Remove Sanity-specific packages only after MDX pages and loaders have working equivalents.
8. Regenerate and commit one lockfile; run `npm audit --omit=dev` and fix actionable issues without breaking versions.
9. Check that no `next lint`, legacy `next/legacy/image`, deprecated APIs, or obsolete `@types` versions remain where modern replacements are appropriate.

### Packages to remove *if no remaining references*

```text
sanity
next-sanity
@sanity/code-input
@sanity/image-url
@sanity/table
@sanity/vision
@portabletext/react
```

Also inspect and remove `react-refractor`, `sharp`, `styled-components`, or other packages **only if unused after the migration**. `sharp` can be useful for image optimization, so don't delete just because it's listed. Check `react-github-calendar`, Umami, and Giscus are still wanted before keeping.

### MDX choices — choose ONE cohesive pipeline

**Default:** Official `@next/mdx` + locally imported MDX modules, with exported typed metadata in each MDX file (no YAML frontmatter). This avoids extra parsing dependencies and works with static imports/dynamic slugs. Install compatible versions of `@next/mdx`, `@mdx-js/loader`, `@mdx-js/react`, `@types/mdx`, and `remark-gfm`; add plugins for headings/code highlighting only if justified. Follow the official `mdx-components.tsx` convention.

**Alternative if YAML frontmatter is required:** use `gray-matter` + `zod` to validate files, plus a supported local MDX compiler/rendering pipeline. Avoid configuring both `@next/mdx` and a second dynamic MDX compiler unnecessarily. Design the loader so raw MDX never crosses into the browser and compilation happens on the server/build side. Do not assume `@next/mdx` parses frontmatter automatically—it does not.

**Chosen default for this project:** local `.mdx` with `export const metadata = {...} satisfies ...`, and a server-side explicit registry or safe import map for dynamic routes. Ensure metadata is statically inspectable for listing pages. If registry maintenance is inconvenient, implement a small build-time generator that discovers local files, validates metadata, and creates a typed registry. No remote runtime evaluation.

Illustrative content shape (STRUCTURAL PLACEHOLDER, not final personal content):

```mdx
export const metadata = {
  title: 'Example Technical Article',
  description: 'Placeholder only; replace in later content phase.',
  date: '2026-01-01',
  tags: ['example'],
  draft: true,
  coverImage: '/images/placeholders/post-cover.webp'
}

# Example Technical Article

Placeholder. Do not publish this as a real article.
```

Schema expectations: title, description, publishedAt/date (ISO), updatedAt optional, tags, draft, coverImage optional, coverImageAlt optional, canonicalURL optional, featured optional; for projects, status (`in-development`/`completed`), tech stack, repo URL optional, live URL optional, hero image optional, technical challenges and screenshots in MDX body. Use `zod` or an equivalent explicit validation layer where metadata is checked; fail builds on invalid content.

---

## 5. Replace Sanity completely, route by route

Create a migration matrix, verify each old route's new equivalent before deleting its data source.

| Existing | Replacement | Notes |
|---|---|---|
| `app/page.tsx` + `profileQuery` | Typed `config/site.ts` | Hero and external links use placeholders |
| `app/about/page.tsx` + `profileQuery` | Site config + `data/experience.ts` | About, skills, resume; remove hardcoded URLs |
| `app/components/pages/Job.tsx` | Typed experience array | Order and date formatting |
| `app/projects/page.tsx` + `projectsQuery` | `getAllProjects()` | Filter drafts, featured order, cards |
| `app/projects/[project]/page.tsx` | `/projects/[slug]` + `getProjectBySlug()` | Handle unknown slug via `notFound()` |
| `app/blog/page.tsx` + `postsQuery` | `getAllPosts()` | Draft filtering on server; date/tag sorting |
| `app/blog/[post]/page.tsx` | `/blog/[slug]` + `getPostBySlug()` | Dynamic metadata + 404 + MDX renderer |
| `FeaturedPosts.tsx` | Local content metadata | Only published posts |
| `CustomPortableText.tsx` and custom blocks | Reusable MDX components | Preserve code, images, tables, callouts; remove obsolete CMS adapters |
| `lib/sanity.*` / `schemas/*` / `sanity.config.ts` | Remove | No Sanity imports remain |
| `app/studio/**` | Remove | `/studio` returns 404; remove studio-specific UI logic |
| `app/api/revalidate/route.ts` | Remove | Git deploy rebuilds static content |
| `lib/env.api.ts` | Replace with minimal typed env checks | Only actual optional integrations |

### Route implementation rules

- Keep static paths for old project/blog pages as feasible. Use `generateStaticParams()` for published slugs; `dynamicParams = false` when only known local content should render.
- Current Next.js App Router versions have asynchronous dynamic route params. Follow selected version's exact signatures; in contemporary versions, `params: Promise<{ slug: string }>` and `await params`.
- Use `notFound()` on an absent/unpublished slug, including `generateMetadata` if necessary.
- Escaping: never turn unsanitized route segments into arbitrary filesystem paths. Resolve slugs only through a validated registry of local files.
- Sort posts by published date descending; projects by `featured`/explicit priority and optionally date. Avoid unstable filesystem-order rendering.
- Ensure a draft can't appear through a detail route, index page, RSS feed, or sitemap in production. Allow preview only through a controlled development flag.
- Maintain an accessible reading layout and mobile view for long code blocks, images and tables.
- Remove Sanity webhook and Studio from external service/config documentation.

### MDX component library

Implement only useful primitives initially: headings with stable IDs, syntax-highlighted `<pre><code>`, inline code, external link, image with alt/caption, callout, blockquote, table, list, video embed, and optional `<ArchitectureDiagram />`. Use Shiki for server-side syntax highlighting, if compatible with the chosen MDX compilation path; ensure no huge client-side syntax-highlighter bundle. Use a safe allowlist for content author components. Never execute untrusted remote MDX.

---

## 6. STRICT VISUAL FREEZE — preserve upstream UI (no content yet)

**Owner decision (supersedes earlier redesign suggestions): The current Victor Eke site UI is the baseline. Do not redesign it.** This includes the simple compact projects grid even if the owner may redesign it later. This phase is a content-system/technology migration, not a visual design project.

### What MUST remain visually the same

- Homepage hero, GitHub contribution graph, experience section and vertical spacing.
- Header/footer layout, exact current navigation structure and labels, responsive/mobile menu, theme toggle, color palette, typographic scale, backgrounds, borders, hover styles, and page animations.
- **Projects index:** preserve existing small project cards, three-column responsive grid, logo/icon placement, title/tagline and whitespace. **Do not** introduce large cards, screenshot banners, filtering, tech-tag chips, service CTAs, status badges or featured layouts yet.
- **Project detail:** preserve existing title, links, cover image dimensions, long-form content column and layout; replace Portable Text rendering with MDX while preserving the output's look.
- **Blog index:** preserve two-column image/text post cards, heading, description, date, reading time, spacing, and responsive behavior.
- **Blog detail:** preserve title, intro, date/comments/reading-time line, cover image, main-body width, right sidebar, separators, author card, tags, share buttons, featured posts, comments placement, support area, and footer.
- **About and Photos:** retain their layouts/navigation. Remove original owner's personal assets and replace with neutral placeholder assets, not a different page design. The owner can later decide whether Photos stays.

### Changes ALLOWED in this phase

- Migrate Sanity query outputs to local typed data/MDX, improve error handling and route correctness, update framework dependencies, and remove the Studio route.
- Replace Victor-specific logos/content with **neutral placeholders**, including textual logo placeholders if necessary, without redesigning layouts.
- Make integrations configurable rather than hardcoded; maintain equivalent section placement and dimensions. If unset, render an unobtrusive placeholder/disabled state in development; do not ship a broken integration in production.
- Address concrete accessibility/security bugs while minimizing UI differences. Make any unavoidable visual changes explicit in a migration report and screenshots.

### Explicitly DEFERRED to a later owner-approved UI phase

- Rich featured-project cards, tech stacks on cards, screenshots in project listing, filters, categories, service offerings/CTAs, redesigned typography/colors, new landing-page sections, information-architecture changes, and visual brand polish.
- This blueprint may create an extensible project metadata model for later use, **but must not render new UI from it now**.

### Visual quality gate

1. Before modifying code, capture screenshots of upstream homepage, About, Projects index, a project detail, Blog index, Blog detail (top/sidebar/bottom), Photos, navbar/footer at desktop and mobile widths; capture both themes when possible.
2. After each migration phase, screenshot the same routes and compare visually. Content will differ because it is placeholder content; judge structure, sizing, color, typography, animations, components, and responsiveness.
3. Add a Playwright screenshot smoke test or keep a reviewed screenshot baseline. Do not blindly assert exact pixel equality when content differs.
4. Ensure sidebar behaves on smaller screens as upstream, and comments/support remain below article content.

### Content placeholders

Use `TODO_OWNER_*` constants and a typed content checklist. Never invent the owner's biography, project achievements, publications, employment details, or contact data. Add small **development-only sample MDX entries** sufficient to test article/project rendering. Mark these as fixtures/drafts and exclude them from public production listings until real content is provided.

---

## 7. SEO, metadata, analytics, and integrations

- Build `config/site.ts` with `name`, `siteUrl`, `title`, `description`, `email`, `socials`, navigation, and social image config placeholders. Derive canonical URLs and Open Graph from this single source.
- Replace *every* `victoreke.com`, `Victor Eke`, remote OG image, Google verification token, author, copyright, favicon, logo, resume and social URL found by global search.
- Add `generateMetadata` for blog/project pages using real local content; add `notFound()` for missing entries. Prevent undefined titles/images.
- Implement `app/sitemap.ts`, `app/robots.ts`; include only published blog posts/projects; exclude drafts/studio.
- Add semantic HTML, accessible headings, favicon, branded Open Graph fallback; optional JSON-LD for articles/projects once actual identity data exists.
- **Giscus:** required integration path, configurable and gracefully disabled until setup. The **portfolio source repository will be public**; use its GitHub Discussions, or a separately configured public discussions repository. Install Giscus GitHub App, enable Discussions, configure category/repo ID/category ID via env or typed site config, and use `pathname` mapping so each article has a distinct discussion. Maintain existing comment-section appearance and GitHub sign-in behavior. Never retain `evavic44/victoreke.com` or upstream IDs.
- **Umami:** optional, loaded only when site ID is configured; remove the upstream website ID and avoid analytics on local development. Update privacy disclosure if tracking is enabled.
- **GitHub calendar:** use config username, handle API failures/loading states, avoid presenting contribution counts as a proxy for experience; ensure it doesn't break build without network.
- **Reading time and sidebar:** generate reading time at build time from MDX prose (do not count frontmatter, code-heavy content misleadingly); author identity comes from site config or frontmatter, tags from validated metadata, featured posts are published-only local MDX entries, share links are derived from the canonical article URL, with copy-link fallback. Keep existing sidebar structure.
- **Support / Buy Me a Coffee:** optional creator URL or embed ID from typed config; reuse the existing support-card placement and style, never Victor's account. Avoid loading scripts when disabled and confirm supported creator payouts in owner's country before production enablement.
- Add `feed.xml`/RSS only when blog content exists, and derive from the same published-post source. No backend is necessary.

---

## 8. Security and configuration

1. Remove Sanity token and webhook secret references from `.env.example` and code. Confirm `rg -n 'SANITY|sanity|studio|revalidateTag|PortableText|GROQ'` returns only intentional documentation entries, not runtime imports.
2. Don't put secrets in variables prefixed `NEXT_PUBLIC_`; those are exposed to browser builds.
3. Keep site functional without optional analytics/comments credentials. Config-check only required values for features that are enabled.
4. Use native Next.js image optimization with narrowly scoped `remotePatterns`; remove upstream external domains no longer required.
5. External links should use safe `rel="noopener noreferrer"` when opening a new tab.
6. No admin interface/login route or unnecessary server API. A static portfolio has fewer attack surfaces.
7. Only commit original or properly licensed imagery/fonts. **Audit existing bundled fonts in `app/assets/font` for redistribution rights**; replace uncertain assets with licensed alternatives or `next/font/google` after checking current usage. Keep the upstream license notice, but don't assume it grants rights to third-party assets.
8. Check dependencies for vulnerabilities, avoid `dangerouslySetInnerHTML` except vetted build-generated markup, never compile remote user content as MDX.
9. Remove any Victor-specific tokens and IDs even if already publicly present in source.

---

## 9. Testing and QA

### Tools to add

- `vitest`, `@vitejs/plugin-react` or suitable Next/Vitest config, `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`, `jsdom` for unit/component tests.
- `@playwright/test` for browser E2E tests.
- ESLint current supported config, Prettier (optional), TypeScript strict mode, and `tsc --noEmit` where compatible.
- `@axe-core/playwright` optional for automated accessibility smoke checks; manual keyboard and screen reader checks still required.

### Unit tests

- Post/project metadata validation; slug uniqueness; draft filtering; ordering.
- Date formatting, read-time, link normalization, SEO URL generation.
- Navigation/card components, theme toggle, empty states (as appropriate).

### E2E smoke suite

1. Homepage loads and displays no original branding.
2. Navigation and mobile menu work via keyboard and touch-sized targets.
3. Projects listing displays published projects; clicking a card opens correct detail page.
4. Invalid project and blog slugs return 404 without crashing.
5. Blog list and an MDX post render heading, code block, image and internal link correctly.
6. Draft posts never appear in index, detail, sitemap, RSS (if implemented).
7. Light/dark theme selection is usable and persists as intended.
8. About/contact links are valid; external links cannot navigate to `undefined`.
9. Site passes mobile viewport checks (320px-ish and mainstream desktop), no horizontal overflow.
10. Sitemap, robots, metadata and Open Graph tags are correct for configured preview origin.
11. `/studio` and old revalidation route are gone.

Prefer Playwright for async server components and end-to-end data interactions rather than trying to shallow-render them with Vitest.

### Build-quality scripts (adapt as required)

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:e2e": "playwright test"
  }
}
```

Do not leave any inert scripts. Confirm all commands work with installed dependencies.

---

## 10. CI and deployment

### GitHub Actions checks

- Trigger on PRs and pushes to the main branch (with permissions minimized).
- `npm ci` with Node pinned; run lint, typecheck, unit tests, production build.
- Run Playwright smoke tests on Linux runner for critical routes; collect screenshots/traces for failures.
- Use caching via `actions/setup-node`, not a custom brittle cache script.
- Use no secrets for simple static build. Optional external services should remain optional.
- No production auto-deploy until owner selects host/domain and verifies content.

### Hosting

- Vercel is the simplest default for this Next.js app; a regular Node deployment also works.
- Configure domain, HTTPS, analytics/Giscus separately.
- Before announcing site publicly, verify all canonical metadata, sitemap links, contact information, robots and image URLs match the real domain.
- Create `docs/deployment.md` with environment matrix (local/preview/production), commands, troubleshooting, rollback notes.

---

## 11. Migration implementation phases with completion gates

### Phase 0 — Baseline and plan

- [ ] Confirm current local `edmealem.dev` source tree, owner `origin`, and Git status; preserve root `.git` and upstream MIT LICENSE. Do not clone again.
- [ ] Document source paths, installed versions and baseline build results.
- [ ] Choose package manager/Node version and migration branch.
- [ ] Create `docs/migration-notes.md` with initial dependency/removal matrix.

**Gate:** Upstream state recorded; no unreviewed destructive edits.

### Phase 1 — Supported framework/tooling

- [ ] Upgrade Next.js/React/TypeScript/dependency groups following official codemods and guides.
- [ ] Upgrade Tailwind/animation/theme tooling after validating existing design.
- [ ] Replace obsolete image/lint/router APIs.
- [ ] Introduce lint/typecheck/test scripts, basic CI.

**Gate:** App renders with original content system during interim, or temporary stubs; build passes before CMS removal.

### Phase 2 — Typed local content system

- [ ] Implement typed site config and local profile/experience data.
- [ ] Implement chosen MDX compiler/registry with validated metadata.
- [ ] Implement `getAllPosts`, `getPostBySlug`, `getAllProjects`, `getProjectBySlug` and draft/status logic.
- [ ] Add reusable MDX components (code, image, callout, links, tables).
- [ ] Add one *draft placeholder* blog post and one *draft placeholder* case study; add separate test fixtures if no published items exist.

**Gate:** MDX content builds, invalid metadata fails clearly, draft filtering works.

### Phase 3 — Route migration and cleanup

- [ ] Replace every Sanity query in all routes and components.
- [ ] Generate static project/blog paths and metadata, handle missing slugs.
- [ ] Remove Studio, webhook, Sanity libs/schemas/types/packages and env vars.
- [ ] Replace upstream personal photo assets with neutral placeholders **without removing the Photos page or navigation**; remove unused CMS components.
- [ ] Replace hardcoded upstream links and integrate optional services safely.

**Gate:** No runtime Sanity code and all required routes work; no Victor-specific content visible.

### Phase 4 — Visual parity and blog-feature preservation

- [ ] Preserve original layout, colors, typography, project-card format, blog-card format, blog detail/sidebar layout, navbar, footer, and both themes.
- [ ] Preserve blog date, calculated reading time, author, tags, share links, featured posts, Giscus discussion area, and optional support area through MDX metadata and React components.
- [ ] Preserve Photos route and navigation (with neutral placeholders; no Victor content).
- [ ] Verify original-versus-adapted screenshots at representative desktop/mobile widths; document any unavoidable differences.
- [ ] Audit focus, contrast, reduced motion, responsiveness, images and fonts without an unsolicited redesign.

**Gate:** The UI remains visually equivalent to upstream except for content/identity placeholders; no added project-card design, contact page, CTA section, or new nav item.

### Phase 5 — SEO, tests and readiness

- [ ] Add metadata, sitemap, robots, social previews and canonical handling.
- [ ] Add unit and Playwright tests, screenshot-based visual-parity checks, and CI validation.
- [ ] Test production build locally; optional preview deployment.
- [ ] Write architecture, authoring, migration, and deployment documentation.
- [ ] Produce final readiness report and list of required owner-provided content.

**Gate:** All automated checks pass; owner has a clean content-insertion workflow.

---

## 12. Required final deliverables from the agent

The agent must produce:

1. Working refactored application code with a **single package manager lockfile**.
2. Updated README with local setup, project layout, creating an MDX article/case study, public repo/Giscus setup, optional support integration, tests and deployment.
3. `docs/architecture.md` describing why no CMS/database/backend is needed and how the original UI is preserved.
4. `docs/content-authoring.md` detailing MDX metadata, where to add files, draft publishing, custom components, images and preview workflow.
5. `docs/migration-notes.md` listing removed dependencies/files and breaking changes.
6. `docs/deployment.md` listing steps for preview and production.
7. Passing unit/E2E tests and CI workflow.
8. `CONTENT_NEEDED.md`: a **checklist only**, not invented copy, of owner details needed to publish (identity, domain, headline, short/long bio, resume, project screenshots, repo/demo URLs, project status, technical articles, social links, preferred contact, optional analytics/Giscus setup).
9. A final report with exact commands run, actual results, remaining TODOs, vulnerabilities intentionally deferred, and changes requiring owner decisions.
10. A `docs/ui-parity.md` report containing upstream and adapted desktop/mobile screenshots, the visual-freeze checklist, and documented necessary deviations.
11. A `docs/integrations.md` guide showing GitHub Discussions/Giscus configuration for a **public** portfolio repo, reading-time/tag/featured/share behavior, Umami configuration, and optional Buy Me a Coffee integration.

### Final validation commands

```bash
npm ci
npm run lint
npm run typecheck
npm run test
npm run build
npm run test:e2e

# Source hygiene checks (adjust based on chosen folder layout)
rg -n 'victoreke|Victor Eke|evavic44|SANITY_|sanity\.io|studio|NEXT_PUBLIC_SANITY' app components lib config content public .env.example || true
```

Review matches manually: legitimate upstream credits in LICENSE/footer/docs are expected; **runtime branding, personal references and Sanity integrations are not**.

---

## 13. License and attribution

The upstream repository includes **MIT License, Copyright (c) 2023 Victor Eke**. Retain that copyright notice and the full MIT permission text as required for copies or substantial portions. The upstream README additionally asks for a visible link back to `https://victoreke.com` in the footer; honor that request. You can add a separate notice for your original additions, without removing upstream copyright. Do not reuse personal photos, biographies, logos or third-party images without permission; verify font and asset licensing separately.

A suggested footer credit pattern (adapt design): `Portfolio adapted from Victor Eke's open-source portfolio · Original project: victoreke.com`. Keep your own copyright statement distinct.

---

## 14. Official references and source-of-truth documentation

- Upstream repository: https://github.com/Evavic44/victoreke.com
- Next.js upgrade: https://nextjs.org/docs/app/getting-started/upgrading
- Next.js MDX guide: https://nextjs.org/docs/app/guides/mdx
- Next.js testing: https://nextjs.org/docs/app/guides/testing
- Next.js Playwright: https://nextjs.org/docs/app/guides/testing/playwright
- Next.js metadata: https://nextjs.org/docs/app/api-reference/functions/generate-metadata
- Next.js sitemap: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
- MDX: https://mdxjs.com/
- Vitest: https://vitest.dev/
- Playwright: https://playwright.dev/
- Tailwind: https://tailwindcss.com/docs/installation/framework-guides/nextjs
- Giscus: https://giscus.app/
- Umami: https://umami.is/docs

**Important:** Do not take version numbers in the upstream `package.json` as recommendations. Resolve current stable releases and compatibility at execution time, and report the exact selected versions and the reasons for them.

---

## Definition of done

The project is ready for the *separate content-authoring phase* when it is a working, documented, secure-by-default, non-Sanity Next.js portfolio **with the upstream UI deliberately preserved**; articles and case studies come from MDX, profile data is typed configuration, all required routes are accessible and correctly indexed, no upstream personal branding leaks, tests/build pass, and a future content agent can populate the site without changing application architecture.


### Repository-specific final checks (2026-11-09)

- Git remote: `edmealem-k/edmealem.dev`; existing local copy is the working directory.
- Brand and canonical domain: `Edmealem Kassahun`, `edmealem.dev`. Do not imply DNS or domain registration is complete until confirmed.
- Project content: exactly two featured projects initially (`hono-commerce`, `DevVault`) and two sample blog entries; refer to supplied content pack, don't hallucinate completed features.
- Preserve current upstream project's *compact* cards and all visual structure. UI redesign is a different, future request.
- Use actual `README.md` supplied with this addendum as the desired final repository documentation, but adjust commands/paths to the implementation that passes verification.
- Giscus: enable Discussions on the owner's **public** repo, install GitHub App, generate repo/category IDs, and gracefully hide comments until configuration is supplied. Public repository visibility does not automatically enable Discussions.
- Git history: copying files into a new repository does **not** transfer original upstream history. Do not claim it does; retain license notices and provenance in documentation.
- Keep external brand names in license/attribution docs where required; strip Victor-specific runtime metadata, social links, personal imagery, and analytics IDs.
