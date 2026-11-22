import Link from "next/link";
import type { Author } from "@/lib/content";

/** Author / editorial box shown under every article (E-E-A-T signal). */
export function AuthorBox({ author }: { author: Author }) {
  const initials = author.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);
  return (
    <section aria-label="O autorze" className="flex gap-5 rounded-sm border border-cream-300 bg-white p-6">
      <div aria-hidden="true" className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-burgundy-700 font-serif text-lg text-cream-50">
        {initials}
      </div>
      <div>
        <p className="eyebrow">{author.role}</p>
        <p className="mt-1 font-serif text-lg font-semibold">{author.name}</p>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">{author.bio}</p>
        <Link href="/o-nas" className="mt-3 inline-block text-sm font-semibold text-burgundy-700 hover:underline">
          Poznaj redakcję →
        </Link>
      </div>
    </section>
  );
}
