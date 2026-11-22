import { siteConfig } from "@/config/site";

/** Footer note on a responsible approach to alcohol, with a link to professional help. */
export function ResponsibleNote() {
  const { helpResource } = siteConfig;
  return (
    <div className="bg-burgundy-900/60 border-b border-white/10">
      <div className="container-page text-cream-200 py-6 text-sm leading-relaxed">
        <p>
          <strong className="text-cream-50 font-semibold">Odpowiedzialnie o winie.</strong>{" "}
          OnlyWines.pl popularyzuje wiedzę o kulturze, historii i technice winiarskiej. Nie
          zachęcamy do spożywania alkoholu. Alkohol szkodzi zdrowiu; nie spożywaj go, jeśli jesteś w
          ciąży, prowadzisz pojazd lub nie masz 18 lat. Jeśli alkohol stał się problemem dla Ciebie
          lub bliskiej osoby, poszukaj wsparcia:{" "}
          <a
            href={helpResource.url}
            target="_blank"
            rel="noopener"
            className="link-underline text-cream-50"
          >
            {helpResource.name}
          </a>
          , {helpResource.phoneLabel}:{" "}
          <a
            href={`tel:${helpResource.phone.replace(/\s/g, "")}`}
            className="link-underline text-cream-50 whitespace-nowrap"
          >
            {helpResource.phone}
          </a>
          .
        </p>
      </div>
    </div>
  );
}
