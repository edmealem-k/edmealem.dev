import { generateCoverImage, SVGS, CoverConfig } from "./generate-blog-cover";

const covers: CoverConfig[] = [
  {
    slug: "drizzle-orm-postgres",
    category: "PostgreSQL & Database Engineering",
    title: "Drizzle ORM with PostgreSQL",
    subtitle: "A practical guide to schemas, relations, typed queries, and migrations in modern TypeScript.",
    tags: ["Drizzle ORM", "PostgreSQL", "TypeScript"],
    accentColor: "#10b981", // Emerald
    techIcons: [
      { name: "Drizzle ORM", color: "#C5F74F", svg: SVGS.drizzle },
      { name: "PostgreSQL", color: "#336791", svg: SVGS.postgresql },
      { name: "TypeScript", color: "#3178C6", svg: SVGS.typescript },
    ],
  },
  {
    slug: "background-jobs-placeholder",
    category: "Node.js & Distributed Systems",
    title: "Reliable Background Jobs",
    subtitle: "Retries, dead-letter queues, durable state, and idempotent processing in Node.js.",
    tags: ["Node.js", "BullMQ", "Redis", "Queues"],
    accentColor: "#f43f5e", // Rose/Red for Redis & BullMQ
    techIcons: [
      { name: "Node.js", color: "#5FA04E", svg: SVGS.nodejs },
      { name: "BullMQ", color: "#F43F5E", svg: SVGS.bullmq },
      { name: "Redis", color: "#DC382D", svg: SVGS.redis },
    ],
  },
  {
    slug: "tenant-isolation-placeholder",
    category: "SaaS Architecture & Security",
    title: "Tenant Isolation in SaaS",
    subtitle: "Cryptographic boundaries, context propagation, and multi-tenant security in TypeScript backends.",
    tags: ["SaaS", "TypeScript", "Security", "Architecture"],
    accentColor: "#3b82f6", // Blue / Shield
    techIcons: [
      { name: "Tenant Security", color: "#10B981", svg: SVGS.shield },
      { name: "TypeScript", color: "#3178C6", svg: SVGS.typescript },
      { name: "PostgreSQL", color: "#336791", svg: SVGS.postgresql },
    ],
  },
];

async function main() {
  for (const config of covers) {
    console.log(`Generating cover for: ${config.title}...`);
    await generateCoverImage(config);
  }
  console.log("All blog covers generated successfully!");
}

main().catch(console.error);
