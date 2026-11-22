import Link from "next/link";

/** Typographic wordmark – no image request, crisp at every size. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-baseline font-serif text-2xl font-semibold tracking-tight text-burgundy-700 ${className}`}
      aria-label="OnlyWines.pl – strona główna"
    >
      <span>Only</span>
      <span className="italic">Wines</span>
      <span className="ml-0.5 text-base font-normal text-gold-700">.pl</span>
    </Link>
  );
}
