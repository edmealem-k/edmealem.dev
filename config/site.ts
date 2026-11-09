export interface SiteConfig {
  name: string;
  siteUrl: string;
  title: string;
  shortTitle: string;
  headline: string;
  shortBio: string;
  description: string;
  location: string;
  email?: string;
  resumeUrl?: string;
  supportUrl?: string;
  githubUsername: string;
  social: {
    github: string;
    linkedin: string;
    x: string;
    leetcode?: string;
    wakatime?: string;
  };
  giscus?: {
    repo?: string;
    repoId?: string;
    category?: string;
    categoryId?: string;
  };
  umami?: {
    siteId?: string;
  };
}

export const siteConfig: SiteConfig = {
  name: "Edmealem Kassahun",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://edmealem.dev",
  title: "Edmealem Kassahun — Software Engineer | Backend-Focused Full-Stack Developer",
  shortTitle: "Software Engineer & Backend Developer",
  headline: "Full-stack & backend developer building reliable web applications.",
  shortBio:
    "I'm a backend-focused software engineer and full-stack TypeScript developer with hands-on experience building production web applications, backend services, REST APIs, and real-time systems using Node.js, NestJS, Next.js, and PostgreSQL.",
  description:
    "Backend-focused software engineer and full-stack TypeScript developer building web applications, APIs, and real-time systems with Node.js, NestJS, Next.js, and PostgreSQL.",
  location: "Bahir Dar, Ethiopia",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "edmealemkassahun@gmail.com",
  resumeUrl: "/resume.pdf",
  supportUrl: process.env.NEXT_PUBLIC_SUPPORT_URL || undefined,
  githubUsername: process.env.NEXT_PUBLIC_GITHUB_USERNAME || "edmealem-k",
  social: {
    github: "https://github.com/edmealem-k",
    linkedin: "https://linkedin.com/in/edmealem-k",
    x: "https://x.com/edmealem_k",
    leetcode: "https://leetcode.com/edmealem_k/",
    wakatime: "https://wakatime.com/@edmealem",
  },
  giscus: {
    repo: process.env.NEXT_PUBLIC_GISCUS_REPO || "edmealem-k/edmealem.dev",
    repoId: process.env.NEXT_PUBLIC_GISCUS_REPOID,
    category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY || "Announcements",
    categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORYID,
  },
  umami: {
    siteId: process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID,
  },
};
