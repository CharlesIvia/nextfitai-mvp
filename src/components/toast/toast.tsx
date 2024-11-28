// components/toast/toast.tsx
import { useEffect, useState } from "react";
import { AlertCircle, CheckCircle2, X } from "lucide-react";
import styles from "./toast.module.css";

interface ToastProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
  duration?: number;
}

export const Toast = ({ message, type, onClose, duration = 5000 }: ToastProps) => {
  const [progress, setProgress] = useState(100);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    const endTime = startTime + duration;

    const updateProgress = () => {
      const now = Date.now();
      const remaining = endTime - now;
      const newProgress = (remaining / duration) * 100;

      if (newProgress <= 0) {
        handleClose();
      } else {
        setProgress(newProgress);
        requestAnimationFrame(updateProgress);
      }
    };

    const animationFrame = requestAnimationFrame(updateProgress);

    return () => cancelAnimationFrame(animationFrame);
  }, [duration]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(onClose, 300); // Match animation duration
  };

  return (
    <div
      className={`${styles.toast} ${styles[type]} ${isExiting ? styles.exit : ""}`}
      onMouseEnter={() => setProgress(100)}
      onMouseLeave={() => setProgress(0)}
    >
      <div className={styles.iconContainer}>
        {type === "success" ? (
          <CheckCircle2 className={styles.successIcon} />
        ) : (
          <AlertCircle className={styles.errorIcon} />
        )}
      </div>

      <div className={styles.content}>
        <p className={styles.message}>{message}</p>
      </div>

      <button onClick={handleClose} className={styles.closeButton} aria-label='Close notification'>
        <X size={18} />
      </button>

      <div className={styles.progressBar} style={{ width: `${progress}%` }} />
    </div>
  );
};
