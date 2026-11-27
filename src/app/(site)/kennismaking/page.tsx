import type { Metadata } from "next";
import { PageHeader, Section } from "@/components/ui";
import { getKennismaking, getSettings } from "@/lib/content";
import { EnquiryForm } from "./enquiry-form";

export const metadata: Metadata = { title: "Gratis kennismaking" };

export default function KennismakingPage() {
  const page = getKennismaking();
  const settings = getSettings();

  return (
    <>
      <PageHeader title={page.title} intro={page.intro} />

      <Section tone="paper">
        <div className="grid gap-12 md:grid-cols-[3fr_2fr]">
          <EnquiryForm
            successTitle={page.successTitle}
            successText={page.successText}
            replyTime={settings.replyTime}
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
            <p className="mt-6 text-sm text-muted">
              Reactie {settings.replyTime}.
            </p>
          </aside>
        </div>
      </Section>
    </>
  );
}
