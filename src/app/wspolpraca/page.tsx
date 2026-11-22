import Link from "next/link";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import { ProsePage } from "@/components/ui/ProsePage";
import { ContactForm } from "@/components/forms/ContactForm";

export const metadata = buildMetadata({
  title: "Współpraca",
  description:
    "Współpraca z OnlyWines.pl dla regionów i szlaków enoturystycznych, winnic otwartych dla zwiedzających, obiektów noclegowych, organizatorów wycieczek i instytucji edukacyjnych.",
  path: "/wspolpraca",
});

export default function PartnershipPage() {
  return (
    <ProsePage
      eyebrow="Dla partnerów"
      title="Współpraca"
      lead="Zapraszamy do współpracy regiony, szlaki i miejsca, które pokazują kulturę wina: jego historię, krajobraz i rzemiosło."
      crumbs={[{ name: "Współpraca", href: "/wspolpraca" }]}
    >
      <h2>Z kim współpracujemy</h2>
      <ul>
        <li>lokalne organizacje turystyczne, regiony i szlaki winiarskie,</li>
        <li>winnice otwarte dla zwiedzających, muzea i ośrodki edukacji o winie,</li>
        <li>obiekty noclegowe i agroturystyki w regionach winiarskich,</li>
        <li>organizatorzy wycieczek krajoznawczych, festiwali i świąt winobrania,</li>
        <li>szkoły i kursy enologiczne, wydawnictwa, producenci akcesoriów (szkło, karafki, przechowywanie).</li>
      </ul>

      <h2>Formy współpracy</h2>
      <ul>
        <li>
          <strong>Przewodniki enoturystyczne</strong> o regionie, szlaku lub wydarzeniu: z naciskiem na krajobraz,
          historię, zabytki i lokalne tradycje.
        </li>
        <li>
          <strong>Materiały edukacyjne</strong>: wywiady, reportaże z prac w winnicy, opisy rzemiosła.
        </li>
        <li>
          <strong>Wyróżnienia w boksach partnerskich</strong> przy artykułach o danym regionie, zawsze oznaczone jako
          współpraca.
        </li>
      </ul>

      <h2>Nasze zasady (prosimy o uwagę)</h2>
      <p>
        Działamy zgodnie z polską ustawą o wychowaniu w trzeźwości i przeciwdziałaniu alkoholizmowi. Dlatego
        <strong> nie publikujemy</strong> reklam napojów alkoholowych, cen, ofert sprzedaży, ocen konkretnych win ani
        zdjęć butelek z widocznymi markami. Treści sponsorowane oznaczamy wyraźnie zgodnie z wytycznymi UOKiK, a
        redakcja zachowuje niezależność merytoryczną. Więcej na stronie{" "}
        <Link href="/linki-partnerskie">Linki partnerskie</Link>.
      </p>

      <h2>Napisz do nas</h2>
      <p>
        Opisz krótko swoje miejsce lub inicjatywę. Odezwiemy się z propozycją. Możesz też napisać na{" "}
        <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
      </p>
      <ContactForm email={siteConfig.contactEmail} subject="Współpraca: OnlyWines.pl" partnership />
    </ProsePage>
  );
}
