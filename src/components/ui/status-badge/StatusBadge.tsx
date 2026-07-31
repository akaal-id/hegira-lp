import styles from "./StatusBadge.module.css";

export type StatusTone = "positive" | "warning" | "negative" | "neutral";

interface StatusBadgeProps {
  label: string;
  tone: StatusTone;
}

const toneClass: Record<StatusTone, string> = {
  positive: styles.positive,
  warning: styles.warning,
  negative: styles.negative,
  neutral: styles.neutral,
};

export default function StatusBadge({ label, tone }: StatusBadgeProps) {
  return (
    <span className={`label-mono ${styles.badge} ${styles[`badge_${tone}`]}`}>
      <span className={`${styles.dot} ${toneClass[tone]}`} aria-hidden="true" />
      <span className={toneClass[tone]}>{label}</span>
    </span>
  );
}
