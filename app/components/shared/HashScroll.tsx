// "use client";
import Link from "next/link";

type props = {
  text: React.ReactNode;
  id?: string;
  event?: any;
};

// export const scrollTop = (header: HTMLHeadingElement) => {
//   header.scrollIntoView({ behavior: "smooth" });
// };

export const slugify = (text: React.ReactNode): string =>
  (text?.toString() || "")
    .toLowerCase()
    .replaceAll(/[^-\w]+/g, "-")
    .replaceAll(/--+/g, "-")
    .replace(/^-|-$/g, "");

export default function HashScroll({ text, id, event }: props) {
  return (
    <Link
      onClick={event}
      href={`#${id || slugify(text)}`}
    >
      {text}
    </Link>
  );
}
