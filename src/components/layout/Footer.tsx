import Link from "next/link";
import { footerNav, siteConfig } from "@/config/site";
import { Logo } from "./Logo";
import { ConsentSettingsLink } from "@/components/compliance/ConsentSettingsLink";
import { ResponsibleNote } from "@/components/compliance/ResponsibleNote";

const FooterColumn = ({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) => (
  <div>
    <h2 className="eyebrow !text-gold-300">{title}</h2>
    <ul className="mt-4 space-y-2.5 text-sm">
      {links.map((l) => (
        <li key={l.href}>
          <Link href={l.href} className="text-cream-200 transition-colors hover:text-white">
            {l.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

/** Site footer: navigation, responsible-approach note and legal links. */
export function Footer() {
  return (
    <footer className="bg-burgundy-950 text-cream-200 mt-24">
      <ResponsibleNote />
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo className="!text-cream-100 [&>span:last-child]:!text-gold-300" />
          <p className="text-cream-200 mt-4 max-w-xs text-sm leading-relaxed">
            {siteConfig.tagline}. Treści wyłącznie edukacyjne i kulturalne. Nie sprzedajemy alkoholu
            i nie reklamujemy napojów alkoholowych.
          </p>
        </div>
        <FooterColumn title="Magazyn" links={footerNav.magazyn} />
        <FooterColumn title="Redakcja" links={footerNav.redakcja} />
        <div>
          <FooterColumn title="Informacje" links={footerNav.informacje} />
          <ConsentSettingsLink className="text-cream-200 mt-2.5 text-sm hover:text-white" />
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-page text-cream-300 flex flex-col gap-2 py-6 text-xs sm:flex-row sm:justify-between">
          <p>© {siteConfig.name}. Wszelkie prawa zastrzeżone.</p>
          <p>Serwis przeznaczony wyłącznie dla osób pełnoletnich.</p>
        </div>
      </div>
    </footer>
  );
}
