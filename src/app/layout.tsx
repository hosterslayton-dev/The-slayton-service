import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Inter, Playfair_Display, Poppins } from "next/font/google";

import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { SkipLink } from "@/components/layout/skip-link";
import { StickyMobileCta } from "@/components/layout/sticky-mobile-cta";
import { siteConfig } from "@/config/site";
import {
  jsonLdString,
  localBusinessJsonLd,
  websiteJsonLd,
} from "@/lib/schema";

import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-poppins",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://theslaytonservice.com"),

  title: {
    default: "The Slayton Service | Residential Renovation Company",
    template: "%s | The Slayton Service",
  },

  description:
    "The Slayton Service is a trusted residential renovation company serving Middle Tennessee with remodeling, roofing, crawlspace services, flooring, painting, repairs, insurance restoration, and home maintenance.",

  applicationName: "The Slayton Service",

  keywords: [
    "The Slayton Service",
    "residential renovation Middle Tennessee",
    "general contractor Nashville",
    "home remodeling Hendersonville",
    "kitchen remodeling Gallatin",
    "bathroom remodeling Middle Tennessee",
    "roofing contractor Nashville",
    "crawlspace encapsulation Tennessee",
    "insurance restoration contractor",
    "flooring contractor Middle Tennessee",
    "home repair Sumner County",
  ],

  authors: [
    {
      name: "The Slayton Service LLC",
      url: "https://theslaytonservice.com",
    },
  ],

  creator: "The Slayton Service LLC",
  publisher: "The Slayton Service LLC",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://theslaytonservice.com",
    siteName: "The Slayton Service",
    title: "The Slayton Service | Residential Renovation Company",
    description:
      "Professional residential renovation, roofing, crawlspace, remodeling, insurance restoration, and property maintenance throughout Middle Tennessee.",
    images: [
      {
        url: "/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "The Slayton Service residential renovation company",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "The Slayton Service | Residential Renovation Company",
    description:
      "Professional residential renovation services throughout Middle Tennessee.",
    images: ["/opengraph-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: [
      {
        url: "/favicon.ico",
      },
      {
        url: "/icon.png",
        type: "image/png",
      },
    ],
    apple: "/apple-icon.png",
    shortcut: "/favicon.ico",
  },

  ...(process.env.GOOGLE_SITE_VERIFICATION
    ? {
        verification: {
          google: process.env.GOOGLE_SITE_VERIFICATION,
        },
      }
    : {}),
};

export const viewport: Viewport = {
  themeColor: "#0e0d0b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html
      lang="en"
      className={`${playfair.variable} ${poppins.variable} ${inter.variable}`}
    >
      <body className="flex min-h-svh flex-col">
        <SkipLink />

        <SiteHeader />

        <main id="main" className="flex-1">
          {children}
        </main>

        <SiteFooter />
        <StickyMobileCta />

        <div aria-hidden="true" className="h-20 lg:hidden" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLdString(localBusinessJsonLd()),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLdString(websiteJsonLd()),
          }}
        />

        {gaId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />

            <Script id="ga-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];

                function gtag() {
                  window.dataLayer.push(arguments);
                }

                gtag("js", new Date());
                gtag("config", "${gaId}");
              `}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  );
}