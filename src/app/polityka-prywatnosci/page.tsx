import Link from "next/link";
import { legalConfig, siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import { ProsePage } from "@/components/ui/ProsePage";

export const metadata = buildMetadata({
  title: "Polityka prywatności",
  description:
    "Polityka prywatności serwisu OnlyWines.pl: jakie dane przetwarzamy, w jakim celu i jakie prawa Ci przysługują (RODO).",
  path: "/polityka-prywatnosci",
});

/*
 * Template privacy policy (RODO / GDPR). Have it reviewed by a lawyer before launch and adjust
 * the list of processors to the services you actually enable.
 */
export default function PrivacyPage() {
  const { operatorName, address, nip, email, updated } = legalConfig;
  return (
    <ProsePage
      eyebrow="Informacje prawne"
      title="Polityka prywatności"
      lead="Szanujemy Twoją prywatność. Poniżej wyjaśniamy, jakie dane przetwarzamy, po co i jakie masz prawa."
      crumbs={[{ name: "Polityka prywatności", href: "/polityka-prywatnosci" }]}
      updated={updated}
    >
      <h2>1. Administrator danych</h2>
      <p>
        Administratorem Twoich danych osobowych jest {operatorName}, {address}
        {nip.startsWith("[") ? "" : `, NIP ${nip}`} (dalej: „Administrator”), prowadzący serwis{" "}
        {siteConfig.name}. W sprawach dotyczących danych osobowych napisz na adres{" "}
        <a href={`mailto:${email}`}>{email}</a>.
      </p>

      <h2>2. Jakie dane przetwarzamy i w jakim celu</h2>
      <table>
        <thead>
          <tr>
            <th>Cel</th>
            <th>Dane</th>
            <th>Podstawa prawna</th>
            <th>Okres przechowywania</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Newsletter</td>
            <td>adres e-mail, data i treść zgody</td>
            <td>zgoda: art. 6 ust. 1 lit. a RODO</td>
            <td>do wycofania zgody</td>
          </tr>
          <tr>
            <td>Odpowiedź na wiadomość z formularza lub e-mail</td>
            <td>imię i nazwisko, e-mail, treść wiadomości</td>
            <td>prawnie uzasadniony interes: art. 6 ust. 1 lit. f RODO</td>
            <td>do 12 miesięcy od zakończenia korespondencji</td>
          </tr>
          <tr>
            <td>Statystyki odwiedzin</td>
            <td>anonimowe lub zanonimizowane dane o wizytach</td>
            <td>zgoda: art. 6 ust. 1 lit. a RODO</td>
            <td>zgodnie z ustawieniami narzędzia, maks. 26 miesięcy</td>
          </tr>
          <tr>
            <td>Wyświetlanie reklam (jeśli są aktywne)</td>
            <td>identyfikatory plików cookie, adres IP</td>
            <td>zgoda: art. 6 ust. 1 lit. a RODO</td>
            <td>zgodnie z polityką Google</td>
          </tr>
          <tr>
            <td>Bezpieczeństwo i działanie serwisu</td>
            <td>logi serwera (adres IP, czas, przeglądarka)</td>
            <td>prawnie uzasadniony interes: art. 6 ust. 1 lit. f RODO</td>
            <td>do 30 dni</td>
          </tr>
        </tbody>
      </table>
      <p>
        Podanie danych jest dobrowolne, ale bez adresu e-mail nie zapiszesz się na newsletter i nie
        otrzymasz odpowiedzi na wiadomość.
      </p>

      <h2>3. Odbiorcy danych</h2>
      <p>Twoje dane mogą być przekazywane podmiotom, które pomagają nam prowadzić serwis:</p>
      <ul>
        <li>Vercel Inc. (hosting serwisu),</li>
        <li>dostawca usługi newslettera [UZUPEŁNIJ: np. MailerLite, Brevo],</li>
        <li>Formspree, Inc. (obsługa formularza kontaktowego),</li>
        <li>Plausible Insights OÜ (statystyki, dane przechowywane w UE),</li>
        <li>Google Ireland Ltd. (reklamy Google AdSense, jeśli są aktywne).</li>
      </ul>
      <p>
        Niektórzy z tych dostawców mogą przekazywać dane poza Europejski Obszar Gospodarczy, w
        szczególności do USA. Odbywa się to na podstawie decyzji Komisji Europejskiej (EU-US Data
        Privacy Framework) lub standardowych klauzul umownych.
      </p>

      <h2>4. Twoje prawa</h2>
      <p>Masz prawo do:</p>
      <ul>
        <li>dostępu do swoich danych i otrzymania ich kopii,</li>
        <li>sprostowania danych,</li>
        <li>usunięcia danych,</li>
        <li>ograniczenia przetwarzania,</li>
        <li>przenoszenia danych,</li>
        <li>
          wniesienia sprzeciwu wobec przetwarzania opartego na prawnie uzasadnionym interesie,
        </li>
        <li>
          wycofania zgody w dowolnym momencie (bez wpływu na zgodność z prawem wcześniejszego
          przetwarzania),
        </li>
        <li>
          wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych (ul. Stawki 2, 00-193
          Warszawa).
        </li>
      </ul>

      <h2>5. Pliki cookie</h2>
      <p>
        Zasady korzystania z plików cookie opisujemy w{" "}
        <Link href="/polityka-cookies">polityce cookies</Link>. Zgody możesz zmienić w każdej chwili
        przez link „Ustawienia cookies” w stopce strony.
      </p>

      <h2>6. Profilowanie</h2>
      <p>
        Nie podejmujemy decyzji opartych wyłącznie na zautomatyzowanym przetwarzaniu. Jeśli wyrazisz
        zgodę na cookie reklamowe, Google może dobierać reklamy na podstawie Twojej aktywności.
      </p>

      <h2>7. Osoby niepełnoletnie</h2>
      <p>
        Serwis jest przeznaczony wyłącznie dla osób pełnoletnich. Nie zbieramy świadomie danych osób
        poniżej 18. roku życia.
      </p>

      <h2>8. Zmiany polityki</h2>
      <p>O istotnych zmianach poinformujemy na tej stronie, aktualizując datę u góry dokumentu.</p>
    </ProsePage>
  );
}
