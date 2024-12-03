// components/faq/faq.tsx
import { useState } from "react";
import styles from "./faqs.module.css";
import { siteConfig } from "@/configs/site";
import { ChevronDown } from "lucide-react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={styles.faq}>
      <h2>Frequently Asked Questions</h2>
      <div className={styles.faqGrid}>
        {siteConfig.faqs.map((faq, index) => (
          <div
            key={index}
            className={`${styles.faqItem} ${openIndex === index ? styles.active : ""}`}
            onClick={() => toggleFAQ(index)}
          >
            <div className={styles.faqQuestion}>
              <h3>{faq.question}</h3>
              <ChevronDown className={`${styles.icon} ${openIndex === index ? styles.iconActive : ""}`} />
            </div>
            <div className={`${styles.faqAnswer} ${openIndex === index ? styles.show : ""}`}>{faq.answer}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
