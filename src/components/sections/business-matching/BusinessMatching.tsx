"use client";

import { motion } from "motion/react";
import SectionHeading from "@/components/ui/section-heading/SectionHeading";
import NetworkGraphic from "@/components/ui/network-graphic/NetworkGraphic";
import styles from "./BusinessMatching.module.css";

export default function BusinessMatching() {
  return (
    <section id="business-matching" data-surface="dark" className={styles.section}>
      <div aria-hidden="true" className={`bg-grid ${styles.gridBg}`} />
      <div aria-hidden="true" className={styles.orbWrap}>
        <span className={`glow-orb glow-orb-yellow ${styles.orbPrimary}`} />
        <span className={`glow-orb glow-orb-turquoise ${styles.orbSecondary}`} />
      </div>

      <div className={styles.container}>
        <div className={styles.layout}>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={styles.textCol}
          >
            <SectionHeading
              light
              align="left"
              index="04"
              eyebrow="Coming Soon"
              title="Beyond tickets: Business Matching"
            />
            <p className={styles.body}>
              Hegira is expanding beyond events into Business Matching — a
              dedicated platform for connecting organizers, sponsors,
              exhibitors, and government partners. Where Hegira Events powers
              how you run an event, Hegira Business Matching powers who you
              meet there — turning attendee lists into real business
              relationships for B2B and B2G organizers.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className={styles.graphicCol}
          >
            <NetworkGraphic />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
