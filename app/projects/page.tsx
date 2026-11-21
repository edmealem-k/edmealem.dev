import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { BiLinkExternal, BiLogoGithub, BiRightArrowAlt } from "react-icons/bi";
import EmptyState from "../components/shared/EmptyState";
import { Slide } from "../animation/Slide";
import PageHeading from "../components/shared/PageHeading";
import { getAllProjects } from "@/lib/content";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Projects | ${siteConfig.name}`,
  metadataBase: new URL(`${siteConfig.siteUrl}/projects`),
  description: `Featured engineering projects exploring multi-tenant architecture, backend systems, developer tooling, and modern full-stack TypeScript built by ${siteConfig.name}.`,
  openGraph: {
    title: `Projects | ${siteConfig.name}`,
    url: `${siteConfig.siteUrl}/projects`,
    description: `Featured engineering projects exploring multi-tenant architecture, backend systems, developer tooling, and modern full-stack TypeScript built by ${siteConfig.name}.`,
    images: "/images/projects/hono-commerce.webp",
  },
};

const fallbackImage = "/images/projects/hono-commerce.webp";

export default function Project() {
  const projects = getAllProjects();

  return (
    <main className="max-w-7xl mx-auto md:px-16 px-6">
      <PageHeading
        title="Projects"
        description="Featured engineering projects exploring multi-tenant architecture, backend systems, developer tooling, and modern full-stack TypeScript."
      />

      <Slide delay={0.1}>
        {projects.length > 0 ? (
          <section className="flex flex-col gap-6 md:gap-8 mb-20">
            {projects.map((project, index) => (
              <article
                key={project._id}
                className="group relative flex flex-col md:flex-row items-stretch gap-6 md:gap-8 rounded-2xl border dark:border-zinc-800/80 border-zinc-200/90 dark:bg-zinc-900/30 bg-zinc-50/50 p-4 sm:p-5 md:p-6 transition-all duration-300 hover:dark:border-zinc-700 hover:border-zinc-300 hover:dark:bg-zinc-900/60 hover:bg-zinc-100/60 shadow-sm"
              >
                {/* Left 16:9 Thumbnail Image */}
                <div className="relative w-full md:w-[320px] lg:w-[380px] shrink-0 aspect-video rounded-xl overflow-hidden border dark:border-zinc-800 border-zinc-200 dark:bg-zinc-950 bg-zinc-100 group/image">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="block w-full h-full relative"
                    tabIndex={-1}
                    aria-hidden="true"
                  >
                    <Image
                      src={project.coverImage?.image || fallbackImage}
                      alt={project.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 380px"
                      className="object-cover transition-transform duration-500 ease-out group-hover/image:scale-105"
                      priority={index < 2}
                    />
                  </Link>
                </div>

                {/* Right Content */}
                <div className="flex flex-col justify-between flex-1 min-w-0 py-1">
                  <div>
                    {/* Top Header Row: Title & Action Links */}
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="group/title inline-flex items-center gap-2"
                      >
                        <h2 className="font-incognito text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 group-hover/title:text-tertiary-color dark:group-hover/title:text-primary-color transition-colors">
                          {project.name}
                        </h2>
                      </Link>

                      <div className="flex items-center gap-3 shrink-0">
                        {project.projectUrl ? (
                          <a
                            href={project.projectUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium dark:text-zinc-400 text-zinc-500 hover:dark:text-white hover:text-zinc-900 transition-colors"
                            title={`View live demo for ${project.name}`}
                          >
                            <span>Live</span>
                            <BiLinkExternal className="text-sm opacity-80" />
                          </a>
                        ) : null}

                        {project.repository ? (
                          <a
                            href={project.repository}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium dark:text-zinc-400 text-zinc-500 hover:dark:text-white hover:text-zinc-900 transition-colors"
                            title={`View GitHub repository for ${project.name}`}
                          >
                            <BiLogoGithub className="text-base" />
                            <span>GitHub</span>
                          </a>
                        ) : null}

                        <Link
                          href={`/projects/${project.slug}`}
                          className="inline-flex items-center gap-1 text-xs sm:text-sm font-medium dark:text-zinc-400 text-zinc-500 hover:dark:text-primary-color hover:text-tertiary-color transition-colors"
                        >
                          <span>Case Study</span>
                          <BiRightArrowAlt className="text-base" />
                        </Link>
                      </div>
                    </div>

                    {/* Technical Summary - up to 3 lines */}
                    <p className="my-3 text-sm sm:text-base leading-relaxed dark:text-zinc-400 text-zinc-600 line-clamp-3">
                      {project.summary || project.tagline}
                    </p>
                  </div>

                  {/* Tech Stack Pills */}
                  {project.tags && project.tags.length > 0 ? (
                    <div className="flex flex-wrap items-center gap-2 mt-auto pt-3">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 text-xs font-mono font-medium rounded-md dark:bg-zinc-800/80 bg-zinc-200/60 dark:text-zinc-300 text-zinc-700 border dark:border-zinc-700/50 border-zinc-300/60"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>
              </article>
            ))}
          </section>
        ) : (
          <EmptyState value="Projects" />
        )}
      </Slide>
    </main>
  );
}
