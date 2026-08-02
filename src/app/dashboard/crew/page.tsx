"use client";

import { useMemo, useState } from "react";
import { PlusCircle, Search } from "lucide-react";
import DataTable, { type DataTableColumn } from "@/components/dashboard/data-table/DataTable";
import StatusBadge, { type StatusTone } from "@/components/ui/status-badge/StatusBadge";
import DashboardButton from "@/components/ui/dashboard-button/DashboardButton";
import { initialCrew, type CrewMember } from "@/components/dashboard/mockData";
import styles from "./crew.module.css";

const ROLE_FILTERS = ["all", "Admin", "Gate Scanner", "Usher", "Coordinator"] as const;

export default function CrewPage() {
  const [crew, setCrew] = useState<CrewMember[]>(initialCrew);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<(typeof ROLE_FILTERS)[number]>("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCrew, setNewCrew] = useState({
    name: "",
    email: "",
    role: "Gate Scanner" as "Gate Scanner" | "Usher" | "Coordinator" | "Admin",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCrew.name || !newCrew.email) return;

    const created: CrewMember = {
      id: `crw-${Date.now()}`,
      eventId: "evt-1",
      name: newCrew.name,
      email: newCrew.email,
      phone: "+62 813-0000-0000",
      role: newCrew.role,
      status: "Active",
      addedDate: new Date().toISOString().substring(0, 10),
    };

    setCrew((prev) => [...prev, created]);
    setNewCrew({ name: "", email: "", role: "Gate Scanner" });
    setIsModalOpen(false);
  };

  const filteredCrew = useMemo(() => {
    return crew.filter((member) => {
      const matchesSearch =
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = roleFilter === "all" || member.role === roleFilter;
      return matchesSearch && matchesRole;
    });
  }, [crew, searchTerm, roleFilter]);

  const columns: DataTableColumn<CrewMember>[] = [
    {
      header: "Crew Name",
      accessor: (row: CrewMember) => (
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
      header: "Role / Permission",
      accessor: (row: CrewMember) => (
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", fontWeight: 600, color: "var(--color-hegra-turquoise)" }}>
          {row.role}
        </span>
      ),
    },
    {
      header: "Status",
      accessor: (row: CrewMember) => (
        <StatusBadge
          label={row.status}
          tone={row.status === "Active" ? "positive" : "neutral"}
        />
      ),
    },
    {
      header: "Added Date",
      accessor: (row: CrewMember) => <span style={{ fontSize: "0.75rem", color: "#6b7280" }}>{row.addedDate}</span>,
    },
  ];

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.headerBar}>
        <p className={styles.headerEyebrow}>Event Management</p>
        <h1 className={styles.title}>Crew Management</h1>
        <p className={styles.subtitle}>
          Assign and manage staff members, gate scanners, and operational permissions.
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
            placeholder="Search crew by name or email..."
            className={styles.searchInput}
          />
        </div>

        {ROLE_FILTERS.map((f) => (
          <DashboardButton
            key={f}
            variant="filter"
            size="sm"
            active={roleFilter === f}
            onClick={() => setRoleFilter(f)}
            className={styles.toolbarBtn}
          >
            {f === "all" ? "All" : f}
          </DashboardButton>
        ))}

        <DashboardButton
          variant="primary"
          size="md"
          icon={<PlusCircle size={16} />}
          onClick={() => setIsModalOpen(true)}
          className={styles.toolbarBtn}
        >
          Assign New Crew Member
        </DashboardButton>
      </div>

      {/* Crew Table */}
      <div className={styles.tableCard}>
        <DataTable
          data={filteredCrew}
          columns={columns}
          emptyStateMessage="No crew members match your search."
          renderMobileCard={(row: CrewMember) => (
            <div style={{ padding: "0.75rem", display: "flex", flexDirection: "column", gap: "0.375rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontWeight: 600, color: "var(--color-hegra-navy)", fontSize: "0.875rem" }}>
                  {row.name}
                </span>
                <StatusBadge label={row.status} tone={row.status === "Active" ? "positive" : "neutral"} />
              </div>
              <span style={{ fontSize: "0.75rem", color: "#6b7280" }}>{row.email}</span>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontWeight: 600, color: "var(--color-hegra-turquoise)" }}>
                  {row.role}
                </span>
                <span style={{ color: "#6b7280" }}>{row.addedDate}</span>
              </div>
            </div>
          )}
        />
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
                  <option value="Gate Scanner">Gate Scanner (Scan tickets)</option>
                  <option value="Usher">Usher (Event directions & seating)</option>
                  <option value="Coordinator">Coordinator (Full gate operations)</option>
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
