"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import DataTable, { type DataTableColumn } from "@/components/dashboard/data-table/DataTable";
import StatusBadge from "@/components/ui/status-badge/StatusBadge";
import DashboardButton from "@/components/ui/dashboard-button/DashboardButton";
import { initialVisitors, type VisitorItem } from "@/components/dashboard/mockData";
import styles from "./visitors.module.css";

const CHECKIN_FILTERS = ["all", "Checked In", "Not Checked In"] as const;

export default function VisitorsPage() {
  const [visitors, setVisitors] = useState<VisitorItem[]>(initialVisitors);
  const [searchTerm, setSearchTerm] = useState("");
  const [checkinFilter, setCheckinFilter] = useState<(typeof CHECKIN_FILTERS)[number]>("all");

  const handleToggleCheckIn = (visitorId: string) => {
    setVisitors((prev) =>
      prev.map((v) =>
        v.id === visitorId
          ? {
              ...v,
              isCheckedIn: !v.isCheckedIn,
              checkInTime: !v.isCheckedIn
                ? new Date().toISOString().replace("T", " ").substring(0, 16)
                : undefined,
            }
          : v
      )
    );
  };

  const filteredVisitors = useMemo(() => {
    return visitors.filter((v) => {
      const matchesSearch =
        v.ticketCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.visitorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.visitorEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.ticketCategory.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCheckin =
        checkinFilter === "all" ||
        (checkinFilter === "Checked In" ? v.isCheckedIn : !v.isCheckedIn);
      return matchesSearch && matchesCheckin;
    });
  }, [visitors, searchTerm, checkinFilter]);

  const checkedInCount = useMemo(
    () => visitors.filter((v) => v.isCheckedIn).length,
    [visitors]
  );

  const columns: DataTableColumn<VisitorItem>[] = [
    {
      header: "Ticket Code",
      accessor: (row: VisitorItem) => (
        <span style={{ fontFamily: "var(--font-mono)", fontWeight: 600, color: "var(--color-hegra-navy)" }}>
          {row.ticketCode}
        </span>
      ),
    },
    {
      header: "Visitor Name",
      accessor: (row: VisitorItem) => (
        <div>
          <span style={{ fontWeight: 600, color: "var(--color-hegra-navy)", fontSize: "0.8125rem" }}>
            {row.visitorName}
          </span>
          <br />
          <span style={{ fontSize: "0.6875rem", color: "#9ca3af" }}>{row.visitorEmail}</span>
        </div>
      ),
    },
    {
      header: "Ticket Tier",
      accessor: (row: VisitorItem) => <span>{row.ticketCategory}</span>,
    },
    {
      header: "Check-In Status",
      accessor: (row: VisitorItem) => (
        <StatusBadge
          label={row.isCheckedIn ? "Checked In" : "Pending Entry"}
          tone={row.isCheckedIn ? "positive" : "warning"}
        />
      ),
    },
    {
      header: "Entry Time",
      accessor: (row: VisitorItem) => (
        <span style={{ fontSize: "0.75rem", color: "#6b7280" }}>
          {row.checkInTime || "-"}
        </span>
      ),
    },
    {
      header: "Action",
      accessor: (row: VisitorItem) => (
        <DashboardButton
          variant={row.isCheckedIn ? "secondary" : "primary"}
          size="sm"
          onClick={() => handleToggleCheckIn(row.id)}
        >
          {row.isCheckedIn ? "Undo Entry" : "Check In"}
        </DashboardButton>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      {/* Header & Metric */}
      <div className={styles.headerBar}>
        <div className={styles.headerTextGroup}>
          <p className={styles.headerEyebrow}>Event Management</p>
          <h1 className={styles.title}>Visitor Management</h1>
          <p className={styles.subtitle}>
            Monitor attendee check-ins, ticket scans, and gate arrivals.
          </p>
        </div>

        <div className={styles.statsPill}>
          <span className={styles.statsText}>Gate Attendance:</span>
          <span className={styles.statsCount}>
            {checkedInCount} / {visitors.length}
          </span>
        </div>
      </div>

      {/* Toolbar */}
      <div className={styles.toolbar}>
        <div className={styles.searchWrapper}>
          <Search size={18} className={styles.searchIcon} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by ticket code, visitor name, email..."
            className={styles.searchInput}
          />
        </div>

        {CHECKIN_FILTERS.map((f) => (
          <DashboardButton
            key={f}
            variant="filter"
            size="sm"
            active={checkinFilter === f}
            onClick={() => setCheckinFilter(f)}
            className={styles.toolbarBtn}
          >
            {f === "all" ? "All" : f}
          </DashboardButton>
        ))}
      </div>

      {/* Visitors Data Table */}
      <div className={styles.tableCard}>
        <DataTable
          data={filteredVisitors}
          columns={columns}
          renderMobileCard={(row: VisitorItem) => (
            <div style={{ padding: "0.75rem", display: "flex", flexDirection: "column", gap: "0.375rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontWeight: 600, color: "var(--color-hegra-navy)" }}>
                  {row.ticketCode}
                </span>
                <StatusBadge
                  label={row.isCheckedIn ? "Checked In" : "Pending Entry"}
                  tone={row.isCheckedIn ? "positive" : "warning"}
                />
              </div>
              <p style={{ fontWeight: 600, margin: 0 }}>{row.visitorName}</p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.75rem" }}>
                <span style={{ color: "#6b7280" }}>{row.ticketCategory}</span>
                <DashboardButton
                  variant={row.isCheckedIn ? "secondary" : "primary"}
                  size="sm"
                  onClick={() => handleToggleCheckIn(row.id)}
                >
                  {row.isCheckedIn ? "Undo" : "Check In"}
                </DashboardButton>
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
}
