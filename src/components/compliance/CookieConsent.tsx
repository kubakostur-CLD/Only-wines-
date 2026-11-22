"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";
import { getCookie } from "@/lib/cookies";
import { OPEN_CONSENT_EVENT, readConsent, saveConsent } from "@/lib/consent";
import { AGE_OK_EVENT } from "./AgeGate";

/**
 * Cookie-consent banner (RODO/GDPR, ePrivacy, Google Consent Mode v2).
 *
 * "Akceptuję" and "Odrzucam" are equally prominent, as required by Polish (UODO) and
 * EU (EDPB) guidance. Nothing optional loads until the visitor opts in.
 *
 * NOTE: to serve Google AdSense ads in the EEA, Google requires a certified (IAB TCF) CMP.
 * When you enable AdSense, switch on Google's own "Privacy & messaging" CMP or another
 * certified CMP and keep this banner for analytics only. See README → "AdSense".
 */
export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [details, setDetails] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [ads, setAds] = useState(false);

  useEffect(() => {
    const show = () => {
      const current = readConsent();
      setAnalytics(current?.analytics ?? false);
      setAds(current?.ads ?? false);
      setVisible(true);
    };
    // Ask only once the age gate has been passed, so two dialogs never stack
    const maybeShow = () => {
      if (!readConsent() && getCookie(siteConfig.cookies.ageGate) === "1") show();
    };
    const openWithDetails = () => {
      show();
      setDetails(true);
    };
    maybeShow();
    window.addEventListener(AGE_OK_EVENT, maybeShow);
    window.addEventListener(OPEN_CONSENT_EVENT, openWithDetails);
    return () => {
      window.removeEventListener(AGE_OK_EVENT, maybeShow);
      window.removeEventListener(OPEN_CONSENT_EVENT, openWithDetails);
    };
  }, []);

  if (!visible) return null;

  const decide = (a: boolean, d: boolean) => {
    saveConsent({ analytics: a, ads: d });
    setVisible(false);
    setDetails(false);
  };

  return (
    <section
      aria-label="Ustawienia plików cookie"
      className="border-cream-300 bg-cream-50 animate-fade-up fixed inset-x-0 bottom-0 z-50 border-t shadow-[0_-8px_30px_rgba(0,0,0,0.08)]"
    >
      <div className="container-page py-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="text-ink max-w-3xl text-sm leading-relaxed">
            <h2 className="font-serif text-lg font-semibold">Szanujemy Twoją prywatność</h2>
            <p className="text-ink-muted mt-1">
              Używamy niezbędnych plików cookie, aby serwis działał. Za Twoją zgodą użyjemy też
              cookie statystycznych (anonimowe statystyki odwiedzin) i reklamowych. Zgodę możesz w
              każdej chwili zmienić w stopce strony. Szczegóły w{" "}
              <Link href="/polityka-cookies" className="link-underline text-burgundy-700">
                polityce cookies
              </Link>
              .
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-2">
            <button type="button" onClick={() => decide(false, false)} className="btn-consent">
              Odrzucam
            </button>
            <button
              type="button"
              onClick={() => setDetails((v) => !v)}
              aria-expanded={details}
              className="btn-consent"
            >
              Ustawienia
            </button>
            <button type="button" onClick={() => decide(true, true)} className="btn-consent">
              Akceptuję wszystkie
            </button>
          </div>
        </div>

        {details && (
          <div className="border-cream-200 mt-5 grid gap-3 border-t pt-5 text-sm sm:grid-cols-3">
            <label className="border-cream-200 flex gap-3 rounded border bg-white p-3">
              <input type="checkbox" checked disabled className="accent-burgundy-700 mt-1" />
              <span>
                <strong className="block">Niezbędne</strong>
                <span className="text-ink-muted">
                  Weryfikacja wieku i zapamiętanie zgód. Zawsze aktywne.
                </span>
              </span>
            </label>
            <label className="border-cream-200 flex cursor-pointer gap-3 rounded border bg-white p-3">
              <input
                type="checkbox"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
                className="accent-burgundy-700 mt-1"
              />
              <span>
                <strong className="block">Statystyczne</strong>
                <span className="text-ink-muted">
                  Anonimowe statystyki odwiedzin, które pomagają nam ulepszać treści.
                </span>
              </span>
            </label>
            <label className="border-cream-200 flex cursor-pointer gap-3 rounded border bg-white p-3">
              <input
                type="checkbox"
                checked={ads}
                onChange={(e) => setAds(e.target.checked)}
                className="accent-burgundy-700 mt-1"
              />
              <span>
                <strong className="block">Reklamowe</strong>
                <span className="text-ink-muted">
                  Wyświetlanie reklam Google, które finansują magazyn.
                </span>
              </span>
            </label>
            <div className="sm:col-span-3">
              <button type="button" onClick={() => decide(analytics, ads)} className="btn-consent">
                Zapisz wybór
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
