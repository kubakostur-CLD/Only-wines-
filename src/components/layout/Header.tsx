import Link from "next/link";
import { mainNav } from "@/config/site";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";

/** Sticky site header with desktop navigation and a mobile drawer. */
export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-cream-300/70 bg-cream-100/90 backdrop-blur supports-[backdrop-filter]:bg-cream-100/80">
      <div className="container-page flex h-16 items-center justify-between gap-6 lg:h-20">
        <Logo />
        <nav aria-label="Główna nawigacja" className="hidden lg:block">
          <ul className="flex items-center gap-6 text-sm font-medium text-ink">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-sm py-2 transition-colors hover:text-burgundy-700"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <MobileNav items={mainNav} />
      </div>
    </header>
  );
}
