"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar/nabar";
import styles from "./login.module.css";
import { sendSignInLinkToEmail, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/config";
import { FaGoogle } from "react-icons/fa";

// Email validation regex that checks for:
// - Correct email format with proper TLD
// - No consecutive dots
// - Valid characters only
// - Proper length constraints
const EMAIL_REGEX = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;

// Common disposable email domains
const DISPOSABLE_DOMAINS = [
  "tempmail.com",
  "throwawaymail.com",
  "guerrillamail.com",
  "temp-mail.org",
  "fakeinbox.com",
  // Add more as needed
];

interface ValidationError {
  type: "error" | "warning" | "success";
  message: string;
}

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [validationError, setValidationError] = useState<ValidationError | null>(null);
  const [isEmailFocused, setIsEmailFocused] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace("/dashboard");
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const validateEmail = (email: string): ValidationError | null => {
    // Basic format check
    if (!email) {
      return { type: "error", message: "Email is required" };
    }

    // Length check
    if (email.length < 6) {
      return { type: "error", message: "Email must be at least 6 characters long" };
    }

    if (email.length > 254) {
      return { type: "error", message: "Email is too long" };
    }

    // Format validation
    if (!EMAIL_REGEX.test(email)) {
      return { type: "error", message: "Please enter a valid email address" };
    }

    // Check for disposable email domains
    const domain = email.split("@")[1].toLowerCase();
    if (DISPOSABLE_DOMAINS.includes(domain)) {
      return { type: "error", message: "Please use a permanent email address" };
    }

    // Additional checks
    if (email.includes("..")) {
      return { type: "error", message: "Email cannot contain consecutive dots" };
    }

    if (email.startsWith(".") || email.endsWith(".")) {
      return { type: "error", message: "Email cannot start or end with a dot" };
    }

    const [localPart] = email.split("@");
    if (localPart.length > 64) {
      return { type: "error", message: "The part before @ is too long" };
    }

    // Warning for common typos
    const commonDomains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com"];
    const typoDomains = {
      "gmial.com": "gmail.com",
      "yahooo.com": "yahoo.com",
      "hotmal.com": "hotmail.com",
      "outlok.com": "outlook.com",
    };

    const enteredDomain = email.split("@")[1];
    for (const [typo, correct] of Object.entries(typoDomains)) {
      if (enteredDomain === typo) {
        return {
          type: "warning",
          message: `Did you mean ${correct}?`,
        };
      }
    }

    return null;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    if (isEmailFocused) {
      setValidationError(validateEmail(newEmail));
    }
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    // Final validation before submission
    const validationResult = validateEmail(email);
    if (validationResult?.type === "error") {
      setValidationError(validationResult);
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const actionCodeSettings = {
        url: `${window.location.origin}/auth/verify`,
        handleCodeInApp: true,
      };

      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem("emailForSignIn", email);
      setMessage("Check your email for the sign-in link!");
      setValidationError({ type: "success", message: "Sign-in link sent!" });
    } catch (error: any) {
      const errorMessage =
        error.code === "auth/invalid-email"
          ? "Please enter a valid email address"
          : error.message || "Error sending sign-in link. Please try again.";

      setMessage(errorMessage);
      setValidationError({ type: "error", message: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setGoogleLoading(true);
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      console.error("Google sign-in error:", error);
      setMessage(error.message || "Failed to sign in with Google. Please try again.");
      setGoogleLoading(false);
    }
  };

  if (loading || googleLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loader}></div>
      </div>
    );
  }

  return (
    <main className={styles.signup}>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.top}>
          <h1>Join NextFit AI</h1>
          <p>Apply smarter, land faster</p>
        </div>

        <form onSubmit={handleEmailSignIn}>
          <div className={styles.inputContainer}>
            <input
              id='email'
              type='email'
              placeholder='Enter your email'
              value={email}
              onChange={handleEmailChange}
              onFocus={() => setIsEmailFocused(true)}
              onBlur={() => {
                setIsEmailFocused(false);
                if (email) {
                  setValidationError(validateEmail(email));
                }
              }}
              className={`${styles.emailInput} ${
                validationError
                  ? validationError.type === "error"
                    ? styles.errorInput
                    : validationError.type === "warning"
                    ? styles.warningInput
                    : validationError.type === "success"
                    ? styles.successInput
                    : ""
                  : ""
              }`}
              required
            />
            {validationError && (
              <div className={`${styles.validationMessage} ${styles[validationError.type]}`}>
                {validationError.message}
              </div>
            )}
          </div>

          {message && !validationError && (
            <div className={`${styles.message} ${message.includes("Error") ? styles.error : styles.success}`}>
              <p>{message}</p>
            </div>
          )}

          <button
            type='submit'
            disabled={loading || validationError?.type === "error"}
            className={`${styles.submitButton} ${validationError?.type === "error" ? styles.disabledButton : ""}`}
          >
            {loading ? "Sending link..." : "Continue with Email"}
          </button>
        </form>

        <div className={styles.divider}>
          <span></span>
          <p>Or continue with</p>
          <span></span>
        </div>

        <div className={styles.alternatives}>
          <button className={styles.googleButton} onClick={handleGoogleSignIn} disabled={googleLoading}>
            <FaGoogle />
            <span>{googleLoading ? "Signing in..." : "Continue with Google"}</span>
          </button>
        </div>

        <div className={styles.exists}>
          <p>Don't have an account?</p>
          <a href='/get-started'>Sign up</a>
        </div>

        <div className={styles.terms}>
          <p>
            By continuing, you agree to our <a href='/terms'>Terms of Service</a> and{" "}
            <a href='/privacy'>Privacy Policy</a>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Login;
