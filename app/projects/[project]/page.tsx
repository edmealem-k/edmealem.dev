import Image from "next/image";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Slide } from "../../animation/Slide";
import { BiLinkExternal, BiLogoGithub } from "react-icons/bi";
import { getAllProjects, getProjectBySlug } from "@/lib/content";
import { MDXContent } from "@/lib/content/mdx";
import { siteConfig } from "@/config/site";

type Props = {
  params: Promise<{
    project: string;
  }>;
};

const fallbackImage =
  "/images/projects/hono-commerce-cover-placeholder.webp";

export const dynamicParams = false;

export function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((project) => ({
    project: project.slug,
  }));
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const project = getProjectBySlug(params.project);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  const coverUrl = project.coverImage?.image || fallbackImage;

  return {
    title: `${project.name} | ${siteConfig.name}`,
    metadataBase: new URL(`${siteConfig.siteUrl}/projects/${project.slug}`),
    description: project.tagline,
    openGraph: {
      images: coverUrl,
      url: `${siteConfig.siteUrl}/projects/${project.slug}`,
      title: project.name,
      description: project.tagline,
    },
  };
}

export default async function Project(props: Props) {
  const params = await props.params;
  const project = getProjectBySlug(params.project);

  if (!project) {
    notFound();
  }

  return (
    <main className="max-w-6xl mx-auto lg:px-16 px-8">
      <Slide>
        <div className="max-w-3xl mx-auto">
          <div className="flex items-start justify-between flex-wrap mb-4">
            <h1 className="font-incognito font-black tracking-tight sm:text-5xl text-3xl mb-4 max-w-md">
              {project.name}
            </h1>

            <div className="flex items-center gap-x-2">
              <a
                href={project.projectUrl || undefined}
                rel="noreferrer noopener"
                target="_blank"
                className={`flex items-center gap-x-2 dark:bg-primary-bg bg-secondary-bg dark:text-white text-zinc-700 border border-transparent rounded-md px-4 py-2 duration-200 ${
                  !project.projectUrl
                    ? "cursor-not-allowed opacity-80"
                    : "cursor-pointer hover:dark:border-zinc-700 hover:border-zinc-200"
                }`}
              >
                <BiLinkExternal aria-hidden="true" />
                {project.projectUrl ? "Live URL" : "Coming Soon"}
              </a>

              <a
                href={project.repository || undefined}
                rel="noreferrer noopener"
                target="_blank"
                className={`flex items-center gap-x-2 dark:bg-primary-bg bg-secondary-bg dark:text-white text-zinc-700 border border-transparent rounded-md px-4 py-2 duration-200 ${
                  !project.repository
                    ? "cursor-not-allowed opacity-80"
                    : "cursor-pointer hover:dark:border-zinc-700 hover:border-zinc-200"
                }`}
              >
                <BiLogoGithub aria-hidden="true" />
                {project.repository ? "GitHub" : "No Repo"}
              </a>
            </div>
          </div>

          <div className="relative w-full h-40 pt-[52.5%]">
            <Image
              className="rounded-xl border dark:border-zinc-800 border-zinc-100 object-cover"
              fill
              src={project.coverImage?.image ?? fallbackImage}
              alt={project.coverImage?.alt ?? project.name}
              quality={100}
              priority
            />
          </div>

          <div className="mt-8 dark:text-zinc-400 text-zinc-600 leading-relaxed">
            {project.content ? (
              <MDXContent source={project.content} />
            ) : null}
          </div>
        </div>
      </Slide>
    </main>
  );
}
