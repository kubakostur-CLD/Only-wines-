import type { TocItem } from "@/lib/content";

/** Table of contents built from the article's ## and ### headings. */
export function TableOfContents({ items }: { items: TocItem[] }) {
  if (items.length < 2) return null;
  const list = (
    <ol className="mt-3 space-y-2 text-sm">
      {items.map((item) => (
        <li key={item.id} className={item.level === 3 ? "pl-4" : ""}>
          <a
            href={`#${item.id}`}
            className="text-ink-muted hover:text-burgundy-700 block leading-snug transition-colors"
          >
            {item.text}
          </a>
        </li>
      ))}
    </ol>
  );
  return (
    <nav aria-label="Spis treści">
      {/* Mobile: collapsible */}
      <details className="border-cream-300 bg-cream-50 rounded-sm border p-4 lg:hidden">
        <summary className="cursor-pointer text-sm font-semibold">Spis treści</summary>
        {list}
      </details>
      {/* Desktop: always visible, sticky */}
      <div className="hidden lg:block">
        <p className="eyebrow">Spis treści</p>
        {list}
      </div>
    </nav>
  );
}
