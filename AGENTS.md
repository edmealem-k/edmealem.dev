# edmealem.dev Agent Rules & Conventions

## 1. Author Profile Identity
- For all blog posts, metadata, and author profile cards, the author photo must always be `/edmealem_kassahun.jpg` (found in `public/edmealem_kassahun.jpg`).
- Never use generic placeholder avatars for the author.
- Author handles:
  - X / Twitter: `https://x.com/edmealem_k` (`@edmealem_k`)
  - GitHub: `https://github.com/edmealem-k` (`edmealem-k`)
  - Portfolio: `https://edmealem.dev`

## 2. Blog Cover Image Standards
- All blog post covers must be 16:9 landscape (`1200x675` or `2400x1350`), saved in both `.webp` and `.jpg` under `public/images/blog/`.
- Must follow the editorial developer card style:
  - Deep dark graphite/slate background (`#090d16`) with subtle ambient glow and grid.
  - Category pill badge.
  - Post Title and descriptive Subtitle.
  - Official vector technology icons for the tools discussed in the article (Drizzle, PostgreSQL, TypeScript, Node.js, BullMQ, Redis, Go, etc.).
  - Right-hand floating translucent glass tech stack card.
  - Footer bar featuring verified social handles: `x.com/edmealem_k` and `github.com/edmealem-k`.
- To generate or regenerate blog covers, use the script:
  ```bash
  bun run scripts/generate-all-covers.ts
  ```
