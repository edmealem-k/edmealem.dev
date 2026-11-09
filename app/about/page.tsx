import Image from "next/image";
import { Metadata } from "next";
import { BiEnvelope, BiLinkExternal, BiSolidDownload } from "react-icons/bi";
import Heroes from "../components/pages/Heroes";
import Usage from "../components/pages/Usage";
import { Slide } from "../animation/Slide";
import RefLink from "../components/shared/RefLink";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `About | ${siteConfig.name}`,
  metadataBase: new URL(`${siteConfig.siteUrl}/about`),
  description:
    "Learn about Edmealem Kassahun, a full-stack and backend developer focused on TypeScript, Node.js, Next.js, APIs, and software engineering.",
  openGraph: {
    title: `About | ${siteConfig.name}`,
    url: `${siteConfig.siteUrl}/about`,
    description:
      "Learn about Edmealem Kassahun, a full-stack and backend developer focused on TypeScript, Node.js, Next.js, APIs, and software engineering.",
    images: "/edmealem_kassahun.jpg",
  },
};

export default function About() {
  const profileImage = "/edmealem_kassahun.jpg";

  return (
    <main className="relative lg:max-w-7xl mx-auto max-w-3xl md:px-16 px-6">
      <div>
        <section className="relative grid lg:grid-cols-custom grid-cols-1 gap-x-6 justify-items-center">
          <div className="order-2 lg:order-none">
            <Slide>
              <h1 className="font-incognito font-semibold tracking-tight sm:text-5xl text-3xl lg:leading-tight basis-1/2 mb-8">
                I&apos;m {siteConfig.name}. I build web applications and enjoy the engineering behind them.
              </h1>

              <div className="dark:text-zinc-400 text-zinc-600 leading-relaxed space-y-4">
                <p>
                  I&apos;m a full-stack developer with a strong interest in backend engineering. I work primarily with TypeScript, React, Next.js, Node.js, and PostgreSQL, building application features that connect thoughtful user experiences with reliable APIs and data models.
                </p>
                <p>
                  I earned a B.Sc. in Software Engineering from Bahir Dar University (2021–2025) with a 3.86/4.00 GPA. Since then, I&apos;ve continued building practical applications, learning from real-world engineering challenges, and working on projects that strengthen my understanding of software architecture.
                </p>
                <p>
                  In my professional work at Nexudy, I develop and maintain application features across frontend and backend services. I work with TypeScript, React/Next.js, Node.js, PostgreSQL, authentication and authorization, and external integrations, contributing to API design and features spanning packages in a shared codebase. I enjoy work that requires understanding the complete flow of an application rather than treating each endpoint or page in isolation.
                </p>
                <p>
                  Outside my day-to-day work, I build personal projects to explore different areas of engineering. My current projects include <code className="font-incognito py-[0.15rem] px-1 rounded-sm font-medium dark:bg-primary-bg bg-secondary-bg dark:text-zinc-200 text-pink-500">hono-commerce</code>, a multi-tenant e-commerce platform under active development, and <code className="font-incognito py-[0.15rem] px-1 rounded-sm font-medium dark:bg-primary-bg bg-secondary-bg dark:text-zinc-200 text-pink-500">DevVault</code>, a developer-focused knowledge application. These give me room to experiment with authentication, modular application design, relational data, asynchronous processing, and ways of organizing technical knowledge.
                </p>
                <p>
                  I&apos;m especially interested in backend architecture, distributed systems, DevOps, and the tradeoffs involved in building dependable software. I also enjoy documenting things I learn—whether that&apos;s a database decision, a useful development workflow, or a difficult bug—and sharing those notes through technical writing.
                </p>
                <p>
                  I&apos;m open to collaborating on projects involving full-stack web development, TypeScript/Node.js APIs, SaaS applications, and third-party integrations.
                </p>
              </div>
            </Slide>
          </div>

          <aside className="flex flex-col lg:justify-self-center justify-self-start gap-y-8 lg:order-1 order-none mb-12">
            <Slide delay={0.1}>
              <div className="sticky top-10">
                <div className="relative w-[350px] sm:w-[400px] h-[350px] sm:h-[400px] mb-4">
                  <Image
                    className="rounded-2xl object-cover dark:bg-zinc-800 bg-zinc-200"
                    src={profileImage}
                    fill
                    sizes="(max-width: 640px) 350px, 400px"
                    quality={100}
                    alt={siteConfig.name}
                    priority
                  />
                </div>

                <div className="flex flex-col text-center gap-y-4">
                  <div className="flex items-center gap-x-3">
                    {siteConfig.resumeUrl ? (
                      <RefLink
                        href={siteConfig.resumeUrl}
                        className="flex items-center justify-center text-center gap-x-2 basis-[90%] dark:bg-primary-bg bg-zinc-100 border border-transparent dark:hover:border-zinc-700 hover:border-zinc-200 rounded-md py-2 text-lg font-incognito font-semibold"
                      >
                        View Résumé <BiLinkExternal className="text-base" />
                      </RefLink>
                    ) : (
                      <span className="flex items-center justify-center text-center gap-x-2 basis-[90%] dark:bg-primary-bg bg-zinc-100 border border-transparent opacity-75 cursor-not-allowed rounded-md py-2 text-lg font-incognito font-semibold">
                        Résumé on Request <BiLinkExternal className="text-base" />
                      </span>
                    )}

                    {siteConfig.resumeUrl ? (
                      <a
                        href={siteConfig.resumeUrl}
                        download={`${siteConfig.name}-Resume.pdf`}
                        className="flex items-center justify-center text-center dark:text-primary-color text-secondary-color hover:underline basis-[10%] dark:bg-primary-bg bg-zinc-100 border border-transparent dark:hover:border-zinc-700 hover:border-zinc-200 rounded-md py-3 text-lg"
                        title="Download Resume"
                      >
                        <BiSolidDownload
                          className="text-lg"
                          aria-label="Download Resume"
                        />
                      </a>
                    ) : (
                      <span
                        className="flex items-center justify-center text-center dark:text-zinc-500 text-zinc-400 basis-[10%] dark:bg-primary-bg bg-zinc-100 border border-transparent rounded-md py-3 text-lg cursor-not-allowed"
                        title="Resume available on request"
                      >
                        <BiSolidDownload
                          className="text-lg"
                          aria-label="Download Resume"
                        />
                      </span>
                    )}
                  </div>

                  {siteConfig.email ? (
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="flex items-center gap-x-2 hover:text-primary-color justify-center"
                    >
                      <BiEnvelope className="text-lg" />
                      {siteConfig.email}
                    </a>
                  ) : (
                    <span className="flex items-center gap-x-2 dark:text-zinc-400 text-zinc-500 text-sm justify-center">
                      <BiEnvelope className="text-lg" />
                      Contact via LinkedIn or GitHub
                    </span>
                  )}
                </div>
              </div>
            </Slide>
          </aside>
        </section>

        <Slide delay={0.14}>
          <Usage />
        </Slide>

        <Heroes />
      </div>
    </main>
  );
}
