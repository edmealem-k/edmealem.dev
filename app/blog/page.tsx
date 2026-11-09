import { Metadata } from "next";
import { BiDetail } from "react-icons/bi";
import Posts from "../components/pages/Posts";
import Social from "../components/shared/Social";
import { Slide } from "../animation/Slide";
import PageHeading from "@/app/components/shared/PageHeading";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Blog | ${siteConfig.name}`,
  metadataBase: new URL(`${siteConfig.siteUrl}/blog`),
  description: `Read technical articles and engineering notes by ${siteConfig.name}`,
  openGraph: {
    title: `Blog | ${siteConfig.name}`,
    url: `${siteConfig.siteUrl}/blog`,
    description: `Read technical articles and engineering notes by ${siteConfig.name}`,
    images: "/images/blog/tenant-isolation-placeholder.webp",
  },
};

export default function Blog() {
  return (
    <main className="max-w-7xl mx-auto md:px-16 px-6">
      <PageHeading
        title="Blog"
        description="Engineering notes and technical writing exploring TypeScript, backend architecture, multi-tenancy, background jobs, and full-stack software development."
      >
        <Social type="publication" />
      </PageHeading>

      <Slide delay={0.1}>
        <div className="flex items-center gap-x-3 mb-8">
          <BiDetail />
          <h2 className="text-xl font-semibold tracking-tight">Explore All</h2>
        </div>
        <Posts />
      </Slide>
    </main>
  );
}
