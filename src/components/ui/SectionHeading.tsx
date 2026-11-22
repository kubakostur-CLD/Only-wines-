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
    <div className="mb-10 flex items-end justify-between gap-6 border-b border-cream-300 pb-5">
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 id={id} className="mt-2 text-3xl font-semibold md:text-4xl">
          {title}
        </h2>
      </div>
      {href && (
        <Link href={href} className="link-underline shrink-0 text-sm font-medium text-burgundy-700">
          {linkLabel}
        </Link>
      )}
    </div>
  );
}
