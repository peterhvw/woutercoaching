import { readdirSync, readFileSync } from "node:fs";
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
  phone: string;
  whatsapp: string;
  kvk: string;
  btw: string;
  priceFrom: string;
  introCallMinutes: number;
  replyTime: string;
};

export type Home = {
  heroTitle: string;
  heroIntro: string;
  heroNote: string;
  recogniseTitle: string;
  recogniseItems: string[];
  recogniseClosing: string;
  outcomesTitle: string;
  outcomes: TitledItem[];
  approachTitle: string;
  approachText: string;
  aboutTitle: string;
  aboutText: string;
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
  steps: TitledItem[];
  practicalTitle: string;
  practical: TitledItem[];
  priceTitle: string;
  priceText: string;
  boundaryTitle: string;
  boundaryText: string;
};

export type Kennismaking = {
  title: string;
  intro: string;
  expectTitle: string;
  expectItems: string[];
  successTitle: string;
  successText: string;
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
