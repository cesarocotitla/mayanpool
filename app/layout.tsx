import type { Metadata, Viewport } from "next";
import { Inter, Montserrat } from "next/font/google";
import { siteConfig } from "@/lib/site-config";
import { buildStructuredData } from "@/lib/structured-data";
import "./globals.css";
import { absoluteAsset } from "@/lib/assets";
import { GoogleTagManagerNoScript, GoogleTagManagerScript } from "@/components/GoogleTagManager";
import WhatsAppClickTracker from "@/components/WhatsAppClickTracker";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-montserrat",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-inter",
});

const { seo, url, name } = siteConfig;
const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim();

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: seo.title,
  description: seo.description,
  keywords: [...seo.keywords],
  applicationName: name,
  authors: [{ name }],
  creator: name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: seo.locale,
    url: "/",
    siteName: name,
    title: seo.title,
    description: seo.description,
    images: [
      {
        url: absoluteAsset(seo.ogImage, url),
        width: 1200,
        height: 630,
        alt: "Mayan Pool — Jacuzzis, albercas e ingeniería del agua en Cuernavaca",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
    images: [absoluteAsset(seo.ogImage, url)],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  formatDetection: { telephone: false, email: false, address: false },
  ...(googleVerification ? { verification: { google: googleVerification } } : {}),
};

export const viewport: Viewport = {
  themeColor: "#0A2233",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = JSON.stringify(buildStructuredData()).replace(/</g, "\\u003c");

  return (
    <html lang="es-MX" className={`${montserrat.variable} ${inter.variable}`}>
      <body>
        <GoogleTagManagerNoScript />
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-5 focus:py-3 focus:font-display focus:text-sm focus:font-semibold focus:text-abyss focus:shadow-lg"
        >
          Saltar al contenido
        </a>
        {children}
        <WhatsAppClickTracker />
        <GoogleTagManagerScript />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      </body>
    </html>
  );
}
