import type { Metadata } from "next";
import { ButtonLink, INTRO_HREF, INTRO_LABEL, PageHeader, Section } from "@/components/ui";
import { getSettings } from "@/lib/content";

export const metadata: Metadata = { title: "Contact" };

function Detail({
  label,
  value,
  href,
  placeholder,
}: {
  label: string;
  value: string;
  href?: string;
  placeholder: string;
}) {
  const filled = Boolean(value?.trim());
  return (
    <div className="border-b border-line py-4">
      <dt className="text-sm font-semibold uppercase tracking-wide text-muted">
        {label}
      </dt>
      <dd className="mt-1 text-lg">
        {filled && href ? (
          <a href={href} className="text-sage-700 underline underline-offset-4">
            {value}
          </a>
        ) : filled ? (
          value
        ) : (
          `[${placeholder}]`
        )}
      </dd>
    </div>
  );
}

export default function ContactPage() {
  const settings = getSettings();

  return (
    <>
      <PageHeader
        title="Contact"
        intro={`Heb je een vraag of wil je kennismaken? Je krijgt ${settings.replyTime} een reactie.`}
      />

      <Section tone="paper">
        <div className="grid gap-12 md:grid-cols-2">
          <dl>
            <Detail
              label="E-mail"
              value={settings.email}
              href={`mailto:${settings.email}`}
              placeholder="e-mailadres volgt"
            />
            <Detail
              label="Telefoon"
              value={settings.phone}
              href={`tel:${settings.phone.replace(/[^+\d]/g, "")}`}
              placeholder="telefoonnummer volgt"
            />
            <Detail
              label="WhatsApp"
              value={settings.whatsapp ? "Stuur een WhatsApp-bericht" : ""}
              href={`https://wa.me/${settings.whatsapp}`}
              placeholder="WhatsApp-nummer volgt"
            />
            <Detail
              label="Locatie"
              value={
                settings.address
                  ? `${settings.address}, ${settings.city}`
                  : `${settings.city} en online`
              }
              placeholder="adres volgt"
            />
          </dl>

          <div className="h-fit rounded-2xl bg-sage-50 p-7">
            <h2 className="text-2xl">Liever eerst kennismaken?</h2>
            <p className="mt-3 leading-relaxed text-muted">
              In een gratis gesprek van {settings.introCallMinutes} minuten
              bespreken we je vraag en hoor je of coaching bij je past.
            </p>
            <div className="mt-6">
              <ButtonLink href={INTRO_HREF}>{INTRO_LABEL}</ButtonLink>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
