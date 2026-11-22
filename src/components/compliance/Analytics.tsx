"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { CONSENT_EVENT, readConsent, type ConsentState } from "@/lib/consent";

const provider = process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER;
const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
const ga4Id = process.env.NEXT_PUBLIC_GA4_ID;
const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

/** Subscribe to consent changes. */
export function useConsent(): ConsentState | null {
  const [consent, setConsent] = useState<ConsentState | null>(null);
  useEffect(() => {
    setConsent(readConsent());
    const onChange = (e: Event) => setConsent((e as CustomEvent<ConsentState>).detail);
    window.addEventListener(CONSENT_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_EVENT, onChange);
  }, []);
  return consent;
}

/**
 * Loads analytics and AdSense scripts ONLY after consent.
 * Configure via NEXT_PUBLIC_ANALYTICS_PROVIDER ("plausible" | "ga4") and related env vars.
 */
export function Analytics() {
  const consent = useConsent();

  return (
    <>
      {consent?.analytics && provider === "plausible" && plausibleDomain && (
        <Script defer data-domain={plausibleDomain} src="https://plausible.io/js/script.js" strategy="afterInteractive" />
      )}
      {consent?.analytics && provider === "ga4" && ga4Id && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`} strategy="afterInteractive" />
          <Script id="ga4-init" strategy="afterInteractive">
            {`gtag('js', new Date()); gtag('config', '${ga4Id}', { anonymize_ip: true });`}
          </Script>
        </>
      )}
      {consent?.ads && adsenseClient && (
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      )}
    </>
  );
}

/**
 * Google Consent Mode v2 defaults – everything denied until the visitor decides.
 * Rendered inline in <head> so it runs before any Google tag.
 */
export function ConsentModeDefaults() {
  const js = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',wait_for_update:500});`;
  return <script dangerouslySetInnerHTML={{ __html: js }} />;
}
