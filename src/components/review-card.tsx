import type { Review } from "@/lib/content";
import { PlaceholderTag } from "./ui";

/**
 * A review without recorded client consent is always labelled "Voorbeeld",
 * so a placeholder can never pass for a real client's words.
 */
export function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="flex h-full flex-col rounded-2xl border border-line bg-surface p-6">
      {!review.consent && (
        <div className="mb-4">
          <PlaceholderTag />
        </div>
      )}
      <blockquote className="flex-1 text-lg leading-relaxed text-ink">
        “{review.quote}”
      </blockquote>
      <figcaption className="mt-5 text-sm">
        <span className="font-semibold text-sage-800">{review.name}</span>
        {review.context && <span className="text-muted"> · {review.context}</span>}
      </figcaption>
    </figure>
  );
}
