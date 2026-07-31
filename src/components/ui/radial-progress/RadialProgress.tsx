import styles from "./RadialProgress.module.css";

interface RadialProgressProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  tone?: "turquoise" | "yellow";
}

export default function RadialProgress({
  percentage,
  size = 56,
  strokeWidth = 5,
  tone = "turquoise",
}: RadialProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.min(100, Math.max(0, percentage));
  const offset = circumference - (clamped / 100) * circumference;

  return (
    <div className={styles.wrap} style={{ width: size, height: size }}>
      <svg width={size} height={size} className={styles.svg}>
        <circle
          className={styles.track}
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className={tone === "yellow" ? styles.progressYellow : styles.progressTurquoise}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      <span className={styles.value} style={{ fontSize: Math.max(9, size / 4.5) }}>
        {Math.round(clamped)}%
      </span>
    </div>
  );
}
