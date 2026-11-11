import type { ArticleHeading } from "@/lib/content/headings";

export default function TableOfContents({
  headings,
}: {
  headings: ArticleHeading[];
}) {
  if (headings.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="my-8">
      <details className="overflow-hidden rounded-xl border dark:border-zinc-800 border-zinc-200 dark:bg-zinc-950/40 bg-zinc-50">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 [&::-webkit-details-marker]:hidden">
          <span>
            <span className="block font-semibold tracking-tight dark:text-zinc-100 text-zinc-900">
              Table of contents
            </span>
            <span className="mt-1 block text-sm dark:text-zinc-400 text-zinc-600">
              {headings.length} section links
            </span>
          </span>
          <span
            aria-hidden="true"
            className="text-xl leading-none dark:text-zinc-400 text-zinc-600"
          >
            ⌄
          </span>
        </summary>

        <ol className="grid grid-cols-1 gap-x-8 gap-y-2 border-t dark:border-zinc-800 border-zinc-200 p-5 sm:grid-cols-2">
          {headings.map((heading) => (
            <li
              key={heading.id}
              className={
                heading.depth === 3
                  ? "ml-5 list-none sm:col-span-2"
                  : "ml-5 list-decimal marker:text-zinc-500"
              }
            >
              <a
                href={`#${heading.id}`}
                className="text-sm leading-relaxed dark:text-zinc-300 text-zinc-700 hover:dark:text-white hover:text-zinc-950 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-color"
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ol>
      </details>
    </nav>
  );
}
