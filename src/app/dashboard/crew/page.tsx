"use client";

import { useState } from "react";
import { PlusCircle, ShieldCheck } from "lucide-react";
import DataTable, { type DataTableColumn } from "@/components/dashboard/data-table/DataTable";
import StatusBadge, { type StatusTone } from "@/components/ui/status-badge/StatusBadge";
import DashboardButton from "@/components/ui/dashboard-button/DashboardButton";
import { initialCrew, type CrewMember } from "@/components/dashboard/mockData";
import styles from "./crew.module.css";

export default function CrewPage() {
  const [crew, setCrew] = useState<CrewMember[]>(initialCrew);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCrew, setNewCrew] = useState({
    name: "",
    email: "",
    role: "Gate Checker" as "Gate Checker" | "Scanner" | "Supervisor" | "Admin",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCrew.name || !newCrew.email) return;

    const created: CrewMember = {
      id: `crw-${Date.now()}`,
      eventId: "evt-1",
      name: newCrew.name,
      email: newCrew.email,
      role: newCrew.role,
      status: "Active",
      lastActive: "Just now",
    };

    setCrew((prev) => [...prev, created]);
    setNewCrew({ name: "", email: "", role: "Gate Checker" });
    setIsModalOpen(false);
  };

  const columns: DataTableColumn<CrewMember>[] = [
    {
      key: "name",
      header: "Crew Name",
      render: (row) => (
        <div>
          <span style={{ fontWeight: 600, color: "var(--color-hegra-navy)", fontSize: "0.8125rem" }}>
            {row.name}
          </span>
          <br />
          <span style={{ fontSize: "0.6875rem", color: "#9ca3af" }}>{row.email}</span>
        </div>
      ),
    },
    {
      key: "role",
      header: "Role / Permission",
      render: (row) => (
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", fontWeight: 600, color: "var(--color-hegra-turquoise)" }}>
          {row.role}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (row) => (
        <StatusBadge
          label={row.status}
          tone={row.status === "Active" ? "positive" : "neutral"}
        />
      ),
    },
    {
      key: "lastActive",
      header: "Last Active",
      align: "right",
      render: (row) => <span style={{ fontSize: "0.75rem", color: "#6b7280" }}>{row.lastActive}</span>,
    },
  ];

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.headerBar}>
        <div>
          <h1 className={styles.title}>
            <ShieldCheck className="text-[var(--color-hegra-turquoise)]" /> Crew Management
          </h1>
          <p className={styles.subtitle}>
            Assign and manage staff members, gate scanners, and operational permissions.
          </p>
        </div>

        <DashboardButton
          variant="primary"
          size="md"
          icon={<PlusCircle size={16} />}
          onClick={() => setIsModalOpen(true)}
        >
          Assign New Crew Member
        </DashboardButton>
      </div>

      {/* Crew Table */}
      <div className={styles.tableCard}>
        <DataTable data={crew} columns={columns} keyExtractor={(item) => item.id} />
      </div>

      {/* Add Crew Modal */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>Assign New Crew Member</h2>
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
                <label className={styles.label}>
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={newCrew.name}
                  onChange={(e) => setNewCrew({ ...newCrew, name: e.target.value })}
                  placeholder="e.g. Maya Lin"
                  className={styles.input}
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={newCrew.email}
                  onChange={(e) => setNewCrew({ ...newCrew, email: e.target.value })}
                  placeholder="e.g. maya@hegira.id"
                  className={styles.input}
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>
                  Assigned Role
                </label>
                <select
                  value={newCrew.role}
                  onChange={(e) => setNewCrew({ ...newCrew, role: e.target.value as any })}
                  className={styles.input}
                >
                  <option value="Gate Checker">Gate Checker (Scan tickets)</option>
                  <option value="Scanner">Scanner (Ticket validation only)</option>
                  <option value="Supervisor">Supervisor (Full gate access)</option>
                  <option value="Admin">Admin (Full organizer control)</option>
                </select>
              </div>

              <div className={styles.modalFooter}>
                <DashboardButton variant="secondary" size="sm" onClick={() => setIsModalOpen(false)}>Cancel</DashboardButton>
                <DashboardButton variant="primary" size="sm" onClick={handleSubmit}>Assign Member</DashboardButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
