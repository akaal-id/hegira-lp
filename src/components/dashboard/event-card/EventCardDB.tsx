"use client";

import { ArrowRight, CalendarDays, Clock, Eye, MapPin } from "lucide-react";
import StatusBadge, { type StatusTone } from "@/components/ui/status-badge/StatusBadge";
import styles from "./EventCardDB.module.css";

export interface EventCardDBData {
  id: string;
  name: string;
  coverImageUrl: string;
  status: string;
  statusTone: StatusTone;
  date: string;
  time: string;
  address: string;
}

interface EventCardDBProps {
  event: EventCardDBData;
  onView?: () => void;
}

export default function EventCardDB({ event, onView }: EventCardDBProps) {
  return (
    <article className={styles.card}>
      <div className={styles.imageWrap}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={event.coverImageUrl} alt="" className={styles.image} />
      </div>

      <div className={styles.body}>
        <div className={styles.headRow}>
          <h3 className={styles.title} title={event.name}>
            {event.name}
          </h3>
          <StatusBadge label={event.status} tone={event.statusTone} />
        </div>

        <div className={styles.meta}>
          <span className={styles.metaRow}>
            <CalendarDays size={14} /> {event.date}
          </span>
          <span className={styles.metaRow}>
            <Clock size={14} /> {event.time}
          </span>
          <span className={styles.metaRow}>
            <MapPin size={14} /> {event.address}
          </span>
        </div>

        <button type="button" onClick={onView} className={styles.viewButton}>
          <Eye size={15} /> View event
          <ArrowRight size={14} className={styles.viewArrow} />
        </button>
      </div>
    </article>
  );
}
