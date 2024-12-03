"use client";

import { FileText, ArrowLeft, Upload, Clock, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";
import styles from "./applications.module.css";
import Link from "next/link";
import { useState } from "react";
import { ResumeAnalysisModal } from "@/components/resume-analysis-modal/steps";

const STATUS_MAP = {
  pending: {
    label: "Pending",
    icon: <Clock size={16} />,
    className: styles.pending,
  },
  analyzing: {
    label: "Analyzing",
    icon: <Clock size={16} />,
    className: styles.processing,
  },
  completed: {
    label: "Analyzed",
    icon: <CheckCircle2 size={16} />,
    className: styles.completed,
  },
  error: {
    label: "Failed",
    icon: <AlertCircle size={16} />,
    className: styles.error,
  },
};

export default function Applications() {
  const [showAnalysisModal, setShowAnalysisModal] = useState(false);
  const [modalMode, setModalMode] = useState<"select" | "upload">("select");

  const handleStartAnalysis = (mode: "select" | "upload") => {
    setModalMode(mode);
    setShowAnalysisModal(true);
  };

  // Mock data for UI demonstration
  const applications = [
    {
      id: 1,
      company: "Google",
      position: "Senior Software Engineer",
      status: "completed",
      createdAt: "2h ago",
      matchRate: "92%",
      salary: "$185,000",
    },
    {
      id: 2,
      company: "Microsoft",
      position: "Product Manager",
      status: "analyzing",
      createdAt: "5h ago",
      matchRate: "88%",
      salary: "$165,000",
    },
    {
      id: 3,
      company: "Meta",
      position: "Data Scientist",
      status: "completed",
      createdAt: "1d ago",
      matchRate: "95%",
      salary: "$175,000",
    },
  ];

  const getStatusDisplay = (status: string) => {
    const statusInfo = STATUS_MAP[status as keyof typeof STATUS_MAP];
    return (
      <span className={`${styles.offerStatus} ${statusInfo.className}`}>
        {statusInfo.icon}
        {statusInfo.label}
      </span>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <Link href='/dashboard' className={styles.backButton}>
            <ArrowLeft size={20} />
            Back to Dashboard
          </Link>
        </div>

        <div className={styles.startSection}>
          <h2>New Application Analysis</h2>
          <p>Get instant match predictions and optimization insights for your target roles</p>

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
              Use Saved Resume
            </button>
          </div>
        </div>

        <div className={styles.offersSection}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitle}>
              <FileText className={styles.sectionIcon} />
              <h2>Recent Applications</h2>
            </div>
          </div>

          <div className={styles.offersList}>
            {applications.map((app) => (
              <div key={app.id} className={styles.offerCard}>
                <div className={styles.offerHeader}>
                  <div className={styles.offerCompany}>
                    <FileText size={20} className={styles.offerIcon} />
                    <h3>{app.company}</h3>
                  </div>
                  {getStatusDisplay(app.status)}
                </div>

                <div className={styles.offerDetails}>
                  <div className={styles.detail}>
                    <span>Position</span>
                    <strong>{app.position}</strong>
                  </div>

                  <div className={styles.detail}>
                    <span>Match Rate</span>
                    <strong>{app.matchRate}</strong>
                  </div>

                  <div className={styles.detail}>
                    <span>Analyzed</span>
                    <strong>{app.createdAt}</strong>
                  </div>
                </div>

                <div className={styles.offerFooter}>
                  {app.status === "completed" ? (
                    <Link
                      href={`/dashboard/applications/${app.id}`}
                      className={`${styles.viewButton} ${styles.completed}`}
                    >
                      View Analysis
                      <FileText size={16} />
                    </Link>
                  ) : (
                    <div className={styles.processingStatus}>
                      {app.status === "error" ? "Analysis failed" : "Analysis in progress..."}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal */}
        {showAnalysisModal && <ResumeAnalysisModal mode={modalMode} onClose={() => setShowAnalysisModal(false)} />}
      </div>
    </div>
  );
}
