"use client";

import { useState } from "react";
import { PlusCircle, Ticket } from "lucide-react";
import TicketItemCard from "@/components/dashboard/ticket-item-card/TicketItemCard";
import DashboardButton from "@/components/ui/dashboard-button/DashboardButton";
import { initialTicketTiers, type TicketTier } from "@/components/dashboard/mockData";
import styles from "./tickets.module.css";

export default function TicketsPage() {
  const [tickets, setTickets] = useState<TicketTier[]>(initialTicketTiers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTicket, setNewTicket] = useState({
    name: "",
    price: 150000,
    quota: 500,
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTicket.name) return;

    const created: TicketTier = {
      id: `tkt-${Date.now()}`,
      eventId: "evt-1",
      name: newTicket.name,
      price: Number(newTicket.price),
      quota: Number(newTicket.quota),
      sold: 0,
      status: "Available",
      description: newTicket.description,
    };

    setTickets((prev) => [...prev, created]);
    setNewTicket({ name: "", price: 150000, quota: 500, description: "" });
    setIsModalOpen(false);
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.headerBar}>
        <div>
          <h1 className={styles.title}>
            <Ticket className="text-[var(--color-hegra-turquoise)]" /> Ticket Management
          </h1>
          <p className={styles.subtitle}>
            Manage ticket tiers, pricing, and ticket inventory for this event.
          </p>
        </div>

        <DashboardButton
          variant="primary"
          size="md"
          icon={<PlusCircle size={16} />}
          onClick={() => setIsModalOpen(true)}
        >
          Add New Ticket
        </DashboardButton>
      </div>

      {/* Ticket Cards Grid */}
      <div className={styles.grid}>
        {tickets.map((tkt) => (
          <TicketItemCard
            key={tkt.id}
            ticket={{
              id: tkt.id,
              name: tkt.name,
              eventName: "Sunset Music Fest",
              price: tkt.price,
              sold: tkt.sold,
              maxQuantity: tkt.quota,
              availability: {
                label: tkt.status,
                tone: tkt.status === "Sold Out" ? "negative" : tkt.status === "Available" ? "positive" : "warning",
              },
            }}
          />
        ))}
      </div>

      {/* Add Ticket Modal */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>Add New Ticket Tier</h2>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className={styles.closeButton}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Ticket Tier Name</label>
                <input
                  type="text"
                  required
                  value={newTicket.name}
                  onChange={(e) => setNewTicket({ ...newTicket, name: e.target.value })}
                  placeholder="e.g. VIP Pass, Presale 1"
                  className={styles.input}
                />
              </div>

              <div className={styles.formGrid}>
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Price (Rp)</label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={newTicket.price}
                    onChange={(e) => setNewTicket({ ...newTicket, price: Number(e.target.value) })}
                    className={styles.input}
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Ticket Quota</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={newTicket.quota}
                    onChange={(e) => setNewTicket({ ...newTicket, quota: Number(e.target.value) })}
                    className={styles.input}
                  />
                </div>
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>Description / Benefits</label>
                <textarea
                  rows={3}
                  value={newTicket.description}
                  onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                  placeholder="Privileges included with this ticket..."
                  className={styles.textarea}
                />
              </div>

              <div className={styles.modalFooter}>
                <DashboardButton
                  variant="secondary"
                  size="sm"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </DashboardButton>
                <DashboardButton
                  variant="primary"
                  size="sm"
                  onClick={handleSubmit}
                >
                  Save Ticket Tier
                </DashboardButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
