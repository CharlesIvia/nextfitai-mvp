"use client";

import { useEffect, useState } from "react";
import { auth } from "@/firebase/config";
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { useRouter } from "next/navigation";
import styles from "./verify.module.css";
import ConfirmationDialog from "@/components/confirmation-dialog/confirmation-dialog";

const VerifyEmail = () => {
  const [verificationStatus, setVerificationStatus] = useState<{
    status: "loading" | "error" | "success";
    message: string;
  }>({
    status: "loading",
    message: "Verifying your email...",
  });

  const [showEmailPrompt, setShowEmailPrompt] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const router = useRouter();

  useEffect(() => {
    const verifyEmail = async () => {
      // Check if the current URL is a sign-in link
      if (isSignInWithEmailLink(auth, window.location.href)) {
        let email = window.localStorage.getItem("emailForSignIn");

        // If email is missing from localStorage, show dialog
        if (!email) {
          setShowEmailPrompt(true);
          setVerificationStatus({
            status: "loading",
            message: "Please provide your email to complete verification.",
          });
          return;
        }

        await completeVerification(email);
      } else {
        setVerificationStatus({
          status: "error",
          message: "Invalid verification link.",
        });
      }
    };

    verifyEmail();
  }, [router]);

  const completeVerification = async (email: string) => {
    if (!email) {
      setVerificationStatus({
        status: "error",
        message: "Email verification failed. No email provided.",
      });
      return;
    }

    try {
      // Complete the sign-in process
      await signInWithEmailLink(auth, email, window.location.href);

      // Clear the email from storage
      window.localStorage.removeItem("emailForSignIn");

      setVerificationStatus({
        status: "success",
        message: "Email verified successfully! Redirecting...",
      });

      // Redirect to dashboard or home page
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } catch (error) {
      setVerificationStatus({
        status: "error",
        message: "Failed to verify email. The link may be invalid or expired.",
      });
    }
  };

  const handleEmailSubmit = async () => {
    setShowEmailPrompt(false);
    await completeVerification(emailInput);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.iconWrapper}>
          {verificationStatus.status === "loading" && <div className={styles.loadingSpinner} />}
          {verificationStatus.status === "success" && <div className={styles.successIcon}>✓</div>}
          {verificationStatus.status === "error" && <div className={styles.errorIcon}>!</div>}
        </div>

        <h1 className={styles.title}>
          {verificationStatus.status === "loading" && "Verifying Email"}
          {verificationStatus.status === "success" && "Email Verified"}
          {verificationStatus.status === "error" && "Verification Failed"}
        </h1>

        <p className={styles.message}>{verificationStatus.message}</p>

        {verificationStatus.status === "error" && (
          <button onClick={() => router.push("/get-started")} className={styles.button}>
            Try Again
          </button>
        )}
      </div>

      <ConfirmationDialog
        isOpen={showEmailPrompt}
        onClose={() => {
          setShowEmailPrompt(false);
          setVerificationStatus({
            status: "error",
            message: "Email verification cancelled.",
          });
        }}
        onConfirm={handleEmailSubmit}
        title='Email Verification'
        message={
          <>
            <p>Please enter your email address to complete verification:</p>
            <input
              type='email'
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              className={styles.emailInput}
              placeholder='Enter your email'
              autoFocus
            />
          </>
        }
        confirmText='Verify'
        cancelText='Cancel'
      />
    </div>
  );
};

export default VerifyEmail;
