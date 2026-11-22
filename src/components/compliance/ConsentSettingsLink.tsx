"use client";

import { openConsentSettings } from "@/lib/consent";

/** Footer link that re-opens the cookie banner (withdrawing consent must be as easy as giving it). */
export function ConsentSettingsLink({ className = "" }: { className?: string }) {
  return (
    <button type="button" onClick={openConsentSettings} className={`block text-left ${className}`}>
      Ustawienia cookies
    </button>
  );
}
