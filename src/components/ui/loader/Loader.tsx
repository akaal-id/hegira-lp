import styles from "./Loader.module.css";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
  overlay?: boolean;
  label?: string;
  className?: string;
}

const sizeClass = {
  sm: styles.sm,
  md: styles.md,
  lg: styles.lg,
};

export default function Loader({ size = "md", overlay = false, label, className = "" }: LoaderProps) {
  const spinner = (
    <div className={styles.stack}>
      <span className={`${styles.spinner} ${sizeClass[size]} ${className}`} role="status">
        <span className="sr-only">Loading…</span>
      </span>
      {label && <p className={`label-mono ${styles.label}`}>{label}</p>}
    </div>
  );

  if (!overlay) return spinner;

  return <div className={styles.overlay}>{spinner}</div>;
}
