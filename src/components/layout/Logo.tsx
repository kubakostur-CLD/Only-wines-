import Link from "next/link";

/** Typographic wordmark – no image request, crisp at every size. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`group text-burgundy-700 inline-flex items-baseline font-serif text-2xl font-semibold tracking-tight ${className}`}
      aria-label="OnlyWines.pl – strona główna"
    >
      <span>Only</span>
      <span className="italic">Wines</span>
      <span className="text-gold-700 ml-0.5 text-base font-normal">.pl</span>
    </Link>
  );
}
