import { z } from "zod";

export const ProjectFrontmatterSchema = z.object({
  title: z.string(),
  slug: z.string(),
  tagline: z.string(),
  summary: z.string().optional(),
  category: z.string().optional(),
  status: z.string().optional(),
  featured: z.boolean().default(false),
  order: z.number().default(99),
  tags: z.array(z.string()).default([]),
  coverImage: z.string().nullable().optional(),
  repositoryUrl: z.string().nullable().optional(),
  liveUrl: z.string().nullable().optional(),
  published: z.boolean().default(true),
});

export type ProjectFrontmatter = z.infer<typeof ProjectFrontmatterSchema>;

export const PostFrontmatterSchema = z.object({
  title: z.string(),
  slug: z.string(),
  description: z.string(),
  date: z.string(),
  updatedAt: z.string().nullable().optional(),
  author: z.string().default("edmealem"),
  tags: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
  coverImage: z.string().nullable().optional(),
  coverImageAlt: z.string().nullable().optional(),
  canonicalLink: z.string().nullable().optional(),
});

export type PostFrontmatter = z.infer<typeof PostFrontmatterSchema>;
