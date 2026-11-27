import type { Metadata } from "next";
import { Steps } from "@/components/steps";
import { CtaBand, PageHeader, Prose, Section, SectionTitle } from "@/components/ui";
import {
  getHome,
  getSettings,
  getWerkwijze,
  priceLabel,
  toParagraphs,
} from "@/lib/content";

export const metadata: Metadata = { title: "Werkwijze en tarieven" };

export default function WerkwijzePage() {
  const page = getWerkwijze();
  const home = getHome();
  const settings = getSettings();

  return (
    <>
      <PageHeader title={page.title} intro={page.intro} />

      <Section tone="paper">
        <SectionTitle>De stappen</SectionTitle>
        <Steps steps={page.steps} />
      </Section>

      <Section tone="sage">
        <SectionTitle>{page.practicalTitle}</SectionTitle>
        <dl className="grid gap-6 md:grid-cols-3">
          {page.practical.map((item) => (
            <div key={item.title} className="rounded-2xl bg-surface p-6">
              <dt className="font-serif text-xl font-semibold text-sage-800">
                {item.title}
              </dt>
              <dd className="mt-2 leading-relaxed text-muted">{item.text}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section tone="surface" id="tarieven">
        <SectionTitle>{page.priceTitle}</SectionTitle>
        <p className="mb-6 font-serif text-3xl text-sage-800">
          Traject {priceLabel(settings)}
        </p>
        <Prose paragraphs={toParagraphs(page.priceText)} />
      </Section>

      <Section tone="paper">
        <SectionTitle>{page.boundaryTitle}</SectionTitle>
        <Prose paragraphs={toParagraphs(page.boundaryText)} />
      </Section>

      <CtaBand
        title={home.ctaTitle}
        text={home.ctaText}
        reassurance={`Gratis en vrijblijvend · ${settings.introCallMinutes} minuten`}
      />
    </>
  );
}
