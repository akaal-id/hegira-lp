"use client";

import { useEffect, useRef, useState } from "react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./form-fields.module.css";

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function parseIsoDate(value: string): Date | null {
  if (!value) return null;
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return null;
  return new Date(year, month - 1, day);
}

function toIsoDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatDisplay(date: Date): string {
  return `${date.getDate()} ${MONTH_NAMES[date.getMonth()].slice(0, 3)} ${date.getFullYear()}`;
}

function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

interface DateFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  className?: string;
}

export default function DateField({ label, value, onChange, required = false, className }: DateFieldProps) {
  const selected = parseIsoDate(value);
  const [isOpen, setIsOpen] = useState(false);
  const [viewMonth, setViewMonth] = useState(() => selected || new Date());
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

  const openPicker = () => {
    setViewMonth(selected || new Date());
    setIsOpen(true);
  };

  const today = new Date();
  const firstOfMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), 1);
  const startWeekday = firstOfMonth.getDay();
  const daysInMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 0).getDate();
  const daysInPrevMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), 0).getDate();

  const cells: { date: Date; muted: boolean }[] = [];
  for (let i = startWeekday - 1; i >= 0; i--) {
    cells.push({ date: new Date(viewMonth.getFullYear(), viewMonth.getMonth() - 1, daysInPrevMonth - i), muted: true });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ date: new Date(viewMonth.getFullYear(), viewMonth.getMonth(), d), muted: false });
  }
  while (cells.length % 7 !== 0) {
    const last = cells[cells.length - 1].date;
    const next = new Date(last);
    next.setDate(last.getDate() + 1);
    cells.push({ date: next, muted: true });
  }

  return (
    <div className={`${styles.fieldGroup} ${className || ""}`}>
      <label className={styles.label}>
        {label} {required && <span className={styles.required}>*</span>}
      </label>
      <div className={styles.triggerWrapper} ref={wrapperRef}>
        <button
          type="button"
          onClick={() => (isOpen ? setIsOpen(false) : openPicker())}
          className={`${styles.trigger} ${isOpen ? styles.triggerOpen : ""}`}
        >
          <span className={`${styles.triggerValue} ${!selected ? styles.triggerPlaceholder : ""}`}>
            {selected ? formatDisplay(selected) : "Select date"}
          </span>
          <span className={`${styles.iconBadge} ${styles.iconBadgeSm}`}>
            <Calendar size={13} />
          </span>
        </button>

        {isOpen && (
          <div className={`${styles.popover} ${styles.calendar}`}>
            <div className={styles.calendarHeader}>
              <button
                type="button"
                className={styles.calendarNavBtn}
                onClick={() => setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() - 1, 1))}
              >
                <ChevronLeft size={16} />
              </button>
              <span className={styles.calendarMonthLabel}>
                {MONTH_NAMES[viewMonth.getMonth()]} {viewMonth.getFullYear()}
              </span>
              <button
                type="button"
                className={styles.calendarNavBtn}
                onClick={() => setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 1))}
              >
                <ChevronRight size={16} />
              </button>
            </div>

            <div className={styles.calendarWeekRow}>
              {WEEKDAYS.map((wd) => (
                <span key={wd} className={styles.calendarWeekday}>{wd}</span>
              ))}
            </div>

            <div className={styles.calendarGrid}>
              {cells.map(({ date, muted }, i) => {
                const isActive = selected ? isSameDay(date, selected) : false;
                const isToday = isSameDay(date, today);
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      onChange(toIsoDate(date));
                      setIsOpen(false);
                    }}
                    className={`${styles.calendarDay} ${muted ? styles.calendarDayMuted : ""} ${
                      isToday ? styles.calendarDayToday : ""
                    } ${isActive ? styles.calendarDayActive : ""}`}
                  >
                    {date.getDate()}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
