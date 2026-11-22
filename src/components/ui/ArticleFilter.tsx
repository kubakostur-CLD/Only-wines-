"use client";

import { useMemo, useState } from "react";
import type { ArticleCard as Card } from "@/lib/content";
import { ArticleCard } from "./ArticleCard";

/**
 * Client-side filtering for category listings: text search, tag chips and sort order.
 * Data is small (cards only), so filtering in the browser keeps pages fully static.
 */
export function ArticleFilter({ articles }: { articles: Card[] }) {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState<string | null>(null);
  const [sort, setSort] = useState<"newest" | "oldest" | "shortest">("newest");

  const tags = useMemo(() => {
    const counts = new Map<string, number>();
    articles.forEach((a) => a.tags.forEach((t) => counts.set(t, (counts.get(t) ?? 0) + 1)));
    return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "pl")).slice(0, 14).map(([t]) => t);
  }, [articles]);

  const visible = useMemo(() => {
    const q = query.trim().toLocaleLowerCase("pl");
    const list = articles.filter(
      (a) =>
        (!tag || a.tags.includes(tag)) &&
        (!q || `${a.title} ${a.excerpt} ${a.tags.join(" ")}`.toLocaleLowerCase("pl").includes(q)),
    );
    return [...list].sort((a, b) =>
      sort === "newest" ? b.date.localeCompare(a.date) : sort === "oldest" ? a.date.localeCompare(b.date) : a.readingMinutes - b.readingMinutes,
    );
  }, [articles, query, tag, sort]);

  return (
    <div>
      <div className="flex flex-col gap-4 border-b border-cream-300 pb-6 md:flex-row md:items-center md:justify-between">
        <div role="group" aria-label="Filtruj według tematu" className="flex flex-wrap gap-2">
          <button type="button" onClick={() => setTag(null)} aria-pressed={tag === null} className="chip">
            Wszystkie
          </button>
          {tags.map((t) => (
            <button key={t} type="button" onClick={() => setTag(tag === t ? null : t)} aria-pressed={tag === t} className="chip">
              {t}
            </button>
          ))}
        </div>
        <div className="flex shrink-0 gap-3">
          <label className="sr-only" htmlFor="szukaj">Szukaj w dziale</label>
          <input
            id="szukaj"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Szukaj…"
            className="h-10 w-full rounded-full border border-cream-300 bg-white px-4 text-sm focus:border-burgundy-700 focus:outline-none md:w-48"
          />
          <label className="sr-only" htmlFor="sortuj">Sortuj</label>
          <select
            id="sortuj"
            value={sort}
            onChange={(e) => setSort(e.target.value as typeof sort)}
            className="h-10 rounded-full border border-cream-300 bg-white px-3 text-sm focus:border-burgundy-700 focus:outline-none"
          >
            <option value="newest">Najnowsze</option>
            <option value="oldest">Najstarsze</option>
            <option value="shortest">Najkrótsze</option>
          </select>
        </div>
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        Wyniki: {visible.length}
      </p>

      {visible.length ? (
        <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((a, i) => (
            <ArticleCard key={a.slug} article={a} headingLevel="h2" priority={i < 3} />
          ))}
        </div>
      ) : (
        <p className="mt-12 text-ink-muted">Brak artykułów spełniających kryteria. Spróbuj innego filtra.</p>
      )}
    </div>
  );
}
