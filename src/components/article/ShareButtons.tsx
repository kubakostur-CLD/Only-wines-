"use client";

import { useState } from "react";

/** Share links without third-party scripts (privacy-friendly, fast). */
export function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  const links = [
    { name: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${u}` },
    { name: "X", href: `https://x.com/intent/post?url=${u}&text=${t}` },
    { name: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}` },
    { name: "E-mail", href: `mailto:?subject=${t}&body=${u}` },
  ];

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      /* clipboard blocked */
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-sm font-semibold">Udostępnij:</span>
      {links.map((l) => (
        <a
          key={l.name}
          href={l.href}
          target={l.name === "E-mail" ? undefined : "_blank"}
          rel="noopener noreferrer"
          className="chip"
          aria-label={l.name === "E-mail" ? "Wyślij e-mailem" : `Udostępnij na ${l.name} (nowa karta)`}
        >
          {l.name}
        </a>
      ))}
      <button type="button" onClick={copy} className="chip">
        {copied ? "Skopiowano!" : "Kopiuj link"}
      </button>
      <span role="status" className="sr-only">
        {copied ? "Link skopiowany do schowka" : ""}
      </span>
    </div>
  );
}
