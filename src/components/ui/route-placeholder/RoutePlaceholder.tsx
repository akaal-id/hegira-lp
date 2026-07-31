import SectionHeading from "@/components/ui/section-heading/SectionHeading";
import styles from "./RoutePlaceholder.module.css";

interface RoutePlaceholderProps {
  eyebrow: string;
  title: string;
  body: string;
}

export default function RoutePlaceholder({ eyebrow, title, body }: RoutePlaceholderProps) {
  return (
    <section className={styles.section}>
      <div className={styles.content}>
        <SectionHeading eyebrow={eyebrow} title={title} subtitle={body} />
      </div>
    </section>
  );
}
