export const siteConfig = {
  plans: [
    {
      name: "Basic",
      price: "11",
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
      price: "19",
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
      price: "29",
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
      disabled: true,
    },
  ],
  variants: ["software engineering", "product management", "data science", "design", "marketing", "sales"],
  features: [
    {
      id: "ai-analysis",
      title: "Match Prediction & Scoring",
      description:
        "Get instant feedback on your fit for any role. Our AI analyzes your resume against job requirements and predicts your callback probability with 85% accuracy.",
      stats: ["85% prediction accuracy", "30-sec analysis", "2x faster hiring"],
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
      title: "One-Click Resume Optimization",
      description:
        "Stop guessing what recruiters want. Our AI automatically tailors your resume for each role, highlighting relevant experience and skills that matter.",
      stats: ["85% callback rate", "ATS-optimized", "Auto-formatting"],
      theme: {
        bgColor: "#f9f9f9",
        fillColor: "#0e5dff",
      },
      icon: "strategy",
    },
    {
      id: "targeted-matching",
      title: "Smart Application Strategy",
      description:
        "Apply smarter, not harder. Focus on roles where you're most likely to succeed, saving time and increasing your chances of landing interviews.",
      stats: ["10+ hours saved/week", "Strategic insights", "Higher success rate"],
      theme: {
        bgColor: "#f9f9f9",
        fillColor: "#0e5dff",
      },
      icon: "time",
    },
    {
      id: "interview-prep",
      title: "Interview Intelligence",
      description:
        "Get AI-powered interview preparation specific to each role. Practice with custom questions and get feedback on your responses.",
      stats: ["Role-specific prep", "24/7 AI support", "90% success rate"],
      theme: {
        bgColor: "#13172a",
        fillColor: "#5ee1c9",
        titleColor: "#f9f9f9",
        textColor: "#f9f9f9",
        isDark: true,
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
  testimonials: [
    {
      name: "Michael Zhang",
      role: "Software Engineer at Clipboard Health",
      quote:
        "After 6 months of scattered applications, NextFit AI helped me find my fit at Clipboard Health. The match prediction was impressive - it identified roles that actually aligned with my healthcare tech background. Went from a 5% to 40% response rate in two weeks.",
    },
    {
      name: "Rachel Patel",
      role: "Data Analyst at Instacart",
      quote:
        "The resume optimization tool helped me highlight my SQL expertise and A/B testing experience that Instacart was looking for. It suggested emphasizing my experience with large datasets and analytics tools. Had 3 interviews lined up within days.",
    },
    {
      name: "Alex Rivera",
      role: "Product Support Specialist at Deel",
      quote:
        "NextFit helped me transition from traditional customer service to tech support. It identified transferable skills I hadn't considered and helped me position my experience with payment platforms. Within 3 weeks, I had my dream role at Deel.",
    },
  ],
  faqs: [
    {
      question: "How accurate is the AI match prediction?",
      answer:
        "Our AI prediction model has an 85% accuracy rate, based on analyzing millions of successful job applications. It considers over 50 different factors including skills, experience, and job requirements.",
    },
    {
      question: "How long does it take to optimize my resume?",
      answer:
        "The initial AI analysis and optimization takes just 30 seconds. You can then make additional customizations based on our suggestions, typically taking 5-10 minutes per application.",
    },
    {
      question: "Will this work for my industry?",
      answer:
        "Yes! NextFit AI is trained on data from various industries including tech, finance, healthcare, and more. Our system continuously learns from new data to stay current with industry trends.",
    },
    {
      question: "Can I try it before paying?",
      answer:
        "Yes! You can analyze your first job application for free. This includes a match prediction score and basic optimization suggestions to help you evaluate our platform.",
    },
    {
      question: "How do I get a refund if I'm not satisfied?",
      answer:
        "We offer a 100% money-back guarantee within 30 days if you don't see an improvement in your application success rate. Simply contact our support team with your results.",
    },
  ],
};
