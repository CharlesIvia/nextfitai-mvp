// components/recent-applications/recent-applications-section.tsx

import { LoadingApplicationCard } from "@/components/skeletons/application-card";
import { ApplicationCard } from "@/components/applications/ApplicationCard";
import styles from "@/app/dashboard/dashboard.module.css";
import { FileText, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useGetAllApplicationsQuery } from "@/services/api";

interface RecentApplicationsSectionProps {
  onStartAnalysis: (mode: "select" | "upload") => void;
}

export const RecentApplicationsSection = ({ onStartAnalysis }: RecentApplicationsSectionProps) => {
  const { data: applications, isLoading, isError } = useGetAllApplicationsQuery();

  console.log("Query State:", { data: applications, isLoading, isError });

  const router = useRouter();

  // Show loading state
  if (isLoading) {
    return (
      <div className={styles.recentOffersList}>
        <LoadingApplicationCard />
        <LoadingApplicationCard />
        <LoadingApplicationCard />
      </div>
    );
  }

  // Handle error state
  if (isError) {
    return (
      <div className={styles.errorState}>
        <p>Failed to load recent applications</p>
      </div>
    );
  }

  // Show empty state
  if (!applications || applications.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>No applications yet</p>
        <button className={styles.uploadButton} onClick={() => onStartAnalysis("upload")}>
          Start Your First Application
        </button>
      </div>
    );
  }

  // Transform the data to match the ApplicationCard interface
  const transformedApplications = applications.data.map((app) => ({
    id: app.id,
    company: app.companyName || "Unnamed Company",
    position: app.jobTitle || "Frontend Developer",
    status: app.status || "pending",
    timestamp: formatTimestamp(app.createdAt),
    matchRate: app.matchScore ? `${app.matchScore}%` : "Pending",
  }));

  // Show recent applications (limit to 3)
  const recentApplications = transformedApplications.slice(0, 3);

  console.log("Recent Applications:", JSON.stringify(recentApplications, null, 2));

  return (
    <div className={styles.recentOffersSection}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionTitle}>
          <FileText className={styles.sectionIcon} />
          <h2>Recent Applications</h2>
        </div>
        <button className={styles.viewAllButton} onClick={() => router.push("/dashboard/applications")}>
          View all
          <ArrowRight size={16} />
        </button>
      </div>
      <div className={styles.recentOffersList}>
        {recentApplications.map((application) => (
          <ApplicationCard key={application.id} application={application} />
        ))}
      </div>
    </div>
  );
};

// Helper function to format timestamp
function formatTimestamp(timestamp: any): string {
  if (!timestamp) return "Just now";

  // Handle Firestore timestamp format
  const date = timestamp._seconds ? new Date(timestamp._seconds * 1000) : new Date(timestamp);

  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 30) return `${diffDays}d ago`;

  return date.toLocaleDateString();
}
