import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { usesGithubStorage } from "../../../keystatic.config";
import KeystaticApp from "./keystatic";

export const metadata: Metadata = {
  title: "Inhoud beheren",
  robots: { index: false, follow: false },
};

/**
 * The content editor. With local storage it writes straight to the files in
 * /content without any login, so it is blocked on a deployed site. With
 * GitHub storage, editors sign in with GitHub and it is available everywhere.
 */
export default function KeystaticLayout() {
  if (process.env.NODE_ENV === "production" && !usesGithubStorage) notFound();
  return (
    <html lang="nl">
      <body>
        <KeystaticApp />
      </body>
    </html>
  );
}
