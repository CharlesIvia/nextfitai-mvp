import React from "react";
import { AlertCircle } from "lucide-react";
import styles from "./analysis.module.css";
import ReactMarkdown from "react-markdown";

type AnalysisSectionProps = {
  analysis: string;
  analysisContent: string;
  isEditing: boolean;
};

const AnalysisSection = ({ analysis, analysisContent, isEditing }: AnalysisSectionProps) => {
  return (
    <div className={styles.analysisWrapper}>
      <div className={styles.analysisHeader}>
        <div className={styles.headerContent}>
          <h2 className={styles.title}>Offer Analysis</h2>
          {isEditing && (
            <div className={styles.editingWarning}>
              <AlertCircle size={16} className='text-amber-600' />
              <span className={styles.warningText}>Analysis will be updated after saving changes</span>
            </div>
          )}
        </div>
      </div>

      <div className={styles.analysisContent}>
        <ReactMarkdown className={styles.markdownContent}>{analysisContent}</ReactMarkdown>
      </div>
    </div>
  );
};

export default AnalysisSection;
