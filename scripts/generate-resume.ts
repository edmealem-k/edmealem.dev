import { chromium } from "@playwright/test";
import path from "path";

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Edmealem Kassahun - Resume</title>
  <style>
    @page {
      size: letter;
      margin: 0.45in 0.55in;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: 'Charter', 'Bitstream Charter', 'Cambria', 'Georgia', 'Times New Roman', serif;
      color: #1a1a1a;
      line-height: 1.32;
      font-size: 9.6pt;
      background: #ffffff;
      -webkit-font-smoothing: antialiased;
    }

    a {
      color: inherit;
      text-decoration: none;
    }

    a:hover {
      text-decoration: underline;
    }

    .header {
      text-align: center;
      margin-bottom: 12px;
    }

    .name {
      font-size: 23pt;
      font-weight: 700;
      letter-spacing: 0.8px;
      color: #1e3a5f;
      margin-bottom: 3px;
      text-transform: uppercase;
    }

    .title {
      font-size: 10.2pt;
      font-weight: 600;
      color: #334155;
      margin-bottom: 4px;
    }

    .contact {
      font-size: 8.8pt;
      color: #475569;
      line-height: 1.35;
    }

    .contact a {
      color: #1e3a5f;
    }

    .contact-sep {
      margin: 0 4px;
      color: #94a3b8;
    }

    .section {
      margin-bottom: 10px;
    }

    .section-title {
      font-size: 10.8pt;
      font-weight: 700;
      letter-spacing: 0.6px;
      color: #1e3a5f;
      text-transform: uppercase;
      margin-bottom: 2px;
    }

    .section-divider {
      border: 0;
      border-top: 1px solid #cbd5e1;
      margin-bottom: 6px;
    }

    .summary-text {
      font-size: 9.4pt;
      line-height: 1.36;
      text-align: justify;
      color: #1e293b;
    }

    .entry {
      margin-bottom: 8px;
    }

    .entry-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 1px;
    }

    .entry-title-left {
      font-weight: 700;
      font-size: 9.8pt;
      color: #0f172a;
    }

    .entry-date-right {
      font-weight: 600;
      font-size: 9.2pt;
      color: #334155;
      text-align: right;
      white-space: nowrap;
    }

    .entry-sub-left {
      font-style: italic;
      font-size: 9.2pt;
      color: #334155;
    }

    .entry-sub-right {
      font-style: italic;
      font-size: 8.8pt;
      color: #64748b;
      text-align: right;
      white-space: nowrap;
    }

    .project-header {
      margin-bottom: 1px;
    }

    .project-name {
      font-weight: 700;
      font-size: 9.8pt;
      color: #0f172a;
    }

    .project-stack {
      font-size: 8.6pt;
      font-style: italic;
      color: #475569;
      margin-bottom: 2px;
    }

    ul.bullets {
      margin-top: 2px;
      margin-left: 17px;
      padding: 0;
    }

    ul.bullets li {
      font-size: 9.2pt;
      line-height: 1.32;
      color: #1e293b;
      margin-bottom: 2px;
    }

    .skills-grid {
      display: flex;
      flex-direction: column;
      gap: 3.5px;
    }

    .skill-row {
      font-size: 9.1pt;
      line-height: 1.32;
      color: #1e293b;
    }

    .skill-label {
      font-weight: 700;
      color: #0f172a;
      display: inline;
    }

    .page-break {
      page-break-before: always;
    }
  </style>
</head>
<body>

  <!-- PAGE 1 -->
  <div class="header">
    <div class="name">Edmealem Kassahun</div>
    <div class="title">Software Engineer | Backend-Focused Full-Stack Developer</div>
    <div class="contact">
      Bahir Dar, Ethiopia
      <span class="contact-sep">|</span>
      +251 908 005 801
      <span class="contact-sep">|</span>
      <a href="mailto:edmealemkassahun@gmail.com">edmealemkassahun@gmail.com</a>
      <br>
      <a href="https://linkedin.com/in/edmealem-k">linkedin.com/in/edmealem-k</a>
      <span class="contact-sep">|</span>
      <a href="https://github.com/edmealem-k">github.com/edmealem-k</a>
      <span class="contact-sep">|</span>
      <a href="https://edmealem-dev.vercel.app/">edmealem.dev</a>
    </div>
  </div>

  <div class="section">
    <div class="section-title">Professional Summary</div>
    <hr class="section-divider">
    <p class="summary-text">
      Backend-focused software engineer and full-stack developer with 3+ years of experience designing and scaling web applications, backend microservices, REST APIs, and real-time systems. Strong expertise in TypeScript and Go (Golang), with production experience across Node.js, Hono, Nest.js, Express.js, Next.js, and Gin. Proficient in database architecture and schema modeling with PostgreSQL, MySQL, Drizzle ORM, GORM, and Prisma, alongside event-driven pipelines utilizing Redis and BullMQ. Proven track record taking features from architectural requirements through deployment, testing, and production support across SaaS, edtech, multi-tenant e-commerce, and execution-governance platforms.
    </p>
  </div>

  <div class="section">
    <div class="section-title">Education</div>
    <hr class="section-divider">
    <div class="entry">
      <div class="entry-header">
        <span class="entry-title-left">Bahir Dar University</span>
        <span class="entry-date-right">Jun 2021 – Jun 2025</span>
      </div>
      <div class="entry-header">
        <span class="entry-sub-left">Bachelor of Science in Software Engineering</span>
        <span class="entry-sub-right">Bahir Dar, Ethiopia</span>
      </div>
      <ul class="bullets">
        <li><strong>GPA:</strong> 3.86 / 4.00</li>
      </ul>
    </div>
  </div>

  <div class="section">
    <div class="section-title">Professional Experience</div>
    <hr class="section-divider">

    <div class="entry">
      <div class="entry-header">
        <span class="entry-title-left">Nexudy</span>
        <span class="entry-date-right">Nov 2025 – Present</span>
      </div>
      <div class="entry-header">
        <span class="entry-sub-left">Software Engineer</span>
        <span class="entry-sub-right">Seattle, WA, United States (Remote)</span>
      </div>
      <ul class="bullets">
        <li>Build and maintain full-stack product features for an execution-governance platform used to align leadership, oversight, and delivery teams around verified execution.</li>
        <li>Develop backend services and responsive frontend workflows using TypeScript, Next.js, Node.js, Nest.js, and PostgreSQL, focusing on reliable REST APIs and clean relational data models.</li>
        <li>Collaborate across product and engineering to convert execution-risk and evidence-tracking requirements into production-ready software, backed by automated testing and CI/CD pipelines.</li>
      </ul>
    </div>

    <div class="entry">
      <div class="entry-header">
        <span class="entry-title-left">Askuala Link PLC</span>
        <span class="entry-date-right">Mar 2025 – Oct 2025</span>
      </div>
      <div class="entry-header">
        <span class="entry-sub-left">Backend Developer</span>
        <span class="entry-sub-right">Bahir Dar, Ethiopia (Hybrid / Remote)</span>
      </div>
      <ul class="bullets">
        <li>Contributed to an AI-powered school management and communication platform serving students, parents, teachers, and school administrators.</li>
        <li>Implemented secure authentication and authorization flows, message broadcasting, student grading and ranking engines, annual report/roster generation, and inventory management.</li>
        <li>Built and maintained performant REST APIs and real-time messaging features using Node.js, Express.js, MySQL, Sequelize, and Socket.io, improving system reliability across core modules.</li>
      </ul>
    </div>

    <div class="entry">
      <div class="entry-header">
        <span class="entry-title-left">Nexus Tech Solutions</span>
        <span class="entry-date-right">Nov 2024 – Feb 2025</span>
      </div>
      <div class="entry-header">
        <span class="entry-sub-left">Full-Stack Developer Intern</span>
        <span class="entry-sub-right">Addis Ababa, Ethiopia (Remote)</span>
      </div>
      <ul class="bullets">
        <li>Developed an administrative student-management dashboard for a beauty school, enabling course enrollment tracking, student payment management, and daily transaction review.</li>
        <li>Implemented automated payment tracking, overdue payment schedules using node-cron, SMS confirmations, and notifications via Afro Message API integration.</li>
        <li>Transitioned rapidly from frontend interface work into backend development, delivering reliable full-stack features with minimal supervision.</li>
      </ul>
    </div>
  </div>

  <!-- PAGE 2 -->
  <div class="page-break"></div>

  <div class="section" style="padding-top: 6px;">
    <div class="section-title">Selected Projects</div>
    <hr class="section-divider">

    <div class="entry">
      <div class="project-header">
        <span class="project-name">hono-commerce — Multi-Tenant E-Commerce SaaS Platform</span>
      </div>
      <div class="project-stack">Stack: Next.js, React.js, Hono, Bun, TypeScript, Drizzle ORM, PostgreSQL, Redis, BullMQ, Socket.io, AWS S3</div>
      <ul class="bullets">
        <li>Architected an enterprise-grade multi-tenant e-commerce platform using Turborepo, Bun, Next.js (App Router), React.js, and Hono.</li>
        <li>Implemented 100% end-to-end type safety between the Hono backend and Next.js frontend utilizing Hono RPC and shared Zod validation schemas.</li>
        <li>Built an asynchronous event-driven pipeline with Redis and BullMQ featuring exponential backoff retries, dead-letter queues, and Bull-Board observability for order processing and notifications.</li>
        <li>Engineered dynamic wildcard subdomain routing (<code>[tenant].domain.com</code>), multi-tenant dynamic RBAC via Better-Auth, and tenant-isolated AWS S3 presigned upload workflows.</li>
      </ul>
    </div>

    <div class="entry">
      <div class="project-header">
        <span class="project-name">DevVault — Developer Knowledge & Second-Brain Platform</span>
      </div>
      <div class="project-stack">Stack: TypeScript, Next.js, React.js, Hono, Bun, Drizzle ORM, PostgreSQL, Better-Auth, Redis, BullMQ, Turborepo</div>
      <ul class="bullets">
        <li>Built a modular full-stack productivity platform connecting technical notes, code snippets, linked references, and grounded AI knowledge retrieval.</li>
        <li>Structured a high-performance monorepo separating web frontend, Hono REST/RPC server, and background workers using Turborepo and Bun.</li>
        <li>Designed relational schemas using PostgreSQL and Drizzle ORM, integrating Better-Auth and a BullMQ background worker for asynchronous indexing.</li>
      </ul>
    </div>

    <div class="entry">
      <div class="project-header">
        <span class="project-name">Go RESTful Backend & Auth Service</span>
      </div>
      <div class="project-stack">Stack: Go (Golang), Gin, GORM, PostgreSQL, Docker, RS256 JWT, Viper, NATS</div>
      <ul class="bullets">
        <li>Built a high-concurrency Go REST API featuring asymmetric RS256 JWT authentication (2048-bit RSA keys) and secure HttpOnly cookie delivery to prevent XSS attacks.</li>
        <li>Implemented modular service layers with Gin and GORM over PostgreSQL, utilizing native UUID primary keys, connection pooling, and Docker Compose orchestration.</li>
        <li>Structured decoupled messaging patterns and explored publish-subscribe workflows with NATS and Go concurrency primitives (goroutines, channels, sync).</li>
      </ul>
    </div>

    <div class="entry">
      <div class="project-header">
        <span class="project-name">Execution Governance Platform — Nexudy</span>
      </div>
      <div class="project-stack">Stack: Next.js, React.js, TypeScript, Node.js, Nest.js, PostgreSQL</div>
      <ul class="bullets">
        <li>Developed full-stack workflows for an execution-governance platform helping institutions verify operational progress with evidence, detect risk early, and maintain a single source of truth.</li>
      </ul>
    </div>
  </div>

  <div class="section" style="margin-top: 10px;">
    <div class="section-title">Technical Skills</div>
    <hr class="section-divider">
    <div class="skills-grid">
      <div class="skill-row">
        <div class="skill-label">Languages:</div> TypeScript, JavaScript, Go (Golang), SQL, HTML5, CSS3
      </div>
      <div class="skill-row">
        <div class="skill-label">Backend & APIs:</div> Node.js, Hono, Nest.js, Express.js, Bun, Next.js API Routes, Gin (Go), REST APIs, Hono RPC, WebSockets, Socket.io, RBAC, Authentication & Authorization (RS256 JWT, OAuth2)
      </div>
      <div class="skill-row">
        <div class="skill-label">Databases & Caching:</div> PostgreSQL, MySQL, MongoDB, Drizzle ORM, GORM, Prisma, TypeORM, Sequelize, Redis, Schema Design, Relational Data Modeling
      </div>
      <div class="skill-row">
        <div class="skill-label">Architecture & Queues:</div> BullMQ, NATS, Redis Pub/Sub, Event-Driven Architecture, Background Workers, Message Queues, Monorepos (Turborepo), Microservices
      </div>
      <div class="skill-row">
        <div class="skill-label">Frontend:</div> React.js, Next.js (App Router), Tailwind CSS, TanStack Query, Redux Toolkit, React Hook Form, Responsive Web Design
      </div>
      <div class="skill-row">
        <div class="skill-label">Cloud, DevOps & Tooling:</div> AWS (EC2, S3 Presigned URLs, RDS, SES, Route 53), Docker, Docker Compose, Linux, Git, GitHub Actions, CI/CD, Postman, Swagger/OpenAPI, Vercel, Render
      </div>
    </div>
  </div>

</body>
</html>`;

async function generatePdf() {
  const outputPath = path.resolve(process.cwd(), "public/resume.pdf");
  console.log("Generating PDF at:", outputPath);

  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.setContent(htmlContent, { waitUntil: "networkidle" });

  await page.pdf({
    path: outputPath,
    format: "Letter",
    printBackground: true,
    preferCSSPageSize: true,
    margin: {
      top: "0.45in",
      bottom: "0.45in",
      left: "0.55in",
      right: "0.55in",
    },
  });

  await browser.close();
  console.log("PDF generated successfully!");
}

generatePdf().catch((err) => {
  console.error(err);
  process.exit(1);
});
