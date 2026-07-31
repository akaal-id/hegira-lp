import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./DashboardButton.module.css";

export type DashboardButtonVariant =
  | "primary"
  | "secondary"
  | "danger"
  | "ghost"
  | "filter";

export type DashboardButtonSize = "sm" | "md" | "lg";

interface DashboardButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style. Defaults to "primary". */
  variant?: DashboardButtonVariant;
  /** Size token. Defaults to "md". */
  size?: DashboardButtonSize;
  /** Stretch to full container width. */
  fill?: boolean;
  /** Whether this filter-variant button is in its active/selected state. */
  active?: boolean;
  /** Optional leading icon element. */
  icon?: ReactNode;
  children?: ReactNode;
}

/**
 * DashboardButton
 *
 * The action button used throughout the organizer dashboard.
 * Intentionally separate from the marketing-site `Button` component.
 *
 * Variants: primary | secondary | danger | ghost | filter
 * Sizes: sm | md | lg
 */
export default function DashboardButton({
  variant = "primary",
  size = "md",
  fill = false,
  active = false,
  icon,
  children,
  className = "",
  ...rest
}: DashboardButtonProps) {
  const cls = [
    styles.btn,
    styles[size],
    styles[variant],
    variant === "filter" && active ? styles.filterActive : "",
    fill ? styles.fill : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button type="button" className={cls} {...rest}>
      {icon && <span className={styles.icon} aria-hidden>{icon}</span>}
      {children}
    </button>
  );
}
