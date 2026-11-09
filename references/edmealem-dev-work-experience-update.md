# edmealem.dev — Work Experience Content & Agent Implementation Instructions

**Scope:** Only the Work Experience section of the homepage, plus its shared data and relevant references on the About page. **Do not redesign the UI.**

## 1. Source of truth and status

The current local screenshot shows one timeline entry: **Nexudy — Full-Stack Developer — JAN 1, 2024 – PRESENT**, with a general frontend/backend description. **January 1, 2024 is not independently verified and may be placeholder data. Do not treat it as a confirmed employment date.** The older portfolio/LinkedIn screenshot and this conversation also identify **Askuala Link — Backend Developer** and **Nexus Tech Solutions — Full-Stack Developer Intern**. Exact dates, employment types and detailed responsibilities for the latter two are not reliably legible/confirmed in the materials available; leave clear `TODO_VERIFY` values instead of inventing details. Do not publish fake dates.

Company links supplied by owner:
- Nexudy: https://nexudy.com/
- Askuala Link: https://www.askualalink.com/
- Nexus Tech Solutions LinkedIn: https://www.linkedin.com/company/nexusuisolution2/

Logo files already available in the *owner's local repository* (check paths exist before use):
- `/images/about/nexudy.png`
- `/images/about/askuala.png`
- `/images/about/nexus.png`
- `/images/about/profile-placeholder.webp` (profile only, not company logo)

**Important:** The Nexus LinkedIn page displays 'Nexus Tech Solutions' but its About section also refers to 'Nexus UI Solution'. Use the owner's established employer label **Nexus Tech Solutions**; do not auto-rebrand the entry based on website text.

## 2. Approved public-facing copy

The following descriptions use only known roles/stack and broadly described responsibilities. They are conservative *proposed copy*, not independently verified employer statements. The owner should approve exact wording before publishing.

### Nexudy
- **Company:** Nexudy
- **Role:** Full-Stack Developer
- **Website:** https://nexudy.com/
- **Logo:** `/images/about/nexudy.png`
- **Dates:** `TODO_VERIFY_START_DATE` → Present (current screenshot says `Jan 1, 2024`, which must be verified)
- **Short summary (timeline):**

  > Build and improve full-stack application features with TypeScript, Next.js, Node.js, and PostgreSQL. Work across APIs, authentication and workspace flows, third-party integrations, and a multi-package codebase.

- **Expanded About-page wording (optional, if existing design accommodates it without UI changes):**

  > Develop and maintain application features across frontend and backend services. Work with TypeScript, React/Next.js, Node.js, PostgreSQL, authentication and authorization, and external integrations. Contribute to API design and features spanning packages in a shared codebase.

- **Publishing caution:** Do not reveal proprietary customer information, internal architecture, unpublished product specifics, or claim company-wide outcomes. Use the broad description above.

### Askuala Link
- **Company:** Askuala Link
- **Role:** Backend Developer
- **Website:** https://www.askualalink.com/
- **Logo:** `/images/about/askuala.png`
- **Dates:** `TODO_VERIFY_START_DATE` → `TODO_VERIFY_END_DATE`
- **Short summary (review before publication):**

  > Worked on backend application development, including API endpoints, data handling, and integration with frontend features. Focused on building maintainable server-side functionality and collaborating on application requirements.

- **Note:** This is deliberately general: confirm exact frameworks, database, features, and responsibilities before adding specifics.

### Nexus Tech Solutions
- **Company:** Nexus Tech Solutions
- **Role:** Full-Stack Developer Intern
- **Website:** https://www.linkedin.com/company/nexusuisolution2/
- **Logo:** `/images/about/nexus.png`
- **Dates:** `TODO_VERIFY_START_DATE` → `TODO_VERIFY_END_DATE`
- **Short summary (review before publication):**

  > Contributed to web application development as a full-stack intern, working on frontend interfaces and backend functionality while gaining experience with collaborative software delivery.

- **Note:** Avoid listing technologies, measurable results, or contract duration until validated.

## 3. Implementation instructions for the coding agent

1. Work in the owner's **existing local** `edmealem.dev` repository. Do not clone, reinitialize Git, modify remotes, push, or deploy.
2. Inspect the current homepage **Work Experience** implementation, its typed data structure and the About page. Preserve the original Victor Eke layout exactly: section heading, two-column responsive grid where present, company-logo boxes, timeline line, typography, colors, hover states, spacing and animation. Only replace data and image sources.
3. Locate the existing experience data; create/maintain a **single typed source of truth**, e.g. `src/data/experience.ts`, or use the repository's existing `data` directory. Do not create a duplicate if one already exists. Reuse entries in Home and About when needed.
4. Add all three companies in reverse chronological order: Nexudy, Askuala Link, Nexus Tech Solutions. Use the supplied links and logos. Every external link must use safe `target="_blank"`/`rel="noopener noreferrer"` if opening new tabs.
5. **Dates:** the existing Nexudy `2024-01-01` is a visible value but not confirmed. Before publishing, verify it with owner-provided résumé or LinkedIn dates. Do not replace it with a guessed date. For roles with unverified dates, use an intentional neutral display such as `Dates to confirm` in development or temporarily hide them; do not display raw `TODO_VERIFY_*` in production. Never use invented `Jan 1` or `Dec 31` defaults. A `verified: false` or `draft: true` field is recommended.
6. When rendering dates, accept ISO `YYYY-MM-DD` for verified dates, handle `endDate: null` as `Present`, and render `Month YYYY` (not an invented first day) in the UI. If the owner's record only has month/year, represent it as month/year without asserting an exact day.
7. Check image filenames and dimensions. Use `next/image`, meaningful alt text (e.g. `Nexudy logo`), `object-contain`, and the **existing card dimensions**. Do not distort logos or switch to web-fetched images.
8. Keep the current Next.js/MDX/Bun architecture untouched. Experience entries are **typed data**, not MDX blog posts. No new API, database, or CMS needed.
9. Update the About page's experience references if they exist; do not duplicate or introduce a new timeline design.
10. Check accessibility and contrast with existing theme; verify homepage at desktop and mobile, with 1 and 3 experience items. Avoid layout overflow, broken images, and duplicate keys.
11. Run the repo's available `bun run lint`, `bun run typecheck`, `bun run build` and relevant tests. Do not change tooling to silence failures. Produce a short report listing what changed, test results, and exact facts still awaiting confirmation.
12. **Do not alter the MIT LICENSE or attribution as part of this work-experience task.**

## 4. Suggested data contract (adapt to actual repository)

```ts
export type Experience = {
  id: string;
  company: string;
  role: string;
  companyUrl: string;
  logo: string;
  startDate: string | null; // ISO or YYYY-MM when verified; null otherwise
  endDate: string | null; // null = Present only for verified current role
  current: boolean;
  verifiedDates: boolean;
  summary: string;
};

export const experiences: Experience[] = [
  {
    id: 'nexudy', company: 'Nexudy', role: 'Full-Stack Developer',
    companyUrl: 'https://nexudy.com/', logo: '/images/about/nexudy.png',
    startDate: null, endDate: null, current: true, verifiedDates: false,
    summary: 'Build and improve full-stack application features with TypeScript, Next.js, Node.js, and PostgreSQL. Work across APIs, authentication and workspace flows, third-party integrations, and a multi-package codebase.',
  },
  {
    id: 'askuala-link', company: 'Askuala Link', role: 'Backend Developer',
    companyUrl: 'https://www.askualalink.com/', logo: '/images/about/askuala.png',
    startDate: null, endDate: null, current: false, verifiedDates: false,
    summary: 'Worked on backend application development, including API endpoints, data handling, and integration with frontend features. Focused on maintainable server-side functionality and collaboration.',
  },
  {
    id: 'nexus-tech-solutions', company: 'Nexus Tech Solutions', role: 'Full-Stack Developer Intern',
    companyUrl: 'https://www.linkedin.com/company/nexusuisolution2/', logo: '/images/about/nexus.png',
    startDate: null, endDate: null, current: false, verifiedDates: false,
    summary: 'Contributed to web application development as a full-stack intern, working on frontend interfaces and backend functionality while gaining experience with collaborative software delivery.',
  },
];
```

**This is a shape example, not a directive to replace a compatible existing interface.** The data intentionally omits unverified dates. The UI should render `Present` for Nexudy even when the start month is pending confirmation, without displaying a false date.

## 5. Acceptance criteria

- Work Experience shows the three correct company names, roles, links, and local logos.
- UI is visually unchanged from the existing homepage except for the new entries and text content.
- No false dates or unverified achievement metrics are published.
- Company links work; logos do not stretch or break.
- Experience data is maintained in one reusable typed file/source.
- About page and homepage agree about company names, roles, and ordering.
- Lint, typecheck, build, and relevant tests pass; agent reports any incomplete verification.

## 6. Information the owner needs to confirm later

- Nexudy exact starting month/year (screenshot shows `Jan 1, 2024`, not verified).
- Askuala Link starting and ending month/year, and 1–2 specific engineering responsibilities.
- Nexus Tech Solutions starting and ending month/year, and 1–2 specific engineering responsibilities.
- Any public, non-sensitive accomplishments or technologies to add to these summaries.

## 7. Copy/paste prompt to the coding agent

> Update only the Work Experience content in my existing local edmealem.dev repository. Follow `edmealem-dev-work-experience-update.md` exactly. Reuse the existing work timeline UI and supplied local logos; do not redesign anything. Use a typed shared data source, populate Nexudy, Askuala Link, and Nexus Tech Solutions with the provided company links and conservative descriptions, and do not invent dates or achievements. Verify the current Nexudy start date before publishing. Keep the portfolio's Bun/Next.js/MDX setup unchanged. Run lint, typecheck, build, and relevant tests, and report any unverified details. Do not push or deploy.
