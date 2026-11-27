import Link from "next/link";
import { whatsappHref, type Settings } from "@/lib/content";
import { getNavItems } from "./site-header";
import { Container, INTRO_HREF } from "./ui";

/** Shows a value, or a visible placeholder while the editor has not filled it in. */
function valueOr(value: string | undefined, placeholder: string) {
  return value?.trim() ? value : `[${placeholder}]`;
}

export function SiteFooter({ settings }: { settings: Settings }) {
  const whatsapp = whatsappHref(settings);
  return (
    <footer className="border-t border-line bg-sand py-12 text-[0.95rem] text-ink">
      <Container className="grid gap-10 sm:grid-cols-3">
        <div>
          <p className="font-serif text-xl font-semibold text-sage-800">
            {settings.siteName}
          </p>
          <p className="mt-2 text-muted">{settings.tagline}</p>
          <p className="mt-2 text-muted">{settings.city} en online</p>
        </div>

        <nav aria-label="Voettekstmenu">
          <ul className="space-y-2">
            {[...getNavItems(), { href: INTRO_HREF, label: settings.ctaLabelShort }].map(
              (item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:underline">
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div>
          <ul className="space-y-2">
            <li>E-mail: {valueOr(settings.email, "e-mailadres volgt")}</li>
            <li>
              {whatsapp ? (
                <a href={whatsapp} className="hover:underline">
                  {settings.whatsappLabel}
                </a>
              ) : (
                "WhatsApp: [nummer volgt]"
              )}
            </li>
            <li>KvK: {valueOr(settings.kvk, "KvK-nummer volgt")}</li>
            <li>Btw-id: {valueOr(settings.btw, "btw-id volgt")}</li>
            <li>
              <Link href="/privacyverklaring" className="hover:underline">
                Privacyverklaring
              </Link>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}
