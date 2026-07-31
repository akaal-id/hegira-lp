import type { OngoingEvent } from "@/data/events";
import type { EventCategory } from "@/lib/categoryColors";
import CategoryBadge from "@/components/ui/category-badge/CategoryBadge";
import styles from "./EventCard.module.css";

const ICON_CLASS: Record<EventCategory, string> = {
  b2c: styles.iconB2c,
  b2b: styles.iconB2b,
  b2g: styles.iconB2g,
};

export default function EventCard({ event }: { event: OngoingEvent }) {
  return (
    <article className={`glass-panel ${styles.card}`}>
      <div aria-hidden="true" className={`${styles.icon} ${ICON_CLASS[event.category]}`}>
        {event.initial}
      </div>

      <div className={styles.body}>
        <CategoryBadge category={event.category} />
        <h3 className={styles.name}>{event.name}</h3>
        <p className={styles.meta}>
          {event.date} · {event.city}
        </p>
      </div>
    </article>
  );
}
