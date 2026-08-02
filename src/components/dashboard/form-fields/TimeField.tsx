"use client";

import { useEffect, useRef, useState } from "react";
import { Clock } from "lucide-react";
import styles from "./form-fields.module.css";

const HOURS = Array.from({ length: 12 }, (_, i) => i + 1);
const MINUTES = Array.from({ length: 12 }, (_, i) => i * 5);

interface ParsedTime {
  hour: number;
  minute: number;
  period: "AM" | "PM";
}

function parseTime(value: string): ParsedTime {
  const match = value.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return { hour: 12, minute: 0, period: "PM" };
  return {
    hour: Number(match[1]),
    minute: Number(match[2]),
    period: match[3].toUpperCase() as "AM" | "PM",
  };
}

function formatTime({ hour, minute, period }: ParsedTime): string {
  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")} ${period}`;
}

interface TimeFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  className?: string;
  disabled?: boolean;
}

export default function TimeField({ label, value, onChange, required = false, className, disabled = false }: TimeFieldProps) {
  const parsed = parseTime(value);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const update = (patch: Partial<ParsedTime>) => {
    onChange(formatTime({ ...parsed, ...patch }));
  };

  return (
    <div className={`${styles.fieldGroup} ${className || ""}`}>
      <label className={styles.label}>
        {label} {required && <span className={styles.required}>*</span>}
      </label>
      <div className={styles.triggerWrapper} ref={wrapperRef}>
        <button
          type="button"
          disabled={disabled}
          onClick={() => setIsOpen((v) => !v)}
          className={`${styles.trigger} ${isOpen ? styles.triggerOpen : ""} ${disabled ? styles.triggerDisabled : ""}`}
        >
          <span className={`${styles.triggerValue} ${!value ? styles.triggerPlaceholder : ""}`}>
            {value || "Select time"}
          </span>
          <span className={`${styles.iconBadge} ${styles.iconBadgeSm}`}>
            <Clock size={13} />
          </span>
        </button>

        {isOpen && !disabled && (
          <div className={`${styles.popover} ${styles.timePopover}`}>
            <div className={styles.timeColumnHeaders}>
              <span>Hour</span>
              <span>Min</span>
              <span>Period</span>
            </div>
            <div className={styles.timeColumns}>
              <div className={styles.timeColumn}>
                {HOURS.map((h) => (
                  <button
                    key={h}
                    type="button"
                    onClick={() => update({ hour: h })}
                    className={`${styles.timeOption} ${parsed.hour === h ? styles.timeOptionActive : ""}`}
                  >
                    {String(h).padStart(2, "0")}
                  </button>
                ))}
              </div>
              <div className={styles.timeColumn}>
                {MINUTES.map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => update({ minute: m })}
                    className={`${styles.timeOption} ${parsed.minute === m ? styles.timeOptionActive : ""}`}
                  >
                    {String(m).padStart(2, "0")}
                  </button>
                ))}
              </div>
              <div className={styles.periodColumn}>
                {(["AM", "PM"] as const).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => update({ period: p })}
                    className={`${styles.timeOption} ${parsed.period === p ? styles.timeOptionActive : ""}`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
            <div className={styles.popoverFooter}>
              <button type="button" className={styles.popoverDoneBtn} onClick={() => setIsOpen(false)}>
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
