import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { BiChevronRight, BiSolidTime } from "react-icons/bi";
import { HiCalendar, HiChat } from "react-icons/hi";
import { formatDate } from "../../utils/date";
import SharePost from "../../components/shared/SharePost";
import FeaturedPosts from "../../components/pages/FeaturedPosts";
import { Slide } from "../../animation/Slide";
import Buymeacoffee from "@/app/components/shared/Buymeacoffee";
import Comments from "@/app/components/shared/Comments";
import PageHeading from "@/app/components/shared/PageHeading";
import { getAllPosts, getPostBySlug } from "@/lib/content";
import { MDXContent } from "@/lib/content/mdx";
import { siteConfig } from "@/config/site";

type Props = {
  params: Promise<{
    post: string;
  }>;
};

const fallbackImage =
  "/images/blog/tenant-isolation-placeholder.webp";

export const dynamicParams = false;

export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    post: post.slug,
  }));
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const post = getPostBySlug(params.post);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const coverUrl = post.coverImage?.image || fallbackImage;

  return {
    title: `${post.title} | ${siteConfig.name}`,
    metadataBase: new URL(`${siteConfig.siteUrl}/blog/${post.slug}`),
    description: post.description,
    publisher: post.author.name,
    keywords: post.tags,
    alternates: {
      canonical: post.canonicalLink || `${siteConfig.siteUrl}/blog/${post.slug}`,
    },
    openGraph: {
      images: coverUrl,
      url: `${siteConfig.siteUrl}/blog/${post.slug}`,
      title: post.title,
      description: post.description,
      type: "article",
      siteName: siteConfig.name,
      authors: post.author.name,
      tags: post.tags,
      publishedTime: post._createdAt,
      modifiedTime: post._updatedAt || "",
    },
    twitter: {
      title: post.title,
      description: post.description,
      images: coverUrl,
      creator: `@${siteConfig.social.x.split("/").pop()}`,
      card: "summary_large_image",
    },
  };
}

export default async function Post(props: Props) {
  const params = await props.params;
  const post = getPostBySlug(params.post);

  if (!post) {
    notFound();
  }

  return (
    <main className="max-w-7xl mx-auto md:px-16 px-6">
      <header>
        <Slide className="relative flex items-center gap-x-2 border-b dark:border-zinc-800 border-zinc-200 pb-8">
          <Link
            href="/blog"
            className="whitespace-nowrap dark:text-zinc-400 text-zinc-400 hover:dark:text-white hover:text-zinc-700 text-sm border-b dark:border-zinc-700 border-zinc-200"
          >
            cd ..
          </Link>
          <BiChevronRight />
          <p className="text-zinc-400 text-sm truncate">{post.title}</p>
        </Slide>
      </header>

      <article>
        <Slide
          className="grid lg:grid-cols-[75%,25%] grid-cols-1 relative"
          delay={0.1}
        >
          <div className="min-h-full lg:border-r border-r-0 dark:border-zinc-800 border-zinc-200 pt-10 pb-4 lg:pr-6 px-0">
            <div className="flex items-center flex-wrap gap-4 text-md mb-8 dark:text-zinc-400 text-zinc-600">
              <div className="flex items-center gap-x-2">
                <HiCalendar />
                <time dateTime={post.date || post._createdAt}>
                  {formatDate(post.date || post._createdAt || "")}
                </time>
              </div>
              <Link
                href="#comments"
                className="flex items-center gap-x-2 dark:text-primary-color text-tertiary-color"
              >
                <HiChat />
                <div>Comments</div>
              </Link>
              <div className="flex items-center gap-x-2">
                <BiSolidTime />
                <div>{post.readingTime || "3 min read"}</div>
              </div>
            </div>

            <PageHeading title={post.title} description={post.description} />

            <div className="relative w-full h-40 pt-[52.5%]">
              <Image
                className="rounded-xl border dark:border-zinc-800 border-zinc-100 object-cover"
                fill
                src={post.coverImage?.image || fallbackImage}
                alt={post.coverImage?.alt || post.title}
                quality={100}
                priority
              />
            </div>

            <div className="mt-8 dark:text-zinc-400 text-zinc-600 leading-relaxed tracking-tight text-lg">
              {post.content ? <MDXContent source={post.content} /> : null}
            </div>
          </div>

          <aside className="flex flex-col lg:max-h-full h-max gap-y-8 sticky top-2 bottom-auto right-0 py-10 lg:px-6 px-0">
            <section className="border-b dark:border-zinc-800 border-zinc-200 pb-10">
              <p className="dark:text-zinc-400 text-zinc-500 text-sm">
                Written By
              </p>
              <address className="flex items-center gap-x-3 mt-4 not-italic">
                <div className="relative w-12 h-12">
                  <Image
                    src={post.author.photo.image}
                    alt={post.author.photo.alt}
                    fill
                    sizes="48px"
                    className="dark:bg-zinc-800 bg-zinc-300 rounded-full object-cover"
                  />
                </div>
                <div rel="author">
                  <h3 className="font-semibold text-lg tracking-tight">
                    {post.author.name}
                  </h3>
                  <a
                    href={post.author.twitterUrl}
                    className="text-blue-500 text-sm"
                    rel="noreferrer noopener"
                    target="_blank"
                  >
                    @{siteConfig.social.x.split("/").pop()}
                  </a>
                </div>
              </address>
            </section>

            <section className="border-b dark:border-zinc-800 border-zinc-200 pb-10">
              <h3 className="text-xl font-semibold tracking-tight mb-4">
                Tags
              </h3>
              <ul className="flex flex-wrap items-center gap-2 tracking-tight">
                {post.tags.map((tag, id) => (
                  <li
                    key={id}
                    className="dark:bg-primary-bg bg-zinc-100 border dark:border-zinc-800 border-zinc-200 rounded-md px-2 py-1 text-sm"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </section>

            <SharePost
              title={post.title}
              slug={post.slug}
              description={post.description}
            />

            <section className="border-b dark:border-zinc-800 border-zinc-200 pb-10">
              <h3 className="text-xl font-semibold tracking-tight mb-4">
                Featured
              </h3>
              <FeaturedPosts params={params.post} />
            </section>
          </aside>
        </Slide>
      </article>

      <section
        id="comments"
        className="max-w-3xl mt-10 lg:border-t dark:border-zinc-800 border-zinc-200 lg:py-10 pt-0"
      >
        <h3 className="lg:text-4xl text-3xl font-semibold tracking-tight mb-8">
          Comments
        </h3>
        <Comments />
      </section>

      <section className="max-w-3xl lg:py-10 pt-0">
        <h3 className="lg:text-4xl text-3xl font-semibold tracking-tight mb-8">
          Support
        </h3>
        <Buymeacoffee />
      </section>
    </main>
  );
}
