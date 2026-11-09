"use client";

import dynamic from "next/dynamic";
import { Slide } from "@/app/animation/Slide";

const ContributionGraph = dynamic(() => import("./ContributionGraph"), {
  ssr: false,
  loading: () => (
    <div className="flex xl:flex-row flex-col gap-4">
      <div className="dark:bg-primary-bg bg-secondary-bg border dark:border-zinc-800 border-zinc-200 p-8 rounded-lg min-w-full lg:min-w-[700px] h-[190px] animate-pulse" />
    </div>
  ),
});

export default function GithubCalendarComponent() {
  return (
    <section>
      <Slide delay={0.16} className="mb-8">
        <h2 className="font-incognito text-4xl font-bold tracking-tight">
          Contribution Graph
        </h2>
      </Slide>

      <Slide delay={0.18}>
        <ContributionGraph />
      </Slide>
    </section>
  );
}
