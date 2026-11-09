import Image from "next/image";
import { educations } from "@/app/data/education";
import { Slide } from "../../animation/Slide";
import RefLink from "../shared/RefLink";

export default function Education() {
  if (educations.length === 0) return null;

  return (
    <section className="mt-32">
      <Slide delay={0.16}>
        <div className="mb-16">
          <h2 className="font-incognito text-4xl mb-4 font-bold tracking-tight">
            Education
          </h2>
        </div>
      </Slide>

      <Slide delay={0.18}>
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-12 gap-y-10">
          {educations.map((edu) => (
            <div
              key={edu.id}
              className="flex items-start lg:gap-x-6 gap-x-4 max-w-2xl relative before:absolute before:bottom-0 before:top-[5rem] before:left-9 before:w-[1px] before:h-[calc(100%-70px)] dark:before:bg-zinc-800 before:bg-zinc-200"
            >
              <RefLink
                href={edu.url || "#"}
                className="grid place-items-center dark:bg-primary-bg bg-secondary-bg border dark:border-zinc-800 border-zinc-200 min-h-[80px] min-w-[80px] p-2 rounded-md overflow-clip relative"
              >
                <Image
                  src={edu.logo}
                  className="object-contain duration-300"
                  alt={`${edu.institution} logo`}
                  width={50}
                  height={50}
                  style={{ width: "auto", height: "auto" }}
                />
              </RefLink>
              <div className="flex flex-col items-start">
                <h3 className="text-xl font-semibold">{edu.institution}</h3>
                <p className="text-base text-zinc-700 dark:text-zinc-300 font-medium">
                  {edu.degree} in {edu.field}
                </p>
                <time className="text-sm text-zinc-500 mt-2 tracking-widest uppercase flex items-center flex-wrap gap-2">
                  <span>
                    {edu.startDate} - {edu.endDate}
                  </span>
                  {edu.grade && (
                    <span className="text-xs normal-case tracking-normal px-2 py-0.5 rounded-full dark:bg-zinc-800 bg-zinc-200 text-zinc-700 dark:text-zinc-300 font-medium">
                      GPA: {edu.grade}
                    </span>
                  )}
                </time>
                {edu.description && (
                  <p className="tracking-tight dark:text-zinc-400 text-zinc-600 my-4">
                    {edu.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </Slide>
    </section>
  );
}
