"use client";

import { motion } from "motion/react";
import SectionHeading from "@/components/ui/section-heading/SectionHeading";
import styles from "./AboutHegira.module.css";

const STATS = [
  { value: "1,200+", label: "Events Hosted" },
  { value: "150K+", label: "Tickets Sold" },
  { value: "300+", label: "Organizers" },
];

export default function AboutHegira() {
  return (
    <section id="about" className={styles.section}>
      <div aria-hidden="true" className={`bg-grid ${styles.gridBg}`} />
      <span aria-hidden="true" className={`glow-orb glow-orb-turquoise ${styles.orb}`} />

      <div className={styles.container}>
        <div className={styles.layout}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={styles.textCol}
          >
            <SectionHeading
              align="left"
              index="02"
              eyebrow="About Hegira"
              title="Built for every kind of event"
            />
            <p className={styles.body}>
              Hegira is an integrated event platform built for organizers who run
              everything from community meetups to government conferences. One
              dashboard for ticketing, attendee management, and promotion — no
              more juggling five different tools.
            </p>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
            className={`glass-panel ${styles.statsPanel}`}
          >
            {STATS.map((stat) => (
              <div key={stat.label} className={styles.statRow}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className={styles.statValue}>{stat.value}</dd>
                <span className={`label-mono ${styles.statLabel}`}>{stat.label}</span>
              </div>
            ))}
          </motion.dl>
        </div>
      </div>
    </section>
  );
}
