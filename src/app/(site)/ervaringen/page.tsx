import type { Metadata } from "next";
import { ReviewCard } from "@/components/review-card";
import { CtaBand, PageHeader, Section } from "@/components/ui";
import { getHome, getReviews, getSettings } from "@/lib/content";

export const metadata: Metadata = { title: "Ervaringen" };

export default function ErvaringenPage() {
  const reviews = getReviews();
  const home = getHome();
  const settings = getSettings();

  return (
    <>
      <PageHeader
        title="Ervaringen"
        intro="Cliënten vertellen in hun eigen woorden wat coaching voor hen heeft betekend. Elke ervaring is geplaatst met toestemming."
      />

      <Section tone="paper">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <ReviewCard key={review.slug} review={review} />
          ))}
        </div>
      </Section>

      <CtaBand
        title={home.ctaTitle}
        text={home.ctaText}
        reassurance={`Gratis en vrijblijvend · ${settings.introCallMinutes} minuten`}
      />
    </>
  );
}
