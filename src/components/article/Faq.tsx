/** FAQ section (accessible disclosure widgets). JSON-LD is added by the article page. */
export function Faq({ items }: { items: { q: string; a: string }[] }) {
  if (!items.length) return null;
  return (
    <section aria-labelledby="faq" className="mt-14">
      <h2 id="faq" className="text-2xl font-semibold md:text-3xl">
        Najczęściej zadawane pytania
      </h2>
      <div className="divide-cream-300 border-cream-300 mt-6 divide-y border-y">
        {items.map((f) => (
          <details key={f.q} className="group py-4">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-serif text-lg font-semibold">
              {f.q}
              <span
                aria-hidden="true"
                className="text-gold-700 mt-1 transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="text-ink-muted mt-3 leading-relaxed">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
