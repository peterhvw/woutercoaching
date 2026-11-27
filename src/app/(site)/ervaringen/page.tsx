import type { Metadata } from "next";
import { ReviewCard } from "@/components/review-card";
import { CtaBand, PageHeader, Section } from "@/components/ui";
import { getErvaringen, getReviews } from "@/lib/content";

export function generateMetadata(): Metadata {
  return { title: getErvaringen().title };
}

export default function ErvaringenPage() {
  const page = getErvaringen();
  const reviews = getReviews();

  return (
    <>
      <PageHeader title={page.title} intro={page.intro} />

      <Section tone="paper">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <ReviewCard key={review.slug} review={review} />
          ))}
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
