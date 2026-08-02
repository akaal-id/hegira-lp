"use client";

import { useMemo, useState } from "react";
import { PlusCircle, Search } from "lucide-react";
import TicketItemCard from "@/components/dashboard/ticket-item-card/TicketItemCard";
import DashboardButton from "@/components/ui/dashboard-button/DashboardButton";
import { TextField, DateField, TimeField, RichTextField } from "@/components/dashboard/form-fields";
import { initialTicketTiers, initialDashboardEvents, type TicketTier } from "@/components/dashboard/mockData";
import styles from "./tickets.module.css";

const STATUS_FILTERS = ["all", "Available", "Sold Out", "Coming Soon"] as const;

const DEFAULT_EVENT_ID = "evt-1";

interface TicketFormState {
  name: string;
  category: string;
  price: string;
  quota: string;
  description: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
}

const emptyForm: TicketFormState = {
  name: "",
  category: "",
  price: "150000",
  quota: "500",
  description: "",
  startDate: "",
  endDate: "",
  startTime: "",
  endTime: "",
};

const formatDateShort = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

export default function TicketsPage() {
  const [tickets, setTickets] = useState<TicketTier[]>(initialTicketTiers);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<(typeof STATUS_FILTERS)[number]>("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTicket, setEditingTicket] = useState<TicketTier | null>(null);
  const [form, setForm] = useState<TicketFormState>(emptyForm);
  const [useEventSchedule, setUseEventSchedule] = useState(true);
  const [formError, setFormError] = useState<string | null>(null);

  const parentEvent = useMemo(
    () => initialDashboardEvents.find((e) => e.id === (editingTicket?.eventId ?? DEFAULT_EVENT_ID)),
    [editingTicket]
  );

  const filteredTickets = useMemo(() => {
    return tickets.filter((tkt) => {
      const matchesSearch = tkt.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" || tkt.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [tickets, searchTerm, statusFilter]);

  const updateForm = (patch: Partial<TicketFormState>) => {
    setForm((prev) => ({ ...prev, ...patch }));
    setFormError(null);
  };

  const openCreateModal = () => {
    setEditingTicket(null);
    setForm(emptyForm);
    setUseEventSchedule(true);
    setFormError(null);
    setIsModalOpen(true);
  };

  const openEditModal = (ticket: TicketTier) => {
    setEditingTicket(ticket);
    setForm({
      name: ticket.name,
      category: ticket.category || "",
      price: String(ticket.price),
      quota: String(ticket.quota),
      description: ticket.description,
      startDate: ticket.startDate || "",
      endDate: ticket.endDate || "",
      startTime: ticket.startTime || "",
      endTime: ticket.endTime || "",
    });
    setUseEventSchedule(!ticket.startDate);
    setFormError(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTicket(null);
    setFormError(null);
  };

  const handleDelete = (id: string) => {
    setTickets((prev) => prev.filter((t) => t.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !parentEvent) return;

    if (!useEventSchedule) {
      if (form.startDate && (form.startDate < parentEvent.startDate || form.startDate > parentEvent.endDate)) {
        setFormError(
          `Ticket start date must fall within the event's dates (${formatDateShort(parentEvent.startDate)} – ${formatDateShort(parentEvent.endDate)}).`
        );
        return;
      }
      if (form.endDate && (form.endDate < parentEvent.startDate || form.endDate > parentEvent.endDate)) {
        setFormError(
          `Ticket end date must fall within the event's dates (${formatDateShort(parentEvent.startDate)} – ${formatDateShort(parentEvent.endDate)}).`
        );
        return;
      }
      if (form.startDate && form.endDate && form.startDate > form.endDate) {
        setFormError("Ticket start date must be on or before its end date.");
        return;
      }
    }

    const shared = {
      name: form.name.trim(),
      category: form.category.trim() || undefined,
      price: Number(form.price) || 0,
      quota: Number(form.quota) || 0,
      description: form.description,
      startDate: useEventSchedule ? undefined : form.startDate || undefined,
      endDate: useEventSchedule ? undefined : form.endDate || undefined,
      startTime: useEventSchedule ? undefined : form.startTime || undefined,
      endTime: useEventSchedule ? undefined : form.endTime || undefined,
    };

    if (editingTicket) {
      setTickets((prev) => prev.map((t) => (t.id === editingTicket.id ? { ...t, ...shared } : t)));
    } else {
      const created: TicketTier = {
        id: `tkt-${Date.now()}`,
        eventId: DEFAULT_EVENT_ID,
        sold: 0,
        status: "Available",
        ...shared,
      };
      setTickets((prev) => [...prev, created]);
    }

    closeModal();
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.headerBar}>
        <p className={styles.headerEyebrow}>Event Management</p>
        <h1 className={styles.title}>Ticket Management</h1>
        <p className={styles.subtitle}>
          Manage ticket tiers, pricing, and ticket inventory for this event.
        </p>
      </div>

      {/* Toolbar */}
      <div className={styles.toolbar}>
        <div className={styles.searchWrapper}>
          <Search size={18} className={styles.searchIcon} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search ticket tiers by name..."
            className={styles.searchInput}
          />
        </div>

        {STATUS_FILTERS.map((f) => (
          <DashboardButton
            key={f}
            variant="filter"
            size="sm"
            active={statusFilter === f}
            onClick={() => setStatusFilter(f)}
            className={styles.toolbarBtn}
          >
            {f === "all" ? "All" : f}
          </DashboardButton>
        ))}

        <DashboardButton
          variant="primary"
          size="md"
          icon={<PlusCircle size={16} />}
          onClick={openCreateModal}
          className={styles.toolbarBtn}
        >
          Add New Ticket
        </DashboardButton>
      </div>

      {/* Ticket Cards Grid */}
      {filteredTickets.length > 0 ? (
        <div className={styles.grid}>
          {filteredTickets.map((tkt) => {
            const event = initialDashboardEvents.find((e) => e.id === tkt.eventId);
            const scheduleOverride = tkt.startDate
              ? tkt.startDate === (tkt.endDate || tkt.startDate)
                ? formatDateShort(tkt.startDate)
                : `${formatDateShort(tkt.startDate)} – ${formatDateShort(tkt.endDate || tkt.startDate)}`
              : undefined;

            return (
              <TicketItemCard
                key={tkt.id}
                ticket={{
                  id: tkt.id,
                  name: tkt.name,
                  eventName: event?.name || "Unknown Event",
                  category: tkt.category,
                  description: tkt.description,
                  price: tkt.price,
                  sold: tkt.sold,
                  maxQuantity: tkt.quota,
                  availability: {
                    label: tkt.status,
                    tone: tkt.status === "Sold Out" ? "negative" : tkt.status === "Available" ? "positive" : "warning",
                  },
                  scheduleOverride,
                }}
                onEdit={() => openEditModal(tkt)}
                onDelete={() => handleDelete(tkt.id)}
              />
            );
          })}
        </div>
      ) : (
        <p className={styles.emptyText}>No ticket tiers match your search.</p>
      )}

      {/* Add/Edit Ticket Modal */}
      {isModalOpen && parentEvent && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>{editingTicket ? "Edit Ticket Tier" : "Add New Ticket Tier"}</h2>
              <button type="button" onClick={closeModal} className={styles.closeButton}>
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formSplit}>
                <div className={styles.formColumnLeft}>
                  <TextField
                    label="Ticket Tier Name"
                    required
                    value={form.name}
                    onChange={(v) => updateForm({ name: v })}
                    placeholder="e.g. VIP Pass, Presale 1"
                  />

                  <TextField
                    label="Category"
                    value={form.category}
                    onChange={(v) => updateForm({ category: v })}
                    placeholder="e.g. General, VIP, Early Bird (optional)"
                  />

                  <div className={styles.formGrid}>
                    <TextField
                      label="Price (Rp)"
                      type="number"
                      required
                      min={0}
                      value={form.price}
                      onChange={(v) => updateForm({ price: v })}
                    />
                    <TextField
                      label="Ticket Capacity"
                      type="number"
                      required
                      min={1}
                      value={form.quota}
                      onChange={(v) => updateForm({ quota: v })}
                    />
                  </div>

                  <div className={styles.formSection}>
                    <p className={styles.formSectionTitle}>Ticket Date & Time</p>

                    <label className={styles.scheduleToggle}>
                      <span className={styles.scheduleToggleText}>
                        <span className={styles.scheduleToggleLabel}>Uses the event&apos;s date & time</span>
                        <span className={styles.scheduleToggleMeta}>
                          {formatDateShort(parentEvent.startDate)} – {formatDateShort(parentEvent.endDate)} ·{" "}
                          {parentEvent.timeDisplay}
                        </span>
                      </span>
                      <span className={styles.switchTrack} data-checked={useEventSchedule ? "true" : "false"}>
                        <input
                          type="checkbox"
                          checked={useEventSchedule}
                          onChange={(e) => setUseEventSchedule(e.target.checked)}
                          className={styles.switchInput}
                        />
                        <span className={styles.switchThumb} />
                      </span>
                    </label>

                    <div className={`${styles.scheduleFields} ${useEventSchedule ? styles.scheduleFieldsDisabled : ""}`}>
                      <DateField
                        label="Start Date"
                        value={form.startDate}
                        onChange={(v) => updateForm({ startDate: v })}
                        min={parentEvent.startDate}
                        max={parentEvent.endDate}
                        disabled={useEventSchedule}
                      />
                      <TimeField
                        label="Start Time"
                        value={form.startTime}
                        onChange={(v) => updateForm({ startTime: v })}
                        disabled={useEventSchedule}
                      />
                      <DateField
                        label="End Date"
                        value={form.endDate}
                        onChange={(v) => updateForm({ endDate: v })}
                        min={parentEvent.startDate}
                        max={parentEvent.endDate}
                        disabled={useEventSchedule}
                      />
                      <TimeField
                        label="End Time"
                        value={form.endTime}
                        onChange={(v) => updateForm({ endTime: v })}
                        disabled={useEventSchedule}
                      />
                    </div>
                  </div>
                </div>

                <div className={styles.formDivider} />

                <div className={styles.formColumnRight}>
                  <RichTextField
                    label="Description / Benefits"
                    value={form.description}
                    onChange={(html) => updateForm({ description: html })}
                    placeholder="Privileges included with this ticket... (optional)"
                    fill
                  />
                </div>
              </div>

              {formError && <p className={styles.formError}>{formError}</p>}

              <div className={styles.modalFooter}>
                <DashboardButton variant="secondary" size="sm" onClick={closeModal}>
                  Cancel
                </DashboardButton>
                <DashboardButton variant="primary" size="sm" onClick={handleSubmit}>
                  {editingTicket ? "Save Changes" : "Save Ticket Tier"}
                </DashboardButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
