import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SkipLink } from "@/components/layout/SkipLink";
import { AgeGate, AgeGateScript } from "@/components/compliance/AgeGate";
import { CookieConsent } from "@/components/compliance/CookieConsent";
import { Analytics, ConsentModeDefaults } from "@/components/compliance/Analytics";

// Both fonts include the latin-ext subset for Polish diacritics (ą, ć, ę, ł, ń, ó, ś, ź, ż).
const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  variable: "--font-playfair",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name}: ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: {
    canonical: "/",
    types: { "application/rss+xml": [{ url: "/rss.xml", title: `${siteConfig.name}: najnowsze artykuły` }] },
  },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    url: siteConfig.url,
  },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#6b1e2e",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pl" className={`${playfair.variable} ${inter.variable} antialiased`} suppressHydrationWarning>
      <head>
        <AgeGateScript />
        <ConsentModeDefaults />
      </head>
      <body className="flex min-h-screen flex-col">
        <div id="app-root" className="flex min-h-screen flex-col">
          <SkipLink />
          <Header />
          <main id="tresc" className="flex-1">
            {children}
          </main>
          <Footer />
          <CookieConsent />
        </div>
        <AgeGate />
        <Analytics />
      </body>
    </html>
  );
}
