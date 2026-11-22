import { absoluteUrl, categoryBySlug, siteConfig } from "@/config/site";
import { getAllArticles } from "@/lib/content";

/** RSS 2.0 feed with the 30 newest articles (statically generated at build). */
export const dynamic = "force-static";

const escape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function GET() {
  const items = getAllArticles()
    .slice(0, 30)
    .map(
      (a) => `    <item>
      <title>${escape(a.title)}</title>
      <link>${absoluteUrl(a.path)}</link>
      <guid isPermaLink="true">${absoluteUrl(a.path)}</guid>
      <description>${escape(a.excerpt)}</description>
      <category>${escape(categoryBySlug(a.category)?.name ?? a.category)}</category>
      <pubDate>${new Date(a.date).toUTCString()}</pubDate>
    </item>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(siteConfig.name)}</title>
    <link>${siteConfig.url}</link>
    <description>${escape(siteConfig.description)}</description>
    <language>pl-pl</language>
    <atom:link href="${absoluteUrl("/rss.xml")}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
