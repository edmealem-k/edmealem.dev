import Image from "next/image";
import { experiences } from "@/app/data/experience";
import { formatJobDate } from "../../utils/date";
import { Slide } from "../../animation/Slide";
import RefLink from "../shared/RefLink";
import EmptyState from "../shared/EmptyState";
import { RiBriefcase3Fill } from "react-icons/ri";

export default function Job() {
  const jobs = experiences;

  return (
    <section className="mt-32">
      <Slide delay={0.16}>
        <div className="mb-16">
          <h2 className="font-incognito text-4xl mb-4 font-bold tracking-tight">
            Work Experience
          </h2>
        </div>
      </Slide>

      {jobs.length > 0 ? (
        <Slide delay={0.18}>
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-12 gap-y-10">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="flex items-start lg:gap-x-6 gap-x-4 max-w-2xl relative before:absolute before:bottom-0 before:top-[5rem] before:left-9 before:w-[1px] before:h-[calc(100%-70px)] dark:before:bg-zinc-800 before:bg-zinc-200"
              >
                <RefLink
                  href={job.companyUrl}
                  className="grid place-items-center dark:bg-primary-bg bg-secondary-bg border dark:border-zinc-800 border-zinc-200 min-h-[80px] min-w-[80px] p-2 rounded-md overflow-clip relative"
                >
                  <Image
                    src={job.logo}
                    className="object-contain duration-300"
                    alt={`${job.company} logo`}
                    width={50}
                    height={50}
                    style={{ width: "auto", height: "auto" }}
                  />
                </RefLink>
                <div className="flex flex-col items-start">
                  <h3 className="text-xl font-semibold">{job.company}</h3>
                  <p>{job.role}</p>
                  <time className="text-sm text-zinc-500 mt-2 tracking-widest uppercase">
                    {job.startDate ? (
                      <>
                        {formatJobDate(job.startDate)} -{" "}
                        {job.endDate ? (
                          formatJobDate(job.endDate)
                        ) : (
                          <span className="dark:text-primary-color text-tertiary-color">
                            Present
                          </span>
                        )}
                      </>
                    ) : job.current ? (
                      <span className="dark:text-primary-color text-tertiary-color">
                        Present
                      </span>
                    ) : (
                      <span className="text-zinc-400">Dates to confirm</span>
                    )}
                  </time>
                  <p className="tracking-tight dark:text-zinc-400 text-zinc-600 my-4">
                    {job.summary}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Slide>
      ) : (
        <EmptyState
          icon={<RiBriefcase3Fill />}
          title="Work Experience Not Provided"
          message="No work experience available at the moment."
        />
      )}
    </section>
  );
}
