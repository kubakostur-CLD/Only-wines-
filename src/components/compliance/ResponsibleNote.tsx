import { siteConfig } from "@/config/site";

/** Footer note on a responsible approach to alcohol, with a link to professional help. */
export function ResponsibleNote() {
  const { helpResource } = siteConfig;
  return (
    <div className="border-b border-white/10 bg-burgundy-900/60">
      <div className="container-page py-6 text-sm leading-relaxed text-cream-200">
        <p>
          <strong className="font-semibold text-cream-50">Odpowiedzialnie o winie.</strong>{" "}
          OnlyWines.pl popularyzuje wiedzę o kulturze, historii i technice winiarskiej. Nie zachęcamy
          do spożywania alkoholu. Alkohol szkodzi zdrowiu; nie spożywaj go, jeśli jesteś w ciąży,
          prowadzisz pojazd lub nie masz 18 lat. Jeśli alkohol stał się problemem dla Ciebie lub
          bliskiej osoby, poszukaj wsparcia:{" "}
          <a href={helpResource.url} target="_blank" rel="noopener" className="link-underline text-cream-50">
            {helpResource.name}
          </a>
          , {helpResource.phoneLabel}:{" "}
          <a href={`tel:${helpResource.phone.replace(/\s/g, "")}`} className="link-underline whitespace-nowrap text-cream-50">
            {helpResource.phone}
          </a>
          .
        </p>
      </div>
    </div>
  );
}
