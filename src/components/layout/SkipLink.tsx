/** "Skip to content" link – first focusable element on every page (WCAG 2.4.1). Off-screen until focused. */
export function SkipLink() {
  return (
    <a
      href="#tresc"
      className="bg-burgundy-700 text-cream-50 fixed -top-24 left-3 z-50 inline-flex min-h-11 items-center rounded px-5 text-sm font-semibold transition-[top] focus:top-3"
    >
      Przejdź do treści
    </a>
  );
}
