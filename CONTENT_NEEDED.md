# Content Needed Checklist — edmealem.dev

This document tracks assets, credentials, and owner-provided details needed before deploying `edmealem.dev` to production.

---

## 1. Personal & Contact Information

- [x] **Public Contact Email:** Confirmed `edmealemkassahun@gmail.com` (activated in `config/site.ts`).
- [x] **Portrait Photo:** Confirmed and activated at `/edmealem_kassahun.jpg` on About page and OpenGraph metadata.
- [x] **Latest Public Résumé:** Confirmed and placed at `/public/resume.pdf` (view and download buttons activated).
- [x] **Nexudy Role & Dates:** Confirmed Software Engineer (`Nov 2025 - Present`).
- [x] **Askuala Link Role & Dates:** Confirmed Backend Developer (`Mar 2025 - Oct 2025`).
- [x] **Nexus Tech Solutions Role & Dates:** Confirmed Full-Stack Developer Intern (`Nov 2024 - Feb 2025`).
- [x] **Education:** Confirmed Bahir Dar University (B.Sc. in Software Engineering, GPA 3.86/4.00, Jun 2021 – Jun 2025).
- [x] **Photos Page:** Populated with genuine photos including graduation certificate, university emblem, avatar, and portrait.

---

## 2. Project Assets & Links

### `hono-commerce`
- [ ] **Project Cover Image:** Provide high-resolution banner or screenshot to replace `/images/projects/hono-commerce-cover-placeholder.webp` (recommended: 1200x630px).
- [ ] **Public Demo URL:** Supply a live demonstration URL when available (currently shows "Coming Soon").
- [ ] **Public Repository:** Confirm if or when the repository becomes public.
- [ ] **Working Screenshots:** Provide genuine UI screenshots for the case study body.

### `DevVault`
- [ ] **Project Cover Image:** Provide banner or screenshot to replace `/images/projects/devvault-cover-placeholder.webp` (recommended: 1200x630px).
- [ ] **Public Demo URL:** Supply a live demonstration URL when deployed.
- [ ] **Architecture Diagram:** Provide an updated architecture diagram for the MVP.

---

## 3. Blog & Technical Writing

- [ ] **Sample Articles Review:** Independently review and approve the two sample technical articles (`tenant-isolation-in-saas.mdx` and `reliable-background-jobs-nodejs.mdx`) before public announcement.
- [ ] **Article Cover Imagery:** Supply original cover illustrations to replace the neutral placeholder webp graphics in `/images/blog/`.
- [ ] **Publication Dates:** Confirm final publication dates for live display.

---

## 4. Inspirations & Recommendations ("Heroes")

- [ ] **Curated Heroes List:** If desired, provide names, profile URLs, and "met" status in `app/data/heroes.ts`. The section remains hidden until entries are provided.

---

## 5. Domain & Third-Party Integrations

- [ ] **Domain DNS Configuration:** Point DNS records for `edmealem.dev` to Vercel or your chosen host.
- [ ] **GitHub Discussions & Giscus:**
  - [ ] Enable Discussions on `edmealem-k/edmealem.dev`.
  - [ ] Install the Giscus GitHub App.
  - [ ] Generate and set `NEXT_PUBLIC_GISCUS_REPOID` and `NEXT_PUBLIC_GISCUS_CATEGORYID`.
- [ ] **Umami Analytics (Optional):** Set `NEXT_PUBLIC_UMAMI_WEBSITE_ID` if analytics tracking is desired.
- [ ] **Buy Me a Coffee / Support (Optional):** Confirm payout provider eligibility and set `siteConfig.supportUrl` in `config/site.ts`.
