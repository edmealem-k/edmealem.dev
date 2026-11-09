import { MetadataRoute } from "next";
import { getAllPosts, getAllProjects } from "@/lib/content";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const projects = getAllProjects();

  const routes = ["", "/about", "/projects", "/blog", "/photos"].map((route) => ({
    url: `${siteConfig.siteUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  const postRoutes = posts.map((post) => ({
    url: `${siteConfig.siteUrl}/blog/${post.slug}`,
    lastModified: post.date || new Date().toISOString().split("T")[0],
  }));

  const projectRoutes = projects.map((project) => ({
    url: `${siteConfig.siteUrl}/projects/${project.slug}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...postRoutes, ...projectRoutes];
}
