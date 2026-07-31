import type { ReactNode } from "react";
import styles from "./ShowcaseSection.module.css";

interface ShowcaseSectionProps {
  id: string;
  index: string;
  title: string;
  description?: string;
  children: ReactNode;
}

export default function ShowcaseSection({ id, index, title, description, children }: ShowcaseSectionProps) {
  return (
    <section id={id} className={styles.section}>
      <div className={`label-mono ${styles.eyebrowRow}`}>
        <span className={styles.index}>{index}</span>
        <span className={styles.dash}>—</span>
        <span className={styles.eyebrow}>{title}</span>
      </div>
      {description && <p className={styles.description}>{description}</p>}
      <div className={styles.stage}>{children}</div>
    </section>
  );
}
