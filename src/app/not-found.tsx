import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page py-28 text-center">
      <p className="eyebrow">Błąd 404</p>
      <h1 className="mt-4 text-4xl font-semibold md:text-5xl">Tej strony nie ma w naszej piwnicy</h1>
      <p className="mx-auto mt-5 max-w-lg text-lg text-ink-muted">
        Strona mogła zostać przeniesiona albo adres zawiera literówkę. Zajrzyj na stronę główną lub do słowniczka.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Link href="/" className="rounded-full bg-burgundy-700 px-6 py-3 text-sm font-semibold text-cream-50 hover:bg-burgundy-900">
          Strona główna
        </Link>
        <Link href="/slowniczek" className="rounded-full border border-burgundy-700 px-6 py-3 text-sm font-semibold text-burgundy-700 hover:bg-burgundy-50">
          Słowniczek
        </Link>
      </div>
    </div>
  );
}
