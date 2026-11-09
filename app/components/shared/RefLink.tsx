import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import { HTMLAttributeAnchorTarget } from "react";

export default function RefLink({
  href,
  children,
  className,
  target = "_blank",
}: {
  href: Url;
  children?: React.ReactNode;
  className?: string;
  target?: HTMLAttributeAnchorTarget;
}) {
  const finalHref =
    typeof href === "string" && href.startsWith("http")
      ? `${href}${href.includes("?") ? "&" : "?"}ref=edmealem.dev`
      : href;

  return (
    <Link
      href={finalHref}
      rel="noopener noreferrer"
      target={target}
      className={className}
    >
      {children}
    </Link>
  );
}
