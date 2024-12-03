// app/dashboard/applications/[id]/page.tsx
"use client";

import Link from "next/link";
import Card from "@/components/card/card";
import {
  FileText,
  Target,
  Trophy,
  ArrowUpRight,
  Download,
  BadgeCheck,
  ArrowLeft,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  Building,
  Clock,
} from "lucide-react";
import styles from "./application-details.module.css";

export default function ApplicationDetails({ params }: { params: { id: string } }) {
  const analysis = {
    company: "Google",
    position: "Senior Software Engineer",
    matchScore: 92,
    status: "completed",
    salary: "$185,000 - $225,000",
    location: "Mountain View, CA",
    resume: {
      name: "Software_Engineer_Resume_V2.pdf",
      lastUpdated: "1 week ago",
      url: "#",
    },
    matches: {
      overall: 92,
      experience: {
        score: 88,
        details: [
          { requirement: "7+ years of software development", match: true, yours: "8 years of full-stack development" },
          { requirement: "Team leadership experience", match: true, yours: "Led team of 5 engineers" },
          { requirement: "Microservices architecture", match: false, yours: "Monolithic applications" },
        ],
      },
      skills: {
        score: 85,
        matches: ["Python", "React", "Node.js", "AWS"],
        missing: ["Kubernetes", "System Design", "GraphQL"],
        extras: ["Vue.js", "Docker"],
      },
      education: {
        score: 95,
        requirement: "BS in Computer Science or related field",
        yours: "MS in Computer Science",
        match: true,
      },
    },
    marketInsights: {
      applicants: 245,
      averageExperience: "6.5 years",
      topSkills: ["System Design", "Kubernetes", "Python"],
      competitiveScore: 82,
    },
    keyStrengths: [
      "Strong backend development experience",
      "Team leadership background",
      "Advanced degree in Computer Science",
    ],
    improvements: ["Add cloud infrastructure experience", "Highlight system design projects"],
  };

  return (
    <div className={styles.container}>
      {/* Header Navigation */}
      <div className={styles.headerNav}>
        <Link href='/dashboard/applications' className={styles.backButton}>
          <ArrowLeft size={20} />
          Back to Applications
        </Link>
      </div>

      {/* Main Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.jobInfo}>
            <h1>{analysis.position}</h1>
            <div className={styles.companyDetails}>
              <span>{analysis.company}</span>
              <span>•</span>
              <span>{analysis.location}</span>
              <span>•</span>
              <span>{analysis.salary}</span>
            </div>
          </div>

          <div className={styles.headerStats}>
            <div className={styles.matchScore}>
              <div className={styles.scoreRing}>
                <span>{analysis.matchScore}%</span>
                <p>Match</p>
              </div>
            </div>
            <div className={`${styles.status} ${styles[analysis.status]}`}>
              <CheckCircle2 size={16} />
              <span>Analysis Complete</span>
            </div>
          </div>
        </div>
      </header>

      <div className={styles.content}>
        <div className={styles.mainColumn}>
          {/* Resume Section */}
          <Card className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTitle}>
                <FileText className={styles.icon} />
                <h2>Analyzed Resume</h2>
              </div>
              <button className={styles.actionButton}>Update Resume</button>
            </div>
            <div className={styles.resumeCard}>
              <FileText size={24} />
              <div className={styles.resumeInfo}>
                <h3>{analysis.resume.name}</h3>
                <p>Last updated {analysis.resume.lastUpdated}</p>
              </div>
              <button className={styles.downloadButton}>
                <Download size={16} />
                Download
              </button>
            </div>
          </Card>

          {/* Experience Match */}
          <Card className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTitle}>
                <BadgeCheck className={styles.icon} />
                <h2>Experience Match</h2>
              </div>
              <div className={styles.matchScore}>{analysis.matches.experience.score}%</div>
            </div>
            <div className={styles.matchContent}>
              {analysis.matches.experience.details.map((detail, index) => (
                <div key={index} className={styles.matchItem}>
                  <div className={`${styles.matchStatus} ${detail.match ? styles.matched : styles.missing}`}>
                    {detail.match ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                    {detail.match ? "Match" : "Gap"}
                  </div>
                  <div className={styles.matchDetails}>
                    <p className={styles.requirement}>{detail.requirement}</p>
                    <p className={styles.yours}>{detail.yours}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Skills Match */}
          <Card className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTitle}>
                <Target className={styles.icon} />
                <h2>Skills Match</h2>
              </div>
              <div className={styles.matchScore}>{analysis.matches.skills.score}%</div>
            </div>
            <div className={styles.skillsContent}>
              <div className={styles.skillsSection}>
                <h3>Matching Skills</h3>
                <div className={styles.skillTags}>
                  {analysis.matches.skills.matches.map((skill, index) => (
                    <span key={index} className={`${styles.skillTag} ${styles.matched}`}>
                      <CheckCircle2 size={12} />
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className={styles.skillsSection}>
                <h3>Missing Skills</h3>
                <div className={styles.skillTags}>
                  {analysis.matches.skills.missing.map((skill, index) => (
                    <span key={index} className={`${styles.skillTag} ${styles.missing}`}>
                      <AlertCircle size={12} />
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Market Insights */}
          <Card className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTitle}>
                <Trophy className={styles.icon} />
                <h2>Market Insights</h2>
              </div>
            </div>
            <div className={styles.marketContent}>
              <div className={styles.marketGrid}>
                <div className={styles.marketStat}>
                  <h3>Competition Level</h3>
                  <p>{analysis.marketInsights.applicants} recent applicants</p>
                </div>
                <div className={styles.marketStat}>
                  <h3>Your Position</h3>
                  <p>Top {100 - analysis.marketInsights.competitiveScore}%</p>
                </div>
                <div className={styles.marketStat}>
                  <h3>Average Experience</h3>
                  <p>{analysis.marketInsights.averageExperience}</p>
                </div>
              </div>
              <div className={styles.marketSkills}>
                <h3>Most Required Skills</h3>
                <div className={styles.skillTags}>
                  {analysis.marketInsights.topSkills.map((skill, index) => (
                    <span key={index} className={styles.skillTag}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className={styles.sidebar}>
          <Card className={styles.sidebarCard}>
            <h3>Key Strengths</h3>
            <ul className={styles.strengthsList}>
              {analysis.keyStrengths.map((strength, index) => (
                <li key={index}>
                  <CheckCircle2 size={16} />
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className={styles.sidebarCard}>
            <h3>Suggested Improvements</h3>
            <ul className={styles.improvementsList}>
              {analysis.improvements.map((improvement, index) => (
                <li key={index}>
                  <Target size={16} />
                  <span>{improvement}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className={styles.sidebarCard}>
            <h3>Job Details</h3>
            <a href='#' className={styles.jobLink} target='_blank' rel='noopener noreferrer'>
              View Original Posting
              <ArrowUpRight size={16} />
            </a>
          </Card>
        </div>
      </div>

      {/* AI Assistant */}
      <div className={styles.aiAssistant}>
        <div className={styles.inputWrapper}>
          <input type='text' placeholder='Ask about improving your match score or application strategy...' />
          <button className={styles.sendButton}>
            <MessageSquare size={20} />
            Ask AI Assistant
          </button>
        </div>
      </div>
    </div>
  );
}
