"use client";

import { useState } from "react";
import { Edit3, Trash2 } from "lucide-react";
import StatusBadge, { type StatusTone } from "@/components/ui/status-badge/StatusBadge";
import ConfirmationModal from "@/components/ui/confirmation-modal/ConfirmationModal";
import ProgressRing from "@/components/dashboard/progress-ring/ProgressRing";
import CopyableText from "@/components/ui/copyable-text/CopyableText";
import styles from "./CouponItemCard.module.css";

export interface CouponItemData {
  id: string;
  code: string;
  eventName: string;
  discountLabel: string;
  quota: number;
  used: number;
  validity: string;
  status: { label: string; tone: StatusTone };
}

interface CouponItemCardProps {
  coupon: CouponItemData;
  onEdit?: () => void;
  onDelete?: () => void;
}

const TONE_COLOR: Record<StatusTone, string> = {
  positive: "#2f8f5b",
  warning: "var(--color-hegra-yellow)",
  negative: "#c94f4f",
  neutral: "#9ca3af",
};

export default function CouponItemCard({ coupon, onEdit, onDelete }: CouponItemCardProps) {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const usedPct = coupon.quota > 0 ? Math.min(100, Math.round((coupon.used / coupon.quota) * 100)) : 0;
  const toneColor = TONE_COLOR[coupon.status.tone];

  const metaParts = [coupon.eventName, coupon.discountLabel, `Valid until ${coupon.validity}`].filter(Boolean);

  return (
    <>
      <div className={`glass-panel ${styles.card}`}>
        <div className={styles.body}>
          <div className={styles.headRow}>
            <ProgressRing
              pct={usedPct}
              color={toneColor}
              className={styles.ring}
              trackClassName={styles.ringTrack}
              fillClassName={styles.ringFill}
              textClassName={styles.ringText}
            />

            <div className={styles.titleGroup}>
              <h3 className={styles.title}>{coupon.code}</h3>
              <p className={`label-mono ${styles.metaLine}`}>{metaParts.join(" · ")}</p>
            </div>

            <div className={styles.actions}>
              <button type="button" aria-label={`Edit ${coupon.code}`} onClick={onEdit} className={styles.actionEdit}>
                <Edit3 size={14} />
              </button>
              <button
                type="button"
                aria-label={`Delete ${coupon.code}`}
                onClick={() => setIsDeleteOpen(true)}
                className={styles.actionDelete}
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>

          <div className={styles.statsRow}>
            <span className={styles.statsLabel}>Used</span>
            <span className={styles.statsValue}>
              {coupon.used.toLocaleString("id-ID")}
              <span className={styles.statsValueSuffix}> / {coupon.quota.toLocaleString("id-ID")}</span>
            </span>
            <StatusBadge label={coupon.status.label} tone={coupon.status.tone} />
          </div>
        </div>

        <div className={styles.footer}>
          <span className="label-mono">Coupon Code</span>
          <CopyableText value={coupon.code} />
        </div>
      </div>

      <ConfirmationModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={() => {
          onDelete?.();
          setIsDeleteOpen(false);
        }}
        title={`Delete "${coupon.code}"?`}
        description="This coupon will be permanently removed. This action cannot be undone."
        confirmLabel="Yes, delete"
        tone="destructive"
      />
    </>
  );
}
