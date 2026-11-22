import { notFound } from "next/navigation";
import { categories, categoryBySlug, type CategorySlug } from "@/config/site";
import { getArticlesByCategory, getRegions, toCard } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/ui/PageHeader";
import { ArticleFilter } from "@/components/ui/ArticleFilter";
import { WineMap } from "@/components/map/WineMap";
import { AdSlot } from "@/components/monetization/AdSlot";

// Only the six known categories exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((c) => ({ kategoria: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[kategoria]">) {
  const { kategoria } = await params;
  const category = categoryBySlug(kategoria);
  if (!category) return {};
  return buildMetadata({
    title: category.name,
    description: category.seoDescription,
    path: `/${category.slug}`,
  });
}

export default async function CategoryPage({ params }: PageProps<"/[kategoria]">) {
  const { kategoria } = await params;
  const category = categoryBySlug(kategoria);
  if (!category) notFound();

  const articles = getArticlesByCategory(category.slug as CategorySlug).map(toCard);

  return (
    <>
      <PageHeader
        eyebrow="Dział"
        title={category.name}
        lead={category.description}
        crumbs={[{ name: category.name, href: `/${category.slug}` }]}
      />
      {category.slug === "regiony-winiarskie" && (
        <section aria-labelledby="mapa" className="container-page pt-14">
          <h2 id="mapa" className="text-3xl font-semibold">
            Interaktywna mapa regionów winiarskich
          </h2>
          <p className="text-ink-muted mt-2 max-w-2xl">
            Wybierz punkt na mapie lub z listy, aby poznać klimat, szczepy i charakter regionu.
          </p>
          <div className="mt-8">
            <WineMap regions={getRegions()} />
          </div>
        </section>
      )}
      <div className="container-page pt-14">
        <ArticleFilter articles={articles} />
        <AdSlot slot="listing-bottom" />
      </div>
    </>
  );
}
