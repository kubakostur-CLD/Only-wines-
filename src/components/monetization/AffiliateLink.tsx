import { assertAllowedUrl, getPartner, type PartnerId } from "@/config/partners";

interface Props {
  partner: PartnerId;
  /** Search phrase passed to the partner, e.g. "Tokaj wycieczka". */
  query?: string;
  children?: React.ReactNode;
  className?: string;
}

/**
 * Outbound affiliate link.
 * Always: rel="sponsored nofollow noopener", new tab, and a visible "Link partnerski" label
 * (required by UOKiK guidance on marking advertising content).
 */
export function AffiliateLink({ partner, query, children, className = "" }: Props) {
  const p = getPartner(partner);
  const href = assertAllowedUrl(p.buildUrl(query));
  return (
    <a
      href={href}
      target="_blank"
      rel="sponsored nofollow noopener"
      className={`inline-flex items-center gap-1.5 ${className}`}
      data-partner={p.id}
    >
      {children ?? p.defaultLabel}
      <svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M7 17L17 7M9 7h8v8" />
      </svg>
      <span className="sr-only">(link partnerski, otwiera się w nowej karcie)</span>
    </a>
  );
}
