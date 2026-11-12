import { test, expect } from "@playwright/test";

test.describe("Site Smoke & Route Tests", () => {
  test("homepage loads and displays correct owner identity", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Edmealem Kassahun/);
    await expect(page.locator("h1")).toContainText(
      "Full-stack & backend developer building reliable web applications"
    );

    // Main body content should have no leaked previous author branding
    const mainLocator = page.locator("main");
    await expect(mainLocator).not.toContainText("Victor Eke");
    await expect(mainLocator).not.toContainText("victoreke.com");

    // Footer content displays owner copyright
    const footerLocator = page.locator("footer");
    await expect(footerLocator).toContainText("Edmealem Kassahun");
    await expect(footerLocator).toContainText("All rights reserved");

    // Work Experience renders all three companies with verified dates
    const bodyLocator = page.locator("body");
    await expect(bodyLocator).toContainText("Work Experience");
    await expect(bodyLocator).toContainText("Nexudy");
    await expect(bodyLocator).toContainText("Askuala Link");
    await expect(bodyLocator).toContainText("Nexus Tech Solutions");
    await expect(bodyLocator).toContainText("Nov 2025");
    await expect(bodyLocator).toContainText("Present");
    await expect(bodyLocator).toContainText("Mar 2025 - Oct 2025");
    await expect(bodyLocator).toContainText("Nov 2024 - Feb 2025");
    await expect(bodyLocator).not.toContainText("TODO_VERIFY");
    await expect(bodyLocator).not.toContainText("Jan 1, 2024");
    await expect(bodyLocator).not.toContainText("Dates to confirm");

    // Education section renders below Work Experience
    await expect(bodyLocator).toContainText("Education");
    await expect(bodyLocator).toContainText("Bahir Dar University");
    await expect(bodyLocator).toContainText("Bachelor of Science in Software Engineering");
    await expect(bodyLocator).toContainText("Jun 2021 - Jun 2025");
    await expect(bodyLocator).toContainText("GPA: 3.86/4.00");
  });

  test("about page renders biography, contact, and usage", async ({ page }) => {
    await page.goto("/about");
    await expect(page).toHaveTitle(/About | Edmealem Kassahun/);
    await expect(page.locator("h1")).toContainText("Edmealem Kassahun");
    await expect(page.locator("body")).toContainText("Software Engineering");
    await expect(page.locator("body")).toContainText("edmealemkassahun@gmail.com");
    await expect(page.locator("body")).toContainText("View Résumé");
    await expect(page.locator("body")).toContainText("Usage");
  });

  test("projects listing displays published projects", async ({ page }) => {
    await page.goto("/projects");
    await expect(page).toHaveTitle(/Projects | Edmealem Kassahun/);
    await expect(page.locator("body")).toContainText("hono-commerce");
    await expect(page.locator("body")).toContainText("DevVault");
  });

  test("project detail page renders MDX case study", async ({ page }) => {
    await page.goto("/projects/hono-commerce");
    await expect(page.locator("h1").first()).toContainText("hono-commerce");
    await expect(page.locator("body")).toContainText("A multi-tenant e-commerce platform");
    await expect(page.locator("body")).toContainText("Technology stack");
  });

  test("invalid project slug returns 404", async ({ page }) => {
    const response = await page.goto("/projects/invalid-project-slug");
    expect(response?.status()).toBe(404);
  });

  test("blog index displays published posts", async ({ page }) => {
    await page.goto("/blog");
    await expect(page).toHaveTitle(/Blog | Edmealem Kassahun/);
    await expect(page.locator("body")).toContainText("Tenant Isolation");
    await expect(page.locator("body")).toContainText("Reliable Background Jobs");
  });

  test("blog detail page renders article and reading time", async ({ page }) => {
    await page.goto("/blog/tenant-isolation-in-saas");
    await expect(page.locator("h1").first()).toContainText(
      "Multi-Tenant SaaS Architecture: A Practical Guide to Tenant Isolation"
    );
    await expect(page.locator("body")).toContainText("min read");
    await expect(page.locator("body")).toContainText("What does “tenant” mean?");
  });

  test("invalid blog slug returns 404", async ({ page }) => {
    const response = await page.goto("/blog/invalid-blog-slug");
    expect(response?.status()).toBe(404);
  });

  test("photos page renders", async ({ page }) => {
    await page.goto("/photos");
    await expect(page).toHaveTitle(/Photos | Edmealem Kassahun/);
    await expect(page.locator("h1")).toContainText("Photos");
    await expect(page.locator("img[alt*='Graduation']")).toBeVisible();
  });
});
