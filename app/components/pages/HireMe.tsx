import { SiUpwork } from "react-icons/si";
import { BiEnvelope, BiLinkExternal, BiCheckCircle } from "react-icons/bi";
import { Slide } from "../../animation/Slide";
import { siteConfig } from "@/config/site";

const upworkProfileUrl =
  siteConfig.social.upwork ||
  "https://www.upwork.com/freelancers/~01d523ce2f1c1dc881";

export default function HireMe() {
  return (
    <section className="mt-32" id="hire-me">
      <Slide delay={0.16}>
        <div className="mb-12">
          <h2 className="font-incognito text-4xl mb-4 font-bold tracking-tight">
            Work With Me
          </h2>
          <p className="dark:text-zinc-400 text-zinc-600 max-w-2xl text-base leading-relaxed">
            Need a reliable software engineer to build or scale your product? I am
            available for freelance contracts, full-stack SaaS development, and backend API engineering.
          </p>
        </div>
      </Slide>

      <Slide delay={0.18}>
        <div className="relative overflow-hidden rounded-2xl border dark:border-zinc-800 border-zinc-200 dark:bg-gradient-to-br dark:from-zinc-900/70 dark:via-zinc-900/30 dark:to-zinc-950 bg-gradient-to-br from-zinc-50 via-zinc-100/60 to-zinc-50 p-8 sm:p-10 shadow-sm">
          {/* Subtle decorative glow */}
          <div
            className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 pb-8 border-b dark:border-zinc-800/80 border-zinc-200">
            <div>
              {/* Status pills */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium dark:bg-emerald-950/60 bg-emerald-50 text-emerald-600 dark:text-emerald-400 border dark:border-emerald-800/50 border-emerald-200">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  Available for Hire
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-medium dark:bg-zinc-800/80 bg-zinc-200/70 text-zinc-700 dark:text-zinc-300">
                  $18.00 / hr
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-medium dark:bg-zinc-800/80 bg-zinc-200/70 text-zinc-700 dark:text-zinc-300">
                  30+ hrs / week
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-medium dark:bg-zinc-800/80 bg-zinc-200/70 text-zinc-700 dark:text-zinc-300">
                  ⚡ 0–4 hr response time
                </span>
              </div>

              <h3 className="font-incognito text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 mb-3">
                Full-Stack & Backend Software Engineer
              </h3>
              <p className="dark:text-zinc-400 text-zinc-600 max-w-2xl text-sm sm:text-base leading-relaxed">
                Specializing in the modern TypeScript ecosystem (Next.js, Node.js, NestJS, Hono)
                and Go (Golang). From relational database modeling in PostgreSQL to high-throughput
                APIs and accessible web applications, I deliver maintainable, type-safe code that scales.
              </p>
            </div>

            {/* CTA action buttons */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 min-w-[220px]">
              <a
                href={upworkProfileUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 bg-[#14a800] hover:bg-[#108a00] text-white shadow-md hover:shadow-emerald-500/20 active:scale-[0.98]"
              >
                <SiUpwork className="text-xl" />
                <span>Hire on Upwork</span>
                <BiLinkExternal className="text-sm opacity-80" />
              </a>

              {siteConfig.email && (
                <a
                  href={`mailto:${siteConfig.email}?subject=Project%20Inquiry%20via%20Portfolio`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 bg-zinc-200/80 hover:bg-zinc-300/80 text-zinc-800 dark:text-zinc-200 active:scale-[0.98]"
                >
                  <BiEnvelope className="text-lg" />
                  <span>Send an Email</span>
                </a>
              )}
            </div>
          </div>

          {/* Capabilities Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-semibold text-sm">
                <BiCheckCircle className="text-emerald-500 text-base flex-shrink-0" />
                <span>Backend & REST/RPC APIs</span>
              </div>
              <p className="dark:text-zinc-400 text-zinc-600 text-xs leading-relaxed">
                Node.js, NestJS, Express, Hono RPC, and Go Gin with clean service boundaries.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-semibold text-sm">
                <BiCheckCircle className="text-emerald-500 text-base flex-shrink-0" />
                <span>Database Design & ORMs</span>
              </div>
              <p className="dark:text-zinc-400 text-zinc-600 text-xs leading-relaxed">
                PostgreSQL schema architecture, indexing, migrations, and Drizzle/Prisma ORMs.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-semibold text-sm">
                <BiCheckCircle className="text-emerald-500 text-base flex-shrink-0" />
                <span>Multi-Tenant SaaS & Auth</span>
              </div>
              <p className="dark:text-zinc-400 text-zinc-600 text-xs leading-relaxed">
                Tenant isolation, RBAC permissions, session cookies, and RS256 JWT security.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-semibold text-sm">
                <BiCheckCircle className="text-emerald-500 text-base flex-shrink-0" />
                <span>Queues & Async Jobs</span>
              </div>
              <p className="dark:text-zinc-400 text-zinc-600 text-xs leading-relaxed">
                Redis and BullMQ task queues with retry policies and dead-letter queues.
              </p>
            </div>
          </div>
        </div>
      </Slide>
    </section>
  );
}
