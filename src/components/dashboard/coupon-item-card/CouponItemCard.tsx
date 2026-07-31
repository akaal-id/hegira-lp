"use client";

import { useState } from "react";
import { Edit3, Tag, Trash2 } from "lucide-react";
import ConfirmationModal from "@/components/ui/confirmation-modal/ConfirmationModal";
import styles from "./CouponItemCard.module.css";

export interface CouponItemData {
  id: string;
  name: string;
  code: string;
  eventName: string;
  discountLabel: string;
  quantity: number;
  validity: string;
}

interface CouponItemCardProps {
  coupon: CouponItemData;
}

export default function CouponItemCard({ coupon }: CouponItemCardProps) {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <>
      <div className={styles.card}>
        <div className={styles.body}>
          <div className={styles.headRow}>
            <div className={styles.titleWrap}>
              <Tag size={18} className={styles.titleIcon} />
              <h3 className={styles.title}>{coupon.name}</h3>
            </div>
            <div className={styles.actions}>
              <button type="button" aria-label={`Edit ${coupon.name}`} className={styles.actionEdit}>
                <Edit3 size={16} />
              </button>
              <button
                type="button"
                aria-label={`Delete ${coupon.name}`}
                onClick={() => setIsDeleteOpen(true)}
                className={styles.actionDelete}
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>

          <p className={styles.eventName}>{coupon.eventName}</p>

          <dl className={styles.stats}>
            <div className={styles.statRow}>
              <dt>Discount</dt>
              <dd>{coupon.discountLabel}</dd>
            </div>
            <div className={styles.statRow}>
              <dt>Quantity</dt>
              <dd>{coupon.quantity}</dd>
            </div>
            <div className={styles.statRow}>
              <dt>Validity</dt>
              <dd>{coupon.validity}</dd>
            </div>
          </dl>
        </div>

        <div className={styles.footer}>
          <span>Coupon code</span>
          <span className={styles.code}>{coupon.code}</span>
        </div>
      </div>

      <ConfirmationModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={() => setIsDeleteOpen(false)}
        title={`Delete "${coupon.name}"?`}
        description="This coupon will be permanently removed. This action cannot be undone."
        confirmLabel="Yes, delete"
        tone="destructive"
      />
    </>
  );
}
