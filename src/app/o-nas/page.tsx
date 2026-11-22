import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { ProsePage } from "@/components/ui/ProsePage";

export const metadata = buildMetadata({
  title: "O nas",
  description:
    "Poznaj OnlyWines.pl: niezależny magazyn o kulturze, historii i technice winiarskiej. Nasza misja, zasady redakcyjne i sposób pracy.",
  path: "/o-nas",
});

export default function AboutPage() {
  return (
    <ProsePage
      eyebrow="Redakcja"
      title="O nas"
      lead="Wino to dla nas przede wszystkim opowieść o ludziach, krajobrazach i wiedzy przekazywanej z pokolenia na pokolenie."
      crumbs={[{ name: "O nas", href: "/o-nas" }]}
    >
      <h2>Czym jest OnlyWines.pl?</h2>
      <p>
        OnlyWines.pl to polskojęzyczny magazyn o świecie wina rozumianym jako zjawisko kulturowe.
        Piszemy o historii winiarstwa, o tym, jak powstaje wino, o odmianach winorośli, regionach
        winiarskich i podróżach śladami winnych szlaków. Interesują nas gleby i klimat, dawne
        techniki i współczesna nauka, święta winobrania i ludzie, którzy pielęgnują winnice.
      </p>

      <h2>Nasze zasady</h2>
      <ul>
        <li>
          <strong>Edukacja, nie reklama.</strong> Nie sprzedajemy alkoholu, nie podajemy cen, nie
          oceniamy i nie promujemy konkretnych win ani marek.
        </li>
        <li>
          <strong>Rzetelność.</strong> Korzystamy z publikacji naukowych, źródeł historycznych i
          materiałów instytucji branżowych. Błędy poprawiamy i oznaczamy datę aktualizacji.
        </li>
        <li>
          <strong>Odpowiedzialność.</strong> Serwis jest przeznaczony wyłącznie dla osób
          pełnoletnich. Nie łączymy wina z sukcesem, zdrowiem ani sprawnością i nie zachęcamy do
          jego spożywania.
        </li>
        <li>
          <strong>Przejrzystość.</strong> Linki partnerskie (np. do noclegów czy wycieczek) zawsze
          wyraźnie oznaczamy. Zasady opisujemy na stronie{" "}
          <Link href="/linki-partnerskie">Linki partnerskie</Link>.
        </li>
      </ul>

      <h2>Jak pracujemy</h2>
      <p>
        Każdy tekst przechodzi przez listę kontrolną redakcji, która obejmuje rzetelność faktów,
        jakość języka oraz zgodność z polskimi przepisami dotyczącymi alkoholu. Ilustracje
        przedstawiają krajobrazy, winnice, piwnice i pracę ludzi, nigdy zaś butelki konkretnych
        marek ani osoby spożywające alkohol.
      </p>

      <h2>Napisz do nas</h2>
      <p>
        Masz pytanie, zauważyłeś błąd albo chcesz zaproponować temat?{" "}
        <Link href="/kontakt">Skontaktuj się z nami</Link>. Regiony, szlaki i obiekty enoturystyczne
        zapraszamy na stronę <Link href="/wspolpraca">Współpraca</Link>.
      </p>
    </ProsePage>
  );
}
