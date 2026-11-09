"use client";
import { useTheme } from "next-themes";
import { GitHubCalendar } from "react-github-calendar";
import { github } from "@/app/data/contribution-graph-theme";
import { useState } from "react";
import YearButton from "../shared/YearButton";
import { getGitHubYears } from "@/app/utils/calculate-years";
import EmptyState from "../shared/EmptyState";
import { IoIosAnalytics } from "react-icons/io";
import { siteConfig } from "@/config/site";

export default function ContributionGraph() {
  const [calendarYear, setCalendarYear] = useState<number | undefined>(
    undefined
  );
  const { theme, systemTheme } = useTheme();
  const scheme =
    theme === "light" ? "light" : theme === "dark" ? "dark" : systemTheme;

  const today = new Date().getFullYear();
  const username =
    process.env.NEXT_PUBLIC_GITHUB_USERNAME || siteConfig.githubUsername;
  const joinYear =
    Number(process.env.NEXT_PUBLIC_GITHUB_JOIN_YEAR) || 2021;
  const years = getGitHubYears(joinYear);

  if (!username || !joinYear)
    return (
      <EmptyState
        icon={<IoIosAnalytics />}
        title="Unable to load Contribution Graph"
        message="Configure your GitHub username in site configuration or environment variables."
      />
    );

  return (
    <div className="flex xl:flex-row flex-col gap-4">
      <div className="dark:bg-primary-bg bg-secondary-bg border dark:border-zinc-800 border-zinc-200 p-8 rounded-lg max-w-fit max-h-fit overflow-x-auto">
        <GitHubCalendar
          username={username}
          theme={github}
          colorScheme={scheme}
          blockSize={13}
          year={calendarYear}
        />
      </div>
      <div className="flex justify-start xl:flex-col flex-row flex-wrap gap-2">
        {/* Display only the last five years */}
        {years.slice(0, 5).map((year) => (
          <YearButton
            key={year}
            year={year}
            currentYear={calendarYear ?? today}
            onClick={() =>
              setCalendarYear(year === calendarYear ? undefined : year)
            }
          />
        ))}
      </div>
    </div>
  );
}
