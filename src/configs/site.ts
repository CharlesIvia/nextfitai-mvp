export const siteConfig = {
  plans: [
    {
      name: "Basic",
      price: "15",
      description: "Perfect for your first job search",
      features: ["AI Resume Analysis", "Keyword Optimization", "ATS Compatibility Check", "Basic Templates"],
      disabled: false,
    },
    {
      name: "Pro",
      price: "29",
      description: "For serious job seekers",
      features: [
        "Everything in Basic",
        "Advanced AI Optimization",
        "Industry-Specific Formats",
        "Multiple Resume Versions",
        "Custom Templates",
        "Priority Support",
      ],
      isPopular: true,
      disabled: false,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For teams and organizations",
      features: [
        "Everything in Pro",
        "Team Dashboard",
        "Bulk Processing",
        "Custom Integration",
        "API Access",
        "Dedicated Support",
      ],
      disabled: false,
    },
  ],
  variants: ["software engineering", "product management", "data science", "design", "marketing", "sales"],
  features: [
    {
      id: "ai-analysis",
      title: "Smart AI Analysis",
      description:
        "Our AI analyzes your resume against job requirements, comparing it with millions of successful applications. Get instant insights on how to improve your resume and increase your callback chances.",
      stats: ["1M+ resumes analyzed", "30-second analysis", "95% accuracy"],
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
      title: "Resume Optimization",
      description:
        "Get AI-powered suggestions to optimize every section of your resume. Our system identifies missing keywords, improves impact statements, and ensures your experience stands out to both ATS and human recruiters.",
      stats: ["85% callback rate", "500+ templates", "24/7 optimization"],
      theme: {
        bgColor: "#f9f9f9",
        fillColor: "#0e5dff",
      },
      icon: "strategy",
    },
    {
      id: "ats-optimization",
      title: "ATS Compatibility",
      description:
        "Ensure your resume gets past Applicant Tracking Systems. We analyze formatting, keywords, and content to maximize your resume's visibility to recruiters.",
      stats: ["100% ATS compatible", "Key term analysis", "Format verification"],
      theme: {
        bgColor: "#f9f9f9",
        fillColor: "#5b50fd",
      },
      icon: "pkg",
    },
    {
      id: "targeted-matching",
      title: "Job-Specific Targeting",
      description:
        "Create perfectly tailored resumes for each job application. Our AI helps you match your experience and skills to specific job requirements and company preferences.",
      stats: ["Perfect match", "Company insights", "Role analysis"],
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
      title: "Industry Insights",
      description:
        "Access real-time data on industry trends, in-demand skills, and role requirements. Our AI monitors thousands of job postings to give you the latest insights for your target role.",
      stats: ["Daily updates", "Skills trends", "Role requirements"],
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
      title: "Expert Support",
      description:
        "Join our community of 10,000+ professionals sharing job search experiences. Get support from our AI and access to resume experts for complex situations.",
      stats: ["10K+ community", "24/7 support", "Expert access"],
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
      stepTitle: "Upload Your Resume",
      stepDescription: "Submit your current resume and target job descriptions.",
    },
    {
      number: 2,
      stepTitle: "AI Analysis",
      stepDescription: "Get instant analysis of your resume's strengths and weaknesses.",
    },
    {
      number: 3,
      stepTitle: "Optimize Content",
      stepDescription: "Follow AI suggestions to improve your resume.",
    },
    {
      number: 4,
      stepTitle: "Match to Jobs",
      stepDescription: "Tailor your resume to specific job requirements.",
    },
    {
      number: 5,
      stepTitle: "Track Progress",
      stepDescription: "Monitor your application success rate.",
    },
  ],
};
