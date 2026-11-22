import Link from "next/link";
import { categories, siteConfig } from "@/config/site";
import { getAllArticles, getFacts, toCard } from "@/lib/content";
import { buildMetadata, organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FactOfTheDay, pickFactOfTheDay } from "@/components/home/FactOfTheDay";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { AdSlot } from "@/components/monetization/AdSlot";
import { VineyardIllustration } from "@/components/home/VineyardIllustration";

// Regenerate at most once an hour so "Ciekawostka dnia" changes every day without a rebuild.
export const revalidate = 3600;

export const metadata = buildMetadata({
  title: `${siteConfig.name}: ${siteConfig.tagline}`,
  description: siteConfig.description,
  path: "/",
});

export default function HomePage() {
  const articles = getAllArticles().map(toCard);
  const [featured, ...rest] = articles;
  const latest = rest.slice(0, 6);
  const { fact, dateLabel } = pickFactOfTheDay(getFacts());
  const counts = Object.fromEntries(categories.map((c) => [c.slug, articles.filter((a) => a.category === c.slug).length]));

  return (
    <>
      <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />

      {/* ───────── Hero ───────── */}
      <section className="relative overflow-hidden bg-burgundy-900 text-cream-50">
        <VineyardIllustration className="pointer-events-none absolute inset-x-0 bottom-0 h-auto w-full opacity-25" />
        <div className="container-page relative grid gap-12 py-16 md:py-24 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-20">
          <div className="animate-fade-up">
            <p className="eyebrow !text-gold-300">Magazyn o świecie wina</p>
            <h1 className="mt-4 text-4xl leading-[1.08] font-semibold !text-cream-50 md:text-6xl">
              Opowieści o winie: <span className="italic">kultura, historia</span> i&nbsp;rzemiosło
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-cream-200">
              Piszemy o tym, jak powstaje wino, skąd pochodzą szczepy, jak zmieniały się winiarskie
              krajobrazy i dokąd warto pojechać, by je zobaczyć. Rzetelnie, z ciekawością, bez reklam alkoholu.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/jak-powstaje-wino" className="rounded-full bg-cream-50 px-6 py-3 text-sm font-semibold text-burgundy-900 transition-colors hover:bg-white">
                Jak powstaje wino
              </Link>
              <Link href="/regiony-winiarskie" className="rounded-full border border-cream-50/40 px-6 py-3 text-sm font-semibold text-cream-50 transition-colors hover:bg-white/10">
                Mapa regionów
              </Link>
            </div>
          </div>
          <div className="rounded-sm border border-gold-300/30 bg-burgundy-950/60 p-8 backdrop-blur-sm md:p-10">
            <FactOfTheDay fact={fact} dateLabel={dateLabel} />
          </div>
        </div>
      </section>

      {/* ───────── Latest ───────── */}
      <section aria-labelledby="najnowsze" className="container-page pt-20">
        <SectionHeading id="najnowsze" eyebrow="Z ostatnich numerów" title="Najnowsze artykuły" />
        {featured && <ArticleCard article={featured} variant="feature" priority headingLevel="h3" />}
        <div className="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {latest.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      </section>

      {/* ───────── Categories ───────── */}
      <section aria-labelledby="dzialy" className="mt-24 bg-cream-50 py-20">
        <div className="container-page">
          <SectionHeading id="dzialy" eyebrow="Działy magazynu" title="Odkrywaj świat wina" />
          <ul className="grid gap-px overflow-hidden rounded-sm border border-cream-300 bg-cream-300 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((c, i) => (
              <li key={c.slug} className="bg-cream-50">
                <Link href={`/${c.slug}`} className="group flex h-full flex-col p-8 transition-colors hover:bg-white">
                  <span className="font-serif text-sm text-gold-700">{String(i + 1).padStart(2, "0")}</span>
                  <span className="mt-3 font-serif text-2xl font-semibold text-ink group-hover:text-burgundy-700">{c.name}</span>
                  <span className="mt-2 text-sm leading-relaxed text-ink-muted">{c.description}</span>
                  <span className="mt-auto pt-6 text-xs font-medium text-burgundy-700">
                    {counts[c.slug] ? `Artykuły: ${counts[c.slug]}` : "Wkrótce nowe teksty"} <span aria-hidden="true">→</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="container-page">
        <AdSlot slot="home-middle" />
      </div>

      {/* ───────── Glossary & quiz ───────── */}
      <section aria-label="Słowniczek i quiz" className="container-page grid gap-8 md:grid-cols-2">
        <Link href="/slowniczek" className="group rounded-sm border border-cream-300 bg-white p-10 transition-shadow hover:shadow-md">
          <p className="eyebrow">Od A do Z</p>
          <h2 className="mt-3 text-3xl font-semibold group-hover:text-burgundy-700">Słowniczek winiarski</h2>
          <p className="mt-3 leading-relaxed text-ink-muted">
            Apelacja, botrytis, kupaż, terroir. Najważniejsze pojęcia ze świata wina wyjaśnione krótko i po polsku.
          </p>
          <span className="mt-6 inline-block text-sm font-semibold text-burgundy-700">Otwórz słowniczek →</span>
        </Link>
        <Link href="/quiz" className="group rounded-sm border border-cream-300 bg-white p-10 transition-shadow hover:shadow-md">
          <p className="eyebrow">Quiz</p>
          <h2 className="mt-3 text-3xl font-semibold group-hover:text-burgundy-700">Sprawdź swoją wiedzę o winie</h2>
          <p className="mt-3 leading-relaxed text-ink-muted">
            Pytania o historię, szczepy i techniki winiarskie, z wyjaśnieniem do każdej odpowiedzi.
          </p>
          <span className="mt-6 inline-block text-sm font-semibold text-burgundy-700">Rozpocznij quiz →</span>
        </Link>
      </section>

      {/* ───────── Newsletter ───────── */}
      <section aria-labelledby="newsletter" className="container-page mt-24">
        <div className="grid gap-10 rounded-sm bg-burgundy-700 px-8 py-14 text-cream-50 md:grid-cols-[1fr_1.2fr] md:items-center md:px-14">
          <div>
            <p className="eyebrow !text-gold-300">Newsletter</p>
            <h2 id="newsletter" className="mt-3 text-3xl font-semibold !text-cream-50 md:text-4xl">
              Raz w miesiącu, bez pośpiechu
            </h2>
            <p className="mt-4 leading-relaxed text-cream-200">
              Najciekawsze artykuły, nowe hasła w słowniczku i kalendarz winobrań. Tylko treści edukacyjne, zero reklam alkoholu.
            </p>
          </div>
          <NewsletterForm dark />
        </div>
      </section>
    </>
  );
}
