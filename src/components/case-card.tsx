import Link from "next/link";
import type { Case } from "@/lib/content";
import { PlaceholderTag } from "./ui";

export const CASES_HREF = "/uit-de-praktijk";

export function CaseCard({ item, readMore }: { item: Case; readMore: string }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-line bg-surface p-6">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        {item.theme && (
          <span className="rounded-full bg-sage-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-sage-800">
            {item.theme}
          </span>
        )}
        {item.kind === "voorbeeld" && <PlaceholderTag />}
      </div>
      <h3 className="text-2xl leading-snug">
        <Link
          href={`${CASES_HREF}/${item.slug}`}
          className="hover:underline hover:underline-offset-4"
        >
          {item.title}
        </Link>
      </h3>
      <p className="mt-3 flex-1 leading-relaxed text-muted">{item.summary}</p>
      <p className="mt-5">
        <Link
          href={`${CASES_HREF}/${item.slug}`}
          aria-label={`${readMore}: ${item.title}`}
          className="font-semibold text-sage-700 underline underline-offset-4 hover:text-sage-800"
        >
          {readMore}
        </Link>
      </p>
    </article>
  );
}
