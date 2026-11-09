# Integrations Setup Guide — edmealem.dev

## 1. Giscus Comments (via GitHub Discussions)

Comments on blog articles are powered by [Giscus](https://giscus.app/), which uses GitHub Discussions for public, markdown-capable discussions.

### Setup Steps for `edmealem-k/edmealem.dev`

1. **Verify Public Repository:** Ensure `edmealem-k/edmealem.dev` is a public repository on GitHub.
2. **Enable Discussions:**
   - In your repository, go to **Settings** > **General**.
   - Scroll down to the **Features** section and check **Discussions**.
3. **Install the Giscus GitHub App:**
   - Navigate to [github.com/apps/giscus](https://github.com/apps/giscus).
   - Click **Install** and select `edmealem-k/edmealem.dev`.
4. **Generate IDs:**
   - Visit [giscus.app](https://giscus.app/).
   - Under **Repository**, enter `edmealem-k/edmealem.dev`.
   - Under **Discussion Category**, select **Announcements** (or another discussion category).
   - Under **Page ↔ Discussions Mapping**, select `pathname` (this maps comments to `/blog/<slug>` so changing titles does not break discussions).
   - Copy the generated `data-repo-id` and `data-category-id`.
5. **Configure Environment Variables:**
   Add these values to `.env.local` or your deployment platform:
   ```env
   NEXT_PUBLIC_GISCUS_REPO="edmealem-k/edmealem.dev"
   NEXT_PUBLIC_GISCUS_REPOID="<your-repo-id>"
   NEXT_PUBLIC_GISCUS_CATEGORY="Announcements"
   NEXT_PUBLIC_GISCUS_CATEGORYID="<your-category-id>"
   ```
6. **Graceful Fallback:** If these environment variables are absent, the blog article displays a clean placeholder ("Comments coming soon") without throwing runtime errors.

## 2. Umami Analytics

Privacy-respecting web analytics can be enabled via [Umami Cloud](https://cloud.umami.is/) or a self-hosted instance:

1. Create an account on Umami and create a new website for `edmealem.dev`.
2. Copy the generated Website ID.
3. Configure the environment variable:
   ```env
   NEXT_PUBLIC_UMAMI_WEBSITE_ID="<your-website-id>"
   ```
4. If unset, the analytics tracking script is not injected.

## 3. Support / Creator Payouts

The Buy Me a Coffee support section in `app/components/shared/Buymeacoffee.tsx` is configurable:

1. Confirm that creator payouts are supported for your preferred provider and region.
2. Add your profile URL to `config/site.ts`:
   ```ts
   siteConfig.supportUrl = "https://buymeacoffee.com/<your-handle>";
   ```
3. If unset (`undefined`), the component renders an unobtrusive placeholder message preserving the card dimensions.

## 4. GitHub Contribution Graph

The contribution graph on the homepage queries public GitHub contribution events:

1. Configured by default to `edmealem-k` via `config/site.ts`.
2. Can be overridden using `NEXT_PUBLIC_GITHUB_USERNAME` and `NEXT_PUBLIC_GITHUB_JOIN_YEAR`.
3. If the GitHub API fails or is unreachable (e.g. offline development), the component shows a friendly fallback state without breaking page rendering.
