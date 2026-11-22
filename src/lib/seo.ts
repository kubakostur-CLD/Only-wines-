/**
 * SEO helpers: Next.js Metadata builders and JSON-LD (schema.org) generators.
 * Allowed schemas: Organization, WebSite, Article, BreadcrumbList, FAQPage, DefinedTermSet, Quiz.
 * Product / Offer / Review schemas are deliberately NOT used (no alcohol products).
 */
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";

interface MetaInput {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
  noindex?: boolean;
}

export function buildMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  publishedTime,
  modifiedTime,
  tags,
  noindex,
}: MetaInput): Metadata {
  const url = absoluteUrl(path);
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      ...(image ? { images: [{ url: image, width: 1200, height: 630, alt: title }] } : {}),
      ...(type === "article" ? { publishedTime, modifiedTime, tags } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}

export const organizationJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": absoluteUrl("/#organizacja"),
  name: siteConfig.name,
  url: siteConfig.url,
  logo: absoluteUrl("/icon.svg"),
  email: siteConfig.contactEmail,
});

export const websiteJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": absoluteUrl("/#strona"),
  name: siteConfig.name,
  url: siteConfig.url,
  inLanguage: siteConfig.language,
  description: siteConfig.description,
  publisher: { "@id": absoluteUrl("/#organizacja") },
});

export const breadcrumbJsonLd = (items: { name: string; href: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: absoluteUrl(item.href),
  })),
});

export const articleJsonLd = (a: {
  title: string;
  description: string;
  path: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
  section: string;
  keywords: string[];
  wordCount: number;
}) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: a.title,
  description: a.description,
  image: [absoluteUrl(a.image)],
  datePublished: a.datePublished,
  dateModified: a.dateModified ?? a.datePublished,
  inLanguage: siteConfig.language,
  articleSection: a.section,
  keywords: a.keywords.join(", "),
  wordCount: a.wordCount,
  mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(a.path) },
  author: { "@type": "Organization", name: a.authorName, url: absoluteUrl("/o-nas") },
  publisher: {
    "@id": absoluteUrl("/#organizacja"),
    "@type": "Organization",
    name: siteConfig.name,
  },
});

export const faqJsonLd = (faq: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});
