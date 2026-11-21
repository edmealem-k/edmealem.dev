import { generateCoverImage, SVGS, CoverConfig } from "./generate-blog-cover";
import path from "path";
import fs from "fs";

// Custom Go & Systems SVGs
const goSvg = `<svg viewBox="0 0 24 24" width="34" height="34" fill="#00ADD8"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm4 0h-2V7h2v10z"/></svg>`;
const dockerSvg = `<svg viewBox="0 0 24 24" width="34" height="34" fill="#2496ED"><path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.186.185.186m0 2.715h2.118a.186.186 0 00.186-.185V6.29a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.186v1.887c0 .103.082.185.185.185m-2.954 0h2.119a.186.186 0 00.186-.185V6.29a.186.186 0 00-.186-.186H8.075a.185.185 0 00-.185.186v1.887c0 .103.083.185.185.185m0 2.715h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186H8.075a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954 0h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186H5.12a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185M23.959 11.7c-.224-.555-.774-.914-1.397-.914h-.735a5.556 5.556 0 00-4.043 1.761 6.84 6.84 0 00-4.225-1.469H2.822a.82.82 0 00-.822.822v5.337c0 3.49 2.84 6.33 6.33 6.33h7.68c4.07 0 7.42-3.1 7.82-7.14a4.12 4.12 0 00.129-.727z"/></svg>`;

const projectCovers: CoverConfig[] = [
  {
    slug: "hono-commerce",
    category: "Multi-Tenant SaaS & Commerce",
    title: "hono-commerce",
    subtitle: "Enterprise multi-tenant e-commerce platform with Next.js 16, Hono RPC, Drizzle ORM, and BullMQ queues.",
    tags: ["Next.js 16", "Hono RPC", "Drizzle ORM", "BullMQ"],
    accentColor: "#10b981",
    techIcons: [
      { name: "Drizzle ORM", color: "#C5F74F", svg: SVGS.drizzle },
      { name: "PostgreSQL", color: "#336791", svg: SVGS.postgresql },
      { name: "Redis", color: "#DC382D", svg: SVGS.redis },
      { name: "TypeScript", color: "#3178C6", svg: SVGS.typescript },
    ],
  },
  {
    slug: "devvault",
    category: "Developer Tools & Knowledge",
    title: "DevVault",
    subtitle: "Developer workspace uniting technical documentation, architectural decisions, and code snippets.",
    tags: ["TypeScript", "Next.js", "Hono", "PostgreSQL"],
    accentColor: "#8b5cf6",
    techIcons: [
      { name: "TypeScript", color: "#3178C6", svg: SVGS.typescript },
      { name: "PostgreSQL", color: "#336791", svg: SVGS.postgresql },
      { name: "Drizzle ORM", color: "#C5F74F", svg: SVGS.drizzle },
    ],
  },
  {
    slug: "build-redis-go",
    category: "Systems & Networking",
    title: "build-redis-go",
    subtitle: "In-memory Redis key-value server built from scratch in Go with TCP networking and RESP protocol.",
    tags: ["Go", "TCP", "RESP Protocol", "Concurrency"],
    accentColor: "#00ADD8",
    techIcons: [
      { name: "Redis", color: "#DC382D", svg: SVGS.redis },
      { name: "Golang", color: "#00ADD8", svg: goSvg },
      { name: "TCP Sockets", color: "#10b981", svg: SVGS.shield },
    ],
  },
  {
    slug: "drizzle-express-api",
    category: "Backend & Database Engineering",
    title: "drizzle-express-api",
    subtitle: "Production-grade REST API with Drizzle ORM, typed relational schemas, and zero-downtime migrations.",
    tags: ["Drizzle ORM", "PostgreSQL", "Node.js", "Docker"],
    accentColor: "#C5F74F",
    techIcons: [
      { name: "Drizzle ORM", color: "#C5F74F", svg: SVGS.drizzle },
      { name: "PostgreSQL", color: "#336791", svg: SVGS.postgresql },
      { name: "Node.js", color: "#5FA04E", svg: SVGS.nodejs },
      { name: "Docker", color: "#2496ED", svg: dockerSvg },
    ],
  },
];

async function main() {
  const outDir = path.join(process.cwd(), "public/images/projects");
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  for (const config of projectCovers) {
    console.log(`Generating cover for project: ${config.title}...`);
    await generateCoverImage(config, outDir);
  }
  console.log("All project covers generated successfully!");
}

main().catch(console.error);
