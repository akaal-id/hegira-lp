"use client";

import { motion } from "motion/react";
import Button from "@/components/ui/button/Button";
import EventHero from "@/components/ui/event-hero/EventHero";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.section}>
      <div aria-hidden="true" className={`bg-grid ${styles.gridBg}`} />
      <div aria-hidden="true" className={styles.orbWrap}>
        <span className={`glow-orb glow-orb-yellow ${styles.orbPrimary}`} />
        <span className={`glow-orb glow-orb-turquoise ${styles.orbSecondary}`} />
      </div>
      <div aria-hidden="true" className={styles.fadeBottom} />

      <div className={styles.content}>
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={`label-mono ${styles.eyebrow}`}
        >
          The Integrated Event Platform
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          className={styles.title}
        >
          Empowering Your
          <br />
          <span className={styles.titleEm}>Event Ecosystem</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          className={styles.subtitle}
        >
          Hegira gives organizers everything to sell tickets, manage
          attendees, and grow their events — with a whitelabel experience
          that feels entirely your own.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
          className={styles.actions}
        >
          <Button href="#">Start Free</Button>
          <Button href="#features" variant="ghost">
            See how it works
          </Button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className={styles.mockupWrap}
      >
        <EventHero />
      </motion.div>
    </section>
  );
}
