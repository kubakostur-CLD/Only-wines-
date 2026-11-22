import { renderOg, ogSize } from "@/lib/og";
import { categoryBySlug } from "@/config/site";
import { getAllArticles, getArticle } from "@/lib/content";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Okładka artykułu OnlyWines.pl";

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ kategoria: a.category, slug: a.slug }));
}

export default async function Image({ params }: { params: Promise<{ kategoria: string; slug: string }> }) {
  const { kategoria, slug } = await params;
  const article = getArticle(kategoria, slug);
  return renderOg({
    title: article?.title ?? "OnlyWines.pl",
    eyebrow: categoryBySlug(kategoria)?.name ?? "Magazyn",
  });
}
