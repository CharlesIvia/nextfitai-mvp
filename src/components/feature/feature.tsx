// feature.tsx
import React from "react";
import styles from "./feature.module.css";
import { StaticImageData } from "next/image";
import Image from "next/image";

type StatItem = {
  value: string;
  label: string;
};

type FeatureProps = {
  bgColor?: string;
  featureIcon: string | StaticImageData;
  title: string;
  description: string;
  stats?: string[]; // Array of stat strings
  fillColor?: string;
  titleColor?: string;
  textColor?: string;
  highlight?: boolean;
  isDark?: boolean;
};

export default function Feature({
  bgColor,
  featureIcon,
  title,
  description,
  stats,
  fillColor,
  titleColor,
  textColor,
  highlight = false,
  isDark = false,
}: FeatureProps) {
  return (
    <div className={`${styles.feature} ${highlight ? styles.highlight : ""}`} style={{ backgroundColor: bgColor }}>
      <div className={styles.featureContent}>
        <span className={styles.icon} style={{ fill: fillColor }}>
          <Image src={featureIcon} alt={title} height={50} width={50} />
        </span>
        <h3 className={styles.title} style={{ color: titleColor }}>
          {title}
        </h3>
        <p className={styles.description} style={{ color: textColor }}>
          {description}
        </p>
        {stats && (
          <div className={!isDark ? styles.statsContainerDark : styles.statsContainer}>
            {stats.map((stat, index) => (
              <div key={index} className={isDark ? styles.statDark : styles.stat}>
                <span className={styles.statBullet} style={{ backgroundColor: fillColor }}></span>
                {stat}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className={styles.hoverEffect}></div>
    </div>
  );
}
