# Deployment Guide — edmealem.dev

## 1. Hosting Platforms

`edmealem.dev` is a self-contained Next.js application that can be hosted on **Vercel** (recommended for simplicity) or any Node.js hosting platform (Railway, Render, AWS EC2, or Docker).

### Option A: Vercel (Recommended)

1. Connect the GitHub repository `edmealem-k/edmealem.dev` in the Vercel Dashboard.
2. In the project settings:
   - **Framework Preset:** Next.js
   - **Build Command:** `bun run build` (or leave default `next build`)
   - **Install Command:** `bun install --frozen-lockfile`
   - **Node.js Version:** 20.x or 22.x
3. Add optional environment variables (see below).
4. Deploy.

### Option B: Node.js / Docker

1. Run `bun install --frozen-lockfile` to install dependencies.
2. Run `bun run build` to generate static assets and compiled routes.
3. Start the production server:
   ```bash
   node_modules/.bin/next start -p 3000
   ```

## 2. Environment Variables

All environment variables are optional. The site builds and renders completely without any of them set:

| Variable | Description | Default |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical domain URL | `https://edmealem.dev` |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Public contact email address | (Undefined / hidden) |
| `NEXT_PUBLIC_GITHUB_USERNAME` | GitHub username for contribution graph | `edmealem-k` |
| `NEXT_PUBLIC_GITHUB_JOIN_YEAR` | Year joined GitHub for contribution graph | `2021` |
| `NEXT_PUBLIC_GISCUS_REPO` | Repository for Giscus comments | `edmealem-k/edmealem.dev` |
| `NEXT_PUBLIC_GISCUS_REPOID` | Giscus repository ID from giscus.app | (Comments disabled if unset) |
| `NEXT_PUBLIC_GISCUS_CATEGORY` | Discussion category name | `Announcements` |
| `NEXT_PUBLIC_GISCUS_CATEGORYID` | Giscus category ID from giscus.app | (Comments disabled if unset) |
| `NEXT_PUBLIC_UMAMI_WEBSITE_ID` | Umami analytics website ID | (Analytics disabled if unset) |

## 3. Custom Domain Setup (`edmealem.dev`)

When ready to point the custom domain `edmealem.dev`:

1. In your DNS provider (e.g. Cloudflare, Namecheap, Route 53):
   - For Vercel:
     - `CNAME` for `www` pointing to `cname.vercel-dns.com`
     - `A` record for `@` pointing to `76.76.21.21`
2. Configure SSL/TLS verification in the hosting dashboard.
3. Ensure `NEXT_PUBLIC_SITE_URL="https://edmealem.dev"` is set so canonical tags and sitemaps match.

## 4. Rollback & Troubleshooting

- **Build Failures:** Run `bun run typecheck && bun run build` locally to diagnose any type or compilation issues before pushing to production.
- **Rollback:** In Vercel, navigate to the **Deployments** tab and click **Promote to Production** on any prior successful deployment.
