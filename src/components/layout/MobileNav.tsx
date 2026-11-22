"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";

interface Props {
  items: { href: string; label: string }[];
}

/** Accessible disclosure menu for small screens. */
export function MobileNav({ items }: Props) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const menuId = useId();

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        className="text-ink hover:bg-cream-200 inline-flex h-11 w-11 items-center justify-center rounded-full"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="sr-only">{open ? "Zamknij menu" : "Otwórz menu"}</span>
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        >
          {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
        </svg>
      </button>
      <nav
        id={menuId}
        aria-label="Menu mobilne"
        hidden={!open}
        className="border-cream-300 bg-cream-100 absolute inset-x-0 top-full border-b shadow-sm"
      >
        <ul className="container-page divide-cream-200 divide-y py-2">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-ink hover:text-burgundy-700 block py-3 font-serif text-lg"
                aria-current={pathname === item.href ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
