/**
 * Content layer: reads MDX articles and JSON data from /content at build time.
 *
 * - Articles: /content/artykuly/<slug>.mdx (frontmatter validated with zod).
 * - Data:     /content/*.json (facts, glossary, quiz, regions, authors).
 *
 * Everything here runs on the server only (uses the filesystem).
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import GithubSlugger from "github-slugger";
import { cache } from "react";
import { z } from "zod";
import { categories, type CategorySlug } from "@/config/site";
import { partnerIds } from "@/config/partners";

const CONTENT_DIR = path.join(process.cwd(), "content");
const ARTICLES_DIR = path.join(CONTENT_DIR, "artykuly");

/* ─────────────────────────────── Schemas ─────────────────────────────── */

const categorySlugs = categories.map((c) => c.slug) as [CategorySlug, ...CategorySlug[]];

/** Polish SEO slug: lowercase ASCII letters, digits and hyphens only. */
const slugSchema = z
  .string()
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "Slug: tylko małe litery bez polskich znaków, cyfry i myślniki",
  );

export const articleFrontmatterSchema = z.object({
  title: z.string().min(10).max(110),
  slug: slugSchema,
  category: z.enum(categorySlugs),
  excerpt: z.string().min(50).max(260),
  /** Optional SEO description (defaults to excerpt). Aim for 120–160 characters. */
  seoDescription: z.string().max(170).optional(),
  date: z.coerce.date(),
  updated: z.coerce.date().optional(),
  author: z.string().default("redakcja"),
  tags: z.array(z.string()).default([]),
  cover: z.object({
    src: z.string().startsWith("/"),
    alt: z.string().min(10, "Alt tekst okładki musi opisywać obraz (min. 10 znaków)"),
    credit: z.string().optional(),
  }),
  /** Links the article to a point on the regions map (id from content/regiony.json). */
  region: z.string().optional(),
  faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
  /** Partner boxes shown under the article (ids from src/config/partners.ts). */
  partners: z
    .array(
      z.object({
        id: z.enum(partnerIds),
        query: z.string().optional(),
        label: z.string().optional(),
      }),
    )
    .default([]),
  /** Editor confirms that docs/content-guidelines.md was followed. Required to publish. */
  complianceChecked: z.literal(true, {
    error: "Uzupełnij complianceChecked: true po przejściu checklisty z docs/content-guidelines.md",
  }),
  /** Set to true to keep an article out of the site while drafting. */
  draft: z.boolean().default(false),
});

export type ArticleFrontmatter = z.infer<typeof articleFrontmatterSchema>;

export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

export interface Article extends Omit<ArticleFrontmatter, "date" | "updated"> {
  date: string;
  updated?: string;
  body: string;
  readingMinutes: number;
  wordCount: number;
  toc: TocItem[];
  path: string;
}

/** Lightweight version passed to client components (no body). */
export type ArticleCard = Pick<
  Article,
  "title" | "slug" | "category" | "excerpt" | "date" | "tags" | "cover" | "readingMinutes" | "path"
>;

/* ─────────────────────────────── Articles ─────────────────────────────── */

/** Build table of contents from "## " and "### " headings (ids match rehype-slug). */
function extractToc(markdown: string): TocItem[] {
  const slugger = new GithubSlugger();
  const toc: TocItem[] = [];
  let inCode = false;
  for (const line of markdown.split("\n")) {
    if (line.trim().startsWith("```")) inCode = !inCode;
    if (inCode) continue;
    const m = /^(#{2,3})\s+(.+?)\s*$/.exec(line);
    if (!m) continue;
    const text = m[2].replace(/[*_`]/g, "");
    toc.push({ id: slugger.slug(text), text, level: m[1].length as 2 | 3 });
  }
  return toc;
}

function parseArticle(file: string): Article {
  const raw = fs.readFileSync(path.join(ARTICLES_DIR, file), "utf8");
  const { data, content } = matter(raw);
  const parsed = articleFrontmatterSchema.safeParse(data);
  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((i) => `  • ${i.path.join(".")}: ${i.message}`)
      .join("\n");
    throw new Error(`Błąd we frontmatterze pliku content/artykuly/${file}:\n${issues}`);
  }
  const fm = parsed.data;
  if (`${fm.slug}.mdx` !== file) {
    throw new Error(`Nazwa pliku "${file}" musi odpowiadać slugowi "${fm.slug}.mdx"`);
  }
  // Polish reads a little slower than English; ~180 words/minute.
  const stats = readingTime(content, { wordsPerMinute: 180 });
  return {
    ...fm,
    date: fm.date.toISOString(),
    updated: fm.updated?.toISOString(),
    body: content,
    readingMinutes: Math.max(1, Math.round(stats.minutes)),
    wordCount: stats.words,
    toc: extractToc(content),
    path: `/${fm.category}/${fm.slug}`,
  };
}

/** All published articles, newest first. Cached per request/build. */
export const getAllArticles = cache((): Article[] => {
  if (!fs.existsSync(ARTICLES_DIR)) return [];
  return fs
    .readdirSync(ARTICLES_DIR)
    .filter((f) => f.endsWith(".mdx") && !f.startsWith("_"))
    .map(parseArticle)
    .filter((a) => !a.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
});

export const toCard = (a: Article): ArticleCard => ({
  title: a.title,
  slug: a.slug,
  category: a.category,
  excerpt: a.excerpt,
  date: a.date,
  tags: a.tags,
  cover: a.cover,
  readingMinutes: a.readingMinutes,
  path: a.path,
});

export const getArticlesByCategory = (category: CategorySlug) =>
  getAllArticles().filter((a) => a.category === category);

export const getArticle = (category: string, slug: string) =>
  getAllArticles().find((a) => a.category === category && a.slug === slug);

/** Related articles: same category first, then by number of shared tags. */
export function getRelatedArticles(article: Article, limit = 3): Article[] {
  return getAllArticles()
    .filter((a) => a.slug !== article.slug)
    .map((a) => ({
      a,
      score:
        (a.category === article.category ? 3 : 0) +
        a.tags.filter((t) => article.tags.includes(t)).length +
        (article.region && a.region === article.region ? 2 : 0),
    }))
    .sort((x, y) => y.score - x.score || y.a.date.localeCompare(x.a.date))
    .slice(0, limit)
    .map((x) => x.a);
}

/* ─────────────────────────────── JSON data ─────────────────────────────── */

function readJson<T>(file: string, schema: z.ZodType<T>): T {
  const raw = JSON.parse(fs.readFileSync(path.join(CONTENT_DIR, file), "utf8"));
  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    throw new Error(
      `Błąd w pliku content/${file}: ${parsed.error.issues[0]?.message} (${parsed.error.issues[0]?.path.join(".")})`,
    );
  }
  return parsed.data;
}

const factSchema = z.object({
  id: z.number(),
  text: z.string().min(40),
  /** Optional link to an article for further reading, e.g. "/ciekawostki/szlachetna-plesn-botrytis-cinerea". */
  link: z.string().startsWith("/").optional(),
});
export type Fact = z.infer<typeof factSchema>;
export const getFacts = cache(() => readJson("ciekawostki-dnia.json", z.array(factSchema)));

const glossarySchema = z.object({
  term: z.string(),
  slug: slugSchema,
  definition: z.string().min(30),
  /** Optional related article path. */
  link: z.string().startsWith("/").optional(),
});
export type GlossaryEntry = z.infer<typeof glossarySchema>;
export const getGlossary = cache(() =>
  readJson("slowniczek.json", z.array(glossarySchema)).sort((a, b) =>
    a.term.localeCompare(b.term, "pl"),
  ),
);

const quizSchema = z.object({
  question: z.string(),
  options: z.array(z.string()).min(2).max(5),
  answer: z.number().int().min(0),
  explanation: z.string(),
  link: z.string().startsWith("/").optional(),
});
export type QuizQuestion = z.infer<typeof quizSchema>;
export const getQuiz = cache(() => readJson("quiz.json", z.array(quizSchema)));

const regionSchema = z.object({
  id: slugSchema,
  name: z.string(),
  country: z.string(),
  lat: z.number(),
  lon: z.number(),
  climate: z.string(),
  grapes: z.array(z.string()),
  description: z.string(),
  /** Path of an article about the region (optional). */
  article: z.string().startsWith("/").optional(),
});
export type Region = z.infer<typeof regionSchema>;
export const getRegions = cache(() => readJson("regiony.json", z.array(regionSchema)));

const authorSchema = z.object({
  id: z.string(),
  name: z.string(),
  role: z.string(),
  bio: z.string(),
});
export type Author = z.infer<typeof authorSchema>;
export const getAuthor = cache((id: string): Author => {
  const authors = readJson("autorzy.json", z.array(authorSchema));
  return authors.find((a) => a.id === id) ?? authors[0];
});
