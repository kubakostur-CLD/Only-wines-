import { legalConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import { ProsePage } from "@/components/ui/ProsePage";
import { ConsentSettingsLink } from "@/components/compliance/ConsentSettingsLink";

export const metadata = buildMetadata({
  title: "Polityka cookies",
  description: "Jakich plików cookie używa OnlyWines.pl, w jakim celu i jak zmienić swoje ustawienia.",
  path: "/polityka-cookies",
});

export default function CookiesPage() {
  return (
    <ProsePage
      eyebrow="Informacje prawne"
      title="Polityka cookies"
      lead="Pliki cookie to małe pliki tekstowe zapisywane w Twojej przeglądarce. Używamy ich oszczędnie."
      crumbs={[{ name: "Polityka cookies", href: "/polityka-cookies" }]}
      updated={legalConfig.updated}
    >
      <h2>Jakich plików cookie używamy</h2>
      <table>
        <thead>
          <tr>
            <th>Nazwa</th>
            <th>Rodzaj</th>
            <th>Cel</th>
            <th>Ważność</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>ow_age_ok</td>
            <td>niezbędny</td>
            <td>zapamiętanie potwierdzenia pełnoletności</td>
            <td>12 miesięcy</td>
          </tr>
          <tr>
            <td>ow_consent</td>
            <td>niezbędny</td>
            <td>zapamiętanie Twoich wyborów dotyczących cookie</td>
            <td>6 miesięcy</td>
          </tr>
          <tr>
            <td>Plausible Analytics</td>
            <td>statystyczny</td>
            <td>anonimowe statystyki odwiedzin; narzędzie nie zapisuje plików cookie, ale uruchamiamy je dopiero po Twojej zgodzie</td>
            <td>nie dotyczy</td>
          </tr>
          <tr>
            <td>_ga, _ga_* (jeśli używamy Google Analytics)</td>
            <td>statystyczny</td>
            <td>statystyki odwiedzin</td>
            <td>do 2 lat</td>
          </tr>
          <tr>
            <td>Google AdSense (np. __gads, __gpi)</td>
            <td>reklamowy</td>
            <td>wyświetlanie i pomiar reklam</td>
            <td>do 13 miesięcy</td>
          </tr>
        </tbody>
      </table>

      <h2>Zgoda i jej zmiana</h2>
      <p>
        Cookie statystyczne i reklamowe zapisujemy wyłącznie po wyrażeniu przez Ciebie zgody. Domyślnie są one
        wyłączone (Google Consent Mode v2). Zgodę możesz w każdej chwili zmienić lub wycofać:
      </p>
      <ConsentSettingsLink className="not-prose rounded-full border border-burgundy-700 px-5 py-2 text-sm font-semibold text-burgundy-700 hover:bg-burgundy-700 hover:text-cream-50" />
      <p>
        Możesz też usunąć pliki cookie i zablokować ich zapisywanie w ustawieniach przeglądarki. Zablokowanie
        niezbędnych plików cookie może sprawić, że prośba o potwierdzenie wieku będzie się wyświetlać przy każdej wizycie.
      </p>
    </ProsePage>
  );
}
