// app/dashboard/offers/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Job Offer Analysis & Management",
  description:
    "Upload and analyze your job offers in real-time. Get instant AI-powered insights on compensation packages, equity, benefits, and negotiation strategies.",
  keywords: [
    "job offer analysis",
    "offer comparison",
    "salary analysis",
    "compensation package",
    "equity analysis",
    "benefits analysis",
    "total compensation",
    "offer evaluation",
    "job offer tracking",
    "offer management",
  ],
  openGraph: {
    title: "Smart Job Offer Analysis | BetterPay AI",
    description:
      "Get instant AI analysis of your job offers, including compensation breakdowns and negotiation recommendations.",
    images: [
      {
        url: "/offers-preview.png",
        width: 1200,
        height: 630,
        alt: "BetterPay AI Offer Analysis Interface",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI-Powered Job Offer Analysis",
    description: "Upload your offer letter and get instant analysis and negotiation insights.",
    images: ["/offers-twitter.png"],
  },
};

const offersJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "BetterPay AI Offer Analysis",
  "applicationCategory": "BusinessApplication",
  "description": "AI-powered job offer analysis and management tool",
  "featureList": [
    "Instant offer analysis",
    "Compensation breakdown",
    "Market rate comparison",
    "Negotiation recommendations",
    "Benefits evaluation",
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "ratingCount": "200",
  },
};

export default function OffersLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(offersJsonLd) }} />
      {children}
    </>
  );
}
