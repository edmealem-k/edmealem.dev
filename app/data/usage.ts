export interface UsageItem {
  name: string;
  url?: string;
  description?: string;
}

export interface UsageCategory {
  title: string;
  items: UsageItem[];
}

export const usageData: UsageCategory[] = [
  {
    title: "Technologies",
    items: [
      { name: "TypeScript", url: "https://www.typescriptlang.org" },
      { name: "JavaScript", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
      { name: "Node.js", url: "https://nodejs.org" },
      { name: "NestJS", url: "https://nestjs.com" },
      { name: "Express.js", url: "https://expressjs.com" },
      { name: "Next.js", url: "https://nextjs.org" },
      { name: "React", url: "https://react.dev" },
      { name: "Hono", url: "https://hono.dev" },
      { name: "PostgreSQL", url: "https://www.postgresql.org" },
      { name: "MySQL", url: "https://www.mysql.com" },
      { name: "MongoDB", url: "https://www.mongodb.com" },
      { name: "Redis", url: "https://redis.io" },
      { name: "Prisma", url: "https://www.prisma.io" },
      { name: "Drizzle ORM", url: "https://orm.drizzle.team" },
      { name: "Socket.io", url: "https://socket.io" },
      { name: "Tailwind CSS", url: "https://tailwindcss.com" },
    ],
  },
  {
    title: "Tools",
    items: [
      { name: "Git", url: "https://git-scm.com" },
      { name: "GitHub", url: "https://github.com" },
      { name: "VS Code", url: "https://code.visualstudio.com" },
      { name: "Docker", url: "https://www.docker.com" },
      { name: "Postman", url: "https://www.postman.com" },
      { name: "Linux", url: "https://www.kernel.org" },
    ],
  },
  {
    title: "Platforms",
    items: [
      { name: "AWS", url: "https://aws.amazon.com" },
      { name: "Vercel", url: "https://vercel.com" },
      { name: "GitHub Actions", url: "https://github.com/features/actions" },
    ],
  },
];
