# Homepage Copy — edmealem.dev

**Purpose:** Populate the **existing upstream homepage**. Do not add/remove sections, change grid structures, or redesign UI. Replace Victor-specific identity, links, work entries, and copy. Existing contribution graph and work-experience components stay visually intact.

## Shared identity (single source of truth)

| Field | Value |
|---|---|
| Full name | Edmealem Kassahun |
| Site name | edmealem.dev |
| Canonical URL | `https://edmealem.dev` |
| Short title | Full-Stack & Backend Developer |
| Longer SEO title | Edmealem Kassahun — Full-Stack & Backend Developer |
| Location | Ethiopia |
| Default description | TypeScript-focused full-stack and backend developer building web applications, APIs, and developer tools with Next.js, Node.js, PostgreSQL, and modern cloud services. |
| Contact email | `[TODO: confirm public contact address]` |
| Profile image | `[TODO: supply portrait]` |
| Resume URL | `[TODO: supply latest public resume]` |

### Hero headline

> Full-stack & backend developer building reliable web applications.

**Alternate only if the design's line wrapping fits better:**

> Building web applications, APIs, and developer tools with TypeScript.

Keep the upstream headline's HTML semantics, font, animation, and width. Select one headline based on visual fit, without changing styling.

### Hero description

> I'm a software engineer focused on TypeScript, React, Next.js, and Node.js. I enjoy turning product ideas into useful applications and working through the backend challenges behind them—from API design and authentication to databases, integrations, and background jobs.

**Shorter responsive variant, only if needed for existing layout:**

> Software engineer building full-stack applications, reliable APIs, and developer tools with TypeScript, Next.js, Node.js, and PostgreSQL.

### Social links

Populate the existing `Social` component from **one centralized typed data source**. Do not hardcode the same URL in About, Footer, Blog Author, and Home.

- GitHub: `https://github.com/edmealem-k`
- LinkedIn: `https://linkedin.com/in/edmealem-k`
- X: `https://x.com/edmealem_k`
- WakaTime: `https://wakatime.com/@edmealem` (optional; include only if the existing design supports it gracefully)
- Portfolio: `https://edmealem.dev`
- LeetCode: `https://leetcode.com/edmealem_k/` (optional)
- Email: `[TODO: public email; hide email link until confirmed]`

Remove Victor's unused platform accounts; do **not** render fake or dead links. Keep the existing social-links visual language and spacing. The count of links can be smaller than upstream.

## Contribution graph

Keep the existing contribution graph component and its controls. Configure the username as `edmealem-k` through a centralized config/environment variable. Do not hardcode contribution counts or years. If the GitHub graph API fails, show a graceful empty/error state instead of fake activity.

Existing heading: **Contribution Graph** (keep unchanged).

## Work Experience (existing homepage section)

Use verified information only. **Do not invent additional employers or employment date ranges.**

### Nexudy

- Organization: Nexudy
- Role: Full-Stack Developer
- Period: `[TODO: confirm start month and year]` – Present
- Organization logo: `[TODO: use approved logo or existing neutral placeholder]`
- Employer link: `[TODO: verify official public URL]`
- Copy:

> Building and improving web application features across the frontend and backend, with a focus on TypeScript, React/Next.js, Node.js, PostgreSQL, and integrations. My work includes API development, authentication-related flows, and maintaining application features within a multi-package codebase.

This copy describes general areas of work, **not confidential internal implementation details**. No internal links, client names, SSO configuration, or proprietary architecture.

### Additional roles

**Do not fabricate** a second job simply to fill the existing multi-column grid. If prior roles are not confirmed, render only Nexudy; maintain the component's design. Optionally show independent projects under an existing experience category **only if clearly labeled as personal projects**, not employment.

## Homepage contact / CTA

The source homepage may not have a large CTA. **Do not add one yet** because design is frozen. Where existing buttons/links already appear, use the following language:

- Primary link: **Projects** → `/projects`
- Secondary link: **About** → `/about`
- Contact text if an existing location supports it: **Open to freelance and collaboration opportunities.**

Don't promise availability, guaranteed turnaround, hourly pricing, or availability status without confirmation.

## SEO and identity acceptance checklist

- Metadata, Open Graph, canonical URL, footer, accessible labels, and browser title all use Edmealem's identity.
- No `Victor Eke`, `victoreke.com`, `evavic44`, or original analytics IDs remain in visible output or runtime configuration.
- Preserve original footer shape, but replace owner copyright with `Edmealem Kassahun` and keep third-party license notices in `LICENSE` / notices as required.
- Site URL is configurable for local/preview deployments; don't assume the domain resolves before deployment.
- The existing homepage stays visually the same apart from necessary owner-specific text/images/links.
