import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/content";

const fallbackImage =
  "/images/blog/tenant-isolation-placeholder.webp";

export default function FeaturedPosts({ params }: { params?: string }) {
  const posts = getAllPosts();
  const featuredPosts = posts.filter(
    (post) => post.featured === true && post.slug !== params
  );

  return (
    <>
      {featuredPosts.map((post) => (
        <article key={post._id} className="mb-4 flex lg:flex-row flex-col">
          <Link
            href={`/blog/${post.slug}`}
            className="flex flex-col gap-4 dark:bg-primary-bg bg-secondary-bg p-5 rounded-lg border dark:border-zinc-800 border-zinc-200"
          >
            <div className="relative w-full h-[180px] overflow-hidden rounded-md">
              <Image
                src={post.coverImage?.image || fallbackImage}
                className="dark:bg-zinc-800 bg-zinc-100 rounded-md object-cover"
                alt={post.coverImage?.alt || post.title}
                fill
                sizes="(max-width: 1024px) 100vw, 300px"
              />
            </div>
            <div className="max-w-lg">
              <h2 className="max-w-sm text-lg tracking-tight mb-4">
                {post.title}
              </h2>
              <p className="dark:text-zinc-400 text-zinc-600 text-sm">
                {post.description.slice(0, 80).padEnd(83, "...")}
              </p>
            </div>
          </Link>
        </article>
      ))}
    </>
  );
}
