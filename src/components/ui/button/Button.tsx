import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: "solid" | "ghost";
  fill?: boolean;
}

export default function Button({
  href,
  children,
  variant = "solid",
  fill = false,
}: ButtonProps) {
  const variantClass = variant === "ghost" ? styles.ghost : styles.solid;

  return (
    <Link href={href} className={`label-mono ${variantClass} ${fill ? styles.fill : ""}`}>
      {children}
      <svg
        aria-hidden="true"
        className={styles.arrow}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M7 17 17 7M7 7h10v10" />
      </svg>
    </Link>
  );
}
