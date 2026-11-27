import type { Metadata } from "next";
import { notFound } from "next/navigation";
import KeystaticApp from "./keystatic";

export const metadata: Metadata = {
  title: "Inhoud beheren",
  robots: { index: false, follow: false },
};

/**
 * The content editor. It writes straight to the files in /content, so it is
 * only available on a developer machine. Before editors use it on the live
 * site, switch keystatic.config.ts to GitHub or Keystatic Cloud storage.
 */
export default function KeystaticLayout() {
  if (process.env.NODE_ENV === "production") notFound();
  return (
    <html lang="nl">
      <body>
        <KeystaticApp />
      </body>
    </html>
  );
}
