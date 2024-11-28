import Link from "next/link";
import styles from "./footer.module.css";
import { discord, instagram, twitter } from "@/utils/icons";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.copy}>
        <p>&copy; NextFit AI </p>
      </div>
      <div className={styles.socials}>
        <a href='#'>
          <span>{discord}</span>
        </a>
        <a href='#'>
          <span>{twitter}</span>
        </a>
        <a href='#'>
          <span>{instagram}</span>
        </a>
      </div>

      <div className={styles.links}>
        <Link href='/terms'>Terms of Use</Link>
        <Link href='/privacy'>Privacy Policy</Link>
      </div>
    </footer>
  );
}
