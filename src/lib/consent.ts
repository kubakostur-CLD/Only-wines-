/**
 * Cookie-consent state (RODO/GDPR + Google Consent Mode v2).
 *
 * - Everything except strictly necessary cookies is DENIED by default.
 * - The choice is stored for 180 days in a first-party cookie.
 * - Components listen to the "ow:consent" window event to react to changes.
 */
import { siteConfig } from "@/config/site";
import { getCookie, setCookie } from "./cookies";

export interface ConsentState {
  /** Statistics (Plausible / GA4). */
  analytics: boolean;
  /** Advertising (Google AdSense). */
  ads: boolean;
  /** Schema version – bump to re-ask everyone after policy changes. */
  v: 1;
}

export const CONSENT_EVENT = "ow:consent";
export const OPEN_CONSENT_EVENT = "ow:open-consent";

export function readConsent(): ConsentState | null {
  const raw = getCookie(siteConfig.cookies.consent);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as ConsentState;
    return parsed.v === 1 ? parsed : null;
  } catch {
    return null;
  }
}

type Gtag = (...args: unknown[]) => void;

export function saveConsent(state: Omit<ConsentState, "v">): void {
  const full: ConsentState = { ...state, v: 1 };
  setCookie(siteConfig.cookies.consent, JSON.stringify(full), 180);

  // Google Consent Mode v2 update (no-op if gtag is not on the page)
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  gtag?.("consent", "update", {
    analytics_storage: full.analytics ? "granted" : "denied",
    ad_storage: full.ads ? "granted" : "denied",
    ad_user_data: full.ads ? "granted" : "denied",
    ad_personalization: full.ads ? "granted" : "denied",
  });

  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: full }));
}

/** Re-open the consent banner (used by the "Ustawienia cookies" footer link). */
export function openConsentSettings(): void {
  window.dispatchEvent(new Event(OPEN_CONSENT_EVENT));
}
