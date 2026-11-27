import Link from "next/link";
import type { ReactNode } from "react";
import { getHome, getSettings, reassuranceLine } from "@/lib/content";

/** Shared building blocks. Pages compose these; they do not style from scratch. */

export const INTRO_HREF = "/kennismaking";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-5xl px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}

type Tone = "paper" | "surface" | "sand" | "sage";

const tones: Record<Tone, string> = {
  paper: "bg-paper",
  surface: "bg-surface",
  sand: "bg-sand",
  sage: "bg-sage-50",
};

export function Section({
  children,
  tone = "paper",
  id,
}: {
  children: ReactNode;
  tone?: Tone;
  id?: string;
}) {
  return (
    <section id={id} className={`${tones[tone]} py-16 sm:py-20`}>
      <Container>{children}</Container>
    </section>
  );
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="mb-8 max-w-2xl text-3xl leading-tight sm:text-4xl">
      {children}
    </h2>
  );
}

export function PageHeader({ title, intro }: { title: string; intro: string }) {
  return (
    <header className="border-b border-line bg-surface py-14 sm:py-20">
      <Container>
        <h1 className="max-w-3xl text-4xl leading-tight sm:text-5xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
          {intro}
        </p>
      </Container>
    </header>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
}) {
  const styles =
    variant === "primary"
      ? "bg-sage-700 text-white hover:bg-sage-800"
      : "border border-sage-700 text-sage-800 hover:bg-sage-50";
  return (
    <Link
      href={href}
      className={`inline-flex min-h-12 items-center justify-center rounded-full px-6 py-3 text-base font-semibold transition-colors ${styles}`}
    >
      {children}
    </Link>
  );
}

export function Prose({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="max-w-2xl space-y-4 text-lg leading-relaxed text-ink">
      {paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </div>
  );
}

/** Marks content that is not final, so it cannot be mistaken for the real thing. */
export function PlaceholderTag({ children = "Voorbeeld" }: { children?: ReactNode }) {
  return (
    <span className="inline-block rounded-full bg-clay-soft px-3 py-1 text-xs font-semibold uppercase tracking-wide text-clay">
      {children}
    </span>
  );
}

export function PortraitPlaceholder({ label = "Portretfoto volgt" }: { label?: string }) {
  return (
    <div
      role="img"
      aria-label={label}
      className="flex aspect-[4/5] w-full items-end justify-center rounded-[2rem] border border-dashed border-sage-600 bg-sage-100 p-6"
    >
      <PlaceholderTag>{label}</PlaceholderTag>
    </div>
  );
}

/** Closing call to action, shown at the bottom of most pages. Text comes from the editor. */
export function CtaBand() {
  const home = getHome();
  const settings = getSettings();
  return (
    <section className="bg-sage-800 py-16 text-white sm:py-20">
      <Container className="text-center">
        <h2 className="mx-auto max-w-2xl text-3xl leading-tight !text-white sm:text-4xl">
          {home.ctaTitle}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-sage-100">
          {home.ctaText}
        </p>
        <div className="mt-8">
          <Link
            href={INTRO_HREF}
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-surface px-7 py-3 text-base font-semibold text-sage-800 transition-colors hover:bg-sand"
          >
            {settings.ctaLabel}
          </Link>
        </div>
        <p className="mt-4 text-sm text-sage-100">{reassuranceLine(settings)}</p>
      </Container>
    </section>
  );
}
