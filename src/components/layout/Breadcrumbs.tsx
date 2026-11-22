import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";

export interface Crumb {
  name: string;
  href: string;
}

/** Visible breadcrumb trail + BreadcrumbList JSON-LD. "Strona główna" is prepended automatically. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all = [{ name: "Strona główna", href: "/" }, ...items];
  return (
    <>
      <nav aria-label="Ścieżka nawigacji" className="text-ink-muted text-xs">
        <ol className="flex flex-wrap items-center gap-1.5">
          {all.map((c, i) => {
            const last = i === all.length - 1;
            return (
              <li key={c.href} className="flex items-center gap-1.5">
                {last ? (
                  <span aria-current="page" className="text-ink line-clamp-1">
                    {c.name}
                  </span>
                ) : (
                  <>
                    <Link href={c.href} className="hover:text-burgundy-700 hover:underline">
                      {c.name}
                    </Link>
                    <span aria-hidden="true" className="text-gold-500">
                      /
                    </span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbJsonLd(all)} />
    </>
  );
}
