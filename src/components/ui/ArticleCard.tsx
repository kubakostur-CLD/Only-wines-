import Image from "next/image";
import Link from "next/link";
import { categoryBySlug } from "@/config/site";
import type { ArticleCard as Card } from "@/lib/content";
import { formatDate } from "@/lib/utils";

interface Props {
  article: Card;
  /** "feature" = large horizontal card, "default" = grid card, "compact" = text only */
  variant?: "default" | "feature" | "compact";
  priority?: boolean;
  headingLevel?: "h2" | "h3";
}

/** Article teaser used on the home page, listings and related articles. */
export function ArticleCard({ article, variant = "default", priority = false, headingLevel = "h3" }: Props) {
  const category = categoryBySlug(article.category);
  const Heading = headingLevel;

  if (variant === "compact") {
    return (
      <article className="group border-t border-cream-300 pt-4">
        <p className="eyebrow">{category?.name}</p>
        <Heading className="mt-1.5 text-lg leading-snug font-semibold">
          <Link href={article.path} className="transition-colors group-hover:text-burgundy-700">
            {article.title}
          </Link>
        </Heading>
        <p className="mt-1 text-xs text-ink-muted">{article.readingMinutes} min czytania</p>
      </article>
    );
  }

  const feature = variant === "feature";
  return (
    <article className={`group relative flex flex-col ${feature ? "gap-6 md:grid md:grid-cols-[1.15fr_1fr] md:items-center md:gap-10" : "gap-4"}`}>
      <div className="overflow-hidden rounded-sm bg-cream-200">
        <Image
          src={article.cover.src}
          alt={article.cover.alt}
          width={1600}
          height={900}
          priority={priority}
          sizes={feature ? "(min-width: 768px) 55vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
          className="aspect-[16/9] h-auto w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      </div>
      <div>
        <p className="eyebrow">{category?.name}</p>
        <Heading className={`mt-2 leading-tight font-semibold ${feature ? "text-3xl md:text-4xl" : "text-xl"}`}>
          <Link
            href={article.path}
            className="transition-colors after:absolute after:inset-0 after:content-[''] group-hover:text-burgundy-700"
          >
            {article.title}
          </Link>
        </Heading>
        <p className={`mt-3 leading-relaxed text-ink-muted ${feature ? "text-base md:text-lg" : "line-clamp-3 text-sm"}`}>
          {article.excerpt}
        </p>
        <p className="mt-4 text-xs text-ink-muted">
          <time dateTime={article.date}>{formatDate(article.date)}</time>
          <span aria-hidden="true" className="mx-2 text-gold-500">•</span>
          {article.readingMinutes} min czytania
        </p>
      </div>
    </article>
  );
}
