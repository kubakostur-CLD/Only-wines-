import type { MetadataRoute } from "next";
import { absoluteUrl, categories } from "@/config/site";
import { getAllArticles } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticles();
  const latest = articles[0]?.updated ?? articles[0]?.date;

  const staticPages = ["/slowniczek", "/quiz", "/o-nas", "/kontakt", "/wspolpraca", "/polityka-prywatnosci", "/polityka-cookies", "/regulamin", "/linki-partnerskie"];

  return [
    { url: absoluteUrl("/"), lastModified: latest, changeFrequency: "daily", priority: 1 },
    ...categories.map((c) => ({
      url: absoluteUrl(`/${c.slug}`),
      lastModified: articles.find((a) => a.category === c.slug)?.date ?? latest,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...articles.map((a) => ({
      url: absoluteUrl(a.path),
      lastModified: a.updated ?? a.date,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...staticPages.map((p) => ({ url: absoluteUrl(p), changeFrequency: "yearly" as const, priority: 0.3 })),
  ];
}
