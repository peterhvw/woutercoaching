import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { load } from "js-yaml";

/**
 * Reads the YAML files in /content that the Keystatic editor writes.
 * Reads are synchronous on purpose: Next.js then treats them as build-time
 * values, so every page is prerendered as static HTML.
 * The types below mirror the schema in keystatic.config.ts.
 */

const CONTENT_DIR = path.join(process.cwd(), "content");

type TitledItem = { title: string; text: string };

export type Settings = {
  siteName: string;
  tagline: string;
  description: string;
  city: string;
  address: string;
  email: string;
  whatsapp: string;
  kvk: string;
  btw: string;
  priceFrom: string;
  introCallMinutes: number;
  replyTime: string;
  ctaLabel: string;
  ctaLabelShort: string;
  reassurance: string;
  whatsappLabel: string;
};

export type Home = {
  heroTitle: string;
  heroIntro: string;
  heroNote: string;
  heroSecondaryButton: string;
  recogniseTitle: string;
  recogniseItems: string[];
  recogniseClosing: string;
  outcomesTitle: string;
  outcomes: TitledItem[];
  approachTitle: string;
  approachText: string;
  stepsTitle: string;
  stepsPriceIntro: string;
  stepsLink: string;
  reviewsTitle: string;
  reviewsLink: string;
  aboutTitle: string;
  aboutText: string;
  aboutLink: string;
  faqTitle: string;
  faq: { question: string; answer: string }[];
  ctaTitle: string;
  ctaText: string;
};

export type OverMij = {
  title: string;
  intro: string;
  story: string;
  credentialsTitle: string;
  credentials: string[];
  visionTitle: string;
  vision: string;
};

export type Werkwijze = {
  title: string;
  intro: string;
  stepsTitle: string;
  steps: TitledItem[];
  practicalTitle: string;
  practical: TitledItem[];
  priceTitle: string;
  priceLead: string;
  priceText: string;
  boundaryTitle: string;
  boundaryText: string;
};

export type Kennismaking = {
  title: string;
  intro: string;
  expectTitle: string;
  expectItems: string[];
  nameLabel: string;
  emailLabel: string;
  phoneLabel: string;
  optionalLabel: string;
  messageLabel: string;
  submitLabel: string;
  privacyNote: string;
  whatsappIntro: string;
  successTitle: string;
  successText: string;
};

export type Ervaringen = { title: string; intro: string };

export type Contact = {
  title: string;
  intro: string;
  emailLabel: string;
  whatsappLabel: string;
  locationLabel: string;
  asideTitle: string;
  asideText: string;
};

export type Privacy = {
  title: string;
  intro: string;
  draft: boolean;
  sections: TitledItem[];
};

export type Praktijk = {
  menuLabel: string;
  title: string;
  intro: string;
  readMore: string;
  situationTitle: string;
  signalsTitle: string;
  readingTitle: string;
  actionsTitle: string;
  outcomeTitle: string;
  audioLabel: string;
  transcriptLabel: string;
  recogniseTitle: string;
  recogniseText: string;
  disclaimerComposite: string;
  disclaimerConsent: string;
  homeTitle: string;
  werkwijzeTitle: string;
  mediaTitle: string;
  mediaIntro: string;
  videoNotice: string;
  videoButton: string;
  keyPointsTitle: string;
};

/**
 * voorbeeld: layout sample, always labelled "Voorbeeld".
 * samengesteld: composite of several trajectories.
 * toestemming: a real case, published with the client's written consent.
 */
export type CaseKind = "voorbeeld" | "samengesteld" | "toestemming";

export type Case = {
  slug: string;
  title: string;
  kind: CaseKind;
  theme: string;
  summary: string;
  situation: string;
  signals: string;
  reading: string;
  /** Public URL of the audio file, or null. */
  audio: string | null;
  audioTitle: string;
  audioTranscript: string;
  actions: string;
  outcome: string;
  featured: boolean;
  showOnWerkwijze: boolean;
  order: number;
};

export type MediaItem = {
  slug: string;
  title: string;
  videoUrl: string | null;
  /** Public URL of the poster image, or null. */
  poster: string | null;
  duration: string;
  context: string;
  summary: string;
  keyPoints: string[];
  showOnOverMij: boolean;
  order: number;
};

export type Review = {
  slug: string;
  name: string;
  context: string;
  quote: string;
  order: number;
  consent: boolean;
};

function readYaml<T>(relativePath: string): T {
  const file = path.join(CONTENT_DIR, relativePath);
  return load(readFileSync(file, "utf8")) as T;
}

export const getSettings = () => readYaml<Settings>("settings.yaml");
export const getHome = () => readYaml<Home>("home.yaml");
export const getOverMij = () => readYaml<OverMij>("over-mij.yaml");
export const getWerkwijze = () => readYaml<Werkwijze>("werkwijze.yaml");
export const getKennismaking = () => readYaml<Kennismaking>("kennismaking.yaml");
export const getErvaringen = () => readYaml<Ervaringen>("ervaringen.yaml");
export const getContact = () => readYaml<Contact>("contact.yaml");
export const getPrivacy = () => readYaml<Privacy>("privacy.yaml");

export const getPraktijk = () => readYaml<Praktijk>("praktijk.yaml");

/** Reads every entry of a collection folder; the file name is the slug. */
function readCollection<T>(folder: string): (T & { slug: string })[] {
  const dir = path.join(CONTENT_DIR, folder);
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((file) => file.endsWith(".yaml"))
    .map((file) => ({
      ...readYaml<T>(path.join(folder, file)),
      slug: file.replace(/\.yaml$/, ""),
    }));
}

/**
 * The editor stores an uploaded file either as a full public path or as a bare
 * file name inside a folder named after the entry. Both become a public URL.
 */
function assetUrl(value: unknown, publicPath: string, slug: string): string | null {
  if (typeof value !== "string" || !value.trim()) return null;
  return value.startsWith("/") ? value : `${publicPath}${slug}/${value}`;
}

const byOrder = (a: { order?: number }, b: { order?: number }) =>
  (a.order ?? 0) - (b.order ?? 0);

export function getCases(): Case[] {
  return readCollection<Omit<Case, "slug">>("cases")
    .map((entry) => ({
      ...entry,
      kind: entry.kind ?? "voorbeeld",
      audio: assetUrl(entry.audio, "/audio/cases/", entry.slug),
    }))
    .sort(byOrder);
}

export function getCase(slug: string): Case | undefined {
  return getCases().find((entry) => entry.slug === slug);
}

export function getMedia(): MediaItem[] {
  return readCollection<Omit<MediaItem, "slug">>("media")
    .map((entry) => ({
      ...entry,
      keyPoints: entry.keyPoints ?? [],
      videoUrl: entry.videoUrl?.trim() || null,
      poster: assetUrl(entry.poster, "/images/media/", entry.slug),
    }))
    .sort(byOrder);
}

export function getReviews(): Review[] {
  const dir = path.join(CONTENT_DIR, "reviews");
  return readdirSync(dir)
    .filter((file) => file.endsWith(".yaml"))
    .map((file) => ({
      ...readYaml<Omit<Review, "slug">>(path.join("reviews", file)),
      slug: file.replace(/\.yaml$/, ""),
    }))
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

/** Splits editor text into paragraphs on blank lines. */
export function toParagraphs(text: string | undefined): string[] {
  return (text ?? "")
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .filter(Boolean);
}

/** "vanaf € 475", or a visible placeholder while no price is set. */
export function priceLabel(settings: Settings): string {
  return `vanaf € ${settings.priceFrom?.trim() || "[bedrag]"}`;
}

/** "Gratis en vrijblijvend · 30 minuten · reactie binnen 1 werkdag" */
export function reassuranceLine(settings: Settings): string {
  return [
    settings.reassurance,
    `${settings.introCallMinutes} minuten`,
    `reactie ${settings.replyTime}`,
  ]
    .filter(Boolean)
    .join(" · ");
}

/** WhatsApp chat link, or null while no number is set. Never a phone link. */
export function whatsappHref(settings: Settings): string | null {
  const digits = (settings.whatsapp ?? "").replace(/\D/g, "");
  return digits ? `https://wa.me/${digits}` : null;
}
