# About Page Copy — Edmealem Kassahun

**Visual constraint:** preserve Victor's existing About page layout: headline and biography, portrait/resume/email card, rich-text sections, technology/tool usage list, and any existing lower-page sections. Replace copy and image references only. Don't reproduce his personal photographs, hometown narrative, or personal recommendations as Edmealem's.

## Page metadata

- Title: `About | Edmealem Kassahun`
- Description: `Learn about Edmealem Kassahun, a full-stack and backend developer focused on TypeScript, Node.js, Next.js, APIs, and software engineering.`
- Canonical: `https://edmealem.dev/about`

## Page headline

> I'm Edmealem Kassahun. I build web applications and enjoy the engineering behind them.

Alternate if the upstream headline is too long for its current width:

> I'm Edmealem, a software engineer based in Ethiopia.

## Main biography — ready-to-edit draft

I'm a full-stack developer with a strong interest in backend engineering. I work primarily with TypeScript, React, Next.js, Node.js, and PostgreSQL, building application features that connect thoughtful user experiences with reliable APIs and data models.

I earned a B.Sc. in Software Engineering from Bahir Dar University in 2025. Since then, I've continued building practical applications, learning from real-world engineering challenges, and working on projects that strengthen my understanding of software architecture.

In my professional work, I contribute across the frontend and backend: implementing features, integrating services, shaping API behavior, and maintaining existing code. I enjoy work that requires understanding the complete flow of an application rather than treating each endpoint or page in isolation.

Outside my day-to-day work, I build personal projects to explore different areas of engineering. My current projects include `hono-commerce`, a multi-tenant e-commerce platform under active development, and `DevVault`, a developer-focused knowledge application. These give me room to experiment with authentication, modular application design, relational data, asynchronous processing, and ways of organizing technical knowledge.

I'm especially interested in backend architecture, distributed systems, DevOps, and the tradeoffs involved in building dependable software. I also enjoy documenting things I learn—whether that's a database decision, a useful development workflow, or a difficult bug—and sharing those notes through technical writing.

I'm open to collaborating on projects involving full-stack web development, TypeScript/Node.js APIs, SaaS applications, and third-party integrations.

## Optional short quote / callout

> I like building things that work end to end—and understanding why they work.

Use this **only if** there is an existing quote/callout element in the upstream design. Don't add a new component in this phase.

## What I'm currently working on

Use as a short section **only where the original About content already has a corresponding text section**:

I'm working on improving my TypeScript projects, making their core workflows more reliable, and putting stronger testing and documentation around them. Alongside that, I'm studying backend and systems concepts and writing about what I learn.

Do not assert that DevVault's AI/search roadmap is already complete or that hono-commerce is publicly released.

## Education

- **B.Sc. in Software Engineering**
- **Bahir Dar University**
- Graduated **2025**

Do not add GPA, honors, coursework, or awards unless verified later.

## Technical experience (grouped, not an exhaustive tool dump)

- **Frontend:** TypeScript, JavaScript, React, Next.js, Tailwind CSS.
- **Backend:** Node.js, Hono, NestJS, Express, REST API design, authentication and authorization.
- **Data and infrastructure:** PostgreSQL, Prisma, Drizzle ORM, MongoDB, Redis, BullMQ, Docker, AWS experience (EC2, S3, RDS, SES, Route 53), CI/CD.
- **Learning interests:** distributed systems, observability, system design, infrastructure as code, Go (learning; do **not** present as primary client service).

### Existing “Usage” component

If the source site's About page renders technology, tools, platforms, and hardware through a CMS-backed list, replace it with editable typed data. Preserve visual hierarchy and icons. Use only items already supported by factual context, and do **not** guess hardware models.

Suggested short visible groups:

**Technologies** — TypeScript, JavaScript, React, Next.js, Node.js, Hono, NestJS, PostgreSQL, Redis, Prisma, Drizzle.

**Tools** — Git, GitHub, VS Code, Docker, Postman, Linux.

**Platforms** — AWS, Vercel, GitHub Actions.

**Hardware** — `[TODO: user-selected devices; hide or preserve neutral placeholder until supplied]`.

Not every technology needs a badge; keep the original design and choose a curated subset.

## Work experience data

### Nexudy — Full-Stack Developer

- Dates: `[TODO: verify start date]` to present
- Description: `Contribute to full-stack application development using TypeScript, React/Next.js, Node.js, and PostgreSQL, including API and authentication-related features and service integrations.`
- Confidentiality: Never publish internal workspace URLs, proprietary architecture, customer information, private code, or deployment configuration.

### Independent engineering projects

- Dates: ongoing; **not employment**
- Description: `Designing and developing personal full-stack and backend-focused projects that explore multi-tenancy, application architecture, data modeling, and developer tooling.`

Only include this separate entry if the existing work list supports a clearly distinguished personal-project entry.

## Images and resume — owner to replace manually

- Portrait: `/images/about/profile-placeholder.webp` (neutral generic placeholder created by the agent; **never** reuse Victor's personal photo)
- Optional workspace photo: `/images/about/workspace-placeholder.webp`
- Optional “currently building” image: `/images/about/currently-building-placeholder.webp`
- Resume: `/resume.pdf` **only after the user supplies a verified current PDF**; otherwise show an appropriately disabled/non-clickable state without altering appearance more than necessary.
- Contact email: `[TODO: confirm public professional email]`; avoid showing internal employer email as personal contact without explicit approval.

Placeholders must be clearly marked as placeholders in repo documentation and excluded from production claims. Use neutral graphics rather than images impersonating the author.

## “Heroes” / inspirations section

The source About page contains a list of admired individuals. **Do not copy Victor's selections and present them as Edmealem's preferences.** Keep the section implementation intact but use neutral owner-authored placeholders or an empty state until the owner provides names. No visual redesign.

## Final requirements

- Preserve the original About page layout, narrow reading column, portrait panel, image proportions, headings, and motion.
- All long paragraphs must remain responsive without overflow.
- No unverifiable achievements, employer details, or client testimonials.
- Keep internal or future-development information out of public copy.
- Personal name, social accounts, metadata, footer, and author info reference shared config, not separate hardcoded strings.
