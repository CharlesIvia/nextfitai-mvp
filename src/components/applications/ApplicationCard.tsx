// components/application-card/application-card.tsx
import styles from "@/app/dashboard/dashboard.module.css";

export interface Application {
  id: string;
  company: string;
  position: string;
  status: string;
  timestamp: string;
  matchRate: string;
}

export const ApplicationCard = ({ application }: { application: Application }) => (
  <div className={styles.applicationCard}>
    <div className={styles.cardHeader}>
      <h3>{application.company || "Unknown company"}</h3>
      <span className={styles.matchRate}>{application.matchRate || "0%"}</span>
    </div>
    <p className={styles.position}>{application.position}</p>
    <div className={styles.cardFooter}>
      <span className={styles.status}>{application.status}</span>
      <span className={styles.timestamp}>{application.timestamp}</span>
    </div>
  </div>
);
