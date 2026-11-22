import Link from "next/link";
import { getPartner, partnerCategoryLabels, type PartnerId } from "@/config/partners";
import { AffiliateLink } from "./AffiliateLink";

export interface PartnerBoxItem {
  partner: PartnerId;
  query?: string;
  label?: string;
}

interface Props {
  /** Box heading, e.g. "Planujesz podróż do Tokaju?" */
  title?: string;
  /** Short neutral description. */
  description?: string;
  /** Either a list of items… */
  items?: PartnerBoxItem[];
  /** …or a single partner (convenient inside MDX: <PartnerBox partner="booking" query="Tokaj" />). */
  partner?: PartnerId;
  query?: string;
  label?: string;
}

/**
 * Clearly-labelled box with partner links (wine tourism, accommodation, education, accessories).
 * Visually separated from editorial content and always marked "Link partnerski".
 */
export function PartnerBox({ title = "Przydatne w podróży", description, items, partner, query, label }: Props) {
  const list: PartnerBoxItem[] = items ?? (partner ? [{ partner, query, label }] : []);
  if (!list.length) return null;

  return (
    <aside
      aria-label="Linki partnerskie"
      className="not-prose my-10 rounded-sm border border-gold-500/40 bg-cream-50 p-6 sm:p-7"
    >
      <div className="flex items-center justify-between gap-4">
        <p className="eyebrow">Link partnerski</p>
        <Link href="/linki-partnerskie" className="text-xs text-ink-muted underline-offset-2 hover:underline">
          Co to oznacza?
        </Link>
      </div>
      <h3 className="mt-2 font-serif text-xl font-semibold text-ink">{title}</h3>
      {description && <p className="mt-2 text-sm leading-relaxed text-ink-muted">{description}</p>}
      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
        {list.map((item) => {
          const p = getPartner(item.partner);
          return (
            <li key={`${item.partner}-${item.query ?? ""}`} className="rounded-sm border border-cream-300 bg-white p-4">
              <p className="text-xs text-ink-muted">
                {partnerCategoryLabels[p.category]} · {p.name}
              </p>
              <AffiliateLink
                partner={item.partner}
                query={item.query}
                className="mt-1.5 text-sm font-semibold text-burgundy-700 hover:text-burgundy-900"
              >
                {item.label ?? p.defaultLabel}
              </AffiliateLink>
            </li>
          );
        })}
      </ul>
      <p className="mt-4 text-xs leading-relaxed text-ink-muted">
        Jeśli skorzystasz z linku, możemy otrzymać prowizję. Nie wpływa to na koszt usługi ani na
        treść naszych artykułów. Nie współpracujemy ze sprzedawcami alkoholu.
      </p>
    </aside>
  );
}
