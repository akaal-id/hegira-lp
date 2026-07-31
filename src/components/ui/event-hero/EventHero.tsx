"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ongoingEvents } from "@/data/events";
import styles from "./EventHero.module.css";

const SLIDE_DURATION = 5000;

export default function EventHero() {
  const slideCount = ongoingEvents.length;
  const hasMultipleSlides = slideCount > 1;
  const extendedSlides = hasMultipleSlides
    ? [...ongoingEvents, ...ongoingEvents, ...ongoingEvents]
    : ongoingEvents;

  const [trackIndex, setTrackIndex] = useState(hasMultipleSlides ? slideCount : 0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const timeoutRef = useRef<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const activeIndex = hasMultipleSlides ? trackIndex % slideCount : 0;

  const goToSlide = useCallback(
    (index: number) => {
      if (!hasMultipleSlides) return;
      setTrackIndex(slideCount + index);
    },
    [hasMultipleSlides, slideCount]
  );

  const goToPrevious = () => {
    if (!hasMultipleSlides) return;
    setTrackIndex((current) => current - 1);
  };

  const goToNext = () => {
    if (!hasMultipleSlides) return;
    setTrackIndex((current) => current + 1);
  };

  const resetTrackPosition = useCallback(() => {
    setTrackIndex((current) => {
      if (current < slideCount) return current + slideCount;
      if (current >= slideCount * 2) return current - slideCount;
      return current;
    });
  }, [slideCount]);

  useEffect(() => {
    if (!hasMultipleSlides) return;
    const track = trackRef.current;
    if (!track) return;

    const needsReset = trackIndex < slideCount || trackIndex >= slideCount * 2;
    if (!needsReset) return;

    const handleTransitionEnd = (event: TransitionEvent) => {
      if (event.target !== track || event.propertyName !== "transform") return;
      setIsTransitioning(false);
      resetTrackPosition();
    };

    track.addEventListener("transitionend", handleTransitionEnd);
    return () => track.removeEventListener("transitionend", handleTransitionEnd);
  }, [trackIndex, hasMultipleSlides, slideCount, resetTrackPosition]);

  useEffect(() => {
    if (!hasMultipleSlides || isTransitioning) return;
    const frameId = window.requestAnimationFrame(() => setIsTransitioning(true));
    return () => window.cancelAnimationFrame(frameId);
  }, [isTransitioning, hasMultipleSlides]);

  useEffect(() => {
    if (!hasMultipleSlides) return;

    timeoutRef.current = window.setTimeout(() => {
      setTrackIndex((current) => current + 1);
    }, SLIDE_DURATION);

    return () => {
      if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current);
    };
  }, [activeIndex, hasMultipleSlides]);

  if (slideCount === 0) return null;

  return (
    <div className={styles.stage}>
      <div
        ref={trackRef}
        className={`${styles.track} ${!isTransitioning ? styles.trackInstant : ""}`}
        style={{ "--active-index": trackIndex } as React.CSSProperties}
      >
        {extendedSlides.map((event, index) => {
          const isActive = index === trackIndex;
          return (
            <div
              key={`${event.id}-${index}`}
              className={`${styles.slide} ${isActive ? styles.slideActive : ""}`}
              role="img"
              aria-label={`${event.name}, ${event.date}, ${event.city}`}
              aria-hidden={!isActive}
            >
              <Image
                src={event.image}
                alt=""
                fill
                priority={isActive}
                quality={90}
                className={styles.slideImage}
                sizes="(max-width: 640px) 90vw, 900px"
              />
            </div>
          );
        })}
      </div>

      {hasMultipleSlides && (
        <div className={styles.controls}>
          <button
            type="button"
            className={styles.navButton}
            onClick={goToPrevious}
            aria-label="Previous event"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M15 6l-6 6 6 6" />
            </svg>
          </button>

          <div className={styles.dots} role="tablist" aria-label="Event slides">
            {ongoingEvents.map((event, index) => (
              <button
                key={`dot-${event.id}`}
                type="button"
                role="tab"
                className={`${styles.dot} ${index === activeIndex ? styles.dotActive : ""}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to ${event.name}`}
                aria-selected={index === activeIndex}
              />
            ))}
          </div>

          <button
            type="button"
            className={styles.navButton}
            onClick={goToNext}
            aria-label="Next event"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
