"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Check, ChevronDown } from "lucide-react";
import { type DashboardEvent } from "@/components/dashboard/mockData";
import styles from "./EventSwitcher.module.css";

function getInitial(name: string): string {
  return name.trim().charAt(0).toUpperCase() || "?";
}

interface EventSwitcherProps {
  events: DashboardEvent[];
  activeEventId: string;
  collapsed?: boolean;
  onNavigate?: () => void;
}

export default function EventSwitcher({
  events,
  activeEventId,
  collapsed = false,
  onNavigate,
}: EventSwitcherProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const activeEvent = events.find((e) => e.id === activeEventId);

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

  if (!activeEvent) return null;

  const handleSelect = (id: string) => {
    setIsOpen(false);
    onNavigate?.();
    router.push(`/dashboard/events/${id}`);
  };

  const handleBack = () => {
    setIsOpen(false);
    onNavigate?.();
    router.push("/dashboard");
  };

  return (
    <div className={styles.wrap}>
      <button
        type="button"
        onClick={handleBack}
        title="Back to Event List"
        className={`${styles.backButton} ${collapsed ? styles.backButtonCollapsed : ""}`}
      >
        <ArrowLeft size={15} className={styles.backIcon} />
        {!collapsed && <span className={styles.backLabel}>Back to Event List</span>}
      </button>

      <div className={styles.switcherWrapper} ref={wrapperRef}>
        <button
          type="button"
          onClick={() => setIsOpen((v) => !v)}
          title={collapsed ? activeEvent.name : undefined}
          className={`${styles.trigger} ${collapsed ? styles.triggerCollapsed : ""} ${isOpen ? styles.triggerOpen : ""}`}
        >
          <span className={styles.avatar}>{getInitial(activeEvent.name)}</span>
          {!collapsed && (
            <span className={styles.triggerName}>{activeEvent.name}</span>
          )}
          {!collapsed && <ChevronDown size={14} className={styles.chevron} />}
        </button>

        {isOpen && (
          <div className={styles.panel}>
            <span className={styles.panelLabel}>Switch Event</span>
            <div className={styles.panelList}>
              {events.map((event) => (
                <button
                  key={event.id}
                  type="button"
                  onClick={() => handleSelect(event.id)}
                  className={`${styles.panelItem} ${event.id === activeEventId ? styles.panelItemActive : ""}`}
                >
                  <span className={styles.avatar}>{getInitial(event.name)}</span>
                  <span className={styles.panelItemName}>{event.name}</span>
                  {event.id === activeEventId && <Check size={14} className={styles.checkIcon} />}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
