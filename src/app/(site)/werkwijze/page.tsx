import type { Metadata } from "next";
import { CaseCard } from "@/components/case-card";
import { Steps } from "@/components/steps";
import { CtaBand, PageHeader, Prose, Section, SectionTitle } from "@/components/ui";
import {
  getCases,
  getPraktijk,
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
  const praktijk = getPraktijk();
  const cases = getCases()
    .filter((item) => item.showOnWerkwijze)
    .slice(0, 2);

  return (
    <>
      <PageHeader title={page.title} intro={page.intro} />

      <Section tone="paper">
        <SectionTitle>{page.stepsTitle}</SectionTitle>
        <Steps steps={page.steps} />
      </Section>

      {cases.length > 0 && (
        <Section tone="surface">
          <SectionTitle>{praktijk.werkwijzeTitle}</SectionTitle>
          <div className="grid gap-6 md:grid-cols-2">
            {cases.map((item) => (
              <CaseCard key={item.slug} item={item} readMore={praktijk.readMore} />
            ))}
          </div>
        </Section>
      )}

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
