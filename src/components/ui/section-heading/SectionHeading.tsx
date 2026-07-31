import styles from "./SectionHeading.module.css";

interface SectionHeadingProps {
  index?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;
}

export default function SectionHeading({
  index,
  eyebrow,
  title,
  subtitle,
  align = "center",
  light = false,
}: SectionHeadingProps) {
  const alignClass = align === "center" ? styles.alignCenter : styles.alignLeft;

  return (
    <div className={`${styles.wrap} ${alignClass}`}>
      {(index || eyebrow) && (
        <div className={`label-mono ${styles.eyebrowRow}`}>
          {index && <span className={light ? styles.indexLight : styles.index}>{index}</span>}
          {index && eyebrow && <span className={light ? styles.dashLight : styles.dash}>—</span>}
          {eyebrow && <span className={light ? styles.eyebrowLight : styles.eyebrow}>{eyebrow}</span>}
        </div>
      )}
      <h2 className={`${styles.title} ${light ? styles.titleLight : ""}`}>{title}</h2>
      {subtitle && (
        <p className={`${styles.subtitle} ${light ? styles.subtitleLight : ""}`}>{subtitle}</p>
      )}
    </div>
  );
}
