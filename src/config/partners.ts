/**
 * Affiliate & partner configuration – the ONLY place where partner programmes are defined.
 *
 * Compliance rules (Polish alcohol advertising law – Ustawa o wychowaniu w trzeźwości):
 *   ✔ Allowed categories: wine tourism (tours, routes), accommodation, travel, education
 *     (courses, books) and NON-alcoholic accessories (glasses, decanters, wine fridges).
 *   ✘ Never add shops or programmes that sell alcohol. `assertAllowedUrl` blocks known
 *     alcohol retail domains as a safety net.
 *
 * Partner IDs come from environment variables (see .env.example). When an ID is missing the
 * link still works – it simply points to the partner's site without tracking.
 */

export type PartnerCategory = "wycieczki" | "noclegi" | "podroze" | "edukacja" | "ksiazki" | "akcesoria";

export const partnerCategoryLabels: Record<PartnerCategory, string> = {
  wycieczki: "Wycieczki i zwiedzanie",
  noclegi: "Noclegi",
  podroze: "Podróże",
  edukacja: "Kursy i edukacja",
  ksiazki: "Książki",
  akcesoria: "Akcesoria",
};

export interface Partner {
  id: string;
  name: string;
  category: PartnerCategory;
  /** Default call-to-action label (Polish, neutral, no encouragement to drink). */
  defaultLabel: string;
  /** Builds the outbound URL for a search query (or the partner homepage if no query). */
  buildUrl: (query?: string) => string;
}


/** Wrap a target URL in a network deeplink template (Awin, Impact, Convertiser…) if configured. */
const deeplink = (template: string, target: string) =>
  template ? template.replace("{url}", encodeURIComponent(target)) : target;

const q = (query?: string) => encodeURIComponent(query ?? "");

// NOTE: NEXT_PUBLIC_* variables must be referenced literally so Next.js can inline them.
const ids = {
  gyg: process.env.NEXT_PUBLIC_GETYOURGUIDE_PARTNER_ID || "",
  viatorPid: process.env.NEXT_PUBLIC_VIATOR_PID || "",
  viatorMcid: process.env.NEXT_PUBLIC_VIATOR_MCID || "",
  booking: process.env.NEXT_PUBLIC_BOOKING_AID || "",
  amazon: process.env.NEXT_PUBLIC_AMAZON_TAG || "",
  empik: process.env.NEXT_PUBLIC_EMPIK_DEEPLINK_TEMPLATE || "",
  skyscanner: process.env.NEXT_PUBLIC_SKYSCANNER_DEEPLINK_TEMPLATE || "",
  rentalcars: process.env.NEXT_PUBLIC_RENTALCARS_DEEPLINK_TEMPLATE || "",
  wset: process.env.NEXT_PUBLIC_WSET_DEEPLINK_TEMPLATE || "",
};

export const partners = {
  getyourguide: {
    id: "getyourguide",
    name: "GetYourGuide",
    category: "wycieczki",
    defaultLabel: "Zobacz wycieczki po winnicach i piwnicach",
    buildUrl: (query) =>
      `https://www.getyourguide.pl/s/?q=${q(query)}${ids.gyg ? `&partner_id=${ids.gyg}` : ""}`,
  },
  viator: {
    id: "viator",
    name: "Viator",
    category: "wycieczki",
    defaultLabel: "Sprawdź wycieczki krajoznawcze w regionie",
    buildUrl: (query) =>
      `https://www.viator.com/searchResults/all?text=${q(query)}${
        ids.viatorPid ? `&pid=${ids.viatorPid}&mcid=${ids.viatorMcid}&medium=link` : ""
      }`,
  },
  booking: {
    id: "booking",
    name: "Booking.com",
    category: "noclegi",
    defaultLabel: "Znajdź nocleg w regionie",
    buildUrl: (query) =>
      `https://www.booking.com/searchresults.pl.html?ss=${q(query)}${ids.booking ? `&aid=${ids.booking}` : ""}`,
  },
  skyscanner: {
    id: "skyscanner",
    name: "Skyscanner",
    category: "podroze",
    defaultLabel: "Porównaj połączenia lotnicze",
    buildUrl: () => deeplink(ids.skyscanner, "https://www.skyscanner.pl/"),
  },
  rentalcars: {
    id: "rentalcars",
    name: "Rentalcars.com",
    category: "podroze",
    defaultLabel: "Wynajmij samochód na podróż",
    buildUrl: () => deeplink(ids.rentalcars, "https://www.rentalcars.com/pl/"),
  },
  wset: {
    id: "wset",
    name: "WSET (Wine & Spirit Education Trust)",
    category: "edukacja",
    defaultLabel: "Znajdź kurs WSET w Polsce",
    buildUrl: () => deeplink(ids.wset, "https://www.wsetglobal.com/"),
  },
  empik: {
    id: "empik",
    name: "Empik",
    category: "ksiazki",
    defaultLabel: "Książki o winie i winiarstwie",
    buildUrl: (query) =>
      deeplink(ids.empik, `https://www.empik.com/szukaj/produkt?q=${q(query ?? "książki o winie")}&qtype=basicForm`),
  },
  amazon: {
    id: "amazon",
    name: "Amazon.pl",
    category: "akcesoria",
    defaultLabel: "Zobacz akcesoria",
    buildUrl: (query) =>
      `https://www.amazon.pl/s?k=${q(query ?? "kieliszki do wina")}${ids.amazon ? `&tag=${ids.amazon}` : ""}`,
  },
} satisfies Record<string, Partner>;

export type PartnerId = keyof typeof partners;
export const partnerIds = Object.keys(partners) as [PartnerId, ...PartnerId[]];

/**
 * Safety net: domains that sell alcohol must never be linked as partners.
 * Extend this list if you discover new ones.
 */
const BLOCKED_DOMAINS = [
  "vivino.com",
  "wine-searcher.com",
  "winezja.pl",
  "winnicalidla.pl",
  "allegro.pl",
  "ceneo.pl",
  "duzeilosci",
  "marketwin",
  "e-wina.pl",
  "winoteka",
  "sklep",
];

export function assertAllowedUrl(url: string): string {
  const lower = url.toLowerCase();
  const hit = BLOCKED_DOMAINS.find((d) => lower.includes(d));
  if (hit) {
    throw new Error(`Link partnerski do "${url}" jest niedozwolony (sprzedaż alkoholu: ${hit}).`);
  }
  return url;
}

export const getPartner = (id: PartnerId): Partner => partners[id];
