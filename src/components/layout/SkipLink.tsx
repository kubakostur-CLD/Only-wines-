/** "Skip to content" link – first focusable element on every page (WCAG 2.4.1). */
export function SkipLink() {
  return (
    <a
      href="#tresc"
      className="sr-only z-50 rounded bg-burgundy-700 px-4 py-2 text-cream-50 focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
    >
      Przejdź do treści
    </a>
  );
}
