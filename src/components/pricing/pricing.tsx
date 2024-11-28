// components/pricing-card/pricing-card.tsx

import styles from "./pricing.module.css";

type PricingTier = {
  name: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  ctaText?: string;
  disabled?: boolean;
};

interface PricingCardProps extends PricingTier {
  onSelectPlan?: () => void;
}

export default function PricingCard({
  name,
  price,
  description,
  features,
  isPopular = false,
  ctaText = "Get Started",
  disabled,
  onSelectPlan,
}: PricingCardProps) {
  return (
    <div className={`${styles.pricingCard} ${isPopular ? styles.popular : ""}`}>
      {isPopular && <div className={styles.popularBadge}>Most Popular</div>}

      <div className={styles.cardHeader}>
        <h3>{name}</h3>
        <div className={styles.price}>
          <span className={styles.amount}>${price}</span>
          <span className={styles.period}>/month</span>
        </div>
        <p>{description}</p>
      </div>

      <ul className={styles.features}>
        {features.map((feature, index) => (
          <li key={index}>
            <span className={styles.checkmark}>✓</span>
            {feature}
          </li>
        ))}
      </ul>

      <button
        className={`${styles.pricingButton} ${isPopular ? styles.popularButton : ""}`}
        onClick={onSelectPlan}
        disabled={disabled}
      >
        {ctaText}
      </button>
    </div>
  );
}
