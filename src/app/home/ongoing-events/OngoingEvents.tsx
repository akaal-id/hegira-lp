"use client";

import { motion } from "motion/react";
import SectionHeading from "@/components/ui/section-heading/SectionHeading";
import EventCard from "@/components/ui/event-card/EventCard";
import { ongoingEvents } from "@/data/events";
import styles from "./OngoingEvents.module.css";

export default function OngoingEvents() {
  return (
    <section id="ongoing-events" className={styles.section}>
      <div className={styles.container}>
        <SectionHeading
          align="left"
          index="01"
          eyebrow="Live on Hegira"
          title="Happening right now"
          subtitle="A glimpse of the events live on the platform today."
        />

        <div className={styles.scrollRow}>
          {ongoingEvents.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.08 }}
            >
              <EventCard event={event} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
