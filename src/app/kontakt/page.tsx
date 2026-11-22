import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import { ProsePage } from "@/components/ui/ProsePage";
import { ContactForm } from "@/components/forms/ContactForm";

export const metadata = buildMetadata({
  title: "Kontakt",
  description: "Skontaktuj się z redakcją OnlyWines.pl: pytania, propozycje tematów, sprostowania.",
  path: "/kontakt",
});

export default function ContactPage() {
  return (
    <ProsePage
      eyebrow="Redakcja"
      title="Kontakt"
      lead="Pytania, propozycje tematów, sprostowania? Chętnie przeczytamy każdą wiadomość."
      crumbs={[{ name: "Kontakt", href: "/kontakt" }]}
    >
      <p>
        Napisz do nas przez formularz lub bezpośrednio na adres{" "}
        <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>. Odpowiadamy zwykle w ciągu kilku dni
        roboczych.
      </p>
      <ContactForm email={siteConfig.contactEmail} subject="Wiadomość ze strony OnlyWines.pl" />
      <p className="text-sm">
        Uwaga: nie doradzamy w sprawie zakupu alkoholu i nie pośredniczymy w jego sprzedaży.
      </p>
    </ProsePage>
  );
}
