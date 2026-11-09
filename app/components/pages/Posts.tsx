import Image from "next/image";
import Link from "next/link";
import EmptyState from "../shared/EmptyState";
import { BiSolidTime } from "react-icons/bi";
import { formatDate } from "../../utils/date";
import { HiCalendar } from "react-icons/hi";
import { getAllPosts } from "@/lib/content";

const fallbackImage =
  "/images/blog/tenant-isolation-placeholder.webp";

export default function Posts() {
  const posts = getAllPosts();

  return (
    <section>
      {posts.length > 0 ? (
        <div className="flex flex-col lg:max-w-[950px] max-w-full lg:gap-y-8 gap-y-12 mb-12">
          {posts.map((post) => (
            <article key={post._id}>
              <Link
                href={`/blog/${post.slug}`}
                className="flex lg:flex-row flex-col lg:items-center items-start gap-8 dark:bg-primary-bg bg-secondary-bg p-6 rounded-lg border dark:border-zinc-800 border-zinc-200 group"
              >
                <div className="relative lg:w-[450px] lg:h-52 w-full h-56 overflow-clip">
                  <Image
                    src={post.coverImage?.image || fallbackImage}
                    className="dark:bg-zinc-800 bg-zinc-100 rounded-md object-cover group-hover:scale-125 duration-300"
                    alt={post.coverImage?.alt || post.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 450px"
                  />
                </div>
                <div className="max-w-lg">
                  <h2 className="max-w-sm text-2xl font-semibold tracking-tight mb-4">
                    {post.title}
                  </h2>
                  <p className="dark:text-zinc-400 text-zinc-600 text-[0.95rem]">
                    {post.description}
                  </p>
                  <div className="flex items-center gap-x-4 mt-3 text-sm">
                    <div className="flex items-center gap-x-2">
                      <HiCalendar />
                      <time dateTime={post.date || post._createdAt}>
                        {formatDate(post.date || post._createdAt || "")}
                      </time>
                    </div>
                    <div className="flex items-center gap-x-2">
                      <BiSolidTime />
                      <div>{post.readingTime || "3 min read"}</div>
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <EmptyState value="Blog Post" />
      )}
    </section>
  );
}
