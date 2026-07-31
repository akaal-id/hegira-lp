"use client";

import { useEffect, useRef, useState } from "react";
import { HelpCircle, Info, Mail, MessageCircle, X } from "lucide-react";
import styles from "./FloatingHelpButton.module.css";

const SUB_BUTTONS = [
  { label: "Help", icon: HelpCircle, tone: "turquoise" as const },
  { label: "Email us", icon: Mail, tone: "red" as const },
  { label: "WhatsApp", icon: MessageCircle, tone: "green" as const },
];

export default function FloatingHelpButton() {
  const [isOpen, setIsOpen] = useState(false);
  const fabRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (fabRef.current && !fabRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div ref={fabRef} className={styles.wrap}>
      {isOpen && (
        <div className={styles.subButtons}>
          {SUB_BUTTONS.map((btn) => (
            <button
              key={btn.label}
              type="button"
              onClick={() => setIsOpen(false)}
              className={styles.subButtonRow}
              aria-label={btn.label}
            >
              <span className={`label-mono ${styles.subLabel}`}>{btn.label}</span>
              <span className={`${styles.subIcon} ${styles[btn.tone]}`}>
                <btn.icon size={20} />
              </span>
            </button>
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close help menu" : "Open help menu"}
        className={styles.fab}
      >
        {isOpen ? <X size={24} /> : <Info size={24} />}
      </button>
    </div>
  );
}
