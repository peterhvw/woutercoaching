import type { Metadata } from "next";
import {
  CtaBand,
  PageHeader,
  PortraitPlaceholder,
  Prose,
  Section,
  SectionTitle,
} from "@/components/ui";
import { getOverMij, toParagraphs } from "@/lib/content";

export function generateMetadata(): Metadata {
  return { title: getOverMij().title };
}

export default function OverMijPage() {
  const page = getOverMij();

  return (
    <>
      <PageHeader title={page.title} intro={page.intro} />

      <Section tone="paper">
        <div className="grid gap-10 md:grid-cols-[2fr_1fr]">
          <Prose paragraphs={toParagraphs(page.story)} />
          <div className="mx-auto w-full max-w-xs md:max-w-none">
            <PortraitPlaceholder />
          </div>
        </div>
      </Section>

      <Section tone="sage">
        <SectionTitle>{page.visionTitle}</SectionTitle>
        <Prose paragraphs={toParagraphs(page.vision)} />
      </Section>

      <Section tone="surface">
        <SectionTitle>{page.credentialsTitle}</SectionTitle>
        <ul className="max-w-2xl space-y-3 text-lg">
          {page.credentials.map((line) => (
            <li key={line} className="flex gap-3">
              <span
                aria-hidden="true"
                className="mt-2.5 h-2.5 w-2.5 shrink-0 rounded-full bg-clay"
              />
              {line}
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand />
    </>
  );
}
