import Link from "next/link";

/** Section title with gold ornament and optional "see all" link. */
export function SectionHeading({
  eyebrow,
  title,
  href,
  linkLabel = "Zobacz wszystkie",
  id,
}: {
  eyebrow?: string;
  title: string;
  href?: string;
  linkLabel?: string;
  id?: string;
}) {
  return (
    <div className="border-cream-300 mb-10 flex items-end justify-between gap-6 border-b pb-5">
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 id={id} className="mt-2 text-3xl font-semibold md:text-4xl">
          {title}
        </h2>
      </div>
      {href && (
        <Link href={href} className="link-underline text-burgundy-700 shrink-0 text-sm font-medium">
          {linkLabel}
        </Link>
      )}
    </div>
  );
}
