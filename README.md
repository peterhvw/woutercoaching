# Wouter Coaching

Website for Wouter Coaching: lifecoaching in Nijmegen and online.
Status: first version, runs locally, not yet deployed. Texts are Dutch drafts and several details are visible placeholders (`[...]`, "Voorbeeld").

## Run it

```bash
npm install
npm run dev
```

- Site: http://localhost:3210
- Content editor: http://localhost:3210/keystatic

`npm run check` runs lint, type-check and a production build. Run it before every commit.

## How it is built

| Part | Choice | Where |
|---|---|---|
| Framework | Next.js (App Router), every page prerendered as static HTML | `src/app/(site)` |
| Styling | Tailwind CSS; colours and fonts are tokens | `src/app/(site)/globals.css` |
| Content | YAML files, separate from code | `content/` |
| Editor | Keystatic, a form editor that writes those YAML files | `keystatic.config.ts`, `/keystatic` |
| Components | Small shared set; pages only compose them | `src/components` |
| Form | Server action with validation and a spam honeypot | `src/app/(site)/kennismaking` |

Content flow: the editor (or a text editor) changes a file in `content/` → `src/lib/content.ts` reads it → the page renders it. When you add or rename a field in `keystatic.config.ts`, update the matching type in `src/lib/content.ts`.

## Pages

`/` · `/over-mij` · `/werkwijze` · `/ervaringen` · `/kennismaking` · `/contact` · `/privacyverklaring`

## Before going live

- [ ] Replace placeholders: email, phone, KvK, btw-id, price, session length, portrait photos, "over mij" story and credentials.
- [ ] Replace the example reviews with real ones. A review shows as "Voorbeeld" until its consent box is ticked in the editor; only tick it with written consent from the client.
- [ ] Connect email delivery for the kennismaking form (`deliverEnquiry` in `src/app/(site)/kennismaking/actions.ts`). Until then the form deliberately fails in production instead of confirming an enquiry that was not sent.
- [ ] Have the privacy statement checked and complete its open points.
- [ ] Choose hosting. Vercel's free Hobby plan does not allow commercial sites; options are Vercel Pro or a free host that allows commercial use. The form needs a host that runs server functions.
- [ ] Switch the editor from local files to GitHub or Keystatic Cloud storage so Wouter can edit the live site. The editor is disabled in production until then.
- [ ] Move the repository and hosting to accounts owned by Wouter.

## Growth plan

1. **Launch**: the pages above, one call to action (free kennismaking), Google Business Profile.
2. **Proof**: review routine, case stories, online booking calendar, local search copy.
3. **Audience**: articles and media (the `posts` collection is already reserved), lead magnet, newsletter.
4. **Programmes**: programme pages and paid sign-up, with the legal steps that brings (bedenktijd, withdrawal button).
