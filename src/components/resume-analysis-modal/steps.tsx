// components/resume-analysis-modal/ResumeAnalysisModal.tsx
"use client";

import { useState, useCallback } from "react";
import { FileText, Upload, Link as LinkIcon, CheckCircle2, X } from "lucide-react";
import styles from "./analysis-modal.module.css";
import {
  useGenerateApplicationAdviceMutation,
  useGetUploadUrlMutation,
  useSaveJobDescriptionMutation,
  useUploadDocumentMutation,
} from "@/services/api";

interface DragState {
  isDragging: boolean;
  isValidFile: boolean;
}

export function ResumeAnalysisModal({ onClose, mode = "select" }: { onClose: () => void; mode?: "select" | "upload" }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedResume, setSelectedResume] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobUrl, setJobUrl] = useState("");
  const [inputType, setInputType] = useState<"text" | "link">("text");
  const [inputData, setInputData] = useState({
    text: "",
    link: "",
  });
  const [saveResume, setSaveResume] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [dragState, setDragState] = useState<DragState>({ isDragging: false, isValidFile: true });
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [fileId, setFileId] = useState<string | null>(null);

  const [getUploadUrl] = useGetUploadUrlMutation();
  const [uploadDocument] = useUploadDocumentMutation();
  const [analyzeDocument] = useGenerateApplicationAdviceMutation();
  const [saveJobDescription] = useSaveJobDescriptionMutation();

  const steps = [
    {
      number: 1,
      title: mode === "upload" ? "UPLOAD RESUME" : "SELECT RESUME",
      subtitle: mode === "upload" ? "Upload your resume" : "Choose from your saved resumes",
    },
    {
      number: 2,
      title: "JOB DETAILS",
      subtitle: "Add job description or link",
    },
    {
      number: 3,
      title: "REVIEW",
      subtitle: "Confirm analysis",
    },
  ];

  const savedResumes = [
    {
      id: "resume1",
      title: "Software Engineer Resume",
      lastModified: "2 days ago",
      lastUsed: "1 day ago",
      matchRate: "92%",
    },
    {
      id: "resume2",
      title: "Product Manager Resume",
      lastModified: "5 days ago",
      lastUsed: "3 days ago",
      matchRate: "88%",
    },
  ];

  const validateFile = (file: File): boolean => {
    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    const maxSize = 10 * 1024 * 1024; // 10MB
    return validTypes.includes(file.type) && file.size <= maxSize;
  };

  // Handle file selection

  const handleFileSelection = async (file: File) => {
    try {
      setUploadError(null);
      setIsUploading(true);

      if (!validateFile(file)) {
        setDragState((prev) => ({ ...prev, isValidFile: false }));
        return false;
      }

      // Step 1: Get upload URL and fileId
      const response = await getUploadUrl(file.name).unwrap();
      const { fileId, uploadUrl } = response.data;

      console.log("File ID:", fileId);

      setFileId(fileId);

      // Step 2: Upload the actual file
      await uploadDocument({ fileId, file }).unwrap();

      // If both steps succeed, update state
      setUploadedFile(file);
      setIsUploading(false);
      return true;
    } catch (error) {
      setIsUploading(false);
      setUploadError("Failed to upload file. Please try again.");
      console.error("Error in upload process:", error);
      return false;
    }
  };

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragState((prev) => ({ ...prev, isDragging: true }));
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragState((prev) => ({ ...prev, isDragging: false }));
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setDragState({ isDragging: false, isValidFile: true });

    const file = e.dataTransfer.files[0];
    if (file) {
      await handleFileSelection(file);
    }
  }, []);

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await handleFileSelection(file);
    }
  };
  const handleSaveJobDescription = async () => {
    try {
      if (!fileId) {
        throw new Error("No file ID available");
      }

      const jobData = {
        fileId,
        jobDescription,
        jobUrl,
      };

      await saveJobDescription(jobData).unwrap();
    } catch (error) {
      console.error("Error saving job description:", error);
      throw error;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return mode === "upload" ? (
          <div className={styles.stepContent}>
            <h2>Upload your resume</h2>
            <p className={styles.stepDescription}>Upload your resume to analyze for your target role</p>

            <div
              className={`${styles.uploadArea} ${dragState.isDragging ? styles.dragging : ""} ${
                !dragState.isValidFile ? styles.invalid : ""
              }`}
              onDragEnter={handleDragEnter}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input
                type='file'
                accept='.pdf,.doc,.docx'
                onChange={handleFileInput}
                className={styles.fileInput}
                id='resumeUpload'
              />
              <label htmlFor='resumeUpload' className={styles.uploadLabel}>
                {uploadedFile ? (
                  <div className={styles.uploadedFile}>
                    <FileText />
                    <span>{uploadedFile.name}</span>
                    <button
                      className={styles.removeFile}
                      onClick={(e) => {
                        e.preventDefault();
                        setUploadedFile(null);
                      }}
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className={styles.uploadPrompt}>
                    <Upload />
                    <span className={styles.mainText}>
                      {dragState.isDragging ? "Drop your resume here" : "Drag and drop your resume or click to browse"}
                    </span>
                    <span className={styles.supportedFormats}>Supported formats: PDF, DOC, DOCX (max 10MB)</span>
                  </div>
                )}
              </label>
            </div>

            {!dragState.isValidFile && (
              <p className={styles.errorMessage}>Please upload a valid PDF or Word document under 10MB</p>
            )}

            {uploadError && <p className={styles.errorMessage}>{uploadError}</p>}

            <div className={styles.saveResumeOption}>
              <input
                type='checkbox'
                id='saveResume'
                checked={saveResume}
                onChange={(e) => setSaveResume(e.target.checked)}
                className={styles.checkbox}
              />
              <label htmlFor='saveResume'>Save this resume for future applications</label>
            </div>
          </div>
        ) : (
          <div className={styles.stepContent}>
            <h2>Select saved resume</h2>
            <p className={styles.stepDescription}>Choose a resume to analyze for your target role</p>

            <div className={styles.resumeList}>
              {savedResumes.map((resume) => (
                <div
                  key={resume.id}
                  className={`${styles.resumeCard} ${selectedResume === resume.id ? styles.selected : ""}`}
                  onClick={() => setSelectedResume(resume.id)}
                >
                  <div className={styles.resumeIcon}>
                    <FileText />
                  </div>
                  <div className={styles.resumeInfo}>
                    <h3>{resume.title}</h3>
                    <div className={styles.resumeMeta}>
                      <span>Modified {resume.lastModified}</span>
                      <span>•</span>
                      <span>Used {resume.lastUsed}</span>
                    </div>
                  </div>
                  {selectedResume === resume.id && (
                    <div className={styles.selectedCheck}>
                      <CheckCircle2 />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className={styles.stepContent}>
            <h2>Add job details</h2>
            <p className={styles.stepDescription}>Paste the job description or provide the listing URL</p>

            <div className={styles.inputSelector}>
              <button
                type='button'
                className={`${styles.inputTypeBtn} ${inputType === "text" ? styles.active : ""}`}
                onClick={() => {
                  setInputType("text");
                  // Optional: clear URL when switching to text
                  // setJobUrl("");
                }}
              >
                <FileText />
                Job Description
              </button>
              <button
                type='button'
                className={`${styles.inputTypeBtn} ${inputType === "link" ? styles.active : ""}`}
                onClick={() => {
                  setInputType("link");
                  // Optional: clear description when switching to link
                  // setJobDescription("");
                }}
              >
                <LinkIcon />
                Job URL
              </button>
            </div>

            {inputType === "text" ? (
              <textarea
                className={styles.jobDescription}
                placeholder='Paste the job description here...'
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
            ) : (
              <input
                type='url'
                className={styles.jobUrl}
                placeholder='Enter the job posting URL...'
                value={jobUrl}
                onChange={(e) => setJobUrl(e.target.value)}
              />
            )}
          </div>
        );

      case 3:
        return (
          <div className={styles.stepContent}>
            <h2>Review and confirm</h2>
            <p className={styles.stepDescription}>Verify your selections before analysis</p>

            <div className={styles.reviewSection}>
              <div className={styles.reviewItem}>
                <h3>Selected Resume</h3>
                <div className={styles.reviewCard}>
                  <FileText />
                  <span>
                    {mode === "upload" ? uploadedFile?.name : savedResumes.find((r) => r.id === selectedResume)?.title}
                  </span>
                </div>
              </div>

              <div className={styles.reviewItem}>
                <h3>Job Details</h3>
                <div className={styles.reviewCard}>
                  {inputType === "text" ? <FileText /> : <LinkIcon />}
                  <span>{jobDescription.substring(0, 100)}...</span>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <button className={styles.closeButton} onClick={onClose}>
          <X />
        </button>

        <div className={styles.stepsSidebar}>
          {steps.map((step) => (
            <div
              key={step.number}
              className={`${styles.step} ${currentStep === step.number ? styles.active : ""} ${
                currentStep > step.number ? styles.completed : ""
              }`}
            >
              <div className={styles.stepNumber}>{step.number}</div>
              <div className={styles.stepText}>
                <h3>{step.title}</h3>
                <p>{step.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.mainContent}>
          <div className={styles.contentWrapper}>
            {isUploading && (
              <div className={styles.progressContainer}>
                <div className={styles.progressBar} style={{ width: "100%" }} />
                <div className={styles.progressStep}>Uploading your resume...</div>
              </div>
            )}
            {renderStep()}
          </div>

          <div className={styles.navigation}>
            <button
              className={styles.secondaryButton}
              onClick={() => (currentStep > 1 ? setCurrentStep((prev) => prev - 1) : onClose)}
              disabled={isUploading}
            >
              {currentStep === 1 ? "Cancel" : "Back"}
            </button>
            <button
              className={styles.primaryButton}
              onClick={async () => {
                if (currentStep === 2 && mode === "upload" && fileId) {
                  try {
                    // Save job description when moving from step 2 to 3
                    await handleSaveJobDescription();
                    setCurrentStep(3);
                  } catch (error) {
                    // Handle error - maybe show a toast or error message
                    console.error("Error saving job description:", error);
                  }
                } else if (currentStep < 3) {
                  setCurrentStep((prev) => prev + 1);
                }
              }}
              disabled={
                isUploading ||
                (currentStep === 1 && mode === "upload" && !uploadedFile) ||
                (currentStep === 1 && mode === "select" && !selectedResume) ||
                (currentStep === 2 &&
                  ((inputType === "text" && !jobDescription.trim()) || (inputType === "link" && !jobUrl.trim())))
              }
            >
              {isUploading ? (
                <span className={styles.uploadingState}>
                  <div className={styles.spinner} />
                  Uploading...
                </span>
              ) : currentStep === 3 ? (
                "Start Analysis"
              ) : (
                "Continue"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
