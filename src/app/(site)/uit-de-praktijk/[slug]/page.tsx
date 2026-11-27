import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CASES_HREF } from "@/components/case-card";
import {
  ButtonLink,
  Container,
  INTRO_HREF,
  PlaceholderTag,
  Prose,
} from "@/components/ui";
import {
  getCase,
  getCases,
  getPraktijk,
  getSettings,
  toParagraphs,
} from "@/lib/content";

export function generateStaticParams() {
  return getCases().map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/uit-de-praktijk/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const item = getCase(slug);
  return item ? { title: item.title, description: item.summary } : {};
}

function Part({ title, text }: { title: string; text: string }) {
  const paragraphs = toParagraphs(text);
  if (paragraphs.length === 0) return null;
  return (
    <section className="mt-12">
      <h2 className="mb-4 text-2xl sm:text-3xl">{title}</h2>
      <Prose paragraphs={paragraphs} />
    </section>
  );
}

export default async function CasePage({
  params,
}: PageProps<"/uit-de-praktijk/[slug]">) {
  const { slug } = await params;
  const item = getCase(slug);
  if (!item) notFound();

  const page = getPraktijk();
  const settings = getSettings();
  const transcript = toParagraphs(item.audioTranscript);
  const isExample = item.kind === "voorbeeld";
  // The accountability line is fixed by the kind of case; an example has none.
  const disclaimer =
    item.kind === "samengesteld"
      ? page.disclaimerComposite
      : item.kind === "toestemming"
        ? page.disclaimerConsent
        : null;

  return (
    <article>
      <header className="border-b border-line bg-surface py-14 sm:py-20">
        <Container>
          <p className="mb-5 text-sm">
            <Link
              href={CASES_HREF}
              className="font-semibold text-sage-700 underline underline-offset-4"
            >
              ← {page.title}
            </Link>
          </p>
          <div className="mb-4 flex flex-wrap items-center gap-2">
            {item.theme && (
              <span className="rounded-full bg-sage-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-sage-800">
                {item.theme}
              </span>
            )}
            {isExample && <PlaceholderTag />}
          </div>
          <h1 className="max-w-3xl text-4xl leading-tight sm:text-5xl">{item.title}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
            {item.summary}
          </p>
        </Container>
      </header>

      <div className="bg-paper pb-16 sm:pb-20">
        <Container>
          <Part title={page.situationTitle} text={item.situation} />
          <Part title={page.signalsTitle} text={item.signals} />
          <Part title={page.readingTitle} text={item.reading} />

          {(item.audio || isExample) && (
            <aside className="mt-8 max-w-2xl rounded-2xl border border-sage-600 bg-sage-50 p-6">
              <p className="text-sm font-semibold uppercase tracking-widest text-clay">
                {page.audioLabel}
              </p>
              {item.audioTitle && (
                <h3 className="mt-2 text-xl leading-snug">{item.audioTitle}</h3>
              )}
              {item.audio ? (
                <audio
                  controls
                  preload="none"
                  src={item.audio}
                  className="mt-4 w-full"
                >
                  <a href={item.audio}>{item.audioTitle || page.audioLabel}</a>
                </audio>
              ) : (
                <p className="mt-4">
                  <PlaceholderTag>Audio volgt</PlaceholderTag>
                </p>
              )}
              {transcript.length > 0 && (
                <details className="mt-4">
                  <summary className="cursor-pointer font-semibold text-sage-700 underline underline-offset-4">
                    {page.transcriptLabel}
                  </summary>
                  <div className="mt-3 space-y-3 leading-relaxed">
                    {transcript.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </details>
              )}
            </aside>
          )}

          <Part title={page.actionsTitle} text={item.actions} />
          <Part title={page.outcomeTitle} text={item.outcome} />

          <section className="mt-14 max-w-2xl rounded-2xl bg-sage-800 p-8 text-white">
            <h2 className="text-2xl !text-white sm:text-3xl">{page.recogniseTitle}</h2>
            <p className="mt-3 text-lg leading-relaxed text-sage-100">
              {page.recogniseText}
            </p>
            <div className="mt-6">
              <Link
                href={INTRO_HREF}
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-surface px-7 py-3 text-base font-semibold text-sage-800 transition-colors hover:bg-sand"
              >
                {settings.ctaLabel}
              </Link>
            </div>
          </section>

          {disclaimer && (
            <p className="mt-8 max-w-2xl border-t border-line pt-6 text-sm leading-relaxed text-muted">
              {disclaimer}
            </p>
          )}

          <p className="mt-10">
            <ButtonLink href={CASES_HREF} variant="secondary">
              ← {page.title}
            </ButtonLink>
          </p>
        </Container>
      </div>
    </article>
  );
}
