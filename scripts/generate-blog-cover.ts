import { chromium } from "@playwright/test";
import sharp from "sharp";
import path from "path";
import fs from "fs";

export interface CoverConfig {
  slug: string;
  category: string;
  title: string;
  subtitle: string;
  tags: string[];
  techIcons: Array<{
    name: string;
    color: string;
    svg: string;
  }>;
  accentColor?: string; // e.g. '#10b981' (emerald) or '#3b82f6' (blue)
  badgeIllustration?: string; // HTML/SVG for custom illustration
}

// Official SVGs
export const SVGS = {
  xTwitter: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
  github: `<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>`,
  typescript: `<svg viewBox="0 0 24 24" width="34" height="34" fill="#3178C6"><path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.53 0-.96.083-1.289.248-.33.166-.495.426-.495.779 0 .227.065.412.195.555.13.144.322.27.575.38.254.108.736.273 1.445.494.942.293 1.64.643 2.093 1.05.453.407.679.97.679 1.69 0 .612-.137 1.144-.412 1.597-.275.453-.68.802-1.214 1.047-.534.245-1.196.368-1.986.368a8.88 8.88 0 0 1-1.745-.173 8.35 8.35 0 0 1-1.573-.52v-2.548c.55.334 1.11.583 1.681.748.57.165 1.107.248 1.61.248.566 0 1.003-.095 1.312-.284.31-.19.464-.47.464-.842 0-.256-.079-.462-.237-.62-.158-.157-.406-.298-.743-.42-.337-.123-.9-.301-1.689-.535-.88-.26-1.545-.595-1.996-1.003-.45-.408-.675-.968-.675-1.68 0-.58.136-1.084.408-1.512.272-.428.665-.758 1.179-.991.514-.232 1.147-.348 1.898-.348zm-7.79 0v2.164H7.954V21.6h-2.73v-9.686H2.477V9.75z"/></svg>`,
  postgresql: `<svg viewBox="0 0 24 24" width="34" height="34" fill="#336791"><path d="M12.029 0C7.172 0 4.195 2.766 4.195 7.15c0 2.217.962 4.12 2.456 5.372a9.14 9.14 0 0 1-.225 1.178c-.68 2.404-2.28 4.298-2.348 4.378a.499.499 0 0 0 .373.834c.05 0 2.42-.143 4.542-1.893.99.28 2.057.432 3.197.432 1.134 0 2.196-.15 3.18-.428 2.122 1.748 4.49 1.89 4.54 1.89a.498.498 0 0 0 .374-.834c-.067-.08-1.666-1.974-2.348-4.378a9.14 9.14 0 0 1-.225-1.178c1.494-1.252 2.456-3.155 2.456-5.372C20.197 2.766 17.22 0 12.03 0zm0 1.25c4.27 0 6.918 2.28 6.918 5.9 0 3.62-2.648 5.9-6.918 5.9-4.27 0-6.918-2.28-6.918-5.9 0-3.62 2.648-5.9 6.918-5.9z"/></svg>`,
  drizzle: `<svg viewBox="0 0 160 160" width="36" height="36" fill="none"><rect width="160" height="160" rx="32" fill="#C5F74F"/><path d="M80 32C80 32 44 76.8 44 98C44 117.882 60.118 134 80 134C99.882 134 116 117.882 116 98C116 76.8 80 32 80 32Z" fill="#151515"/><path d="M72 78L88 94M88 78L72 94" stroke="#C5F74F" stroke-width="6" stroke-linecap="round"/></svg>`,
  nodejs: `<svg viewBox="0 0 24 24" width="34" height="34" fill="#5FA04E"><path d="M12 1.5a1.5 1.5 0 0 0-.75.201l-8.5 4.908a1.5 1.5 0 0 0-.75 1.299v9.816c0 .538.287 1.035.75 1.299l8.5 4.908a1.5 1.5 0 0 0 1.5 0l8.5-4.908a1.5 1.5 0 0 0 .75-1.299V7.908a1.5 1.5 0 0 0-.75-1.299l-8.5-4.908A1.5 1.5 0 0 0 12 1.5z"/></svg>`,
  redis: `<svg viewBox="0 0 24 24" width="34" height="34" fill="#DC382D"><path d="M22.5 15.5l-9.5 5.5a2 2 0 0 1-2 0l-9.5-5.5a2 2 0 0 1-1-1.73V7.23a2 2 0 0 1 1-1.73l9.5-5.5a2 2 0 0 1 2 0l9.5 5.5a2 2 0 0 1 1 1.73v6.54a2 2 0 0 1-1 1.73z"/></svg>`,
  bullmq: `<svg viewBox="0 0 24 24" width="34" height="34" fill="#F43F5E"><path d="M4 4h16v3H4V4zm0 6h16v4H4v-4zm0 7h16v3H4v-3z"/></svg>`,
  shield: `<svg viewBox="0 0 24 24" width="34" height="34" fill="#10B981"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-1 15l-4-4 1.41-1.41L11 13.17l5.59-5.59L18 9l-7 7z"/></svg>`,
};

export function renderCoverHtml(config: CoverConfig): string {
  const accent = config.accentColor || "#10b981";

  const techBadgesHtml = config.techIcons
    .map(
      (icon) => `
      <div class="tech-badge">
        <div class="tech-icon">${icon.svg}</div>
        <span class="tech-name">${icon.name}</span>
      </div>
    `
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${config.title}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;600&display=swap');

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      width: 1200px;
      height: 675px;
      overflow: hidden;
      background: #090d16;
      font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
      color: #f8fafc;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 64px 72px;
    }

    /* Ambient background lighting */
    .bg-glow-1 {
      position: absolute;
      top: -120px;
      right: -80px;
      width: 600px;
      height: 600px;
      background: radial-gradient(circle, ${accent}28 0%, rgba(9, 13, 22, 0) 70%);
      pointer-events: none;
      filter: blur(40px);
    }

    .bg-glow-2 {
      position: absolute;
      bottom: -150px;
      left: 100px;
      width: 500px;
      height: 500px;
      background: radial-gradient(circle, #3b82f618 0%, rgba(9, 13, 22, 0) 70%);
      pointer-events: none;
      filter: blur(50px);
    }

    /* Subtle grid overlay */
    .bg-grid {
      position: absolute;
      inset: 0;
      background-image: 
        linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
      background-size: 40px 40px;
      mask-image: radial-gradient(circle at 60% 40%, black 40%, transparent 80%);
      pointer-events: none;
    }

    /* Header Category Tag */
    .category-tag {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 14px;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 100px;
      font-size: 13px;
      font-weight: 600;
      letter-spacing: 0.8px;
      text-transform: uppercase;
      color: ${accent};
      width: fit-content;
      margin-bottom: 24px;
    }

    .category-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: ${accent};
      box-shadow: 0 0 10px ${accent};
    }

    /* Main Content Area: Split 2-Column */
    .main-layout {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 48px;
      flex: 1;
      z-index: 10;
    }

    .text-column {
      flex: 1.15;
      max-width: 620px;
    }

    .visual-column {
      flex: 0.85;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
    }

    h1.title {
      font-size: 44px;
      font-weight: 800;
      line-height: 1.18;
      letter-spacing: -1px;
      color: #ffffff;
      margin-bottom: 18px;
      text-shadow: 0 4px 16px rgba(0, 0, 0, 0.5);
    }

    p.subtitle {
      font-size: 19px;
      font-weight: 400;
      line-height: 1.45;
      color: #94a3b8;
      margin-bottom: 28px;
    }

    /* Tech Badges Row */
    .tech-badges-row {
      display: flex;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
    }

    .tech-badge {
      display: flex;
      align-items: center;
      gap: 9px;
      padding: 8px 14px;
      background: rgba(18, 24, 38, 0.7);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 10px;
      backdrop-filter: blur(12px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }

    .tech-name {
      font-size: 13.5px;
      font-weight: 600;
      color: #e2e8f0;
      letter-spacing: -0.2px;
    }

    /* Visual 3D Stack / Illustration Card */
    .visual-card {
      width: 380px;
      height: 320px;
      background: linear-gradient(135deg, rgba(30, 41, 59, 0.5) 0%, rgba(15, 23, 42, 0.7) 100%);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 20px;
      box-shadow: 
        0 20px 50px rgba(0, 0, 0, 0.5),
        inset 0 1px 1px rgba(255, 255, 255, 0.15);
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 28px;
    }

    .isometric-container {
      position: relative;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 16px;
    }

    .layer-card {
      width: 85%;
      height: 58px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;
      background: rgba(15, 23, 42, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
      position: relative;
    }

    .layer-card::before {
      content: '';
      position: absolute;
      left: 0;
      top: 10%;
      bottom: 10%;
      width: 3px;
      background: ${accent};
      border-radius: 0 2px 2px 0;
      box-shadow: 0 0 8px ${accent};
    }

    .layer-label {
      font-family: 'JetBrains Mono', monospace;
      font-size: 13.5px;
      font-weight: 600;
      color: #e2e8f0;
    }

    .layer-status {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: ${accent};
      box-shadow: 0 0 10px ${accent};
    }

    /* Footer: Social Handles */
    .footer-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      padding-top: 24px;
      margin-top: 20px;
      z-index: 10;
    }

    .author-info {
      display: flex;
      align-items: center;
      gap: 24px;
    }

    .social-pill {
      display: flex;
      align-items: center;
      gap: 9px;
      font-size: 15px;
      font-weight: 600;
      color: #94a3b8;
      letter-spacing: -0.2px;
    }

    .social-pill svg {
      color: #cbd5e1;
    }

    .social-handle {
      color: #f1f5f9;
    }

    .brand-mark {
      font-family: 'JetBrains Mono', monospace;
      font-size: 13.5px;
      color: #64748b;
      font-weight: 500;
    }
  </style>
</head>
<body>
  <div class="bg-glow-1"></div>
  <div class="bg-glow-2"></div>
  <div class="bg-grid"></div>

  <!-- Top / Main Content -->
  <div>
    <div class="category-tag">
      <div class="category-dot"></div>
      ${config.category}
    </div>

    <div class="main-layout">
      <!-- Left Column: Title & Subtitle -->
      <div class="text-column">
        <h1 class="title">${config.title}</h1>
        <p class="subtitle">${config.subtitle}</p>
        <div class="tech-badges-row">
          ${techBadgesHtml}
        </div>
      </div>

      <!-- Right Column: Visual Tech Card -->
      <div class="visual-column">
        <div class="visual-card">
          ${config.badgeIllustration || `
            <div class="isometric-container">
              ${config.techIcons.map((t, idx) => `
                <div class="layer-card">
                  <div style="display: flex; align-items: center; gap: 12px;">
                    ${t.svg}
                    <span class="layer-label">${t.name}</span>
                  </div>
                  <div class="layer-status"></div>
                </div>
              `).join("")}
            </div>
          `}
        </div>
      </div>
    </div>
  </div>

  <!-- Bottom: Author & Handles -->
  <div class="footer-bar">
    <div class="author-info">
      <div class="social-pill">
        ${SVGS.xTwitter}
        <span>x.com/<strong class="social-handle">edmealem_k</strong></span>
      </div>
      <div class="social-pill">
        ${SVGS.github}
        <span>github.com/<strong class="social-handle">edmealem-k</strong></span>
      </div>
    </div>
    <div class="brand-mark">edmealem.dev</div>
  </div>
</body>
</html>`;
}

export async function generateCoverImage(config: CoverConfig, outDir: string = "public/images/blog") {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1200, height: 675 },
    deviceScaleFactor: 2, // 2x retina crispness = 2400x1350
  });

  const html = renderCoverHtml(config);
  await page.setContent(html, { waitUntil: "networkidle" });

  const tempPng = path.join("/tmp", `${config.slug}-temp.png`);
  await page.screenshot({ path: tempPng, type: "png" });
  await browser.close();

  const finalWebp = path.join(outDir, `${config.slug}.webp`);
  const finalJpg = path.join(outDir, `${config.slug}.jpg`);

  // Convert via Sharp for best compression and web delivery
  await sharp(tempPng).webp({ quality: 92 }).toFile(finalWebp);
  await sharp(tempPng).jpeg({ quality: 92 }).toFile(finalJpg);

  console.log(`Generated cover images:`);
  console.log(` - ${finalWebp}`);
  console.log(` - ${finalJpg}`);

  return { webp: finalWebp, jpg: finalJpg };
}
