"use client";

import { AlertTriangle, CheckCircle, Info, X, XCircle } from "lucide-react";
import styles from "./Toast.module.css";

export type ToastType = "success" | "error" | "info" | "warning";

export interface ToastItem {
  id: string;
  type: ToastType;
  title: string;
  message: string;
}

const ICONS: Record<ToastType, typeof CheckCircle> = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
};

interface ToastProps {
  items: ToastItem[];
  onDismiss?: (id: string) => void;
}

export default function Toast({ items, onDismiss }: ToastProps) {
  return (
    <div className={styles.stack}>
      {items.map((item) => {
        const Icon = ICONS[item.type];
        return (
          <div key={item.id} className={`${styles.toast} ${styles[item.type]}`}>
            <Icon size={18} className={styles.icon} />
            <div className={styles.body}>
              <p className={styles.title}>{item.title}</p>
              <p className={styles.message}>{item.message}</p>
            </div>
            <button
              type="button"
              onClick={() => onDismiss?.(item.id)}
              aria-label="Dismiss"
              className={styles.close}
            >
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
