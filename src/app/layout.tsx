// app/layout.tsx
import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { FirebaseProvider } from "@/firebase/context";
import { AuthProvider } from "@/providers/AuthProvider";
import { StoreProvider } from "@/providers/StoreProvider";
import { siteConfig } from "@/configs/site";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-plus-jakarta",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nextfitai.com"),
  title: {
    default: "NextFit AI | Land Your Next Job",
    template: "%s | NextFit AI",
  },
  description:
    "Optimize your resume with AI. NextFit AI analyzes your resume against job requirements, provides targeted improvements, and helps you maximize interview callbacks.",
  keywords: [
    "resume optimization",
    "AI resume",
    "resume builder",
    "job application",
    "ATS optimization",
    "resume analysis",
    "job search",
    "career advancement",
    "interview callbacks",
    "resume writing",
    "job matching",
    "career optimization",
    "resume templates",
    "job hunting",
  ],
  authors: [{ name: "NextFit AI", url: "https://nextfitai.com" }],
  creator: "NextFit AI",
  publisher: "NextFit AI",
  alternates: {
    canonical: "https://nextfitai.com",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nextfitai.com",
    siteName: "NextFit AI",
    title: "NextFit AI | Land Your Next Job",
    description: "AI-powered resume optimization that helps you get more interview callbacks.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "NextFit AI - AI-Powered Resume Optimization",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NextFit AI | Land Your Next Job",
    description: "AI-powered resume optimization that helps you get more interview callbacks.",
    site: "@nextfitai",
    creator: "@nextfitai",
    images: ["/twitter-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      "index": true,
      "follow": true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "NextFit AI",
  "applicationCategory": "BusinessApplication",
  "offers": {
    "@type": "Offer",
    "price": "15",
    "priceCurrency": "USD",
  },
  "description": "AI-powered resume optimization tool that helps professionals land more interviews.",
  "url": "https://nextfitai.com",
  "author": {
    "@type": "Organization",
    "name": "NextFit AI",
    "url": "https://nextfitai.com",
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "ratingCount": "150",
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#13172a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={`${inter.variable} ${plusJakarta.variable}`} suppressHydrationWarning>
      <head>
        <link rel='icon' href='/favicon.ico' sizes='any' />
        <link rel='icon' href='/icon.svg' type='image/svg+xml' />
        <link rel='apple-touch-icon' href='/apple-touch-icon.png' />
        <link rel='manifest' href='/manifest.json' />

        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />

        <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className={`${inter.className} antialiased`}>
        <StoreProvider>
          <FirebaseProvider>
            <AuthProvider>{children}</AuthProvider>
          </FirebaseProvider>
        </StoreProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
