import Link from "next/link";
import { ReviewCard } from "@/components/review-card";
import { Steps } from "@/components/steps";
import {
  ButtonLink,
  Container,
  CtaBand,
  INTRO_HREF,
  INTRO_LABEL,
  PortraitPlaceholder,
  Prose,
  Section,
  SectionTitle,
} from "@/components/ui";
import {
  getHome,
  getReviews,
  getSettings,
  getWerkwijze,
  priceLabel,
  toParagraphs,
} from "@/lib/content";

const textLink =
  "font-semibold text-sage-700 underline underline-offset-4 hover:text-sage-800";

export default function HomePage() {
  const home = getHome();
  const settings = getSettings();
  const werkwijze = getWerkwijze();
  const reviews = getReviews().slice(0, 3);
  const reassurance = `Gratis en vrijblijvend · ${settings.introCallMinutes} minuten · reactie ${settings.replyTime}`;

  return (
    <>
      {/* 1. Hero */}
      <section className="bg-surface py-14 sm:py-20">
        <Container className="grid items-center gap-10 md:grid-cols-[1.25fr_1fr]">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-clay">
              {home.heroNote}
            </p>
            <h1 className="text-4xl leading-[1.1] sm:text-6xl">{home.heroTitle}</h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
              {home.heroIntro}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <ButtonLink href={INTRO_HREF}>{INTRO_LABEL}</ButtonLink>
              <ButtonLink href="/werkwijze" variant="secondary">
                Bekijk mijn werkwijze
              </ButtonLink>
            </div>
            <p className="mt-4 text-sm text-muted">{reassurance}</p>
          </div>
          <div className="mx-auto w-full max-w-xs md:max-w-none">
            <PortraitPlaceholder />
          </div>
        </Container>
      </section>

      {/* 2. Herken je dit? */}
      <Section tone="paper">
        <SectionTitle>{home.recogniseTitle}</SectionTitle>
        <ul className="grid gap-4 sm:grid-cols-2">
          {home.recogniseItems.map((item) => (
            <li
              key={item}
              className="flex gap-3 rounded-2xl border border-line bg-surface p-5 leading-relaxed"
            >
              <span
                aria-hidden="true"
                className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-clay"
              />
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-sage-800">
          {home.recogniseClosing}
        </p>
      </Section>

      {/* 3. Wat het oplevert */}
      <Section tone="sage">
        <SectionTitle>{home.outcomesTitle}</SectionTitle>
        <div className="grid gap-6 md:grid-cols-3">
          {home.outcomes.map((outcome) => (
            <div key={outcome.title} className="rounded-2xl bg-surface p-6">
              <h3 className="text-xl">{outcome.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{outcome.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-14">
          <h3 className="mb-4 text-2xl sm:text-3xl">{home.approachTitle}</h3>
          <Prose paragraphs={toParagraphs(home.approachText)} />
        </div>
      </Section>

      {/* 4. Werkwijze in stappen */}
      <Section tone="paper">
        <SectionTitle>Zo werkt het</SectionTitle>
        <Steps steps={werkwijze.steps} />
        <p className="mt-8 text-lg">
          Een traject is er <strong>{priceLabel(settings)}</strong>.{" "}
          <Link href="/werkwijze" className={textLink}>
            Lees meer over werkwijze en tarieven
          </Link>
        </p>
      </Section>

      {/* 5. Ervaringen */}
      <Section tone="sand">
        <SectionTitle>Ervaringen van cliënten</SectionTitle>
        <div className="grid gap-6 md:grid-cols-3">
          {reviews.map((review) => (
            <ReviewCard key={review.slug} review={review} />
          ))}
        </div>
        <p className="mt-8">
          <Link href="/ervaringen" className={textLink}>
            Lees alle ervaringen
          </Link>
        </p>
      </Section>

      {/* 6. Over mij, kort */}
      <Section tone="surface">
        <div className="grid items-center gap-10 md:grid-cols-[1fr_2fr]">
          <div className="mx-auto w-full max-w-[14rem] md:max-w-none">
            <PortraitPlaceholder />
          </div>
          <div>
            <SectionTitle>{home.aboutTitle}</SectionTitle>
            <Prose paragraphs={toParagraphs(home.aboutText)} />
            <p className="mt-6">
              <Link href="/over-mij" className={textLink}>
                Meer over mij
              </Link>
            </p>
          </div>
        </div>
      </Section>

      {/* 7. Veelgestelde vragen */}
      <Section tone="paper">
        <SectionTitle>{home.faqTitle}</SectionTitle>
        <div className="max-w-3xl divide-y divide-line border-y border-line">
          {home.faq.map((item) => (
            <details key={item.question} className="group py-1">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-lg font-semibold text-sage-800 [&::-webkit-details-marker]:hidden">
                {item.question}
                <span
                  aria-hidden="true"
                  className="text-2xl font-normal text-clay transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="pb-5 pr-8 leading-relaxed text-muted">{item.answer}</p>
            </details>
          ))}
        </div>
      </Section>

      {/* 8. Afsluitende oproep */}
      <CtaBand title={home.ctaTitle} text={home.ctaText} reassurance={reassurance} />
    </>
  );
}
