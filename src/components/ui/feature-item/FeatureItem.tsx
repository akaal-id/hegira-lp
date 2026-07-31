import type { ElementType } from "react";
import styles from "./FeatureItem.module.css";

interface FeatureItemProps {
  icon: ElementType;
  title: string;
  description: string;
  tone?: "turquoise" | "yellow";
}

export default function FeatureItem({ icon: Icon, title, description, tone = "turquoise" }: FeatureItemProps) {
  return (
    <div className={`glass-panel ${styles.card}`}>
      <div className={`${styles.iconWrap} ${tone === "yellow" ? styles.yellow : styles.turquoise}`}>
        <Icon size={22} />
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </div>
  );
}
