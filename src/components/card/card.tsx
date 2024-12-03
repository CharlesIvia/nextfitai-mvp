import React from "react";
import styles from "./card.module.css";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "highlight" | "warning";
  onClick?: () => void;
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  hoverable?: boolean;
}

const Card = ({
  children,
  className = "",
  variant = "default",
  onClick,
  title,
  subtitle,
  icon,
  action,
  hoverable = false,
}: CardProps) => {
  const cardClass = `
    ${styles.card} 
    ${styles[variant]} 
    ${hoverable ? styles.hoverable : ""} 
    ${onClick ? styles.clickable : ""} 
    ${className}
  `;

  return (
    <div className={cardClass} onClick={onClick}>
      {(title || subtitle || icon || action) && (
        <div className={styles.header}>
          <div className={styles.headerContent}>
            {icon && <div className={styles.icon}>{icon}</div>}
            <div className={styles.titles}>
              {title && <h3 className={styles.title}>{title}</h3>}
              {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
            </div>
          </div>
          {action && <div className={styles.action}>{action}</div>}
        </div>
      )}
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default Card;
