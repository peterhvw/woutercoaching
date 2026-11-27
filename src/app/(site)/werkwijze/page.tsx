import type { Metadata } from "next";
import { Steps } from "@/components/steps";
import { CtaBand, PageHeader, Prose, Section, SectionTitle } from "@/components/ui";
import {
  getSettings,
  getWerkwijze,
  priceLabel,
  toParagraphs,
} from "@/lib/content";

export function generateMetadata(): Metadata {
  return { title: getWerkwijze().title };
}

export default function WerkwijzePage() {
  const page = getWerkwijze();
  const settings = getSettings();

  return (
    <>
      <PageHeader title={page.title} intro={page.intro} />

      <Section tone="paper">
        <SectionTitle>{page.stepsTitle}</SectionTitle>
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
          {page.priceLead} {priceLabel(settings)}
        </p>
        <Prose paragraphs={toParagraphs(page.priceText)} />
      </Section>

      <Section tone="paper">
        <SectionTitle>{page.boundaryTitle}</SectionTitle>
        <Prose paragraphs={toParagraphs(page.boundaryText)} />
      </Section>

      <CtaBand />
    </>
  );
}
