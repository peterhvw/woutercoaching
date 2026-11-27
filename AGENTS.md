<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project rules

- Read `README.md` first: it describes the structure, the content flow and the launch checklist.
- All visitor-facing text is Dutch, informal "je", calm and expert in tone. Text belongs in `content/*.yaml`, not in components, unless it is a fixed interface label.
- Never invent facts about Wouter (credentials, prices, reviews, contact details). Use a visible `[...]` placeholder instead.
- A review may only render without the "Voorbeeld" label when `consent: true`. Do not change that rule.
- A case is labelled by its `kind`: `voorbeeld` always shows "Voorbeeld"; `samengesteld` and `toestemming` show their fixed accountability line. Never write a case that describes a real client, and never remove these labels.
- Third-party media must stay click-to-load (`src/components/video-player.tsx`). Do not add embeds, fonts, analytics or scripts that contact another provider on page load; that would require a cookie banner.
- Use the tokens in `src/app/(site)/globals.css` and the components in `src/components`; do not add one-off colours or fonts.
- Changing a field in `keystatic.config.ts` means updating its type in `src/lib/content.ts` and the YAML in `content/`.
- Content is read with synchronous file reads on purpose, so pages stay fully static. Keep it that way.
- Run `npm run check` before committing. Commit and push only when asked.
