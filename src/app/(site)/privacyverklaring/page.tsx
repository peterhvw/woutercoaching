import type { Metadata } from "next";
import { PageHeader, PlaceholderTag, Section } from "@/components/ui";
import { getPrivacy } from "@/lib/content";

export function generateMetadata(): Metadata {
  return { title: getPrivacy().title };
}

/**
 * The privacy statement is edited in the content editor. Review it before
 * going live and whenever a service (email delivery, analytics, media
 * embeds, booking) is added.
 */
export default function PrivacyPage() {
  const page = getPrivacy();

  return (
    <>
      <PageHeader title={page.title} intro={page.intro} />
      <Section tone="paper">
        {page.draft && (
          <div className="mb-8">
            <PlaceholderTag>Concept: laten controleren voor livegang</PlaceholderTag>
          </div>
        )}
        <div className="max-w-2xl space-y-8">
          {page.sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-2xl">{section.title}</h2>
              <p className="mt-3 text-lg leading-relaxed">{section.text}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
