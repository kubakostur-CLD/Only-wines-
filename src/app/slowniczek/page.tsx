import Link from "next/link";
import { absoluteUrl } from "@/config/site";
import { getGlossary } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/ui/PageHeader";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata = buildMetadata({
  title: "Słowniczek winiarski od A do Z",
  description:
    "Słowniczek pojęć winiarskich: apelacja, botrytis, kupaż, maceracja, terroir i wiele innych. Krótkie, rzetelne definicje po polsku.",
  path: "/slowniczek",
});

/** First letter for grouping (Polish alphabet aware: "Ś" stays "Ś"). */
const letterOf = (term: string) => term.charAt(0).toLocaleUpperCase("pl");

export default function GlossaryPage() {
  const entries = getGlossary();
  const groups = new Map<string, typeof entries>();
  entries.forEach((e) => {
    const l = letterOf(e.term);
    groups.set(l, [...(groups.get(l) ?? []), e]);
  });
  const letters = [...groups.keys()];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "DefinedTermSet",
          name: "Słowniczek winiarski OnlyWines.pl",
          url: absoluteUrl("/slowniczek"),
          inLanguage: "pl-PL",
          hasDefinedTerm: entries.map((e) => ({
            "@type": "DefinedTerm",
            name: e.term,
            description: e.definition,
            url: absoluteUrl(`/slowniczek#${e.slug}`),
          })),
        }}
      />
      <PageHeader
        eyebrow="Od A do Z"
        title="Słowniczek winiarski"
        lead={`${entries.length} najważniejszych pojęć ze świata wina, od apelacji po winobranie. Wyjaśniamy krótko, rzetelnie i po polsku.`}
        crumbs={[{ name: "Słowniczek", href: "/slowniczek" }]}
      />
      <div className="container-page pt-10">
        <nav
          aria-label="Litery alfabetu"
          className="border-cream-300 bg-cream-100/95 sticky top-16 z-10 -mx-4 border-b px-4 py-3 backdrop-blur lg:top-20"
        >
          <ul className="flex flex-wrap gap-1">
            {letters.map((l) => (
              <li key={l}>
                <a
                  href={`#litera-${l}`}
                  className="hover:bg-burgundy-700 hover:text-cream-50 flex h-9 w-9 items-center justify-center rounded-full font-serif text-lg"
                >
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-10 space-y-14">
          {letters.map((l) => (
            <section
              key={l}
              id={`litera-${l}`}
              aria-labelledby={`naglowek-${l}`}
              className="grid gap-6 md:grid-cols-[6rem_1fr]"
            >
              <h2 id={`naglowek-${l}`} className="text-gold-700 font-serif text-6xl leading-none">
                {l}
              </h2>
              <dl className="divide-cream-300 border-cream-300 divide-y border-t">
                {groups.get(l)!.map((e) => (
                  <div
                    key={e.slug}
                    id={e.slug}
                    className="grid gap-2 py-6 md:grid-cols-[14rem_1fr] md:gap-8"
                  >
                    <dt className="font-serif text-xl font-semibold">{e.term}</dt>
                    <dd className="text-ink-muted leading-relaxed">
                      {e.definition}
                      {e.link && (
                        <>
                          {" "}
                          <Link
                            href={e.link}
                            className="link-underline text-burgundy-700 whitespace-nowrap"
                          >
                            Czytaj więcej
                          </Link>
                        </>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
