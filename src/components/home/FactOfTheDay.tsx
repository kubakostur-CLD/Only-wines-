import Link from "next/link";
import type { Fact } from "@/lib/content";

/**
 * Picks the fact for "today" (Europe/Warsaw) deterministically, so everyone sees the same one.
 * The home page is regenerated hourly (ISR), so the fact changes daily without a rebuild.
 */
export function pickFactOfTheDay(
  facts: Fact[],
  now = new Date(),
): { fact: Fact; dateLabel: string } {
  const ymd = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Warsaw" }).format(now); // 2026-11-22
  const dayNumber = Math.floor(Date.parse(`${ymd}T00:00:00Z`) / 864e5);
  const fact = facts[dayNumber % facts.length];
  const dateLabel = new Intl.DateTimeFormat("pl-PL", {
    timeZone: "Europe/Warsaw",
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(now);
  return { fact, dateLabel };
}

export function FactOfTheDay({ fact, dateLabel }: { fact: Fact; dateLabel: string }) {
  return (
    <section aria-labelledby="ciekawostka-dnia" className="relative">
      <p className="eyebrow !text-gold-300">
        <span id="ciekawostka-dnia">Ciekawostka dnia</span>
        <span className="mx-2" aria-hidden="true">
          ·
        </span>
        <span className="font-normal tracking-normal normal-case">{dateLabel}</span>
      </p>
      <blockquote className="text-cream-50 mt-5 font-serif text-2xl leading-snug md:text-[2.1rem] md:leading-[1.25]">
        <p>„{fact.text}”</p>
      </blockquote>
      {fact.link && (
        <Link
          href={fact.link}
          className="text-gold-300 mt-6 inline-flex items-center gap-2 text-sm font-semibold underline-offset-4 hover:underline"
        >
          Dowiedz się więcej <span aria-hidden="true">→</span>
        </Link>
      )}
    </section>
  );
}
