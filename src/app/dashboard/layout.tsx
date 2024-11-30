// app/dashboard/layout.tsx
import type { Metadata } from "next";
import ProtectedRoute from "@/components/protected/protected-route";

export const metadata: Metadata = {
  title: "Your Job Success Dashboard | NextFit AI",
  description:
    "Track your job applications, analyze success predictions, and get AI-powered optimization insights all in one place. Apply smarter with data-driven application strategies.",
  keywords: [
    "job application dashboard",
    "success prediction",
    "application tracking",
    "career insights",
    "resume analytics",
    "job match tracking",
    "application optimization",
    "success analytics",
    "career dashboard",
    "job comparison",
    "ATS optimization",
    "callback prediction",
  ],
  openGraph: {
    title: "Smart Job Application Dashboard | NextFit AI",
    description: "Your personal command center for job matching, application optimization, and success tracking.",
    images: [
      {
        url: "/dashboard-preview.png",
        width: 1200,
        height: 630,
        alt: "NextFit AI Dashboard Interface",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Job Success Command Center",
    description: "Track, analyze, and optimize job applications with AI-powered predictions.",
    images: ["/dashboard-twitter.png"],
  },
};

const dashboardJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "NextFit AI Dashboard",
  "applicationCategory": "BusinessApplication",
  "description": "Comprehensive dashboard for optimizing job applications and tracking success rates",
  "featureList": [
    "Real-time success prediction",
    "Job match analysis",
    "AI optimization assistant",
    "Application analytics",
    "ATS optimization",
    "Auto-fill forms",
    "Interview preparation",
  ],
  "offers": {
    "@type": "Offer",
    "price": "15",
    "priceCurrency": "USD",
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "500",
    "bestRating": "5",
  },
  "operatingSystem": "Any",
  "browserRequirements": "Requires JavaScript. Modern browsers recommended.",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(dashboardJsonLd) }} />
      <ProtectedRoute>{children}</ProtectedRoute>
    </>
  );
}
