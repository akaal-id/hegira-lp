"use client";

import { AlertTriangle, HelpCircle } from "lucide-react";
import styles from "./ConfirmationModal.module.css";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  tone?: "default" | "destructive";
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  tone = "default",
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  const Icon = tone === "destructive" ? AlertTriangle : HelpCircle;

  return (
    <div className={styles.backdrop} role="dialog" aria-modal="true" aria-labelledby="confirmation-modal-title">
      <div className={`glass-panel ${styles.panel}`}>
        <div className={styles.header}>
          <span className={`${styles.iconWrap} ${tone === "destructive" ? styles.destructive : styles.default}`}>
            <Icon size={22} />
          </span>
          <div>
            <h2 id="confirmation-modal-title" className={styles.title}>
              {title}
            </h2>
            <p className={styles.description}>{description}</p>
          </div>
        </div>

        <div className={styles.actions}>
          <button type="button" onClick={onClose} className={`label-mono ${styles.cancel}`}>
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`label-mono ${styles.confirm} ${tone === "destructive" ? styles.confirmDestructive : ""}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
