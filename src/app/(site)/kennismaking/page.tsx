import type { Metadata } from "next";
import { PageHeader, Section } from "@/components/ui";
import { getKennismaking, getSettings, whatsappHref } from "@/lib/content";
import { EnquiryForm } from "./enquiry-form";

export function generateMetadata(): Metadata {
  return { title: getKennismaking().title };
}

export default function KennismakingPage() {
  const page = getKennismaking();
  const settings = getSettings();
  const whatsapp = whatsappHref(settings);

  return (
    <>
      <PageHeader title={page.title} intro={page.intro} />

      <Section tone="paper">
        <div className="grid gap-12 md:grid-cols-[3fr_2fr]">
          <EnquiryForm
            labels={{
              name: page.nameLabel,
              email: page.emailLabel,
              phone: page.phoneLabel,
              optional: page.optionalLabel,
              message: page.messageLabel,
              submit: page.submitLabel,
              privacyNote: page.privacyNote,
              successTitle: page.successTitle,
              successText: page.successText,
            }}
          />

          <aside className="h-fit rounded-2xl bg-sage-50 p-7">
            <h2 className="text-2xl">{page.expectTitle}</h2>
            <ul className="mt-5 space-y-3 leading-relaxed">
              {page.expectItems.map((item) => (
                <li key={item} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-2.5 h-2.5 w-2.5 shrink-0 rounded-full bg-clay"
                  />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-muted">Reactie {settings.replyTime}.</p>

            {whatsapp && (
              <div className="mt-6 border-t border-line pt-6">
                <p className="leading-relaxed">{page.whatsappIntro}</p>
                <a
                  href={whatsapp}
                  className="mt-4 inline-flex min-h-11 items-center rounded-full border border-sage-700 px-5 py-2 text-sm font-semibold text-sage-800 hover:bg-surface"
                >
                  {settings.whatsappLabel}
                </a>
              </div>
            )}
          </aside>
        </div>
      </Section>
    </>
  );
}
