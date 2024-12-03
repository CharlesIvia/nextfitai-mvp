import styles from "./header.module.css";
import { TrendingUp, Settings, User } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  const handleSettingsClick = () => {
    router.push("/dashboard/settings");
  };

  const handleProfileClick = () => {
    router.push("/dashboard/profile");
  };

  const handleLogoClick = () => {
    router.push("/dashboard");
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo} onClick={handleLogoClick}>
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
  );
}
