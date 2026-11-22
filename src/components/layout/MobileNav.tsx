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

  // Close the menu after navigation
  useEffect(() => setOpen(false), [pathname]);

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
        className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink hover:bg-cream-200"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="sr-only">{open ? "Zamknij menu" : "Otwórz menu"}</span>
        <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6">
          {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
        </svg>
      </button>
      <nav
        id={menuId}
        aria-label="Menu mobilne"
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-cream-300 bg-cream-100 shadow-sm"
      >
        <ul className="container-page divide-y divide-cream-200 py-2">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block py-3 font-serif text-lg text-ink hover:text-burgundy-700"
                aria-current={pathname === item.href ? "page" : undefined}
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
