import Link from "next/link";
import { legalConfig, siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import { ProsePage } from "@/components/ui/ProsePage";

export const metadata = buildMetadata({
  title: "Regulamin",
  description:
    "Regulamin serwisu OnlyWines.pl: zasady korzystania z treści, newslettera i formularzy.",
  path: "/regulamin",
});

/* Template "regulamin świadczenia usług drogą elektroniczną" (art. 8 u.ś.u.d.e.). Review with a lawyer. */
export default function TermsPage() {
  const { operatorName, address, email, updated } = legalConfig;
  return (
    <ProsePage
      eyebrow="Informacje prawne"
      title="Regulamin serwisu"
      crumbs={[{ name: "Regulamin", href: "/regulamin" }]}
      updated={updated}
    >
      <h2>§ 1. Postanowienia ogólne</h2>
      <ol>
        <li>
          Regulamin określa zasady korzystania z serwisu internetowego {siteConfig.name} (dalej:
          „Serwis”), zgodnie z ustawą z dnia 18 lipca 2002 r. o świadczeniu usług drogą
          elektroniczną.
        </li>
        <li>
          Usługodawcą jest {operatorName}, {address}, e-mail:{" "}
          <a href={`mailto:${email}`}>{email}</a>.
        </li>
        <li>
          Serwis ma charakter edukacyjny i kulturalny. Nie prowadzi sprzedaży ani reklamy napojów
          alkoholowych.
        </li>
        <li>Serwis jest przeznaczony wyłącznie dla osób pełnoletnich.</li>
      </ol>

      <h2>§ 2. Usługi</h2>
      <ol>
        <li>
          Usługodawca świadczy nieodpłatnie następujące usługi: udostępnianie treści, newsletter,
          formularz kontaktowy oraz quiz wiedzy.
        </li>
        <li>
          Umowa o udostępnianie treści zostaje zawarta z chwilą wejścia do Serwisu i rozwiązana z
          chwilą jego opuszczenia. Umowa o newsletter zostaje zawarta z chwilą potwierdzenia zapisu
          i może zostać rozwiązana w każdej chwili przez kliknięcie linku rezygnacji lub wiadomość
          e-mail.
        </li>
      </ol>

      <h2>§ 3. Wymagania techniczne</h2>
      <p>
        Do korzystania z Serwisu potrzebne jest urządzenie z dostępem do internetu i aktualną
        przeglądarką internetową z włączoną obsługą JavaScript i plików cookie. Do korzystania z
        newslettera i formularza potrzebny jest aktywny adres e-mail.
      </p>

      <h2>§ 4. Zasady korzystania</h2>
      <ol>
        <li>Zabronione jest dostarczanie przez użytkownika treści o charakterze bezprawnym.</li>
        <li>
          Treści Serwisu są chronione prawem autorskim. Ich kopiowanie w celach innych niż własny
          użytek osobisty wymaga zgody Usługodawcy. Dozwolone jest udostępnianie linków do
          artykułów.
        </li>
        <li>
          Treści mają charakter informacyjny i nie stanowią porady specjalistycznej. Usługodawca
          dokłada starań, by były rzetelne i aktualne.
        </li>
        <li>
          Serwis zawiera oznaczone linki partnerskie do usług podmiotów trzecich (np. noclegi,
          wycieczki). Za usługi tych podmiotów odpowiadają ich dostawcy. Szczegóły:{" "}
          <Link href="/linki-partnerskie">Linki partnerskie</Link>.
        </li>
      </ol>

      <h2>§ 5. Reklamacje</h2>
      <p>
        Reklamacje dotyczące działania Serwisu można zgłaszać na adres{" "}
        <a href={`mailto:${email}`}>{email}</a>. Rozpatrujemy je w ciągu 14 dni od otrzymania.
      </p>

      <h2>§ 6. Dane osobowe</h2>
      <p>
        Zasady przetwarzania danych osobowych opisuje{" "}
        <Link href="/polityka-prywatnosci">Polityka prywatności</Link>.
      </p>

      <h2>§ 7. Postanowienia końcowe</h2>
      <ol>
        <li>Usługodawca może zmienić Regulamin z ważnych przyczyn, informując o tym w Serwisie.</li>
        <li>W sprawach nieuregulowanych stosuje się przepisy prawa polskiego.</li>
      </ol>
    </ProsePage>
  );
}
