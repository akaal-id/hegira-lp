"use client";

import { ArrowRight, Calendar, User } from "lucide-react";
import styles from "./ArticleCard.module.css";

interface ArticleCardProps {
  imageUrl: string;
  category: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  onSelect?: () => void;
}

export default function ArticleCard({
  imageUrl,
  category,
  title,
  excerpt,
  author,
  date,
  onSelect,
}: ArticleCardProps) {
  return (
    <article className={`glass-panel ${styles.card}`}>
      <div className={styles.imageWrap}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imageUrl} alt="" className={styles.image} />
        <span className={`label-mono ${styles.category}`}>{category}</span>
      </div>

      <div className={styles.body}>
        <h3 className={styles.title} onClick={onSelect}>
          {title}
        </h3>
        <p className={styles.excerpt}>{excerpt}</p>

        <div className={`label-mono ${styles.meta}`}>
          <span className={styles.metaRow}>
            <User size={13} /> {author}
          </span>
          <span className={styles.metaRow}>
            <Calendar size={13} /> {date}
          </span>
        </div>

        <button type="button" onClick={onSelect} className={`label-mono ${styles.readMore}`}>
          Read article
          <ArrowRight size={14} className={styles.readMoreArrow} />
        </button>
      </div>
    </article>
  );

}
