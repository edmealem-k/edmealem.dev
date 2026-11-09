import { usageData } from "@/app/data/usage";
import RefLink from "../shared/RefLink";
import Favicon from "../../utils/favicon";

export default function Usage() {
  return (
    <section className="max-w-2xl">
      <div className="mb-8">
        <h2 className="text-4xl mb-4 font-bold tracking-tight">Usage</h2>
        <p className="dark:text-zinc-400 text-zinc-600 max-w-xl">
          Tools, technologies and platforms I use regularly.
        </p>
      </div>

      <div className="space-y-8">
        {usageData.map((category) => (
          <div key={category.title}>
            <h3 className="font-incognito text-2xl font-semibold tracking-tight mt-6 mb-3">
              {category.title}
            </h3>
            <ul className="list-none space-y-3 dark:text-zinc-400 text-zinc-600">
              {category.items.map((item) => (
                <li key={item.name} className="flex items-center gap-2">
                  {item.url ? (
                    <RefLink
                      href={item.url}
                      className="font-medium inline-flex items-center justify-start gap-x-2 dark:text-blue-400 text-blue-500 hover:underline"
                    >
                      <Favicon domain={item.url} alt={item.name} />
                      {item.name}
                    </RefLink>
                  ) : (
                    <span>{item.name}</span>
                  )}
                  {item.description && (
                    <span className="text-sm text-zinc-500">— {item.description}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
