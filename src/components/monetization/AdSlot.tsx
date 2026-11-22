"use client";

import { useEffect, useRef } from "react";
import { useConsent } from "@/components/compliance/Analytics";

const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

interface Props {
  /** AdSense ad-unit slot id (from your AdSense dashboard). */
  slot: string;
  /** Reserved height prevents layout shift (CLS). */
  minHeight?: number;
  className?: string;
}

/**
 * Google AdSense display slot, clearly labelled "Reklama" and separated from editorial content.
 * Renders nothing until AdSense is configured AND the visitor consented to ads.
 * In development a dashed placeholder shows where the ad will appear.
 */
export function AdSlot({ slot, minHeight = 250, className = "" }: Props) {
  const consent = useConsent();
  const pushed = useRef(false);
  const enabled = Boolean(client && consent?.ads);

  useEffect(() => {
    if (!enabled || pushed.current) return;
    try {
      const w = window as unknown as { adsbygoogle?: unknown[] };
      (w.adsbygoogle = w.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      /* ad blockers etc. – fail silently */
    }
  }, [enabled]);

  if (!enabled) {
    if (process.env.NODE_ENV !== "development") return null;
    return (
      <div className={`my-12 ${className}`}>
        <div
          className="flex items-center justify-center border border-dashed border-cream-300 text-xs text-ink-muted"
          style={{ minHeight }}
        >
          Miejsce na reklamę (AdSense: slot {slot}), widoczne tylko w trybie deweloperskim
        </div>
      </div>
    );
  }

  return (
    <aside aria-label="Reklama" className={`my-12 border-y border-cream-300 py-4 ${className}`}>
      <p className="mb-2 text-center text-[11px] tracking-widest text-ink-muted uppercase">Reklama</p>
      <ins
        className="adsbygoogle block"
        style={{ display: "block", minHeight }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  );
}
