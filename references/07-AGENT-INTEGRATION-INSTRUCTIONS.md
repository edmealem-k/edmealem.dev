# AI Agent Instructions — Populate edmealem.dev (Content Integration Only)

## Mission

Integrate the accompanying content pack into the existing portfolio adaptation derived from `https://github.com/Evavic44/victoreke.com`.

The domain/identity chosen by the owner is **Edmealem Kassahun — `edmealem.dev`**. The intended GitHub portfolio repository is **public**. The architecture migration (Sanity → MDX, dependency upgrades, config, tests) is described in the separate `portfolio-rebuild-agent-blueprint.md`.

**Critical design requirement: DO NOT REDESIGN ANY UI.** The owner likes the upstream look and wants any UI changes in a separate future phase. Keep the source layout, fonts, colors, gradient/noise background, component geometry, mobile behavior, animations, spacing, sidebar, comments placement, footer, and navigation style. Only swap content and replace CMS plumbing according to the prior blueprint. Do not implement richer project cards now, even if they could improve conversion later.

## Preflight

1. Read the existing `portfolio-rebuild-agent-blueprint.md` and **every file in this content pack** before changing code.
2. Inspect the **actual code state**. Determine whether the architecture migration is already complete. If not, finish that migration **first** and verify its acceptance criteria, then apply content in a separate, reviewable commit.
3. Locate existing components and data contracts: `app/page.tsx`, `app/about/page.tsx`, `app/projects/page.tsx`, `app/projects/[project]/page.tsx`, `app/blog/page.tsx`, `app/blog/[post]/page.tsx`, site/footer/social components, current project/blog parsers, and types.
4. Record screenshots at desktop and mobile widths for the **upstream** and **current adapted** versions before content replacement. Do not treat copy wrapping as permission to redesign.
5. Create a dedicated branch, e.g. `feat/edmealem-content`.

## Source material mapping

| Source file | Website destination | How to consume |
|---|---|---|
| `01-HOME-CONTENT.md` | Homepage, shared site metadata/social config and experience data | Use sections explicitly labeled `Hero headline`, `Hero description`, and `Work Experience`; do not show agent notes |
| `02-ABOUT-CONTENT.md` | About page, usage list, experience/profile data | Apply approved copy to existing visual sections; leave portrait/resume placeholders |
| `03-PROJECT-HONO-COMMERCE.md` | Project metadata and `/projects/hono-commerce` body | Extract **Suggested metadata** to content schema, **Main case study body** to rendered MDX; do not publish agent notes |
| `04-PROJECT-DEVVAULT.md` | Project metadata and `/projects/devvault` body | Same as above |
| `05-BLOG-TENANT-ISOLATION.md` | Blog metadata and `/blog/tenant-isolation-in-saas` body | Extract frontmatter and **Article body** only; sample content subject to owner approval |
| `06-BLOG-RELIABLE-BACKGROUND-JOBS.md` | Blog metadata and `/blog/reliable-background-jobs-nodejs` body | Same as above |

### Important: The pack files are `.md` instructions, not drop-in `.mdx` files

- Create actual `.mdx` entries using the selected project's **single content-loading/compilation pipeline**.
- Place the provided YAML fields in normal `---` frontmatter delimiters, then **only** the approved case-study/article body. Drop the editorial headers and **agent-only notes**.
- Normalize field names and null handling to match the validated content schema (e.g. `date` may be required; `liveUrl` may be optional).
- Do not nest code fences representing YAML inside MDX frontmatter.
- If existing content loader forbids `null` frontmatter, omit optional values instead of inventing URLs.
- Do not add MDX plugins or runtime dependencies merely to render text, basic headings, lists, and code blocks.
- Avoid conflicting MDX strategies or parallel content stores.

## Shared identity and reuse rules

Centralize these values rather than copying them across components:

- `site.name = "Edmealem Kassahun"`
- `site.url = "https://edmealem.dev"`
- `site.title = "Edmealem Kassahun — Full-Stack & Backend Developer"`
- `site.location = "Ethiopia"`
- `site.social.github = "https://github.com/edmealem-k"`
- `site.social.linkedin = "https://linkedin.com/in/edmealem-k"`
- `site.social.x = "https://x.com/edmealem_k"`
- `site.social.leetcode = "https://leetcode.com/edmealem_k/"` (optional)
- `site.social.wakatime = "https://wakatime.com/@edmealem"` (optional)
- `site.email = undefined` until confirmed
- `site.resumeUrl = undefined` until supplied
- `site.supportUrl = undefined` until configured

**Never publish an internal employer email address as the personal contact email by inference.** Ask the owner for a public email at the content confirmation step or keep a visible-but-neutral placeholder if the design requires a field.

Author profile should be shared across blog posts, article sidebars, Open Graph author tags, and About page. Use a single author key `edmealem` resolved through typed config rather than storing duplicate profile content in every MDX file.

The existing GitHub contribution component must point to `edmealem-k`; no fake contribution metrics.

## Homepage

- Replace the original author name, headline, bio, social links, and experience content using `01-HOME-CONTENT.md`.
- Keep the exact hero structure and contribution graph UI; don't add a services row, CTA panel, or new section.
- Work experience: use **Nexudy** only with `startDate` as owner TODO. If dates are required by the component, suppress date rendering gracefully until supplied; do not use invented dates.
- Preserve existing Footer styling and license obligations while changing owner copyright.

## About page

- Insert copy from `02-ABOUT-CONTENT.md` into the existing text sections; retain title and portrait layout.
- Replace personal photographs and resume with clearly neutral local placeholders or temporarily absent optional media; **never copy the original author's likeness and pretend it is the owner**.
- Keep existing profile, tools, technologies, platforms, and inspiration/hero section components. Supply verified items or an empty-state placeholder; do not copy another developer's heroes or hardware.
- Keep company details high-level and employer-safe; don't reveal private Nexudy URLs, project paths, customer data, keys, or implementation specifics.

## Projects

- Exactly **two project entries** for launch: `hono-commerce` (order 1) and `DevVault` (order 2).
- **Preserve upstream compact project-list cards** — same design, typography, and layout. Do not introduce screenshots into list cards or add status pill designs as part of adaptation unless already supported by the source UI.
- Detail pages preserve the original full-width cover, title, optional external links, and readable long-form article layout.
- Render project `status` as metadata only if the existing design supports it without visual change; otherwise express it in first paragraph.
- **hono-commerce:** repo is private. Do not show a working GitHub link to inaccessible code. Do not claim product features are deployed/ready or expose confidential source. Add real demo or screenshots only when owner supplies them.
- **DevVault:** repo address known, but inspect current visibility before displaying GitHub link; no invented live URL.
- For planned features, use future-oriented wording in project body and avoid "Completed", "Production Ready", or fabricated counts.
- When a project has no cover image yet, use a neutral **design-preserving** placeholder at the same aspect ratio.
- Unsupported project slugs must return a real 404 (`notFound()` in App Router), not a runtime exception.

## Blog

- Exactly **two sample posts** for launch testing, from files 05 and 06. Mark them samples in the repository content review checklist. The owner should approve wording and publication dates before making them publicly visible; if approval isn't available, `published: false` until approved while preserving test fixtures for the blog layout.
- **Preserve upstream blog card UI and blog detail UI**, including article heading, date, reading time, author sidebar, tags, sharing, featured posts, comments, and support block.
- `readingTime` must be **derived from text**; do not enter a hardcoded minutes value into content.
- Author data comes from shared config.
- Tags and featured recommendations come from valid MDX frontmatter; feature selection is deterministic, excludes the current post, and handles no-results gracefully.
- Social share URLs derive from canonical post URLs using `https://edmealem.dev/blog/{slug}`; encode parameters safely. A copy-link action should copy canonical URL.
- SEO metadata uses sanitized summary, canonical URL, and owner-owned images; unknown cover image gets a safe site-level fallback.
- Giscus remains enabled as a **configurable** React component; configure it for the public portfolio repository once Discussions and Giscus are set up. Never leave the original `evavic44/victoreke.com` repo, repo ID, category ID, or term in the runtime. Before Giscus setup, render a respectful unavailable/coming-soon state in the existing comments area.
- Giscus comments use a stable per-article pathname / discussion mapping; verify changing a post title does not unintentionally split its discussion history.
- Optional Buy Me a Coffee/support button: `site.supportUrl` is unset by default. If the owner has not supplied a verified, supported payout URL, leave the section unobtrusive or render a disabled state; **do not redirect to Victor's support account**. Don't invent payment credentials.

## Testing and safety

Minimum automated or manual checks:

1. `npm run lint` (or project's chosen package-manager equivalent) passes.
2. `tsc --noEmit` or configured `typecheck` passes.
3. Production build passes on the chosen supported Node version.
4. `/`, `/about`, `/projects`, `/projects/hono-commerce`, `/projects/devvault`, `/blog`, and both article routes render with the correct owner identity.
5. Missing blog and project slugs return HTTP 404.
6. Neither blog nor projects depend on a Sanity client/token/studio at runtime.
7. `hono-commerce` has no broken or misleading repo link; DevVault source link, if displayed, resolves correctly.
8. Reading time, author, tags, featured posts, social sharing, dark/light theme, code highlighting, and mobile navigation behave correctly.
9. No secrets, personal resume copies, internal Nexudy identifiers, or fabricated metrics are committed.
10. No references to Victor's name, email, portraits, brand assets, analytics IDs, Giscus IDs, or payment destination remain in **rendered site**. MIT notices must remain where legally required.
11. Run Playwright screenshots at desktop and mobile breakpoints and compare against upstream. Allow differences from text content/image placeholders only, not intentional design changes.
12. Giscus uses a public Discussions-enabled repo when configured; if not, comments fail gracefully rather than throwing.

## Deliverables

- Implementation commits with a concise change log.
- Typed reusable site/author/social/experience config.
- Two MDX project entries and two MDX sample blog articles.
- No Sanity runtime code left.
- `CONTENT_NEEDED.md` listing portrait, public email, resume, exact work dates, real demos/screenshots, and any unverified project features.
- `docs/content-integration-report.md` listing files created/changed, commands/tests executed, placeholders remaining, and any unsupported or deferred requirements.
- Confirmation that **no UI redesign** was performed.

## Task for the agent (copy/paste)

> Read `portfolio-rebuild-agent-blueprint.md` and all files in `edmealem-portfolio-content-pack/`. Finish the architecture migration if necessary, then integrate this content using the existing visual components without redesign. Centralize Edmealem's site/author details, make exactly two project entries and two sample blog entries, preserve full blog-detail functionality, and keep Giscus/support optional until real integration details are supplied. Distinguish verified capabilities from in-development plans. Do not publish sample articles or deploy without owner approval. Run tests/build, compare visual screenshots, and write a content integration report and `CONTENT_NEEDED.md`.
