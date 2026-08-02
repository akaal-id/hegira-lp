"use client";

import { useState } from "react";
import { Edit3, Trash2 } from "lucide-react";
import StatusBadge, { type StatusTone } from "@/components/ui/status-badge/StatusBadge";
import ConfirmationModal from "@/components/ui/confirmation-modal/ConfirmationModal";
import ProgressRing from "@/components/dashboard/progress-ring/ProgressRing";
import styles from "./TicketItemCard.module.css";

export interface TicketItemData {
  id: string;
  name: string;
  eventName: string;
  category?: string;
  description?: string;
  price: number;
  sold: number;
  maxQuantity: number;
  availability: { label: string; tone: StatusTone };
  /** Set when this ticket has its own date/time window, distinct from the event's default. */
  scheduleOverride?: string;
}

interface TicketItemCardProps {
  ticket: TicketItemData;
  onEdit?: () => void;
  onDelete?: () => void;
}

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(amount);

const TONE_COLOR: Record<StatusTone, string> = {
  positive: "#2f8f5b",
  warning: "var(--color-hegra-yellow)",
  negative: "#c94f4f",
  neutral: "#9ca3af",
};

export default function TicketItemCard({ ticket, onEdit, onDelete }: TicketItemCardProps) {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const soldPct = ticket.maxQuantity > 0 ? Math.min(100, Math.round((ticket.sold / ticket.maxQuantity) * 100)) : 0;
  const toneColor = TONE_COLOR[ticket.availability.tone];

  const metaParts = [ticket.eventName, ticket.category, ticket.scheduleOverride].filter(Boolean);

  return (
    <>
      <div className={`glass-panel ${styles.card}`}>
        <div className={styles.body}>
          <div className={styles.headRow}>
            <ProgressRing
              pct={soldPct}
              color={toneColor}
              className={styles.ring}
              trackClassName={styles.ringTrack}
              fillClassName={styles.ringFill}
              textClassName={styles.ringText}
            />

            <div className={styles.titleGroup}>
              <h3 className={styles.title}>{ticket.name}</h3>
              <p className={`label-mono ${styles.metaLine}`}>{metaParts.join(" · ")}</p>
            </div>

            <div className={styles.actions}>
              <button type="button" aria-label={`Edit ${ticket.name}`} onClick={onEdit} className={styles.actionEdit}>
                <Edit3 size={14} />
              </button>
              <button
                type="button"
                aria-label={`Delete ${ticket.name}`}
                onClick={() => setIsDeleteOpen(true)}
                className={styles.actionDelete}
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>

          {ticket.description && (
            <div className={styles.description} dangerouslySetInnerHTML={{ __html: ticket.description }} />
          )}

          <div className={styles.statsRow}>
            <span className={styles.statsLabel}>Sold</span>
            <span className={styles.statsValue}>
              {ticket.sold.toLocaleString("id-ID")}
              <span className={styles.statsValueSuffix}> / {ticket.maxQuantity.toLocaleString("id-ID")}</span>
            </span>
            <StatusBadge label={ticket.availability.label} tone={ticket.availability.tone} />
          </div>
        </div>

        <div className={styles.footer}>
          <span className="label-mono">Price</span>
          <span className={styles.price}>{formatCurrency(ticket.price)}</span>
        </div>
      </div>

      <ConfirmationModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={() => {
          onDelete?.();
          setIsDeleteOpen(false);
        }}
        title={`Delete "${ticket.name}"?`}
        description="This ticket category will be permanently removed. This action cannot be undone."
        confirmLabel="Yes, delete"
        tone="destructive"
      />
    </>
  );
}
