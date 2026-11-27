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

/** A photo plus its description for screen readers. Stored in public/images/site. */
const photo = (label: string) =>
  fields.image({
    label,
    description:
      "Staande foto (ongeveer 4:5), liefst kleiner dan 2 MB. Zonder foto blijft er een tijdelijk vlak staan.",
    directory: "public/images/site",
    publicPath: "/images/site/",
  });

const photoAlt = (label: string) =>
  fields.text({
    label,
    description:
      "Korte omschrijving van wat er op de foto te zien is, voor wie de foto niet kan zien.",
  });

const titledItems = (label: string) =>
  fields.array(
    fields.object({
      title: fields.text({ label: "Titel" }),
      text: fields.text({ label: "Tekst", multiline: true }),
    }),
    { label, itemLabel: (props) => props.fields.title.value || "Nieuw item" },
  );

/**
 * Where the editor saves.
 * - Default: local files in /content (development on your own machine).
 * - NEXT_PUBLIC_KEYSTATIC_STORAGE=github: the editor signs in with GitHub and
 *   saves each change as a commit in the repository. Use this on the hosted
 *   site so editors can work from anywhere. See README, "Editing on the live site".
 */
export const usesGithubStorage =
  process.env.NEXT_PUBLIC_KEYSTATIC_STORAGE === "github";

const repo = (process.env.NEXT_PUBLIC_KEYSTATIC_REPO ??
  "peterhvw/woutercoaching") as `${string}/${string}`;

export default config({
  storage: usesGithubStorage ? { kind: "github", repo } : { kind: "local" },
  ui: {
    brand: { name: "Wouter Coaching" },
    navigation: {
      "Pagina's": [
        "home",
        "overMij",
        "werkwijze",
        "ervaringen",
        "praktijk",
        "kennismaking",
        "contact",
        "privacy",
      ],
      Verzamelingen: ["cases", "media", "reviews", "posts"],
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
        whatsapp: fields.text({
          label: "WhatsApp-nummer",
          description:
            "Internationaal formaat zonder plus, bijv. 31612345678. Wordt alleen als WhatsApp-knop getoond, niet als belnummer.",
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
        ctaLabel: fields.text({
          label: "Tekst op de kennismakingsknop",
          description: "De knop die op elke pagina terugkomt.",
        }),
        ctaLabelShort: fields.text({
          label: "Korte knoptekst (menu)",
        }),
        reassurance: fields.text({
          label: "Geruststelling onder de knop",
          description: "Bijv. 'Gratis en vrijblijvend'.",
        }),
        whatsappLabel: fields.text({ label: "Tekst op de WhatsApp-knop" }),
      },
    }),

    home: singleton({
      label: "Home",
      path: "content/home",
      format: { data: "yaml" },
      schema: {
        heroTitle: fields.text({ label: "Kop" }),
        heroIntro: fields.text({ label: "Inleiding", multiline: true }),
        heroNote: fields.text({ label: "Regel boven de kop" }),
        heroSecondaryButton: fields.text({ label: "Tweede knop (naar werkwijze)" }),
        heroImage: photo("Foto bovenaan"),
        heroImageAlt: photoAlt("Foto bovenaan: omschrijving"),
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
        stepsTitle: fields.text({ label: "Werkwijze in stappen: kop" }),
        stepsPriceIntro: fields.text({
          label: "Werkwijze in stappen: zin voor de prijs",
          description: "Bijv. 'Een traject is er'. De vanaf-prijs volgt automatisch.",
        }),
        stepsLink: fields.text({ label: "Werkwijze in stappen: linktekst" }),
        reviewsTitle: fields.text({ label: "Ervaringen: kop" }),
        reviewsLink: fields.text({ label: "Ervaringen: linktekst" }),
        aboutTitle: fields.text({ label: "Over mij (kort): kop" }),
        aboutText: paragraphs("Over mij (kort): tekst"),
        aboutLink: fields.text({ label: "Over mij (kort): linktekst" }),
        aboutImage: photo("Over mij (kort): foto"),
        aboutImageAlt: photoAlt("Over mij (kort): omschrijving foto"),
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
        portrait: photo("Portretfoto"),
        portraitAlt: photoAlt("Portretfoto: omschrijving"),
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
        stepsTitle: fields.text({ label: "Stappen: kop" }),
        steps: titledItems("Stappen"),
        practicalTitle: fields.text({ label: "Praktisch: kop" }),
        practical: titledItems("Praktisch: punten"),
        priceTitle: fields.text({ label: "Tarieven: kop" }),
        priceLead: fields.text({
          label: "Tarieven: woord voor de prijs",
          description: "Bijv. 'Traject'. De vanaf-prijs volgt automatisch.",
        }),
        priceText: paragraphs("Tarieven: tekst"),
        boundaryTitle: fields.text({ label: "Coaching en therapie: kop" }),
        boundaryText: paragraphs("Coaching en therapie: tekst"),
      },
    }),

    ervaringen: singleton({
      label: "Ervaringen (pagina)",
      path: "content/ervaringen",
      format: { data: "yaml" },
      schema: {
        title: fields.text({ label: "Kop" }),
        intro: fields.text({ label: "Inleiding", multiline: true }),
      },
    }),

    contact: singleton({
      label: "Contact",
      path: "content/contact",
      format: { data: "yaml" },
      schema: {
        title: fields.text({ label: "Kop" }),
        intro: fields.text({ label: "Inleiding", multiline: true }),
        emailLabel: fields.text({ label: "Label e-mail" }),
        whatsappLabel: fields.text({ label: "Label WhatsApp" }),
        locationLabel: fields.text({ label: "Label locatie" }),
        asideTitle: fields.text({ label: "Blok kennismaking: kop" }),
        asideText: fields.text({ label: "Blok kennismaking: tekst", multiline: true }),
      },
    }),

    privacy: singleton({
      label: "Privacyverklaring",
      path: "content/privacy",
      format: { data: "yaml" },
      schema: {
        title: fields.text({ label: "Kop" }),
        intro: fields.text({ label: "Inleiding", multiline: true }),
        draft: fields.checkbox({
          label: "Toon de markering 'Concept'",
          description: "Uitzetten zodra de verklaring is gecontroleerd.",
          defaultValue: true,
        }),
        sections: titledItems("Onderdelen"),
      },
    }),

    praktijk: singleton({
      label: "Uit de praktijk (pagina)",
      path: "content/praktijk",
      format: { data: "yaml" },
      schema: {
        menuLabel: fields.text({ label: "Naam in het menu" }),
        title: fields.text({ label: "Kop" }),
        intro: fields.text({ label: "Inleiding", multiline: true }),
        readMore: fields.text({ label: "Linktekst op een kaartje" }),
        situationTitle: fields.text({ label: "Casus: kop 'situatie'" }),
        signalsTitle: fields.text({ label: "Casus: kop 'signalen'" }),
        readingTitle: fields.text({ label: "Casus: kop 'hoe ik dit las'" }),
        actionsTitle: fields.text({ label: "Casus: kop 'wat we deden'" }),
        outcomeTitle: fields.text({ label: "Casus: kop 'wat er veranderde'" }),
        audioLabel: fields.text({ label: "Casus: kop boven de audio" }),
        transcriptLabel: fields.text({ label: "Casus: tekst op de uitklapper van de uitgeschreven audio" }),
        recogniseTitle: fields.text({ label: "Casus: kop van de afsluiting" }),
        recogniseText: fields.text({ label: "Casus: tekst van de afsluiting", multiline: true }),
        disclaimerComposite: fields.text({
          label: "Verantwoording: samengestelde casus",
          multiline: true,
        }),
        disclaimerConsent: fields.text({
          label: "Verantwoording: casus met toestemming",
          multiline: true,
        }),
        homeTitle: fields.text({ label: "Home: kop boven de uitgelichte casus" }),
        werkwijzeTitle: fields.text({ label: "Werkwijze: kop boven de casussen" }),
        mediaTitle: fields.text({ label: "Video's: kop" }),
        mediaIntro: fields.text({ label: "Video's: inleiding", multiline: true }),
        overMijMediaTitle: fields.text({ label: "Video's: kop op de pagina Over mij" }),
        werkwijzeMediaTitle: fields.text({ label: "Video's: kop op de pagina Werkwijze" }),
        videoNotice: fields.text({
          label: "Video's: melding bij de afspeelknop",
          description:
            "Verplichte uitleg dat de video pas na een klik bij de aanbieder wordt geladen.",
          multiline: true,
        }),
        videoButton: fields.text({ label: "Video's: tekst op de afspeelknop" }),
        keyPointsTitle: fields.text({ label: "Video's: kop boven de kernpunten" }),
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
        nameLabel: fields.text({ label: "Formulier: label naam" }),
        emailLabel: fields.text({ label: "Formulier: label e-mailadres" }),
        phoneLabel: fields.text({ label: "Formulier: label mobiel nummer" }),
        optionalLabel: fields.text({ label: "Formulier: aanduiding 'optioneel'" }),
        messageLabel: fields.text({ label: "Formulier: label bericht" }),
        submitLabel: fields.text({ label: "Formulier: tekst op de verzendknop" }),
        privacyNote: fields.text({
          label: "Formulier: zin over privacy",
          description: "De link naar de privacyverklaring volgt automatisch.",
          multiline: true,
        }),
        whatsappIntro: fields.text({
          label: "Zin boven de WhatsApp-knop",
          multiline: true,
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
    cases: collection({
      label: "Casussen",
      path: "content/cases/*",
      slugField: "title",
      format: { data: "yaml" },
      schema: {
        title: fields.slug({
          name: {
            label: "Titel",
            description:
              "Beschrijf het patroon, niet de persoon. Bijv. 'Hoofdpijn die elke zondagavond terugkwam'.",
          },
        }),
        kind: fields.select({
          label: "Soort casus",
          description:
            "Bepaalt welke verantwoording onder de casus staat. 'Voorbeeld' is alleen bedoeld om de opmaak te beoordelen.",
          options: [
            { label: "Voorbeeld (nog geen echte casus)", value: "voorbeeld" },
            { label: "Samengesteld uit meerdere trajecten", value: "samengesteld" },
            {
              label: "Echte casus, met schriftelijke toestemming",
              value: "toestemming",
            },
          ],
          defaultValue: "voorbeeld",
        }),
        theme: fields.text({
          label: "Thema",
          description: "Kort label, bijv. 'Stress en herstel'.",
        }),
        summary: fields.text({
          label: "In het kort",
          description: "40 tot 60 woorden. Staat op de kaartjes.",
          multiline: true,
        }),
        situation: paragraphs(
          "De situatie",
          "Alleen rol en levensfase, geen herkenbare details. Lege regel tussen alinea's.",
        ),
        signals: paragraphs("Wat het lichaam en het gedrag lieten zien"),
        reading: paragraphs(
          "Hoe ik dit las",
          "De kern: hoe hangen lichaam, emotie, denken en gedrag samen?",
        ),
        audio: fields.file({
          label: "Gesproken toelichting (audiobestand)",
          description:
            "Opname van 1 tot 2 minuten, bijv. een spraakmemo. Spreek over het patroon, niet over de persoon.",
          directory: "public/audio/cases",
          publicPath: "/audio/cases/",
        }),
        audioTitle: fields.text({
          label: "Titel van de toelichting",
          description: "Bijv. 'Waarom ik eerst naar de zondagavond keek (1:30)'.",
        }),
        audioTranscript: paragraphs(
          "Uitgeschreven toelichting",
          "Verplicht bij audio: de gesproken tekst, voor wie niet kan of wil luisteren.",
        ),
        actions: paragraphs("Wat we deden"),
        outcome: paragraphs("Wat er veranderde"),
        featured: fields.checkbox({
          label: "Uitlichten op de homepage",
          defaultValue: false,
        }),
        showOnWerkwijze: fields.checkbox({
          label: "Tonen op de pagina Werkwijze",
          defaultValue: false,
        }),
        order: fields.integer({ label: "Volgorde", defaultValue: 10 }),
      },
    }),

    media: collection({
      label: "Video's en lezingen",
      path: "content/media/*",
      slugField: "title",
      format: { data: "yaml" },
      schema: {
        title: fields.slug({ name: { label: "Titel" } }),
        videoUrl: fields.url({
          label: "Link naar de video",
          description:
            "Plak de link van YouTube (of een embed-link van een andere aanbieder). De video laadt pas nadat een bezoeker op afspelen klikt.",
        }),
        poster: fields.image({
          label: "Voorbeeldafbeelding",
          description: "Wordt getoond voordat de video is geladen.",
          directory: "public/images/media",
          publicPath: "/images/media/",
        }),
        duration: fields.text({ label: "Duur", description: "Bijv. '42 min'." }),
        context: fields.text({
          label: "Waar en wanneer",
          description: "Bijv. 'Lezing bij [academy], maart 2027'.",
        }),
        summary: paragraphs("Samenvatting"),
        keyPoints: fields.array(fields.text({ label: "Kernpunt" }), {
          label: "Kernpunten",
          itemLabel: (props) => props.value || "Nieuw kernpunt",
        }),
        showOnOverMij: fields.checkbox({
          label: "Ook tonen op de pagina Over mij",
          description: "Zonder aangevinkte video's heeft die pagina geen videoblok.",
          defaultValue: false,
        }),
        showOnWerkwijze: fields.checkbox({
          label: "Ook tonen op de pagina Werkwijze",
          description: "Zonder aangevinkte video's heeft die pagina geen videoblok.",
          defaultValue: false,
        }),
        order: fields.integer({ label: "Volgorde", defaultValue: 10 }),
      },
    }),

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
