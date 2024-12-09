"use client";

import Header from "@/components/header/header";
import Card from "@/components/card/card";
import Link from "next/link";
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
  TrendingUp,
  Zap,
  BarChart,
  Users,
  Briefcase,
  Send,
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
      <div className={styles.content}>
        <Header />

        <div className={styles.wrapper}>
          {/* Job Overview Card */}
          <Card className={styles.jobOverview}>
            <div className={styles.jobContent}>
              <div className={styles.jobInfo}>
                <div className={styles.jobMeta}>
                  <span className={styles.jobStatus}>
                    <Clock size={16} />
                    Actively Hiring
                  </span>
                  <span className={styles.postedDate}>Posted 2 days ago</span>
                </div>

                <h1>{analysis.position}</h1>

                <div className={styles.companyDetails}>
                  <div className={styles.companyName}>
                    <Building size={20} />
                    <span>{analysis.company}</span>
                  </div>
                  <div className={styles.companyMeta}>
                    <span>{analysis.location}</span>
                    <span>•</span>
                    <span>{analysis.salary}</span>
                  </div>
                </div>
              </div>

              <div className={styles.scoreCard}>
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
          </Card>

          {/* Analysis Overview */}
          <div className={styles.overviewGrid}>
            <Card>
              <div className={styles.overviewItem}>
                <BarChart size={20} />
                <h3>Competition Level</h3>
                <p className={styles.overviewStat}>Moderate</p>
                <p className={styles.overviewMeta}>{analysis.marketInsights.applicants} recent applicants</p>
              </div>
            </Card>

            <Card>
              <div className={styles.overviewItem}>
                <Trophy size={20} />
                <h3>Your Standing</h3>
                <p className={styles.overviewStat}>Top {100 - analysis.marketInsights.competitiveScore}%</p>
                <p className={styles.overviewMeta}>Among all applicants</p>
              </div>
            </Card>

            <Card>
              <div className={styles.overviewItem}>
                <BadgeCheck size={20} />
                <h3>Experience Match</h3>
                <p className={styles.overviewStat}>{analysis.matches.experience.score}%</p>
                <p className={styles.overviewMeta}>Above requirements</p>
              </div>
            </Card>

            <Card>
              <div className={styles.overviewItem}>
                <Target size={20} />
                <h3>Skills Match</h3>
                <p className={styles.overviewStat}>{analysis.matches.skills.score}%</p>
                <p className={styles.overviewMeta}>{analysis.matches.skills.matches.length} key skills matched</p>
              </div>
            </Card>
          </div>

          {/* Main Analysis Content */}
          <div className={styles.analysisLayout}>
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
        </div>
      </div>

      {/* AI Assistant */}

      <div className={styles.inputContainer}>
        <div className={styles.inputWrapper}>
          <input type='text' placeholder='Ask about job requirements, application tips, or success predictions...' />
          <button className={styles.sendButton}>
            Ask AI
            <Send />
          </button>
        </div>
      </div>
    </div>
  );
}
