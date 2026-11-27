import type { Metadata } from "next";
import { PageHeader, PlaceholderTag, Section } from "@/components/ui";
import { getSettings } from "@/lib/content";

export const metadata: Metadata = { title: "Privacyverklaring" };

/**
 * Draft privacy statement. It describes what this site does today:
 * a contact form and no tracking cookies. Review it before going live and
 * whenever a service (email delivery, analytics, booking) is added.
 */
export default function PrivacyPage() {
  const settings = getSettings();
  const contact = settings.email?.trim() || "[e-mailadres volgt]";

  const sections = [
    {
      title: "Wie is verantwoordelijk",
      body: `${settings.siteName}, gevestigd in ${settings.city}, is verantwoordelijk voor de verwerking van persoonsgegevens zoals beschreven in deze verklaring. Je kunt contact opnemen via ${contact}.`,
    },
    {
      title: "Welke gegevens worden verwerkt",
      body: "Als je het formulier voor een kennismaking invult, worden je naam, e-mailadres, eventueel je telefoonnummer en je bericht verwerkt. Vertel in je bericht alleen wat je zelf wilt delen.",
    },
    {
      title: "Waarvoor en op welke grond",
      body: "De gegevens worden alleen gebruikt om contact met je op te nemen en een kennismaking te plannen. De grondslag is je eigen verzoek om contact.",
    },
    {
      title: "Hoe lang worden gegevens bewaard",
      body: "Aanvragen die niet tot een traject leiden, worden na [termijn, aan te vullen] verwijderd. Voor cliënten gelden aparte afspraken die je bij de start van een traject ontvangt.",
    },
    {
      title: "Delen met anderen",
      body: "Je gegevens worden niet verkocht en alleen gedeeld met partijen die nodig zijn om de website en e-mail te laten werken, zoals de hostingpartij. [Verwerkers aan te vullen bij livegang.]",
    },
    {
      title: "Cookies",
      body: "Deze website plaatst geen tracking- of marketingcookies. Als dat verandert, wordt deze verklaring aangepast en wordt waar nodig vooraf om toestemming gevraagd.",
    },
    {
      title: "Je rechten",
      body: `Je hebt het recht om je gegevens in te zien, te laten corrigeren of te laten verwijderen. Stuur daarvoor een bericht naar ${contact}. Je kunt ook een klacht indienen bij de Autoriteit Persoonsgegevens.`,
    },
  ];

  return (
    <>
      <PageHeader
        title="Privacyverklaring"
        intro="Hoe deze website met je persoonsgegevens omgaat."
      />
      <Section tone="paper">
        <div className="mb-8">
          <PlaceholderTag>Concept: laten controleren voor livegang</PlaceholderTag>
        </div>
        <div className="max-w-2xl space-y-8">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-2xl">{section.title}</h2>
              <p className="mt-3 text-lg leading-relaxed">{section.body}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
