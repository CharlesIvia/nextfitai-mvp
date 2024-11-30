"use client";

import { TrendingUp, Mail, Settings, User, ArrowRight, FileText, Upload, Send } from "lucide-react";
import styles from "./dashboard.module.css";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ResumeAnalysisModal } from "@/components/resume-analysis-modal/steps";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [showAnalysisModal, setShowAnalysisModal] = useState(false);
  const [modalMode, setModalMode] = useState<"select" | "upload">("select");

  const router = useRouter();

  const quickActions = [
    {
      icon: <Upload className={styles.actionIcon} />,
      title: "Analyze Resume",
      subtitle: "Upload your resume and job",
      action: "upload",
    },
    {
      icon: <TrendingUp className={styles.actionIcon} />,
      title: "Match Insights",
      subtitle: "View success predictions",
      action: "insights",
    },
    {
      icon: <Mail className={styles.actionIcon} />,
      title: "Job Questions",
      subtitle: "Get AI-powered answers",
      action: "questions",
    },
  ];

  const recentApplications = [
    {
      id: 1,
      company: "Google",
      position: "Senior Software Engineer",
      status: "pending",
      timestamp: "2h ago",
      matchRate: "92%",
    },
    {
      id: 2,
      company: "Microsoft",
      position: "Product Manager",
      status: "analyzed",
      timestamp: "5h ago",
      matchRate: "88%",
    },
    {
      id: 3,
      company: "Meta",
      position: "Data Scientist",
      status: "completed",
      timestamp: "1d ago",
      matchRate: "95%",
    },
  ];

  const handleSettingsClick = () => {
    router.push("/dashboard/settings");
  };

  const handleProfileClick = () => {
    router.push("/dashboard/profile");
  };

  const handleStartAnalysis = (mode: "select" | "upload") => {
    setModalMode(mode);
    setShowAnalysisModal(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}>
              <TrendingUp />
            </div>
            <span>NextFit AI</span>
          </div>
          <div className={styles.headerActions}>
            <button className={styles.settingsButton} aria-label='Settings' onClick={handleSettingsClick}>
              <Settings />
            </button>
            <button className={styles.profileButton} aria-label='Profile' onClick={handleProfileClick}>
              <User />
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className={styles.main}>
          <div className={styles.welcome}>
            <div className={styles.welcomeStats}>
              <div className={styles.stat}>
                <h3>85%</h3>
                <p>Average Match Rate</p>
              </div>
              <div className={styles.stat}>
                <h3>10+</h3>
                <p>Hours Saved/Week</p>
              </div>
              <div className={styles.stat}>
                <h3>92%</h3>
                <p>Success Rate</p>
              </div>
            </div>
            <h1>Apply Smarter, Land Faster</h1>
            <p>Upload your resume and job description to get instant match predictions and optimization insights.</p>

            <div className={styles.analysisOptions}>
              <button className={styles.uploadButton} onClick={() => handleStartAnalysis("upload")}>
                <Upload className={styles.buttonIcon} />
                Upload New Resume
              </button>
              <div className={styles.optionsDivider}>
                <span>or</span>
              </div>
              <button className={styles.existingButton} onClick={() => handleStartAnalysis("select")}>
                <FileText className={styles.buttonIcon} />
                Use Existing Resume
              </button>
            </div>
          </div>

          {/* Recent Applications Section */}
          <div className={styles.recentOffersSection}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTitle}>
                <FileText className={styles.sectionIcon} />
                <h2>Recent Applications</h2>
              </div>
              <button className={styles.viewAllButton}>
                View all
                <ArrowRight size={16} />
              </button>
            </div>

            <div className={styles.recentOffersList}>
              {recentApplications.map((app) => (
                <div key={app.id} className={styles.recentOfferCard}>
                  <div className={styles.offerIcon}>
                    <FileText size={20} />
                  </div>
                  <div className={styles.offerInfo}>
                    <div className={styles.offerMain}>
                      <h3>{app.company}</h3>
                      <p>{app.position}</p>
                      <p className={styles.matchRate}>{app.matchRate} Match</p>
                    </div>
                    <div className={styles.offerMeta}>
                      <span className={`${styles.offerStatus} ${styles[app.status]}`}>
                        {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                      </span>
                      <span className={styles.offerTime}>{app.timestamp}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className={styles.quickActions}>
            <h2>Quick Actions</h2>
            <div className={styles.actionCards}>
              {quickActions.map((action, index) => (
                <button key={index} className={styles.actionCard}>
                  <div className={styles.actionIconWrapper}>{action.icon}</div>
                  <h3>{action.title}</h3>
                  <p>{action.subtitle}</p>
                </button>
              ))}
            </div>
          </div>

          {/* How It Works */}
          <div className={styles.recentActivity}>
            <h2>How It Works</h2>
            <div className={styles.steps}>
              <div className={styles.step}>
                <div className={styles.stepNumber}>1</div>
                <h3>Upload</h3>
                <p>Share your resume and job description</p>
              </div>
              <div className={styles.step}>
                <div className={styles.stepNumber}>2</div>
                <h3>Get Match Rate</h3>
                <p>See your success prediction</p>
              </div>
              <div className={styles.step}>
                <div className={styles.stepNumber}>3</div>
                <h3>Optimize</h3>
                <p>Get tailored improvement tips</p>
              </div>
            </div>
          </div>

          {/* AI Assistant Input */}
          <div className={styles.inputContainer}>
            <div className={styles.inputWrapper}>
              <input
                type='text'
                placeholder='Ask about job requirements, application tips, or success predictions...'
              />
              <button className={styles.sendButton}>
                Ask AI
                <Send />
              </button>
            </div>
          </div>
        </main>
      </div>
      {/* Analysis Modal */}
      {showAnalysisModal && <ResumeAnalysisModal mode={modalMode} onClose={() => setShowAnalysisModal(false)} />}{" "}
    </div>
  );
}