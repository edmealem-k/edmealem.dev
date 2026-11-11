import React from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypePrism from "rehype-prism-plus";
import { BiLinkExternal, BiSolidQuoteRight } from "react-icons/bi";
import RefLink from "@/app/components/shared/RefLink";
import HashScroll from "@/app/components/shared/HashScroll";
import CodeBlockWrapper from "@/app/components/shared/CodeBlockWrapper";

function slugify(node: React.ReactNode): string {
  if (!node) return "";
  return node
    .toString()
    .toLowerCase()
    .replaceAll(/[^-\w]+/g, "-")
    .replaceAll(/--+/g, "-")
    .replace(/^-|-$/g, "");
}

const components = {
  h2: ({ children, id, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      id={id || slugify(children)}
      className="font-incognito before:content-['#'] before:hidden hover:before:sm:inline-block hover:before:hidden before:absolute lg:before:-left-5 before:-left-4 lg:before:text-2xl before:text-xl block before:top-1/2 before:-translate-y-1/2 before:opacity-80 dark:before:text-zinc-500 before:text-zinc-400 relative max-w-[72ch] scroll-mt-28 font-bold tracking-tight dark:text-zinc-50 lg:text-4xl text-3xl text-zinc-900 my-8"
      {...props}
    >
      <HashScroll text={children} id={id || slugify(children)} />
    </h2>
  ),
  h3: ({ children, id, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      id={id || slugify(children)}
      className="font-incognito before:content-['#'] before:hidden hover:before:sm:inline-block hover:before:hidden before:absolute lg:before:-left-5 before:-left-4 lg:before:text-2xl before:text-xl before:top-1/2 before:-translate-y-1/2 before:opacity-80 dark:before:text-zinc-500 before:text-zinc-400 relative block max-w-[72ch] scroll-mt-28 lg:font-bold font-semibold tracking-tight lg:text-3xl text-2xl dark:text-zinc-50 text-zinc-900 my-6"
      {...props}
    >
      <HashScroll text={children} id={id || slugify(children)} />
    </h3>
  ),
  h4: ({ children, id, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      id={id || slugify(children)}
      className="font-incognito before:content-['#'] before:hidden hover:before:sm:inline-block hover:before:hidden before:absolute lg:before:-left-6 before:-left-4 lg:before:text-2xl before:text-xl before:top-1/2 before:-translate-y-1/2 before:opacity-80 dark:before:text-zinc-500 before:text-zinc-400 relative inline-block max-w-[72ch] scroll-mt-28 font-semibold tracking-tight text-xl dark:text-zinc-50 text-zinc-900 mb-2 mt-4"
      {...props}
    >
      <HashScroll text={children} id={id || slugify(children)} />
    </h4>
  ),
  p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="mt-2 mb-6 max-w-[72ch] leading-relaxed" {...props}>
      {children}
    </p>
  ),
  blockquote: ({ children, ...props }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="relative max-w-[72ch] overflow-hidden tracking-tight text-lg my-8 lg:py-6 lg:pl-6 pr-12 p-4 border dark:border-zinc-800 border-zinc-200 rounded-md"
      {...props}
    >
      <BiSolidQuoteRight
        className="text-7xl absolute -top-7 -right-5 -rotate-12 dark:text-zinc-800 text-zinc-200"
        aria-hidden="true"
      />
      {children}
    </blockquote>
  ),
  em: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <em className="font-incognito font-medium italic" {...props}>
      {children}
    </em>
  ),
  strong: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-bold dark:text-zinc-300 text-zinc-700" {...props}>
      {children}
    </strong>
  ),
  a: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <RefLink
      href={href || ""}
      className="dark:text-blue-400 text-blue-500 hover:underline inline-flex items-center gap-1"
      {...props}
    >
      {children} <BiLinkExternal className="inline" aria-hidden="true" />
    </RefLink>
  ),
  code: ({ children, className, ...props }: React.HTMLAttributes<HTMLElement>) => {
    if (className?.includes("language-")) {
      return (
        <code className={className} {...props}>
          {children}
        </code>
      );
    }
    return (
      <code
        className="font-incognito py-[0.15rem] px-1 rounded-sm font-medium dark:bg-primary-bg bg-secondary-bg dark:text-zinc-200 text-pink-500"
        {...props}
      >
        {children}
      </code>
    );
  },
  pre: CodeBlockWrapper,
  ul: ({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="max-w-[72ch] list-[square] mt-5 ml-5 space-y-2" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="max-w-[72ch] list-decimal mt-5 ml-5 space-y-2" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="mb-2 max-w-[72ch] leading-relaxed" {...props}>
      {children}
    </li>
  ),
  table: ({ children, ...props }: React.TableHTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 overflow-x-auto rounded-lg border dark:border-zinc-800 border-zinc-200 dark:bg-zinc-950/40 bg-white">
      <table className="w-full border-collapse text-left text-sm md:text-base" {...props}>
        {children}
      </table>
    </div>
  ),
  th: ({ children, ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) => (
    <th
      className="border-b dark:border-zinc-700 border-zinc-200 p-3 font-semibold dark:bg-zinc-800/70 bg-zinc-100 dark:text-zinc-100 text-zinc-900"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) => (
    <td className="border-b dark:border-zinc-800/50 border-zinc-100 p-3 dark:text-zinc-300 text-zinc-700" {...props}>
      {children}
    </td>
  ),
};

export function MDXContent({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      components={components}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [rehypeSlug, [rehypePrism, { ignoreMissing: true }]],
        },
      }}
    />
  );
}
