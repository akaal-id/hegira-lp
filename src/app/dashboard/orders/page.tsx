"use client";

import { useMemo, useState } from "react";
import { Search, ShoppingCart } from "lucide-react";
import DataTable, { type DataTableColumn } from "@/components/dashboard/data-table/DataTable";
import StatusBadge, { type StatusTone } from "@/components/ui/status-badge/StatusBadge";
import { initialOrders, type OrderItem } from "@/components/dashboard/mockData";
import styles from "./orders.module.css";

export default function OrdersPage() {
  const [orders] = useState<OrderItem[]>(initialOrders);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOrders = useMemo(() => {
    return orders.filter(
      (ord) =>
        ord.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ord.buyerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ord.buyerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ord.ticketName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [orders, searchTerm]);

  const getStatusTone = (status: string): StatusTone => {
    if (status === "Paid") return "positive";
    if (status === "Pending") return "warning";
    if (status === "Cancelled" || status === "Expired") return "negative";
    return "neutral";
  };

  const columns: DataTableColumn<OrderItem>[] = [
    {
      header: "Order ID",
      accessor: (row: OrderItem) => (
        <span style={{ fontFamily: "var(--font-mono)", fontWeight: 600, color: "var(--color-hegra-navy)" }}>
          {row.orderNumber}
        </span>
      ),
    },
    {
      header: "Customer",
      accessor: (row: OrderItem) => (
        <div className={styles.customerInfo}>
          <span className={styles.customerName}>{row.buyerName}</span>
          <span className={styles.customerEmail}>{row.buyerEmail}</span>
        </div>
      ),
    },
    {
      header: "Ticket Tier",
      accessor: (row: OrderItem) => <span>{row.ticketName}</span>,
    },
    {
      header: "Qty",
      accessor: (row: OrderItem) => <span>{row.quantity}</span>,
    },
    {
      header: "Total Amount",
      accessor: (row: OrderItem) => (
        <span style={{ fontFamily: "var(--font-mono)", fontWeight: 600 }}>
          Rp {row.totalPrice.toLocaleString("id-ID")}
        </span>
      ),
    },
    {
      header: "Buyer Phone",
      accessor: (row: OrderItem) => <span>{row.buyerPhone}</span>,
    },
    {
      header: "Date",
      accessor: (row: OrderItem) => <span style={{ fontSize: "0.75rem", color: "#6b7280" }}>{row.createdDate}</span>,
    },
    {
      header: "Status",
      accessor: (row: OrderItem) => <StatusBadge label={row.status} tone={getStatusTone(row.status)} />,
    },
  ];

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.headerBar}>
        <h1 className={styles.title}>
          <ShoppingCart className="text-[var(--color-hegra-turquoise)]" /> Orders & Transactions
        </h1>
        <p className={styles.subtitle}>
          Track ticket purchase transactions, customer payments, and order statuses.
        </p>
      </div>

      {/* Toolbar Search */}
      <div className={styles.toolbar}>
        <div className={styles.searchWrapper}>
          <Search size={18} className={styles.searchIcon} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by order ID, customer name, email, or ticket tier..."
            className={styles.searchInput}
          />
        </div>
      </div>

      {/* Orders Data Table */}
      <div className={styles.tableCard}>
        <DataTable
          data={filteredOrders}
          columns={columns}
          renderMobileCard={(row: OrderItem) => (
            <div style={{ padding: "0.75rem", display: "flex", flexDirection: "column", gap: "0.375rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontWeight: 600, color: "var(--color-hegra-navy)" }}>
                  {row.orderNumber}
                </span>
                <StatusBadge label={row.status} tone={getStatusTone(row.status)} />
              </div>
              <p style={{ fontWeight: 600, margin: 0 }}>{row.buyerName}</p>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "#6b7280" }}>
                <span>{row.ticketName} (x{row.quantity})</span>
                <span style={{ fontFamily: "var(--font-mono)", fontWeight: 600, color: "var(--color-hegra-navy)" }}>
                  Rp {row.totalPrice.toLocaleString("id-ID")}
                </span>
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
}
