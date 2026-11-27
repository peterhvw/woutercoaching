import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ButtonLink, INTRO_HREF, PageHeader, Section } from "@/components/ui";
import { getContact, getSettings, whatsappHref } from "@/lib/content";

export function generateMetadata(): Metadata {
  return { title: getContact().title };
}

function Detail({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="border-b border-line py-4">
      <dt className="text-sm font-semibold uppercase tracking-wide text-muted">
        {label}
      </dt>
      <dd className="mt-1 text-lg">{children}</dd>
    </div>
  );
}

const linkClass = "text-sage-700 underline underline-offset-4";

/** Contact is by email or WhatsApp. There is deliberately no phone number to call. */
export default function ContactPage() {
  const page = getContact();
  const settings = getSettings();
  const whatsapp = whatsappHref(settings);
  const email = settings.email?.trim();

  return (
    <>
      <PageHeader title={page.title} intro={page.intro} />

      <Section tone="paper">
        <div className="grid gap-12 md:grid-cols-2">
          <dl>
            <Detail label={page.emailLabel}>
              {email ? (
                <a href={`mailto:${email}`} className={linkClass}>
                  {email}
                </a>
              ) : (
                "[e-mailadres volgt]"
              )}
            </Detail>
            <Detail label={page.whatsappLabel}>
              {whatsapp ? (
                <a href={whatsapp} className={linkClass}>
                  {settings.whatsappLabel}
                </a>
              ) : (
                "[WhatsApp-nummer volgt]"
              )}
            </Detail>
            <Detail label={page.locationLabel}>
              {settings.address
                ? `${settings.address}, ${settings.city}`
                : `${settings.city} en online`}
            </Detail>
          </dl>

          <div className="h-fit rounded-2xl bg-sage-50 p-7">
            <h2 className="text-2xl">{page.asideTitle}</h2>
            <p className="mt-3 leading-relaxed text-muted">{page.asideText}</p>
            <div className="mt-6">
              <ButtonLink href={INTRO_HREF}>{settings.ctaLabel}</ButtonLink>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
