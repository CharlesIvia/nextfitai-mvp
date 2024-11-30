// app/get-started/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get Started with AI-Powered Job Application Optimization",
  description:
    "Save time and increase your chances of landing interviews. Our AI analyzes your resume against specific job descriptions, predicts callback probability, automates application forms, and provides targeted optimization insights - all in minutes.",
  keywords: [
    "job application optimization",
    "resume job matching",
    "AI application assistant",
    "callback prediction",
    "job fit analysis",
    "application automation",
    "resume targeting",
    "career tools",
    "job matching",
    "application screening",
    "job success predictor",
    "smart job applications",
    "career advancement",
    "application helper",
    "AI job match",
  ],
  openGraph: {
    title: "Get Started with NextFit AI | Smart Job Applications",
    description:
      "Join thousands of professionals who've streamlined their job search with our AI-powered platform that predicts success rates and optimizes applications for specific roles.",
    type: "website",
    images: [
      {
        url: "/get-started-preview.png",
        width: 1200,
        height: 630,
        alt: "NextFit AI Job Application Optimization Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Optimize Your Job Applications with AI",
    description: "Join NextFit AI for smart job matching, success prediction, and automated application assistance.",
    images: ["/get-started-twitter.png"],
  },
  alternates: {
    canonical: "https://nextfitai.com/get-started",
  },
};

const getStartedJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Get Started with NextFit AI",
  "description": "Start your efficient job search with AI-powered application optimization",
  "mainEntity": {
    "@type": "Service",
    "name": "NextFit AI Job Application Assistant",
    "description": "AI-powered platform that analyzes job fit, predicts success, and optimizes applications",
    "provider": {
      "@type": "Organization",
      "name": "NextFit AI",
      "url": "https://nextfitai.com",
    },
    "offers": {
      "@type": "Offer",
      "price": "15",
      "priceCurrency": "USD",
      "description": "Start optimizing your job applications",
    },
    "serviceType": "Job Application Optimization Platform",
    "termsOfService": "https://nextfitai.com/terms",
    "brand": {
      "@type": "Brand",
      "name": "NextFit AI",
      "slogan": "Apply Smarter, Land Faster",
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "500",
      "reviewCount": "450",
    },
    "review": {
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5",
      },
      "author": {
        "@type": "Person",
        "name": "Sarah Johnson",
      },
      "reviewBody":
        "NextFit AI transformed my job search. It predicted which roles I'd be most successful in, optimized my applications, and saved me countless hours on application forms. The 85% increase in callbacks was amazing!",
    },
  },
  "potentialAction": {
    "@type": "SignupAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://nextfitai.com/get-started",
      "actionPlatform": ["http://schema.org/DesktopWebPlatform", "http://schema.org/MobileWebPlatform"],
    },
    "result": {
      "@type": "Account",
      "name": "NextFit AI Account",
    },
  },
};

export default function GetStartedLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(getStartedJsonLd) }} />
      {children}
    </>
  );
}
