/** Shared helpers. */

/** Join class names, skipping falsy values. */
export const cn = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

const dateFormatter = new Intl.DateTimeFormat("pl-PL", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Europe/Warsaw",
});

/** "22 listopada 2026" */
export const formatDate = (iso: string) => dateFormatter.format(new Date(iso));

/**
 * Polish plural forms: plural(5, ["minuta", "minuty", "minut"]) -> "minut".
 */
export function plural(n: number, [one, few, many]: [string, string, string]): string {
  if (n === 1) return one;
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few;
  return many;
}
