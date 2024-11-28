// components/button/button.tsx
import styles from "./button.module.css";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "blue" | "purple" | "outline";
  size?: "small" | "medium" | "large";
  isLoading?: boolean;
  icon?: ReactNode;
  children: ReactNode;
}

export function Button({
  variant = "primary",
  size = "medium",
  isLoading = false,
  icon,
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        ${styles.button}
        ${styles[`button${variant.charAt(0).toUpperCase()}${variant.slice(1)}`]}
        ${styles[`button${size.charAt(0).toUpperCase()}${size.slice(1)}`]}
        ${isLoading ? styles.buttonLoading : ""}
        ${icon ? styles.buttonIcon : ""}
        ${className || ""}
      `}
      disabled={isLoading}
      {...props}
    >
      {children}
      {icon && !isLoading && icon}
    </button>
  );
}
