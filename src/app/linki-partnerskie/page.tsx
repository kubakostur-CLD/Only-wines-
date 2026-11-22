import Link from "next/link";
import { partnerCategoryLabels, partners } from "@/config/partners";
import { legalConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import { ProsePage } from "@/components/ui/ProsePage";

export const metadata = buildMetadata({
  title: "Linki partnerskie i współpraca reklamowa",
  description:
    "Jak zarabia OnlyWines.pl: zasady linków partnerskich i reklam. Nie współpracujemy ze sprzedawcami alkoholu.",
  path: "/linki-partnerskie",
});

export default function AffiliateDisclosurePage() {
  return (
    <ProsePage
      eyebrow="Przejrzystość"
      title="Linki partnerskie i reklamy"
      lead="Wyjaśniamy, jak finansujemy magazyn, tak by było to w pełni przejrzyste dla czytelników."
      crumbs={[{ name: "Linki partnerskie", href: "/linki-partnerskie" }]}
      updated={legalConfig.updated}
    >
      <h2>Czym jest link partnerski?</h2>
      <p>
        Niektóre linki w naszych artykułach prowadzą do usług partnerów, np. serwisów z noclegami
        lub wycieczkami. Jeśli skorzystasz z takiej usługi, możemy otrzymać prowizję.{" "}
        <strong>Nie zmienia to kosztu usługi</strong> i nie wpływa na treść artykułów.
      </p>
      <p>
        Każdy taki link jest wyraźnie oznaczony etykietą <strong>„Link partnerski”</strong>, a
        technicznie atrybutem <code>rel=&quot;sponsored&quot;</code>, zgodnie z wytycznymi UOKiK i
        wyszukiwarek.
      </p>

      <h2>Z kim współpracujemy</h2>
      <p>Współpracujemy wyłącznie z partnerami z kategorii:</p>
      <ul>
        {Object.entries(partnerCategoryLabels).map(([key, label]) => (
          <li key={key}>
            <strong>{label}</strong>
            {": "}
            {Object.values(partners)
              .filter((p) => p.category === key)
              .map((p) => p.name)
              .join(", ")}
          </li>
        ))}
      </ul>

      <h2>Czego nie robimy</h2>
      <ul>
        <li>Nie współpracujemy ze sklepami ani producentami sprzedającymi alkohol.</li>
        <li>Nie podajemy cen alkoholu, nie oceniamy i nie polecamy konkretnych win ani marek.</li>
        <li>Nie publikujemy treści sponsorowanych bez wyraźnego oznaczenia.</li>
      </ul>

      <h2>Reklamy</h2>
      <p>
        W serwisie mogą pojawiać się reklamy Google AdSense, oznaczone słowem „Reklama” i oddzielone
        od treści redakcyjnych. Wyświetlamy je tylko po wyrażeniu zgody na cookie reklamowe. W
        ustawieniach AdSense blokujemy kategorię reklam dotyczących alkoholu.
      </p>

      <p>
        Pytania? <Link href="/kontakt">Napisz do nas</Link>.
      </p>
    </ProsePage>
  );
}
