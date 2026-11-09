"use client";

import { useTheme } from "next-themes";
import Giscus from "@giscus/react";
import { siteConfig } from "@/config/site";
import { HiChat } from "react-icons/hi";

export default function Comments() {
  const { theme } = useTheme();
  const giscusTheme =
    theme === "light"
      ? "light"
      : theme === "dark"
      ? "transparent_dark"
      : "dark";

  const repo = siteConfig.giscus?.repo;
  const repoId = siteConfig.giscus?.repoId;
  const category = siteConfig.giscus?.category || "Announcements";
  const categoryId = siteConfig.giscus?.categoryId;

  // Gracefully disable comments if GitHub Discussions IDs are not yet configured
  if (!repoId || !categoryId || !repo) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-8 border dark:border-zinc-800 border-zinc-200 rounded-lg dark:bg-primary-bg bg-secondary-bg">
        <HiChat className="text-3xl text-zinc-400 mb-2" />
        <h4 className="text-lg font-semibold tracking-tight mb-1">
          Comments coming soon
        </h4>
        <p className="text-sm dark:text-zinc-400 text-zinc-600 max-w-md">
          Comments are enabled via GitHub Discussions on public repositories. Configuration will be activated once discussion categories are set up.
        </p>
      </div>
    );
  }

  return (
    <Giscus
      id="comments"
      repo={repo as `${string}/${string}`}
      repoId={repoId}
      category={category}
      categoryId={categoryId}
      mapping="pathname"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="bottom"
      theme={giscusTheme}
      lang="en"
      loading="lazy"
    />
  );
}
