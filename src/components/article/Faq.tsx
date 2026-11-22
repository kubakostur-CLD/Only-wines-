/** FAQ section (accessible disclosure widgets). JSON-LD is added by the article page. */
export function Faq({ items }: { items: { q: string; a: string }[] }) {
  if (!items.length) return null;
  return (
    <section aria-labelledby="faq" className="mt-14">
      <h2 id="faq" className="text-2xl font-semibold md:text-3xl">Najczęściej zadawane pytania</h2>
      <div className="mt-6 divide-y divide-cream-300 border-y border-cream-300">
        {items.map((f) => (
          <details key={f.q} className="group py-4">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-serif text-lg font-semibold">
              {f.q}
              <span aria-hidden="true" className="mt-1 text-gold-700 transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 leading-relaxed text-ink-muted">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
