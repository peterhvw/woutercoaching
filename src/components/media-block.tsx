import type { MediaItem, Praktijk } from "@/lib/content";
import { toParagraphs } from "@/lib/content";
import { toEmbedUrl } from "@/lib/video";
import { PlaceholderTag, Prose, Section, SectionTitle } from "./ui";
import { VideoPlayer } from "./video-player";

/** One talk or video: player, context, summary and key points. */
export function MediaBlock({ item, labels }: { item: MediaItem; labels: Praktijk }) {
  const embedUrl = toEmbedUrl(item.videoUrl);
  const meta = [item.context, item.duration].filter(Boolean).join(" · ");

  return (
    <article className="grid gap-8 lg:grid-cols-[3fr_2fr]">
      <div>
        {embedUrl ? (
          <VideoPlayer
            title={item.title}
            embedUrl={embedUrl}
            poster={item.poster}
            notice={labels.videoNotice}
            buttonLabel={labels.videoButton}
          />
        ) : (
          <div className="flex aspect-video w-full items-center justify-center rounded-2xl border border-dashed border-sage-600 bg-sage-100">
            <PlaceholderTag>Video volgt</PlaceholderTag>
          </div>
        )}
      </div>
      <div>
        <h3 className="text-2xl leading-snug">{item.title}</h3>
        {meta && <p className="mt-2 text-sm text-muted">{meta}</p>}
        <div className="mt-4">
          <Prose paragraphs={toParagraphs(item.summary)} />
        </div>
        {item.keyPoints.length > 0 && (
          <>
            <h4 className="mt-6 font-serif text-lg font-semibold text-sage-800">
              {labels.keyPointsTitle}
            </h4>
            <ul className="mt-3 space-y-2">
              {item.keyPoints.map((point) => (
                <li key={point} className="flex gap-3 leading-relaxed">
                  <span
                    aria-hidden="true"
                    className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-clay"
                  />
                  {point}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </article>
  );
}

/**
 * Optional video section for a page. Renders nothing when no video is
 * selected for that page, so the page simply has no video block.
 */
export function MediaSection({
  title,
  items,
  labels,
  tone = "paper",
}: {
  title: string;
  items: MediaItem[];
  labels: Praktijk;
  tone?: "paper" | "surface" | "sand" | "sage";
}) {
  if (items.length === 0) return null;
  return (
    <Section tone={tone}>
      <SectionTitle>{title}</SectionTitle>
      <div className="space-y-14">
        {items.map((item) => (
          <MediaBlock key={item.slug} item={item} labels={labels} />
        ))}
      </div>
    </Section>
  );
}
