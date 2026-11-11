---
name: blog-cover-generator
description: Generates branded 16:9 editorial blog cover images for edmealem.dev with post title, subtitle, official technology icons, and verified social handles (x.com/edmealem_k and github.com/edmealem-k).
---

# Blog Cover Generator Skill for edmealem.dev

This skill guides the creation of high-impact, branded 16:9 landscape cover images for articles on `edmealem.dev`.

## Guidelines & Branding Rules

1. **Resolution & Aspect Ratio**: 
   - 16:9 landscape (`1200x675` CSS canvas rendered at 2x device pixel ratio for 2400x1350 retina sharpness).
   - Formats: Generated as `.webp` (primary) and `.jpg` (fallback) in `public/images/blog/`.

2. **Visual Hierarchy & Layout**:
   - **Background**: Deep graphite/slate (`#090d16`) with subtle technical grid overlay, radial accent lighting, and ambient glow.
   - **Top Category Badge**: Colored pill with glowing dot indicating the domain (e.g. `POSTGRESQL & DATABASE ENGINEERING`, `NODE.JS & DISTRIBUTED SYSTEMS`, `SAAS ARCHITECTURE & SECURITY`).
   - **Title & Subtitle**: High-contrast, clean bold typography (`Plus Jakarta Sans` or modern system sans) with a brief, punchy subtitle.
   - **Technology Stack Badges**: Official, vector-sharp icons for the primary tools (e.g., Drizzle ORM, PostgreSQL, TypeScript, Node.js, BullMQ, Redis, Go, Docker).
   - **Right Column Visual**: Floating 3D/isometric translucent dark glass card with glowing status nodes, layer stacks, and tool indicators.
   - **Bottom Social Footer**: Always includes verified author handles:
     - X (Twitter): `x.com/edmealem_k`
     - GitHub: `github.com/edmealem-k`
     - Brand mark: `edmealem.dev`

3. **Author Profile Image Rule**:
   - For every blog post, the author avatar must always point to `/edmealem_kassahun.jpg` (located at `public/edmealem_kassahun.jpg`). Never use generic placeholders.

4. **Generation Workflow**:
   - Run the automated generator script:
     ```bash
     bun run scripts/generate-all-covers.ts
     ```
   - Or add a new configuration in `scripts/generate-all-covers.ts` and run it for a new blog post.
