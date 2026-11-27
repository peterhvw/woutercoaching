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

## Editing on the live site

Locally the editor saves straight to the files in `content/` and needs no login. On a hosted site that would let anyone edit, so there the editor only works in GitHub mode: the editor signs in with GitHub and every save becomes a commit in this repository, which triggers a new deploy. Content never lives anywhere else than `content/` in the repo.

One-time setup:

1. Locally, create `.env.local` with `NEXT_PUBLIC_KEYSTATIC_STORAGE=github`, run `npm run dev` and open `/keystatic`. Keystatic offers to create a GitHub App; give it the hosted URL when asked. It writes four variables to `.env`: `KEYSTATIC_GITHUB_CLIENT_ID`, `KEYSTATIC_GITHUB_CLIENT_SECRET`, `KEYSTATIC_SECRET`, `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG`.
2. Install that GitHub App on this repository.
3. In the hosting project, set those four variables plus `NEXT_PUBLIC_KEYSTATIC_STORAGE=github`. If the repository moves, also set `NEXT_PUBLIC_KEYSTATIC_REPO=owner/name`.
4. Remove `NEXT_PUBLIC_KEYSTATIC_STORAGE` from `.env.local` again so local work keeps using local files.
5. Give each editor a GitHub account with write access to the repository.

Without the variables the site still deploys; the editor then answers "not configured". This setup has been prepared but not yet run end to end.

Contact with visitors is by email and WhatsApp only. There is deliberately no phone number on the site.

## Before going live

- [ ] Replace placeholders: email, WhatsApp number, KvK, btw-id, price, session length, portrait photos, "over mij" story and credentials.
- [ ] Replace the example reviews with real ones. A review shows as "Voorbeeld" until its consent box is ticked in the editor; only tick it with written consent from the client.
- [ ] Connect email delivery for the kennismaking form (`deliverEnquiry` in `src/app/(site)/kennismaking/actions.ts`). Until then the form deliberately fails in production instead of confirming an enquiry that was not sent.
- [ ] Have the privacy statement checked and complete its open points.
- [ ] Choose hosting. Vercel's free Hobby plan does not allow commercial sites; options are Vercel Pro or a free host that allows commercial use. The form needs a host that runs server functions.
- [ ] Set up the editor for the hosted site (see "Editing on the live site").
- [ ] Move the repository and hosting to accounts owned by Wouter.

## Growth plan

1. **Launch**: the pages above, one call to action (free kennismaking), Google Business Profile.
2. **Proof**: review routine, case stories, online booking calendar, local search copy.
3. **Audience**: articles and media (the `posts` collection is already reserved), lead magnet, newsletter.
4. **Programmes**: programme pages and paid sign-up, with the legal steps that brings (bedenktijd, withdrawal button).
