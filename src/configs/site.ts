export const siteConfig = {
  plans: [
    {
      name: "Basic",
      price: "15",
      description: "Perfect for targeted job applications",
      features: [
        "AI Resume Analysis",
        "Job Match Prediction",
        "Basic Optimization Insights",
        "ATS Compatibility Check",
        "Application Form Auto-fill",
      ],
      disabled: false,
    },
    {
      name: "Pro",
      price: "29",
      description: "For active job seekers",
      features: [
        "Everything in Basic",
        "Advanced Success Predictions",
        "In-depth Application Analysis",
        "Multiple Job Comparisons",
        "Custom Optimization Strategies",
        "Interview Question Preparation",
        "Priority Support",
      ],
      isPopular: true,
      disabled: false,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For recruitment teams & organizations",
      features: [
        "Everything in Pro",
        "Team Dashboard",
        "Bulk Candidate Processing",
        "Custom Integration",
        "API Access",
        "Advanced Analytics",
        "Dedicated Support",
      ],
      disabled: false,
    },
  ],
  variants: ["software engineering", "product management", "data science", "design", "marketing", "sales"],
  features: [
    {
      id: "ai-analysis",
      title: "Smart Job Match Prediction",
      description:
        "Our AI analyzes your resume against specific job requirements, predicting your callback probability and suggesting optimizations. Save time by focusing on applications where you're most likely to succeed.",
      stats: ["85% prediction accuracy", "30-second analysis", "Save 10+ hours/week"],
      theme: {
        bgColor: "#13172a",
        fillColor: "#5ee1c9",
        titleColor: "#f9f9f9",
        textColor: "#f9f9f9",
        isDark: true,
      },
      icon: "ai",
    },
    {
      id: "optimization",
      title: "Intelligent Application Assistant",
      description:
        "Get AI-powered suggestions for every aspect of your application. From resume optimization to application forms, our system ensures you present your best self to both ATS and human recruiters.",
      stats: ["85% callback rate", "Auto-fill forms", "24/7 optimization"],
      theme: {
        bgColor: "#f9f9f9",
        fillColor: "#0e5dff",
      },
      icon: "strategy",
    },
    {
      id: "ats-optimization",
      title: "ATS & Recruiter Optimization",
      description:
        "Don't just pass ATS - impress human recruiters too. We analyze formatting, keywords, and content to ensure your application resonates with both automated systems and hiring managers.",
      stats: ["100% ATS compatible", "Recruiter insights", "Keyword optimization"],
      theme: {
        bgColor: "#f9f9f9",
        fillColor: "#5b50fd",
      },
      icon: "pkg",
    },
    {
      id: "targeted-matching",
      title: "Smart Application Strategy",
      description:
        "Know your chances before you apply. Our AI predicts your success rate for each role and helps you tailor your approach, saving time on applications unlikely to convert.",
      stats: ["Success prediction", "Time savings", "Strategic insights"],
      theme: {
        bgColor: "#13172a",
        fillColor: "#dfaaff",
        titleColor: "#f9f9f9",
        textColor: "#f9f9f9",
        isDark: true,
      },
      icon: "time",
    },
    {
      id: "market-intelligence",
      title: "Real-time Job Intelligence",
      description:
        "Make informed decisions with real-time market insights. Our AI analyzes thousands of job postings to show you which roles match your profile and where you need to upskill.",
      stats: ["Live job analysis", "Skill gap insights", "Market trends"],
      theme: {
        bgColor: "#13172a",
        fillColor: "#5ee1c9",
        titleColor: "#f9f9f9",
        textColor: "#f9f9f9",
        isDark: true,
      },
      icon: "market",
    },
    {
      id: "expert-support",
      title: "Application Support",
      description:
        "Never apply alone. Get AI-powered assistance for every step of your application process, from resume optimization to interview preparation.",
      stats: ["24/7 AI support", "Interview prep", "Application guidance"],
      theme: {
        bgColor: "#f9f9f9",
        fillColor: "#0e5dff",
      },
      icon: "support",
    },
  ],
  steps: [
    {
      number: 1,
      stepTitle: "Upload Resume & Job",
      stepDescription: "Submit your resume and the job you're interested in.",
    },
    {
      number: 2,
      stepTitle: "Get Success Prediction",
      stepDescription: "Instantly see your match rate and callback probability.",
    },
    {
      number: 3,
      stepTitle: "Review Insights",
      stepDescription: "Get actionable optimization suggestions and strategies.",
    },
    {
      number: 4,
      stepTitle: "Optimize Application",
      stepDescription: "Let AI help you tailor your application perfectly.",
    },
    {
      number: 5,
      stepTitle: "Apply With Confidence",
      stepDescription: "Submit your application and track your success.",
    },
  ],
};
