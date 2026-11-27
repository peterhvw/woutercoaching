import { collection, config, fields, singleton } from "@keystatic/core";

/**
 * Content model for the site. Everything an editor can change lives here.
 * Files are written to /content as YAML and read by src/lib/content.ts.
 * When a field is added or renamed here, update the types in src/lib/content.ts too.
 */

const paragraphs = (label: string, description?: string) =>
  fields.text({
    label,
    description:
      description ?? "Laat een lege regel tussen alinea's.",
    multiline: true,
  });

const titledItems = (label: string) =>
  fields.array(
    fields.object({
      title: fields.text({ label: "Titel" }),
      text: fields.text({ label: "Tekst", multiline: true }),
    }),
    { label, itemLabel: (props) => props.fields.title.value || "Nieuw item" },
  );

export default config({
  storage: { kind: "local" },
  ui: {
    brand: { name: "Wouter Coaching" },
    navigation: {
      "Pagina's": ["home", "overMij", "werkwijze", "kennismaking"],
      Verzamelingen: ["reviews", "posts"],
      Instellingen: ["settings"],
    },
  },
  singletons: {
    settings: singleton({
      label: "Algemene gegevens",
      path: "content/settings",
      format: { data: "yaml" },
      schema: {
        siteName: fields.text({ label: "Naam van de praktijk" }),
        tagline: fields.text({ label: "Ondertitel" }),
        description: fields.text({
          label: "Omschrijving voor zoekmachines",
          multiline: true,
        }),
        city: fields.text({ label: "Plaats" }),
        address: fields.text({
          label: "Bezoekadres",
          description: "Leeg laten zolang het adres niet bekend is.",
        }),
        email: fields.text({ label: "E-mailadres" }),
        phone: fields.text({ label: "Telefoonnummer" }),
        whatsapp: fields.text({
          label: "WhatsApp-nummer",
          description: "Internationaal formaat zonder plus, bijv. 31612345678.",
        }),
        kvk: fields.text({ label: "KvK-nummer" }),
        btw: fields.text({ label: "Btw-identificatienummer" }),
        priceFrom: fields.text({
          label: "Vanaf-prijs",
          description: "Alleen het bedrag, bijv. 475. Leeg = tijdelijke aanduiding.",
        }),
        introCallMinutes: fields.integer({
          label: "Duur kennismaking (minuten)",
          defaultValue: 30,
        }),
        replyTime: fields.text({
          label: "Reactietermijn",
          description: "Bijv. 'binnen 1 werkdag'.",
        }),
      },
    }),

    home: singleton({
      label: "Home",
      path: "content/home",
      format: { data: "yaml" },
      schema: {
        heroTitle: fields.text({ label: "Kop" }),
        heroIntro: fields.text({ label: "Inleiding", multiline: true }),
        heroNote: fields.text({ label: "Regel onder de knop" }),
        recogniseTitle: fields.text({ label: "Herken je dit: kop" }),
        recogniseItems: fields.array(fields.text({ label: "Situatie" }), {
          label: "Herken je dit: situaties",
          itemLabel: (props) => props.value || "Nieuwe situatie",
        }),
        recogniseClosing: fields.text({
          label: "Herken je dit: afsluitende zin",
          multiline: true,
        }),
        outcomesTitle: fields.text({ label: "Wat het oplevert: kop" }),
        outcomes: titledItems("Wat het oplevert: punten"),
        approachTitle: fields.text({ label: "Aanpak: kop" }),
        approachText: paragraphs("Aanpak: tekst"),
        aboutTitle: fields.text({ label: "Over mij (kort): kop" }),
        aboutText: paragraphs("Over mij (kort): tekst"),
        faqTitle: fields.text({ label: "Veelgestelde vragen: kop" }),
        faq: fields.array(
          fields.object({
            question: fields.text({ label: "Vraag" }),
            answer: fields.text({ label: "Antwoord", multiline: true }),
          }),
          {
            label: "Veelgestelde vragen",
            itemLabel: (props) => props.fields.question.value || "Nieuwe vraag",
          },
        ),
        ctaTitle: fields.text({ label: "Afsluitende oproep: kop" }),
        ctaText: fields.text({ label: "Afsluitende oproep: tekst", multiline: true }),
      },
    }),

    overMij: singleton({
      label: "Over mij",
      path: "content/over-mij",
      format: { data: "yaml" },
      schema: {
        title: fields.text({ label: "Kop" }),
        intro: fields.text({ label: "Inleiding", multiline: true }),
        story: paragraphs("Mijn verhaal"),
        credentialsTitle: fields.text({ label: "Achtergrond: kop" }),
        credentials: fields.array(fields.text({ label: "Regel" }), {
          label: "Achtergrond: opleiding, ervaring, registraties",
          itemLabel: (props) => props.value || "Nieuwe regel",
        }),
        visionTitle: fields.text({ label: "Visie: kop" }),
        vision: paragraphs("Visie: tekst"),
      },
    }),

    werkwijze: singleton({
      label: "Werkwijze",
      path: "content/werkwijze",
      format: { data: "yaml" },
      schema: {
        title: fields.text({ label: "Kop" }),
        intro: fields.text({ label: "Inleiding", multiline: true }),
        steps: titledItems("Stappen"),
        practicalTitle: fields.text({ label: "Praktisch: kop" }),
        practical: titledItems("Praktisch: punten"),
        priceTitle: fields.text({ label: "Tarieven: kop" }),
        priceText: paragraphs("Tarieven: tekst"),
        boundaryTitle: fields.text({ label: "Coaching en therapie: kop" }),
        boundaryText: paragraphs("Coaching en therapie: tekst"),
      },
    }),

    kennismaking: singleton({
      label: "Kennismaking",
      path: "content/kennismaking",
      format: { data: "yaml" },
      schema: {
        title: fields.text({ label: "Kop" }),
        intro: fields.text({ label: "Inleiding", multiline: true }),
        expectTitle: fields.text({ label: "Wat je kunt verwachten: kop" }),
        expectItems: fields.array(fields.text({ label: "Punt" }), {
          label: "Wat je kunt verwachten: punten",
          itemLabel: (props) => props.value || "Nieuw punt",
        }),
        successTitle: fields.text({ label: "Bevestiging na verzenden: kop" }),
        successText: fields.text({
          label: "Bevestiging na verzenden: tekst",
          multiline: true,
        }),
      },
    }),
  },

  collections: {
    reviews: collection({
      label: "Ervaringen",
      path: "content/reviews/*",
      slugField: "name",
      format: { data: "yaml" },
      schema: {
        name: fields.slug({
          name: {
            label: "Naam",
            description: "Voornaam of initialen, zoals de cliënt heeft goedgekeurd.",
          },
        }),
        context: fields.text({
          label: "Context",
          description: "Bijv. leeftijd, beroep of het thema van het traject.",
        }),
        quote: fields.text({ label: "Ervaring", multiline: true }),
        order: fields.integer({ label: "Volgorde", defaultValue: 10 }),
        consent: fields.checkbox({
          label: "Schriftelijke toestemming van de cliënt ontvangen",
          description:
            "Zonder toestemming wordt de ervaring getoond als 'Voorbeeld'.",
          defaultValue: false,
        }),
      },
    }),

    // Reserved for phase 2 (blog and media). No page renders this yet.
    posts: collection({
      label: "Artikelen en media (later)",
      path: "content/posts/*",
      slugField: "title",
      format: { data: "yaml" },
      schema: {
        title: fields.slug({ name: { label: "Titel" } }),
        date: fields.date({ label: "Datum" }),
        summary: fields.text({ label: "Samenvatting", multiline: true }),
        videoUrl: fields.url({ label: "Video-link (optioneel)" }),
        body: paragraphs("Tekst"),
      },
    }),
  },
});
