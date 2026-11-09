import Image from "next/image";
import vercellogo from "@/public/vercel.svg";
import nextjslogo from "@/public/nextjs.svg";
import { siteConfig } from "@/config/site";

export default function Footer() {
  return (
    <footer className="border-t dark:border-zinc-800 border-zinc-100 mt-44 lg:min-h-[250px] min-h-full relative">
      <div className="max-w-7xl mx-auto flex lg:flex-row flex-col items-center lg:justify-between justify-center gap-y-4 md:px-16 px-6 py-16">
        <div className="flex md:flex-row flex-col items-center gap-x-2">
          <h3 className="font-inter">Built with:</h3>
          <ul className="flex items-center gap-x-4 text-sm dark:text-zinc-400 text-zinc-600 md:mt-0 mt-3">
            <li>
              <a
                href="https://nextjs.org"
                rel="noreferrer noopener"
                target="_blank"
                className="flex items-center gap-x-2 dark:text-white text-zinc-600 hover:underline"
              >
                <Image
                  src={nextjslogo}
                  width={20}
                  height={20}
                  alt="Next.js logo"
                  style={{ width: "auto", height: "auto" }}
                />{" "}
                Next.js
              </a>
            </li>
            <li>
              <a
                href="https://vercel.com"
                rel="noreferrer noopener"
                target="_blank"
                className="flex items-center gap-x-2 dark:text-white text-zinc-600 hover:underline"
              >
                <Image
                  src={vercellogo}
                  width={20}
                  height={20}
                  alt="Vercel logo"
                  style={{ width: "auto", height: "auto" }}
                />{" "}
                Vercel
              </a>
            </li>
          </ul>
        </div>

        <div className="flex flex-col lg:items-end items-center lg:text-start text-center gap-y-1">
          <small className="text-zinc-500">
            Copyright &copy; {siteConfig.name} {new Date().getFullYear()} All rights reserved
          </small>
        </div>
      </div>
    </footer>
  );
}
