import styles from "./navbar.module.css";
import Link from "next/link";
import { useState, useEffect } from "react";
import { TrendingUp } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const handleSectionClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();

    // If we're on the home page
    if (window.location.pathname === "/") {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        setIsMenuOpen(false);
      }
    } else {
      // Navigate to home page with the section hash
      router.push(`/#${sectionId}`);
    }
  };

  // Handle hash navigation after page load
  useEffect(() => {
    if (window.location.hash) {
      const sectionId = window.location.hash.slice(1);
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, []);

  return (
    <nav className={styles.navbar}>
      <Link href='/' className={styles.logo}>
        <div className={styles.logoIcon}>
          <TrendingUp />
        </div>
        <span>NextFit AI</span>
      </Link>

      {/* Mobile Menu Button */}
      <button
        className={`${styles.menuButton} ${isMenuOpen ? styles.open : ""}`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Navigation Links */}
      <div className={`${styles.links} ${isMenuOpen ? styles.open : ""}`}>
        <div className={styles.navLinks}>
          <a href='#how-it-works' onClick={(e) => handleSectionClick(e, "how-it-works")}>
            How It Works
          </a>
          <a href='#faqs' onClick={(e) => handleSectionClick(e, "faqs")}>
            FAQs
          </a>
          <a href='#pricing' onClick={(e) => handleSectionClick(e, "pricing")}>
            Pricing
          </a>
        </div>
        <div className={styles.authLinks}>
          <Link href='/login' className={styles.login}>
            Log in
          </Link>
          <Link href='/get-started' className={styles.started}>
            <span>Get Started</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
