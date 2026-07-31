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
        ord.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ord.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ord.ticketTierName.toLowerCase().includes(searchTerm.toLowerCase())
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
      render: (row) => (
        <div className={styles.customerInfo}>
          <span className={styles.customerName}>{row.customerName}</span>
          <span className={styles.customerEmail}>{row.customerEmail}</span>
        </div>
      ),
    },
    {
      key: "ticketTierName",
      header: "Ticket Tier",
      render: (row) => <span>{row.ticketTierName}</span>,
    },
    {
      key: "quantity",
      header: "Qty",
      align: "center",
      render: (row) => <span>{row.quantity}</span>,
    },
    {
      key: "totalPrice",
      header: "Total Amount",
      align: "right",
      render: (row) => (
        <span style={{ fontFamily: "var(--font-mono)", fontWeight: 600 }}>
          Rp {row.totalPrice.toLocaleString("id-ID")}
        </span>
      ),
    },
    {
      key: "paymentMethod",
      header: "Payment Method",
      render: (row) => <span>{row.paymentMethod}</span>,
    },
    {
      key: "createdAt",
      header: "Date",
      render: (row) => <span style={{ fontSize: "0.75rem", color: "#6b7280" }}>{row.createdAt}</span>,
    },
    {
      key: "status",
      header: "Status",
      align: "right",
      render: (row) => <StatusBadge label={row.status} tone={getStatusTone(row.status)} />,
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
        <DataTable data={filteredOrders} columns={columns} keyExtractor={(item) => item.id} />
      </div>
    </div>
  );
}
