"use client";

import { useRef, useState } from "react";
import { BiCopy } from "react-icons/bi";
import { RiCheckboxCircleFill } from "react-icons/ri";

export default function CodeBlockWrapper({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLPreElement>) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    if (!preRef.current) return;
    const text = preRef.current.innerText || "";
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  // Detect language if specified on pre/code className
  const langMatch = className?.match(/language-([a-zA-Z0-9_-]+)/);
  const language = langMatch ? langMatch[1] : "";

  return (
    <div className="my-6">
      <div className="flex items-center justify-between bg-zinc-50 dark:bg-[#141414] border dark:border-zinc-800 border-zinc-200 rounded-t-lg px-4 py-3 translate-y-2">
        <p className="text-sm font-mono text-zinc-500 uppercase">{language}</p>
        <button
          onClick={handleCopy}
          aria-label="Copy code"
          className="text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 transition"
        >
          {copied ? (
            <RiCheckboxCircleFill className="text-secondary-color transition" />
          ) : (
            <BiCopy />
          )}
        </button>
      </div>
      <pre
        ref={preRef}
        className={`text-sm border-x border-b dark:border-zinc-800 border-zinc-200 rounded-b-lg tracking-normal p-4 overflow-x-auto dark:bg-zinc-900 bg-zinc-50 ${className ?? ""}`}
        {...props}
      >
        {children}
      </pre>
    </div>
  );
}
