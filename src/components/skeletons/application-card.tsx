import styles from "../../app/dashboard/dashboard.module.css";
import { FileText } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const LoadingApplicationCard = () => {
  return (
    <div className={styles.recentOfferCard}>
      <div className={styles.offerIcon}>
        <FileText size={20} />
      </div>
      <div className={styles.offerInfo}>
        <div className={styles.offerMain}>
          <h3>
            <Skeleton width={160} />
          </h3>
          <p>
            <Skeleton width={200} />
          </p>
          <p className={styles.matchRate}>
            <Skeleton width={80} />
          </p>
        </div>
        <div className={styles.offerMeta}>
          <span>
            <Skeleton width={100} />
          </span>
          <span className={styles.offerTime}>
            <Skeleton width={60} />
          </span>
        </div>
      </div>
    </div>
  );
};
