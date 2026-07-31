import { categoryLabels, type EventCategory } from "@/lib/categoryColors";
import styles from "./CategoryBadge.module.css";

export default function CategoryBadge({ category }: { category: EventCategory }) {
  return (
    <span className={`label-mono ${styles.badge} ${styles[category]}`}>
      {categoryLabels[category]}
    </span>
  );
}
