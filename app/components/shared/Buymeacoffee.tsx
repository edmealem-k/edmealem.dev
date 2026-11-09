import { siteConfig } from "@/config/site";
import { BiCoffee } from "react-icons/bi";

export default function Buymeacoffee() {
  const supportUrl = siteConfig.supportUrl;

  if (!supportUrl) {
    return (
      <div className="flex items-center lg:flex-row flex-col lg:justify-between justify-center lg:text-start text-center gap-4 min-h-[90px] dark:bg-primary-bg bg-secondary-bg rounded-lg border dark:border-zinc-800 border-zinc-200 p-6">
        <div className="flex items-center gap-3">
          <BiCoffee className="text-2xl text-zinc-400" />
          <span className="text-sm dark:text-zinc-400 text-zinc-600">
            Enjoying the content? Reader support and collaboration options will be available soon.
          </span>
        </div>
      </div>
    );
  }

  return (
    <a
      href={supportUrl}
      className="flex items-center lg:flex-row flex-col lg:justify-around justify-center lg:text-start text-center gap-2 min-h-[110px] dark:bg-primary-bg bg-secondary-bg hover:dark:bg-[#2e290e44] rounded-lg border dark:border-zinc-800 border-zinc-200 hover:dark:border-[#ffdd0060] hover:border-[#e6d14fe7] duration-300 p-6 group"
      target="_blank"
      rel="noreferrer noopener"
    >
      <span className="font-medium">Do you feel like supporting my work? 🙂</span>
      <span className="px-4 py-2 bg-yellow-400 text-zinc-900 rounded-md font-semibold text-sm">
        Buy me a coffee
      </span>
    </a>
  );
}
