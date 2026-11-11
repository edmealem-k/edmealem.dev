import GithubSlugger from "github-slugger";

export type ArticleHeading = {
  depth: 2 | 3;
  id: string;
  text: string;
};

function stripMarkdown(text: string): string {
  return text
    .replace(/[ \t]+#+[ \t]*$/, "")
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/[*_~]/g, "")
    .trim();
}

export function extractArticleHeadings(markdown: string): ArticleHeading[] {
  const slugger = new GithubSlugger();
  const headings: ArticleHeading[] = [];
  let fenceCharacter: "`" | "~" | null = null;

  for (const line of markdown.split(/\r?\n/)) {
    const fence = line.match(/^\s*(`{3,}|~{3,})/);
    if (fence) {
      const character = fence[1][0] as "`" | "~";
      fenceCharacter = fenceCharacter === character ? null : character;
      continue;
    }

    if (fenceCharacter) continue;

    const match = line.match(/^ {0,3}(#{1,6})[ \t]+(.+?)\s*$/);
    if (!match) continue;

    const depth = match[1].length;
    const text = stripMarkdown(match[2]);
    const id = slugger.slug(text);

    if (depth === 2 || depth === 3) {
      headings.push({ depth, id, text });
    }
  }

  return headings;
}
