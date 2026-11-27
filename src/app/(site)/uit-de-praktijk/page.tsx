import type { Metadata } from "next";
import { CaseCard } from "@/components/case-card";
import { MediaBlock } from "@/components/media-block";
import { CtaBand, PageHeader, Section, SectionTitle } from "@/components/ui";
import { getCases, getMedia, getPraktijk } from "@/lib/content";

export function generateMetadata(): Metadata {
  return { title: getPraktijk().title };
}

export default function PraktijkPage() {
  const page = getPraktijk();
  const cases = getCases();
  const media = getMedia();

  return (
    <>
      <PageHeader title={page.title} intro={page.intro} />

      <Section tone="paper">
        <div className="grid gap-6 md:grid-cols-2">
          {cases.map((item) => (
            <CaseCard key={item.slug} item={item} readMore={page.readMore} />
          ))}
        </div>
      </Section>

      {media.length > 0 && (
        <Section tone="sage" id="video">
          <SectionTitle>{page.mediaTitle}</SectionTitle>
          <p className="-mt-4 mb-10 max-w-2xl text-lg leading-relaxed text-muted">
            {page.mediaIntro}
          </p>
          <div className="space-y-14">
            {media.map((item) => (
              <MediaBlock key={item.slug} item={item} labels={page} />
            ))}
          </div>
        </Section>
      )}

      <CtaBand />
    </>
  );
}
