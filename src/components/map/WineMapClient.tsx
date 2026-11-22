"use client";

import Link from "next/link";
import { useState } from "react";
import type { Region } from "@/lib/content";

export interface MapViewData {
  key: "europe" | "world";
  label: string;
  ratio: number;
  markers: { id: string; x: number; y: number }[];
  background: React.ReactNode;
}

/** Interactive layer: view switcher, accessible marker buttons, region details panel. */
export function WineMapClient({ views, regions }: { views: MapViewData[]; regions: Region[] }) {
  const [viewKey, setViewKey] = useState<MapViewData["key"]>("europe");
  const [selectedId, setSelectedId] = useState<string>(regions[0]?.id);
  const selected = regions.find((r) => r.id === selectedId);
  const byId = Object.fromEntries(regions.map((r) => [r.id, r]));

  return (
    <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
      <div>
        <div role="group" aria-label="Widok mapy" className="mb-3 flex gap-2">
          {views.map((v) => (
            <button key={v.key} type="button" className="chip" aria-pressed={viewKey === v.key} onClick={() => setViewKey(v.key)}>
              {v.label}
            </button>
          ))}
        </div>
        {views.map((v) => (
          <div key={v.key} hidden={v.key !== viewKey} className="relative overflow-hidden rounded-sm border border-cream-300">
            {v.background}
            <ul aria-label={`Regiony na mapie: ${v.label}`}>
              {v.markers.map((m) => {
                const r = byId[m.id];
                const active = m.id === selectedId;
                return (
                  <li key={m.id} className="absolute" style={{ left: `${m.x}%`, top: `${m.y}%` }}>
                    <button
                      type="button"
                      onClick={() => setSelectedId(m.id)}
                      aria-pressed={active}
                      aria-label={`${r.name} (${r.country})`}
                      title={r.name}
                      className="group absolute -translate-x-1/2 -translate-y-1/2 p-2"
                    >
                      <span
                        className={`block rounded-full border-2 border-white shadow transition-transform group-hover:scale-125 ${
                          active ? "h-4 w-4 bg-burgundy-700 ring-4 ring-burgundy-700/25" : "h-3 w-3 bg-gold-700"
                        }`}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
        <p className="mt-2 text-xs text-ink-muted">Dane kartograficzne: Natural Earth (domena publiczna).</p>
      </div>

      <div>
        {selected && (
          <article aria-live="polite" className="rounded-sm border border-cream-300 bg-white p-7">
            <p className="eyebrow">{selected.country}</p>
            <h3 className="mt-2 text-2xl font-semibold">{selected.name}</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink">{selected.description}</p>
            <dl className="mt-5 space-y-3 text-sm">
              <div>
                <dt className="font-semibold">Klimat</dt>
                <dd className="text-ink-muted">{selected.climate}</dd>
              </div>
              <div>
                <dt className="font-semibold">Najważniejsze szczepy</dt>
                <dd className="text-ink-muted">{selected.grapes.join(", ")}</dd>
              </div>
            </dl>
            {selected.article && (
              <Link href={selected.article} className="mt-6 inline-block text-sm font-semibold text-burgundy-700 hover:underline">
                Przeczytaj artykuł o regionie →
              </Link>
            )}
          </article>
        )}
        <details className="mt-4 rounded-sm border border-cream-300 bg-cream-50 p-4 text-sm" open>
          <summary className="cursor-pointer font-semibold">Wszystkie regiony ({regions.length})</summary>
          <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5">
            {regions.map((r) => (
              <li key={r.id}>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedId(r.id);
                    if (!views.find((v) => v.key === viewKey)?.markers.some((m) => m.id === r.id)) setViewKey("world");
                  }}
                  aria-pressed={r.id === selectedId}
                  className={`text-left hover:text-burgundy-700 ${r.id === selectedId ? "font-semibold text-burgundy-700" : "text-ink"}`}
                >
                  {r.name}
                </button>
              </li>
            ))}
          </ul>
        </details>
      </div>
    </div>
  );
}
