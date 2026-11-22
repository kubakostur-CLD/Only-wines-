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
export function ArticleCard({
  article,
  variant = "default",
  priority = false,
  headingLevel = "h3",
}: Props) {
  const category = categoryBySlug(article.category);
  const Heading = headingLevel;

  if (variant === "compact") {
    return (
      <article className="group border-cream-300 border-t pt-4">
        <p className="eyebrow">{category?.name}</p>
        <Heading className="mt-1.5 text-lg leading-snug font-semibold">
          <Link href={article.path} className="group-hover:text-burgundy-700 transition-colors">
            {article.title}
          </Link>
        </Heading>
        <p className="text-ink-muted mt-1 text-xs">{article.readingMinutes} min czytania</p>
      </article>
    );
  }

  const feature = variant === "feature";
  return (
    <article
      className={`group relative flex flex-col ${feature ? "gap-6 md:grid md:grid-cols-[1.15fr_1fr] md:items-center md:gap-10" : "gap-4"}`}
    >
      <div className="bg-cream-200 overflow-hidden rounded-sm">
        <Image
          src={article.cover.src}
          alt={article.cover.alt}
          width={1600}
          height={900}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          sizes={
            feature
              ? "(min-width: 768px) 55vw, 100vw"
              : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          }
          className="aspect-[16/9] h-auto w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      </div>
      <div>
        <p className="eyebrow">{category?.name}</p>
        <Heading
          className={`mt-2 leading-tight font-semibold ${feature ? "text-3xl md:text-4xl" : "text-xl"}`}
        >
          <Link
            href={article.path}
            className="group-hover:text-burgundy-700 transition-colors after:absolute after:inset-0 after:content-['']"
          >
            {article.title}
          </Link>
        </Heading>
        <p
          className={`text-ink-muted mt-3 leading-relaxed ${feature ? "text-base md:text-lg" : "line-clamp-3 text-sm"}`}
        >
          {article.excerpt}
        </p>
        <p className="text-ink-muted mt-4 text-xs">
          <time dateTime={article.date}>{formatDate(article.date)}</time>
          <span aria-hidden="true" className="text-gold-500 mx-2">
            •
          </span>
          {article.readingMinutes} min czytania
        </p>
      </div>
    </article>
  );
}
