import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { siteConfig } from "@/config/site";
import type { ProjectType, PostType } from "@/types";
import {
  ProjectFrontmatterSchema,
  PostFrontmatterSchema,
} from "./schema";

const PROJECTS_PATH = path.join(process.cwd(), "content/projects");
const BLOG_PATH = path.join(process.cwd(), "content/blog");

const FALLBACK_PROJECT_IMAGE =
  "/images/projects/hono-commerce-cover-placeholder.webp";
const FALLBACK_BLOG_IMAGE =
  "/images/blog/tenant-isolation-placeholder.webp";

export function getAllProjects(includeDrafts = false): ProjectType[] {
  if (!fs.existsSync(PROJECTS_PATH)) return [];

  const files = fs.readdirSync(PROJECTS_PATH).filter((file) => file.endsWith(".mdx"));

  const projects: ProjectType[] = [];

  for (const file of files) {
    const filePath = path.join(PROJECTS_PATH, file);
    const source = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(source);

    const parsed = ProjectFrontmatterSchema.safeParse(data);
    if (!parsed.success) {
      console.error(`Invalid project frontmatter in ${file}:`, parsed.error);
      continue;
    }

    const fm = parsed.data;
    if (!includeDrafts && !fm.published) {
      continue;
    }

    projects.push({
      _id: fm.slug,
      name: fm.title,
      slug: fm.slug,
      tagline: fm.tagline,
      summary: fm.summary,
      category: fm.category,
      status: fm.status,
      featured: fm.featured,
      order: fm.order,
      tags: fm.tags,
      projectUrl: fm.liveUrl || "",
      repository: fm.repositoryUrl || "",
      logo: "/project.png",
      coverImage: {
        image: fm.coverImage || FALLBACK_PROJECT_IMAGE,
        alt: fm.title,
        lqip: "",
      },
      content,
      published: fm.published,
    });
  }

  return projects.sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
}

export function getProjectBySlug(slug: string, includeDrafts = false): ProjectType | null {
  const safeSlug = path.basename(slug);
  const filePath = path.join(PROJECTS_PATH, `${safeSlug}.mdx`);

  if (!fs.existsSync(filePath)) return null;

  const source = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(source);

  const parsed = ProjectFrontmatterSchema.safeParse(data);
  if (!parsed.success) return null;

  const fm = parsed.data;
  if (!includeDrafts && !fm.published) return null;

  return {
    _id: fm.slug,
    name: fm.title,
    slug: fm.slug,
    tagline: fm.tagline,
    summary: fm.summary,
    category: fm.category,
    status: fm.status,
    featured: fm.featured,
    order: fm.order,
    tags: fm.tags,
    projectUrl: fm.liveUrl || "",
    repository: fm.repositoryUrl || "",
    logo: "/project.png",
    coverImage: {
      image: fm.coverImage || FALLBACK_PROJECT_IMAGE,
      alt: fm.title,
      lqip: "",
    },
    content,
    published: fm.published,
  };
}

export function getAllPosts(includeDrafts = false): PostType[] {
  if (!fs.existsSync(BLOG_PATH)) return [];

  const files = fs.readdirSync(BLOG_PATH).filter((file) => file.endsWith(".mdx"));

  const posts: PostType[] = [];

  for (const file of files) {
    const filePath = path.join(BLOG_PATH, file);
    const source = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(source);

    const parsed = PostFrontmatterSchema.safeParse(data);
    if (!parsed.success) {
      console.error(`Invalid blog frontmatter in ${file}:`, parsed.error);
      continue;
    }

    const fm = parsed.data;
    if (!includeDrafts && !fm.published) {
      continue;
    }

    const stats = readingTime(content);

    posts.push({
      _id: fm.slug,
      _createdAt: fm.date,
      _updatedAt: fm.updatedAt || undefined,
      title: fm.title,
      slug: fm.slug,
      description: fm.description,
      canonicalLink: fm.canonicalLink || `${siteConfig.siteUrl}/blog/${fm.slug}`,
      date: fm.date,
      coverImage: {
        image: fm.coverImage || FALLBACK_BLOG_IMAGE,
        alt: fm.coverImageAlt || fm.title,
        lqip: "",
      },
      tags: fm.tags,
      author: {
        name: siteConfig.name,
        photo: {
          image: "/images/about/profile-placeholder.webp",
          alt: siteConfig.name,
        },
        twitterUrl: siteConfig.social.x,
      },
      content,
      featured: fm.featured,
      isPublished: fm.published,
      published: fm.published,
      readingTime: stats.text,
    });
  }

  return posts.sort((a, b) => new Date(b.date || "").getTime() - new Date(a.date || "").getTime());
}

export function getPostBySlug(slug: string, includeDrafts = false): PostType | null {
  const safeSlug = path.basename(slug);
  const filePath = path.join(BLOG_PATH, `${safeSlug}.mdx`);

  if (!fs.existsSync(filePath)) return null;

  const source = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(source);

  const parsed = PostFrontmatterSchema.safeParse(data);
  if (!parsed.success) return null;

  const fm = parsed.data;
  if (!includeDrafts && !fm.published) return null;

  const stats = readingTime(content);

  return {
    _id: fm.slug,
    _createdAt: fm.date,
    _updatedAt: fm.updatedAt || undefined,
    title: fm.title,
    slug: fm.slug,
    description: fm.description,
    canonicalLink: fm.canonicalLink || `${siteConfig.siteUrl}/blog/${fm.slug}`,
    date: fm.date,
    coverImage: {
      image: fm.coverImage || FALLBACK_BLOG_IMAGE,
      alt: fm.coverImageAlt || fm.title,
      lqip: "",
    },
    tags: fm.tags,
    author: {
      name: siteConfig.name,
      photo: {
        image: "/images/about/profile-placeholder.webp",
        alt: siteConfig.name,
      },
      twitterUrl: siteConfig.social.x,
    },
    content,
    featured: fm.featured,
    isPublished: fm.published,
    published: fm.published,
    readingTime: stats.text,
  };
}
