/**
 * Content compliance check – runs automatically before every build ("prebuild")
 * and on demand with:  npm run check:content
 *
 * Fails (exit code 1) on errors; prints warnings that an editor must review manually.
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { articleFrontmatterSchema } from "../src/lib/content";
import { checkImages, checkText, type ComplianceIssue } from "../src/lib/compliance";

const ROOT = process.cwd();
const ARTICLES = path.join(ROOT, "content", "artykuly");
const results: { file: string; issues: ComplianceIssue[] }[] = [];

const color = (c: number, s: string) => (process.stdout.isTTY ? `\x1b[${c}m${s}\x1b[0m` : s);

// 1) Articles
for (const file of fs.readdirSync(ARTICLES).filter((f) => f.endsWith(".mdx") && !f.startsWith("_"))) {
  const raw = fs.readFileSync(path.join(ARTICLES, file), "utf8");
  const { data, content } = matter(raw);
  const issues: ComplianceIssue[] = [];

  const fm = articleFrontmatterSchema.safeParse(data);
  if (!fm.success) {
    for (const i of fm.error.issues) {
      issues.push({ severity: "error", rule: "frontmatter", match: i.path.join("."), line: 1, message: i.message });
    }
  }
  const bodyOffset = raw.split("\n").length - content.split("\n").length;
  const fmText = [data.title, data.excerpt, data.seoDescription, ...(data.faq ?? []).flatMap((f: { q: string; a: string }) => [f.q, f.a])]
    .filter(Boolean)
    .join("\n");
  issues.push(...checkText(fmText).map((i) => ({ ...i, line: 1, message: `[frontmatter] ${i.message}` })));
  issues.push(...checkText(content, bodyOffset), ...checkImages(content, bodyOffset));
  results.push({ file: `content/artykuly/${file}`, issues });
}

// 2) JSON content (facts, glossary, quiz, regions)
for (const file of ["ciekawostki-dnia.json", "slowniczek.json", "quiz.json", "regiony.json"]) {
  const p = path.join(ROOT, "content", file);
  if (!fs.existsSync(p)) continue;
  const text = fs.readFileSync(p, "utf8");
  results.push({ file: `content/${file}`, issues: checkText(text) });
}

// Report
let errors = 0;
let warnings = 0;
for (const { file, issues } of results) {
  if (!issues.length) continue;
  console.log(`\n${color(1, file)}`);
  for (const i of issues) {
    const tag = i.severity === "error" ? color(31, "BŁĄD") : color(33, "UWAGA");
    console.log(`  ${tag}  linia ${i.line}: „${i.match}” – ${i.message}`);
    if (i.severity === "error") errors++;
    else warnings++;
  }
}
console.log(
  `\nSprawdzono ${results.length} plików: ${color(errors ? 31 : 32, `${errors} błędów`)}, ${color(33, `${warnings} uwag do ręcznej weryfikacji`)}.`,
);
if (errors) {
  console.log(color(31, "Popraw błędy przed publikacją. Zobacz docs/content-guidelines.md."));
  process.exit(1);
}
