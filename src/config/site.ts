/**
 * Central site configuration: name, URLs, navigation and categories.
 * Everything user-facing is in Polish.
 */

export const siteConfig = {
  name: "OnlyWines.pl",
  shortName: "OnlyWines",
  tagline: "Magazyn o kulturze, historii i sztuce wina",
  description:
    "OnlyWines.pl to magazyn o świecie wina: ciekawostki, techniki winiarskie, historia, szczepy, regiony winiarskie i enoturystyka. Treści wyłącznie edukacyjne i kulturalne.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://onlywines.pl").replace(/\/$/, ""),
  locale: "pl_PL",
  language: "pl-PL",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "kontakt@onlywines.pl",
  defaultAuthor: "redakcja",
  /** Help resource linked in the footer (responsible approach to alcohol). */
  helpResource: {
    name: "Krajowe Centrum Przeciwdziałania Uzależnieniom",
    url: "https://kcpu.gov.pl/",
    phoneLabel: "Ogólnopolski Telefon Zaufania Uzależnienia",
    phone: "800 199 990",
  },
  /** Age-gate & consent cookie names. */
  cookies: {
    ageGate: "ow_age_ok",
    consent: "ow_consent",
  },
} as const;

export type CategorySlug =
  | "ciekawostki"
  | "jak-powstaje-wino"
  | "historia-wina"
  | "szczepy"
  | "regiony-winiarskie"
  | "enoturystyka";

export interface Category {
  slug: CategorySlug;
  name: string;
  /** Short lead used on cards and listing pages. */
  description: string;
  /** Longer SEO description for the listing page. */
  seoDescription: string;
}

export const categories: Category[] = [
  {
    slug: "ciekawostki",
    name: "Ciekawostki",
    description: "Zaskakujące fakty ze świata wina, o których rzadko się mówi.",
    seoDescription:
      "Ciekawostki o winie: zaskakujące fakty z historii, nauki i tradycji winiarskiej. Lekko, ale rzetelnie.",
  },
  {
    slug: "jak-powstaje-wino",
    name: "Jak powstaje wino",
    description: "Od winnicy do piwnicy: fermentacja, maceracja, dojrzewanie i metody tradycyjne.",
    seoDescription:
      "Jak powstaje wino? Fermentacja, maceracja, dojrzewanie w dębie, metoda tradycyjna, qvevri i wina pomarańczowe wyjaśnione krok po kroku.",
  },
  {
    slug: "historia-wina",
    name: "Historia wina",
    description: "Osiem tysięcy lat dziejów: od Kaukazu przez Rzym po współczesność.",
    seoDescription:
      "Historia wina od neolitu do dziś: starożytne cywilizacje, klasztory, filoksera i narodziny nowoczesnego winiarstwa.",
  },
  {
    slug: "szczepy",
    name: "Szczepy",
    description: "Encyklopedia odmian winorośli: pochodzenie, charakter, uprawa.",
    seoDescription:
      "Szczepy winorośli od A do Z: pochodzenie, cechy, wymagania uprawowe i regiony, w których dana odmiana czuje się najlepiej.",
  },
  {
    slug: "regiony-winiarskie",
    name: "Regiony winiarskie",
    description: "Interaktywna mapa i przewodnik po winiarskich krajobrazach świata.",
    seoDescription:
      "Regiony winiarskie świata na interaktywnej mapie: klimat, gleby, tradycje i historia najważniejszych apelacji.",
  },
  {
    slug: "enoturystyka",
    name: "Enoturystyka",
    description: "Szlaki winne, winobrania i winnice otwarte dla zwiedzających, w Polsce i na świecie.",
    seoDescription:
      "Enoturystyka: przewodniki po szlakach winnych, święta winobrania, zwiedzanie winnic i piwnic w Polsce i Europie.",
  },
];

export const categoryBySlug = (slug: string): Category | undefined =>
  categories.find((c) => c.slug === slug);

/** Main navigation (header). */
export const mainNav = [
  ...categories.map((c) => ({ href: `/${c.slug}`, label: c.name })),
  { href: "/slowniczek", label: "Słowniczek" },
  { href: "/quiz", label: "Quiz" },
];

/** Footer link groups. */
export const footerNav = {
  magazyn: [
    ...categories.map((c) => ({ href: `/${c.slug}`, label: c.name })),
    { href: "/slowniczek", label: "Słowniczek" },
    { href: "/quiz", label: "Sprawdź swoją wiedzę" },
  ],
  redakcja: [
    { href: "/o-nas", label: "O nas" },
    { href: "/kontakt", label: "Kontakt" },
    { href: "/wspolpraca", label: "Współpraca" },
    { href: "/rss.xml", label: "Kanał RSS" },
  ],
  informacje: [
    { href: "/polityka-prywatnosci", label: "Polityka prywatności" },
    { href: "/polityka-cookies", label: "Polityka cookies" },
    { href: "/regulamin", label: "Regulamin" },
    { href: "/linki-partnerskie", label: "Linki partnerskie" },
  ],
};

/** Absolute URL helper. */
export const absoluteUrl = (path = "/") => `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
