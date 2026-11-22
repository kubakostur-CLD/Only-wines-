const variants = {
  ciekawostka: { label: "Ciekawostka", cls: "border-gold-500 bg-cream-50" },
  info: { label: "Warto wiedzieć", cls: "border-burgundy-300 bg-burgundy-50/50" },
  definicja: { label: "Definicja", cls: "border-ink/30 bg-white" },
} as const;

/** Highlighted note inside articles: <Callout type="ciekawostka">…</Callout> */
export function Callout({
  type = "info",
  title,
  children,
}: {
  type?: keyof typeof variants;
  title?: string;
  children: React.ReactNode;
}) {
  const v = variants[type] ?? variants.info;
  return (
    <aside className={`not-prose my-8 border-l-2 px-5 py-4 ${v.cls}`}>
      <p className="eyebrow">{title ?? v.label}</p>
      <div className="mt-2 text-[0.975rem] leading-relaxed text-ink [&_a]:text-burgundy-700 [&_a]:underline [&_p+p]:mt-3">
        {children}
      </div>
    </aside>
  );
}
