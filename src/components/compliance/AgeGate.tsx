"use client";

import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/config/site";
import { setCookie, getCookie } from "@/lib/cookies";

export const AGE_OK_EVENT = "ow:age-ok";

/**
 * 18+ age gate shown on the first visit (required by Polish law for alcohol-related content).
 *
 * - Server-rendered so it is present before JavaScript loads.
 * - An inline script in <head> (see AgeGateScript) adds `data-age-ok` to <html> for returning
 *   adults, and CSS hides the gate – so it never flashes for them.
 * - The answer is remembered for 365 days in a first-party cookie (strictly necessary cookie).
 * - Content remains in the HTML for search engines; the gate is an informational barrier.
 */
export function AgeGate() {
  const [state, setState] = useState<"ask" | "denied" | "ok">("ask");
  const confirmRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (getCookie(siteConfig.cookies.ageGate) === "1") {
      setState("ok");
      return;
    }
    // Make the rest of the page inert while the dialog is open
    const root = document.getElementById("app-root");
    root?.setAttribute("inert", "");
    document.body.style.overflow = "hidden";
    confirmRef.current?.focus();
    return () => {
      root?.removeAttribute("inert");
      document.body.style.overflow = "";
    };
  }, []);

  if (state === "ok") return null;

  const confirm = () => {
    setCookie(siteConfig.cookies.ageGate, "1", 365);
    document.documentElement.setAttribute("data-age-ok", "");
    document.getElementById("app-root")?.removeAttribute("inert");
    document.body.style.overflow = "";
    setState("ok");
    window.dispatchEvent(new Event(AGE_OK_EVENT));
  };

  return (
    <div
      className="age-gate fixed inset-0 z-[100] flex items-center justify-center bg-burgundy-950/95 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-gate-title"
      aria-describedby="age-gate-desc"
    >
      <div className="w-full max-w-md rounded-sm bg-cream-50 px-6 py-10 text-center shadow-2xl sm:px-10">
        <p className="font-serif text-2xl text-burgundy-700">
          Only<span className="italic">Wines</span>
          <span className="text-base text-gold-700">.pl</span>
        </p>
        <span className="ornament mx-auto mt-5" aria-hidden="true" />
        {state === "ask" ? (
          <>
            <h2 id="age-gate-title" className="mt-6 text-2xl font-semibold">
              Czy masz ukończone 18 lat?
            </h2>
            <p id="age-gate-desc" className="mt-3 text-sm leading-relaxed text-ink-muted">
              OnlyWines.pl to magazyn o kulturze, historii i technice winiarskiej. Ze względu na
              tematykę serwis jest przeznaczony wyłącznie dla osób pełnoletnich.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                ref={confirmRef}
                type="button"
                onClick={confirm}
                className="rounded-full bg-burgundy-700 px-6 py-3 text-sm font-semibold text-cream-50 transition-colors hover:bg-burgundy-900"
              >
                Tak, mam ukończone 18 lat
              </button>
              <button
                type="button"
                onClick={() => setState("denied")}
                className="rounded-full border border-ink/20 px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-cream-200"
              >
                Nie
              </button>
            </div>
            <p className="mt-6 text-xs text-ink-muted">
              Zapamiętamy Twoją odpowiedź w niezbędnym pliku cookie na 12 miesięcy.
            </p>
          </>
        ) : (
          <>
            <h2 id="age-gate-title" className="mt-6 text-2xl font-semibold">
              Zapraszamy po osiemnastce
            </h2>
            <p id="age-gate-desc" className="mt-3 text-sm leading-relaxed text-ink-muted">
              Ten serwis jest przeznaczony wyłącznie dla osób pełnoletnich. Dziękujemy za szczerość.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

/** Inline, render-blocking snippet: marks returning adults before first paint. */
export function AgeGateScript() {
  const js = `try{if(document.cookie.split('; ').some(function(c){return c==='${siteConfig.cookies.ageGate}=1'}))document.documentElement.setAttribute('data-age-ok','')}catch(e){}`;
  return <script dangerouslySetInnerHTML={{ __html: js }} />;
}
