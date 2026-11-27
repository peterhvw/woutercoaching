import type { Metadata } from "next";
import { Fraunces, Source_Sans_3 } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getSettings } from "@/lib/content";
import "./globals.css";

const heading = Fraunces({ variable: "--font-heading", subsets: ["latin"] });
const body = Source_Sans_3({ variable: "--font-body", subsets: ["latin"] });

export function generateMetadata(): Metadata {
  const settings = getSettings();
  return {
    title: {
      default: `${settings.siteName} | ${settings.tagline}`,
      template: `%s | ${settings.siteName}`,
    },
    description: settings.description,
  };
}

export default function SiteLayout({ children }: LayoutProps<"/">) {
  const settings = getSettings();
  return (
    <html
      lang="nl"
      className={`${heading.variable} ${body.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans text-[1.0625rem]">
        <SiteHeader siteName={settings.siteName} />
        <main id="inhoud" className="flex-1">
          {children}
        </main>
        <SiteFooter settings={settings} />
      </body>
    </html>
  );
}
