import Image from "next/image";
import { notFound } from "next/navigation";
import { absoluteUrl, categoryBySlug } from "@/config/site";
import { getAllArticles, getArticle, getAuthor, getRelatedArticles, toCard } from "@/lib/content";
import { articleJsonLd, buildMetadata, faqJsonLd } from "@/lib/seo";
import { formatDate } from "@/lib/utils";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { MdxContent } from "@/components/mdx/MdxContent";
import { TableOfContents } from "@/components/article/TableOfContents";
import { ShareButtons } from "@/components/article/ShareButtons";
import { AuthorBox } from "@/components/article/AuthorBox";
import { Faq } from "@/components/article/Faq";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { PartnerBox } from "@/components/monetization/PartnerBox";
import { AdSlot } from "@/components/monetization/AdSlot";
import { JsonLd } from "@/components/seo/JsonLd";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ kategoria: a.category, slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[kategoria]/[slug]">) {
  const { kategoria, slug } = await params;
  const article = getArticle(kategoria, slug);
  if (!article) return {};
  return buildMetadata({
    title: article.title,
    description: article.seoDescription ?? article.excerpt,
    path: article.path,
    type: "article",
    publishedTime: article.date,
    modifiedTime: article.updated ?? article.date,
    tags: article.tags,
  });
}

export default async function ArticlePage({ params }: PageProps<"/[kategoria]/[slug]">) {
  const { kategoria, slug } = await params;
  const article = getArticle(kategoria, slug);
  if (!article) notFound();

  const category = categoryBySlug(article.category)!;
  const author = getAuthor(article.author);
  const related = getRelatedArticles(article).map(toCard);

  return (
    <article>
      <JsonLd
        data={articleJsonLd({
          title: article.title,
          description: article.seoDescription ?? article.excerpt,
          path: article.path,
          image: article.cover.src,
          datePublished: article.date,
          dateModified: article.updated,
          authorName: author.name,
          section: category.name,
          keywords: article.tags,
          wordCount: article.wordCount,
        })}
      />
      {article.faq.length > 0 && <JsonLd data={faqJsonLd(article.faq)} />}

      {/* ───────── Header ───────── */}
      <header className="container-page pt-8 md:pt-12">
        <Breadcrumbs
          items={[
            { name: category.name, href: `/${category.slug}` },
            { name: article.title, href: article.path },
          ]}
        />
        <div className="mx-auto mt-10 max-w-3xl text-center">
          <p className="eyebrow">{category.name}</p>
          <h1 className="mt-4 text-4xl leading-[1.1] font-semibold md:text-[3.4rem]">{article.title}</h1>
          <p className="mt-6 text-lg leading-relaxed text-ink-muted md:text-xl">{article.excerpt}</p>
          <p className="mt-6 text-sm text-ink-muted">
            <span>{author.name}</span>
            <span aria-hidden="true" className="mx-2 text-gold-500">•</span>
            <time dateTime={article.date}>{formatDate(article.date)}</time>
            {article.updated && (
              <>
                <span aria-hidden="true" className="mx-2 text-gold-500">•</span>
                aktualizacja: <time dateTime={article.updated}>{formatDate(article.updated)}</time>
              </>
            )}
            <span aria-hidden="true" className="mx-2 text-gold-500">•</span>
            {article.readingMinutes} min czytania
          </p>
        </div>
        <figure className="mx-auto mt-10 max-w-5xl">
          <Image
            src={article.cover.src}
            alt={article.cover.alt}
            width={1600}
            height={900}
            priority
            sizes="(min-width: 1024px) 1024px, 100vw"
            className="aspect-[16/9] h-auto w-full rounded-sm object-cover"
          />
          {article.cover.credit && <figcaption className="mt-2 text-xs text-ink-muted">{article.cover.credit}</figcaption>}
        </figure>
      </header>

      {/* ───────── Body ───────── */}
      <div className="container-page mt-12 grid gap-10 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-16 xl:grid-cols-[16rem_minmax(0,46rem)]">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <TableOfContents items={article.toc} />
        </aside>
        <div className="min-w-0">
          <div className="prose prose-lg prose-wine max-w-none">
            <MdxContent source={article.body} />
          </div>

          <Faq items={article.faq} />

          {article.partners.length > 0 && (
            <PartnerBox
              title={category.slug === "enoturystyka" || article.region ? "Planujesz podróż w ten region?" : "Dowiedz się więcej"}
              description="Wybrane, sprawdzone usługi dla podróżników i miłośników wiedzy o winie."
              items={article.partners.map((p) => ({ partner: p.id, query: p.query, label: p.label }))}
            />
          )}

          <div className="mt-12 border-t border-cream-300 pt-8">
            <ShareButtons url={absoluteUrl(article.path)} title={article.title} />
          </div>
          <div className="mt-8">
            <AuthorBox author={author} />
          </div>
          <AdSlot slot="article-bottom" />
        </div>
      </div>

      {/* ───────── Related ───────── */}
      {related.length > 0 && (
        <section aria-labelledby="powiazane" className="container-page mt-20 border-t border-cream-300 pt-14">
          <h2 id="powiazane" className="text-3xl font-semibold">Czytaj także</h2>
          <div className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
