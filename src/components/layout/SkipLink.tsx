/** "Skip to content" link – first focusable element on every page (WCAG 2.4.1). Off-screen until focused. */
export function SkipLink() {
  return (
    <a
      href="#tresc"
      className="fixed -top-24 left-3 z-50 inline-flex min-h-11 items-center rounded bg-burgundy-700 px-5 text-sm font-semibold text-cream-50 transition-[top] focus:top-3"
    >
      Przejdź do treści
    </a>
  );
}
