"use client";

import Link from "next/link";
import { useId, useState } from "react";

const action = process.env.NEXT_PUBLIC_NEWSLETTER_ACTION;

/**
 * Newsletter signup. Posts to the provider form URL in NEXT_PUBLIC_NEWSLETTER_ACTION
 * (MailerLite, Brevo…). Field name "email" is used by most providers – adjust if needed.
 * Without configuration it shows a friendly "coming soon" message.
 */
export function NewsletterForm({ dark = false }: { dark?: boolean }) {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error" | "soon">("idle");
  const id = useId();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (!action) {
      setStatus("soon");
      return;
    }
    setStatus("sending");
    try {
      await fetch(action, { method: "POST", body: data, mode: "no-cors" });
      setStatus("ok");
    } catch {
      setStatus("error");
    }
  }

  const muted = dark ? "text-cream-200" : "text-ink-muted";

  if (status === "ok" || status === "soon") {
    return (
      <p role="status" className={`text-base ${dark ? "text-cream-50" : "text-ink"}`}>
        {status === "ok"
          ? "Dziękujemy! Sprawdź skrzynkę i potwierdź zapis."
          : "Dziękujemy za zainteresowanie! Newsletter wystartuje już wkrótce."}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="w-full max-w-xl" noValidate={false}>
      <div className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor={`${id}-email`} className="sr-only">
          Adres e-mail
        </label>
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="Twój adres e-mail"
          className="border-cream-300 text-ink placeholder:text-ink-muted focus:border-burgundy-700 h-12 flex-1 rounded-full border bg-white px-5 focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className={`h-12 rounded-full px-7 text-sm font-semibold transition-colors ${
            dark
              ? "bg-cream-50 text-burgundy-900 hover:bg-white"
              : "bg-burgundy-700 text-cream-50 hover:bg-burgundy-900"
          }`}
        >
          {status === "sending" ? "Wysyłanie…" : "Zapisz się"}
        </button>
      </div>
      <label className={`mt-4 flex items-start gap-3 text-xs leading-relaxed ${muted}`}>
        <input
          type="checkbox"
          name="zgoda"
          required
          className="accent-burgundy-700 mt-0.5 h-4 w-4 shrink-0"
        />
        <span>
          Oświadczam, że mam ukończone 18 lat i chcę otrzymywać newsletter OnlyWines.pl. Wyrażam
          zgodę na przetwarzanie mojego adresu e-mail w tym celu. Zgodę mogę wycofać w każdej
          chwili. Szczegóły:{" "}
          <Link href="/polityka-prywatnosci" className="underline underline-offset-2">
            polityka prywatności
          </Link>
          .
        </span>
      </label>
      {status === "error" && (
        <p role="alert" className="text-burgundy-500 mt-3 text-sm">
          Nie udało się zapisać. Spróbuj ponownie za chwilę.
        </p>
      )}
    </form>
  );
}
