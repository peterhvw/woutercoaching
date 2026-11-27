import Link from "next/link";
import { Container, INTRO_HREF } from "./ui";

export const NAV_ITEMS = [
  { href: "/over-mij", label: "Over mij" },
  { href: "/werkwijze", label: "Werkwijze" },
  { href: "/ervaringen", label: "Ervaringen" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader({
  siteName,
  ctaLabel,
  ctaLabelShort,
}: {
  siteName: string;
  ctaLabel: string;
  ctaLabelShort: string;
}) {
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-paper/95 backdrop-blur">
      <a
        href="#inhoud"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded focus:bg-surface focus:px-4 focus:py-2"
      >
        Naar de inhoud
      </a>
      <Container className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 py-4">
        <Link
          href="/"
          className="font-serif text-xl font-semibold text-sage-800 sm:text-2xl"
        >
          {siteName}
        </Link>
        <nav
          aria-label="Hoofdmenu"
          className="order-3 w-full sm:order-none sm:w-auto"
        >
          <ul className="flex flex-wrap gap-x-5 gap-y-1 text-[0.95rem] font-medium text-ink sm:gap-x-7">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-block py-2 hover:text-sage-700 hover:underline hover:underline-offset-4"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Link
          href={INTRO_HREF}
          className="inline-flex min-h-11 items-center rounded-full bg-sage-700 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-sage-800"
        >
          <span className="lg:hidden">{ctaLabelShort}</span>
          <span className="hidden lg:inline">{ctaLabel}</span>
        </Link>
      </Container>
    </header>
  );
}
