import { describe, it, expect } from "vitest";
import {
  getAllProjects,
  getProjectBySlug,
  getAllPosts,
  getPostBySlug,
} from "@/lib/content";
import { siteConfig } from "@/config/site";
import { formatDate, formatJobDate } from "@/app/utils/date";
import { experiences } from "@/app/data/experience";
import { educations } from "@/app/data/education";

describe("Site Configuration", () => {
  it("has correct owner identity and canonical URL", () => {
    expect(siteConfig.name).toBe("Edmealem Kassahun");
    expect(siteConfig.siteUrl).toBe("https://edmealem.dev");
    expect(siteConfig.githubUsername).toBe("edmealem-k");
    expect(siteConfig.email).toBe("edmealemkassahun@gmail.com");
    expect(siteConfig.resumeUrl).toBe("/resume.pdf");
    expect(siteConfig.social.github).toContain("github.com/edmealem-k");
    expect(siteConfig.social.linkedin).toContain("linkedin.com/in/edmealem-k");
    expect(siteConfig.social.upwork).toContain("upwork.com/freelancers/~01d523ce2f1c1dc881");
  });
});

describe("Projects Content System", () => {
  it("loads all published projects", () => {
    const projects = getAllProjects();
    expect(projects.length).toBeGreaterThanOrEqual(2);

    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length); // Slug uniqueness
    expect(slugs).toContain("hono-commerce");
    expect(slugs).toContain("devvault");
  });

  it("sorts projects by order", () => {
    const projects = getAllProjects();
    expect(projects[0].slug).toBe("hono-commerce");
    expect(projects[1].slug).toBe("devvault");
  });

  it("retrieves project by slug", () => {
    const project = getProjectBySlug("hono-commerce");
    expect(project).not.toBeNull();
    expect(project?.name).toBe("hono-commerce");
    expect(project?.category).toBe("Full-stack / SaaS");
    expect(project?.content).toContain("hono-commerce is a personal engineering project");
  });

  it("returns null for unknown project slug", () => {
    const project = getProjectBySlug("non-existent-project");
    expect(project).toBeNull();
  });
});

describe("Blog Content System", () => {
  it("loads all published posts", () => {
    const posts = getAllPosts();
    expect(posts.length).toBeGreaterThanOrEqual(2);

    const slugs = posts.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length); // Slug uniqueness
    expect(slugs).toContain("tenant-isolation-in-saas");
    expect(slugs).toContain("reliable-background-jobs-nodejs");
  });

  it("calculates reading time from prose", () => {
    const post = getPostBySlug("tenant-isolation-in-saas");
    expect(post).not.toBeNull();
    expect(post?.readingTime).toBeDefined();
    expect(post?.readingTime).toMatch(/\d+ min read/);
  });

  it("retrieves post by slug", () => {
    const post = getPostBySlug("reliable-background-jobs-nodejs");
    expect(post).not.toBeNull();
    expect(post?.title).toBe(
      "Reliable Background Jobs in Node.js: Retries and Idempotency"
    );
    expect(post?.tags).toContain("BullMQ");
  });

  it("returns null for unknown post slug", () => {
    const post = getPostBySlug("non-existent-post");
    expect(post).toBeNull();
  });
});

describe("Date Formatting Utility", () => {
  it("formats ISO date strings correctly", () => {
    const formatted = formatDate("2026-11-09");
    expect(formatted).toContain("2026");
    expect(formatted).toContain("Nov");
  });

  it("formats job date strings to Month YYYY without assertions on days", () => {
    expect(formatJobDate("2024-01-01")).toBe("Jan 2024");
    expect(formatJobDate("2024-06")).toBe("Jun 2024");
  });
});

describe("Work Experience Data", () => {
  it("contains all three verified companies in reverse chronological order", () => {
    expect(experiences.length).toBe(3);
    expect(experiences[0].company).toBe("Nexudy");
    expect(experiences[1].company).toBe("Askuala Link");
    expect(experiences[2].company).toBe("Nexus Tech Solutions");
  });

  it("points to safe external company URLs and valid local logo paths", () => {
    for (const exp of experiences) {
      expect(exp.companyUrl).toMatch(/^https:\/\//);
      expect(exp.logo).toMatch(/^\/images\/about\/.+\.png$/);
    }
  });

  it("has confirmed verified dates matching professional resume", () => {
    for (const exp of experiences) {
      expect(exp.verifiedDates).toBe(true);
      expect(exp.startDate).not.toBeNull();
    }
    expect(experiences[0].startDate).toBe("2025-11");
    expect(experiences[0].endDate).toBeNull();
    expect(experiences[0].current).toBe(true);

    expect(experiences[1].startDate).toBe("2025-03");
    expect(experiences[1].endDate).toBe("2025-10");

    expect(experiences[2].startDate).toBe("2024-11");
    expect(experiences[2].endDate).toBe("2025-02");
  });
});

describe("Education Data", () => {
  it("contains verified degree from Bahir Dar University", () => {
    expect(educations.length).toBeGreaterThanOrEqual(1);
    const bdu = educations.find((e) => e.institution === "Bahir Dar University");
    expect(bdu).toBeDefined();
    expect(bdu?.degree).toBe("Bachelor of Science");
    expect(bdu?.field).toBe("Software Engineering");
    expect(bdu?.grade).toBe("3.86/4.00");
    expect(bdu?.startDate).toBe("Jun 2021");
    expect(bdu?.endDate).toBe("Jun 2025");
    expect(bdu?.logo).toBeDefined();
  });
});
