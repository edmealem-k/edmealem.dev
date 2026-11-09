import { heroes } from "@/app/data/heroes";
import EasterEgg from "../shared/EasterEgg";
import { Slide } from "../../animation/Slide";
import RefLink from "../shared/RefLink";

export default function Heroes() {
  if (heroes.length === 0) return null;

  return (
    <section className="mt-32 max-w-5xl">
      <Slide delay={0.17}>
        <h2 className="text-4xl mb-4 font-bold tracking-tight">Heroes</h2>
        <p className="dark:text-zinc-400 text-zinc-600 max-w-2xl">
          Curated lineup of engineers, builders, and thinkers whose work inspires me.
        </p>
      </Slide>

      <ul className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6 mt-12 tracking-tight">
        {heroes.map((heroe) => (
          <li
            key={heroe._id}
            className="flex items-center gap-x-2 dark:bg-primary-bg bg-zinc-100 border dark:border-zinc-800 border-zinc-200 rounded-md px-2 py-1"
          >
            <EasterEgg isMet={heroe.met} />
            <RefLink
              href={heroe.url}
              className={`font-incognito tracking-wide hover:underline ${
                heroe.met ? "dark:text-green-300 text-green-800" : ""
              }`}
            >
              {heroe.name}
            </RefLink>
          </li>
        ))}
      </ul>
    </section>
  );
}
