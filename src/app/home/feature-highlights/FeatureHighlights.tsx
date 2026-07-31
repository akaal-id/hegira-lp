"use client";

import { motion } from "motion/react";
import SectionHeading from "@/components/ui/section-heading/SectionHeading";
import { featureHighlights } from "@/data/features";
import styles from "./FeatureHighlights.module.css";

const DOT_GRID_ACTIVE = [0, 3, 5, 6, 9, 10, 12, 15];

function FeatureSnippet({ id }: { id: string }) {
  if (id === "whitelabel") {
    return (
      <div aria-hidden="true" className={styles.whitelabelWrap}>
        <span className={`${styles.dot} ${styles.dotTurquoise}`} />
        <span className={`${styles.dot} ${styles.dotYellow}`} />
        <span className={`${styles.dot} ${styles.dotNavy}`} />
        <span className={styles.dotBar} />
      </div>
    );
  }
  if (id === "customizable-data") {
    return (
      <div aria-hidden="true" className={styles.dataWrap}>
        <span className={styles.barFull} />
        <span className={styles.barThreeQuarter} />
        <span className={styles.barAccent} />
      </div>
    );
  }
  if (id === "marketing-tools") {
    return (
      <div aria-hidden="true" className={styles.tagsWrap}>
        <span className={`label-mono ${styles.tag} ${styles.tagYellow}`}>PROMO20</span>
        <span className={`label-mono ${styles.tag} ${styles.tagTurquoise}`}>Referral</span>
        <span className={`label-mono ${styles.tag} ${styles.tagNavy}`}>Waitlist</span>
      </div>
    );
  }
  return (
    <div aria-hidden="true" className={styles.dotGridWrap}>
      {Array.from({ length: 16 }).map((_, i) => (
        <span
          key={i}
          className={`${styles.dotGridCell} ${
            DOT_GRID_ACTIVE.includes(i) ? styles.dotGridCellActive : styles.dotGridCellMuted
          }`}
        />
      ))}
    </div>
  );
}

export default function FeatureHighlights() {
  return (
    <section id="features" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.headerRow}>
          <SectionHeading
            align="left"
            index="03"
            eyebrow="Feature Highlights"
            title="Everything you need to run events"
          />
          <p className={styles.headerNote}>
            One dashboard, four core modules — ticketing, data, marketing, and
            event ops. No extra tools required.
          </p>
        </div>

        <div className={`rule ${styles.list}`}>
          {featureHighlights.map((feature, i) => (
            <motion.article
              key={feature.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.06 }}
              className={styles.row}
            >
              <span className={`label-mono ${styles.rowIndex}`}>{String(i + 1).padStart(2, "0")}</span>
              <div className={styles.textCol}>
                <h3 className={styles.title}>{feature.title}</h3>
                <p className={styles.body}>{feature.body}</p>
              </div>
              <div className={styles.snippetCol}>
                <FeatureSnippet id={feature.id} />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
