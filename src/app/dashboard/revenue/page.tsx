"use client";

import { useMemo, useState } from "react";
import { DollarSign } from "lucide-react";
import DataTable, { type DataTableColumn } from "@/components/dashboard/data-table/DataTable";
import StatusBadge from "@/components/ui/status-badge/StatusBadge";
import { initialOrders, type OrderItem } from "@/components/dashboard/mockData";
import styles from "./revenue.module.css";

export default function RevenuePage() {
  const [orders] = useState<OrderItem[]>(initialOrders);

  const paidOrders = useMemo(
    () => orders.filter((o) => o.status === "Paid"),
    [orders]
  );

  const grossRevenue = useMemo(
    () => paidOrders.reduce((sum, o) => sum + o.totalPrice, 0),
    [paidOrders]
  );

  const platformFee = Math.round(grossRevenue * 0.05);
  const netPayout = grossRevenue - platformFee;

  const columns: DataTableColumn<OrderItem>[] = [
    {
      key: "orderNumber",
      header: "Order ID",
      render: (row) => (
        <span style={{ fontFamily: "var(--font-mono)", fontWeight: 600, color: "var(--color-hegra-navy)" }}>
          {row.orderNumber}
        </span>
      ),
    },
    {
      key: "customerName",
      header: "Customer",
      render: (row) => <span>{row.customerName}</span>,
    },
    {
      key: "ticketTierName",
      header: "Ticket Tier",
      render: (row) => <span>{row.ticketTierName}</span>,
    },
    {
      key: "totalPrice",
      header: "Gross Amount",
      align: "right",
      render: (row) => (
        <span style={{ fontFamily: "var(--font-mono)", fontWeight: 600 }}>
          Rp {row.totalPrice.toLocaleString("id-ID")}
        </span>
      ),
    },
    {
      key: "createdAt",
      header: "Payout Date",
      render: (row) => <span style={{ fontSize: "0.75rem", color: "#6b7280" }}>{row.createdAt}</span>,
    },
    {
      key: "status",
      header: "Payout Status",
      align: "right",
      render: (row) => <StatusBadge label="Settled" tone="positive" />,
    },
  ];

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.headerBar}>
        <h1 className={styles.title}>
          <DollarSign className="text-[var(--color-hegra-turquoise)]" /> Revenue & Financial Settlement
        </h1>
        <p className={styles.subtitle}>
          Overview of gross ticket sales, platform fees, and net organizer payouts.
        </p>
      </div>

      {/* Financial Metric Cards */}
      <div className={styles.grid}>
        <div className={styles.statCard}>
          <p className={styles.statLabel}>Gross Sales</p>
          <p className={styles.statValue}>
            Rp {grossRevenue.toLocaleString("id-ID")}
          </p>
        </div>

        <div className={styles.statCard}>
          <p className={styles.statLabel}>Platform Fee (5%)</p>
          <p className={styles.statValue} style={{ color: "#ef4444" }}>
            - Rp {platformFee.toLocaleString("id-ID")}
          </p>
        </div>

        <div className={styles.statCard} style={{ borderColor: "color-mix(in srgb, var(--color-hegra-turquoise) 30%, transparent)" }}>
          <p className={styles.statLabel} style={{ color: "var(--color-hegra-turquoise)" }}>Net Organizer Payout</p>
          <p className={styles.statValue} style={{ color: "var(--color-hegra-turquoise)" }}>
            Rp {netPayout.toLocaleString("id-ID")}
          </p>
        </div>
      </div>

      {/* Settlements Table */}
      <div style={{ marginTop: "1rem" }}>
        <h2 className={styles.sectionTitle}>Settled Transactions</h2>
        <div className={styles.tableCard}>
          <DataTable data={paidOrders} columns={columns} keyExtractor={(item) => item.id} />
        </div>
      </div>
    </div>
  );
}
