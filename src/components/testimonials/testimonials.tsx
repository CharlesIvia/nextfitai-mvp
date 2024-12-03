// components/testimonials/testimonials.tsx
import styles from "./testimonials.module.css";
import { siteConfig } from "@/configs/site";
import { User } from "lucide-react"; // Using lucide-react's User icon

export default function Testimonials() {
  return (
    <section className={styles.testimonials}>
      <h2>What our users say</h2>
      <div className={styles.testimonialGrid}>
        {siteConfig.testimonials.map((testimonial, index) => (
          <div key={index} className={styles.testimonialCard}>
            <div className={styles.quote}>{testimonial.quote}</div>
            <div className={styles.author}>
              <div className={styles.avatarContainer}>
                <User size={24} className={styles.avatarIcon} />
              </div>
              <div className={styles.authorInfo}>
                <div className={styles.name}>{testimonial.name}</div>
                <div className={styles.role}>{testimonial.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
