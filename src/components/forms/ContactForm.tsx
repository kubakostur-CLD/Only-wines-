"use client";

import Link from "next/link";
import { useId, useState } from "react";

const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_CONTACT;

/**
 * Contact / partnership form. Sends to Formspree (NEXT_PUBLIC_FORMSPREE_CONTACT);
 * without configuration it falls back to opening the visitor's e-mail client.
 */
export function ContactForm({ email, subject, partnership = false }: { email: string; subject: string; partnership?: boolean }) {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const id = useId();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (!endpoint) {
      const body = [...data.entries()]
        .filter(([k]) => !["zgoda", "_gotcha"].includes(k))
        .map(([k, v]) => `${k}: ${v}`)
        .join("\n");
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(endpoint, { method: "POST", body: data, headers: { Accept: "application/json" } });
      setStatus(res.ok ? "ok" : "error");
      if (res.ok) form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <p role="status" className="rounded-sm border border-cream-300 bg-white p-6 text-lg">
        Dziękujemy za wiadomość! Odpowiemy najszybciej, jak to możliwe.
      </p>
    );
  }

  const field = "mt-1.5 block w-full rounded-sm border border-cream-300 bg-white px-4 py-3 text-ink focus:border-burgundy-700 focus:outline-none";
  return (
    <form onSubmit={onSubmit} className="not-prose grid gap-5 rounded-sm border border-cream-300 bg-cream-50 p-6 md:p-8">
      <input type="hidden" name="_subject" value={subject} />
      {/* Honeypot against spam bots */}
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <div className="grid gap-5 sm:grid-cols-2">
        <label htmlFor={`${id}-name`} className="text-sm font-semibold">
          Imię i nazwisko
          <input id={`${id}-name`} name="imie" required autoComplete="name" className={field} />
        </label>
        <label htmlFor={`${id}-email`} className="text-sm font-semibold">
          E-mail
          <input id={`${id}-email`} name="email" type="email" required autoComplete="email" className={field} />
        </label>
      </div>
      {partnership && (
        <div className="grid gap-5 sm:grid-cols-2">
          <label htmlFor={`${id}-org`} className="text-sm font-semibold">
            Organizacja / miejsce
            <input id={`${id}-org`} name="organizacja" required autoComplete="organization" className={field} />
          </label>
          <label htmlFor={`${id}-type`} className="text-sm font-semibold">
            Rodzaj współpracy
            <select id={`${id}-type`} name="rodzaj" className={field}>
              <option>Region lub szlak enoturystyczny</option>
              <option>Winnica otwarta dla zwiedzających</option>
              <option>Nocleg / agroturystyka</option>
              <option>Organizator wycieczek</option>
              <option>Szkoła, kurs, wydawnictwo</option>
              <option>Inne</option>
            </select>
          </label>
        </div>
      )}
      <label htmlFor={`${id}-msg`} className="text-sm font-semibold">
        Wiadomość
        <textarea id={`${id}-msg`} name="wiadomosc" required rows={6} className={field} />
      </label>
      <label className="flex items-start gap-3 text-xs leading-relaxed text-ink-muted">
        <input type="checkbox" name="zgoda" required className="mt-0.5 h-4 w-4 shrink-0 accent-burgundy-700" />
        <span>
          Wyrażam zgodę na przetwarzanie moich danych w celu udzielenia odpowiedzi na wiadomość. Szczegóły w{" "}
          <Link href="/polityka-prywatnosci" className="underline underline-offset-2">
            polityce prywatności
          </Link>
          .
        </span>
      </label>
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="rounded-full bg-burgundy-700 px-7 py-3 text-sm font-semibold text-cream-50 hover:bg-burgundy-900 disabled:opacity-50"
        >
          {status === "sending" ? "Wysyłanie…" : "Wyślij wiadomość"}
        </button>
        {status === "error" && (
          <p role="alert" className="text-sm text-burgundy-500">
            Nie udało się wysłać. Napisz bezpośrednio na <a href={`mailto:${email}`} className="underline">{email}</a>.
          </p>
        )}
      </div>
    </form>
  );
}
