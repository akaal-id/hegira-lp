"use client";

import { useState } from "react";
import { Edit3, Ticket as TicketIcon, Trash2 } from "lucide-react";
import StatusBadge, { type StatusTone } from "@/components/ui/status-badge/StatusBadge";
import ConfirmationModal from "@/components/ui/confirmation-modal/ConfirmationModal";
import styles from "./TicketItemCard.module.css";

export interface TicketItemData {
  id: string;
  name: string;
  eventName: string;
  price: number;
  sold: number;
  maxQuantity: number;
  availability: { label: string; tone: StatusTone };
}

interface TicketItemCardProps {
  ticket: TicketItemData;
}

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(amount);

export default function TicketItemCard({ ticket }: TicketItemCardProps) {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <>
      <div className={styles.card}>
        <div className={styles.body}>
          <div className={styles.headRow}>
            <div className={styles.titleWrap}>
              <TicketIcon size={18} className={styles.titleIcon} />
              <h3 className={styles.title}>{ticket.name}</h3>
            </div>
            <div className={styles.actions}>
              <button type="button" aria-label={`Edit ${ticket.name}`} className={styles.actionEdit}>
                <Edit3 size={16} />
              </button>
              <button
                type="button"
                aria-label={`Delete ${ticket.name}`}
                onClick={() => setIsDeleteOpen(true)}
                className={styles.actionDelete}
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>

          <p className={styles.eventName}>{ticket.eventName}</p>

          <dl className={styles.stats}>
            <div className={styles.statRow}>
              <dt>Sold</dt>
              <dd>{ticket.sold}</dd>
            </div>
            <div className={styles.statRow}>
              <dt>Quantity</dt>
              <dd>{ticket.maxQuantity}</dd>
            </div>
            <div className={styles.statRow}>
              <dt>Availability</dt>
              <dd>
                <StatusBadge label={ticket.availability.label} tone={ticket.availability.tone} />
              </dd>
            </div>
          </dl>
        </div>

        <div className={styles.footer}>
          <span>Price</span>
          <span className={styles.price}>{formatCurrency(ticket.price)}</span>
        </div>
      </div>

      <ConfirmationModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={() => setIsDeleteOpen(false)}
        title={`Delete "${ticket.name}"?`}
        description="This ticket category will be permanently removed. This action cannot be undone."
        confirmLabel="Yes, delete"
        tone="destructive"
      />
    </>
  );
}
