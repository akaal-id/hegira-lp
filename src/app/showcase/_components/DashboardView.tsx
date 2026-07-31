"use client";

import { useState } from "react";
import { Plus, Ticket, Calendar, DollarSign, Users } from "lucide-react";

import SidebarNav from "@/components/dashboard/sidebar-nav/SidebarNav";
import TopBar from "@/components/dashboard/top-bar/TopBar";
import DataTable, {
  type DataTableColumn,
  type DataTableFilterConfig,
  type DataTableSortOption,
} from "@/components/dashboard/data-table/DataTable";
import EventCardDB from "@/components/dashboard/event-card/EventCardDB";
import TicketItemCard from "@/components/dashboard/ticket-item-card/TicketItemCard";
import CouponItemCard from "@/components/dashboard/coupon-item-card/CouponItemCard";
import DashboardFooter from "@/components/dashboard/footer/DashboardFooter";
import AddTicketModal from "@/components/dashboard/modals/add-ticket-modal/AddTicketModal";
import StatusBadge from "@/components/ui/status-badge/StatusBadge";
import RadialProgress from "@/components/ui/radial-progress/RadialProgress";

import {
  couponItems,
  eventCards,
  orderRows,
  sidebarSections,
  ticketItems,
  type OrderRow,
} from "../showcase-data";

import styles from "./DashboardView.module.css";

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(amount);

const orderColumns: DataTableColumn<OrderRow>[] = [
  { header: "Order ID", accessor: (row) => <span className="label-mono">{row.id}</span> },
  { header: "Buyer", accessor: (row) => row.buyer },
  { header: "Ticket", accessor: (row) => <span className="label-mono">{row.ticket}</span> },
  { header: "Amount", accessor: (row) => <span className="label-mono">{formatCurrency(row.amount)}</span> },
  { header: "Status", accessor: (row) => <StatusBadge label={row.status.label} tone={row.status.tone} /> },
];

const orderFilters: DataTableFilterConfig<OrderRow>[] = [
  {
    key: "ticket",
    label: "Ticket type",
    options: [
      { label: "Early Bird", value: "Early Bird" },
      { label: "Regular", value: "Regular" },
      { label: "VIP", value: "VIP" },
    ],
    predicate: (row, value) => row.ticket === value,
  },
];

const orderSortOptions: DataTableSortOption<OrderRow>[] = [
  { label: "Amount (high to low)", value: "amount_desc", compare: (a, b) => b.amount - a.amount },
  { label: "Amount (low to high)", value: "amount_asc", compare: (a, b) => a.amount - b.amount },
  { label: "Buyer (A–Z)", value: "buyer_asc", compare: (a, b) => a.buyer.localeCompare(b.buyer) },
];

export default function DashboardView() {
  const [activeNavId, setActiveNavId] = useState("dashboard");
  const [activeTab, setActiveTab] = useState<"overview" | "events" | "tickets" | "orders">("overview");
  const [isAddTicketOpen, setIsAddTicketOpen] = useState(false);

  return (
    <div className={styles.dashboardShell}>
      <div className={styles.sidebarCol}>
        <SidebarNav
          sections={sidebarSections}
          activeId={activeNavId}
          onSelect={(id) => {
            setActiveNavId(id);
            if (id === "events") setActiveTab("events");
            else if (id === "tickets") setActiveTab("tickets");
            else if (id === "orders") setActiveTab("orders");
            else setActiveTab("overview");
          }}
        />
      </div>

      <div className={styles.mainCol}>
        <TopBar
          segments={[
            { label: "Organizer Portal", href: "#" },
            { label: activeTab.toUpperCase() },
          ]}
          userName="Sarah Jenkins"
        />

        <main className={styles.content}>
          {/* Sub-view Navigation Bar */}
          <div className={styles.navTabs}>
            <button
              type="button"
              onClick={() => setActiveTab("overview")}
              className={`label-mono ${styles.tabBtn} ${activeTab === "overview" ? styles.tabBtnActive : ""}`}
            >
              Overview
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("events")}
              className={`label-mono ${styles.tabBtn} ${activeTab === "events" ? styles.tabBtnActive : ""}`}
            >
              Events ({eventCards.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("tickets")}
              className={`label-mono ${styles.tabBtn} ${activeTab === "tickets" ? styles.tabBtnActive : ""}`}
            >
              Tickets &amp; Coupons
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("orders")}
              className={`label-mono ${styles.tabBtn} ${activeTab === "orders" ? styles.tabBtnActive : ""}`}
            >
              Orders ({orderRows.length})
            </button>
          </div>

          {/* OVERVIEW TAB */}
          {activeTab === "overview" && (
            <div className={styles.tabContent}>
              <div className={styles.metricsGrid}>
                <div className={`glass-panel ${styles.metricCard}`}>
                  <div className={styles.metricHeader}>
                    <span className={`label-mono ${styles.metricLabel}`}>Total Revenue</span>
                    <span className={styles.metricIconWrap}>
                      <DollarSign size={18} />
                    </span>
                  </div>
                  <p className={styles.metricValue}>Rp 48,250,000</p>
                  <p className={`label-mono ${styles.metricSub}`}>+14.2% from last month</p>
                </div>

                <div className={`glass-panel ${styles.metricCard}`}>
                  <div className={styles.metricHeader}>
                    <span className={`label-mono ${styles.metricLabel}`}>Tickets Sold</span>
                    <span className={styles.metricIconWrap}>
                      <Ticket size={18} />
                    </span>
                  </div>
                  <div className={styles.metricProgressRow}>
                    <div>
                      <p className={styles.metricValue}>1,420</p>
                      <p className={`label-mono ${styles.metricSub}`}>71% of target quota</p>
                    </div>
                    <RadialProgress percentage={71} size={52} strokeWidth={5} tone="yellow" />
                  </div>
                </div>

                <div className={`glass-panel ${styles.metricCard}`}>
                  <div className={styles.metricHeader}>
                    <span className={`label-mono ${styles.metricLabel}`}>Active Events</span>
                    <span className={styles.metricIconWrap}>
                      <Calendar size={18} />
                    </span>
                  </div>
                  <p className={styles.metricValue}>{eventCards.length}</p>
                  <p className={`label-mono ${styles.metricSub}`}>2 upcoming, 1 live</p>
                </div>

                <div className={`glass-panel ${styles.metricCard}`}>
                  <div className={styles.metricHeader}>
                    <span className={`label-mono ${styles.metricLabel}`}>Total Attendees</span>
                    <span className={styles.metricIconWrap}>
                      <Users size={18} />
                    </span>
                  </div>
                  <p className={styles.metricValue}>3,850</p>
                  <p className={`label-mono ${styles.metricSub}`}>Across 12 past events</p>
                </div>
              </div>

              <div className={styles.sectionHeaderRow}>
                <div>
                  <p className={`label-mono ${styles.sectionTag}`}>Upcoming</p>
                  <h2 className={styles.sectionTitle}>Featured Events</h2>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab("events")}
                  className={`label-mono ${styles.viewAllBtn}`}
                >
                  View all events &rarr;
                </button>
              </div>

              <div className={styles.cardGrid}>
                {eventCards.map((event) => (
                  <EventCardDB key={event.id} event={event} />
                ))}
              </div>

              <div className={styles.sectionHeaderRow}>
                <div>
                  <p className={`label-mono ${styles.sectionTag}`}>Realtime</p>
                  <h2 className={styles.sectionTitle}>Recent Ticket Orders</h2>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab("orders")}
                  className={`label-mono ${styles.viewAllBtn}`}
                >
                  View all orders &rarr;
                </button>
              </div>

              <DataTable
                data={orderRows.slice(0, 4)}
                columns={orderColumns}
                searchPredicate={(row, query) =>
                  row.buyer.toLowerCase().includes(query.toLowerCase()) || row.id.toLowerCase().includes(query.toLowerCase())
                }
                renderMobileCard={(row) => (
                  <div className={`glass-panel ${styles.mobileOrderCard}`}>
                    <div className={styles.mobileOrderHead}>
                      <span className={`label-mono ${styles.mobileOrderId}`}>{row.id}</span>
                      <StatusBadge label={row.status.label} tone={row.status.tone} />
                    </div>
                    <p className={styles.mobileOrderBuyer}>{row.buyer}</p>
                    <div className={`label-mono ${styles.mobileOrderFoot}`}>
                      <span>{row.ticket}</span>
                      <span>{formatCurrency(row.amount)}</span>
                    </div>
                  </div>
                )}
              />
            </div>
          )}

          {/* EVENTS TAB */}
          {activeTab === "events" && (
            <div className={styles.tabContent}>
              <div className={styles.sectionHeaderRow}>
                <div>
                  <p className={`label-mono ${styles.sectionTag}`}>Management</p>
                  <h2 className={styles.sectionTitle}>All Organised Events</h2>
                </div>
              </div>
              <div className={styles.cardGrid}>
                {eventCards.map((event) => (
                  <EventCardDB key={event.id} event={event} />
                ))}
              </div>
            </div>
          )}

          {/* TICKETS & COUPONS TAB */}
          {activeTab === "tickets" && (
            <div className={styles.tabContent}>
              <div className={styles.sectionHeaderRow}>
                <div>
                  <p className={`label-mono ${styles.sectionTag}`}>Inventory</p>
                  <h2 className={styles.sectionTitle}>Ticket Categories</h2>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAddTicketOpen(true)}
                  className={`label-mono ${styles.createBtn}`}
                >
                  <Plus size={15} /> Create Ticket
                </button>
              </div>

              <div className={styles.cardGrid}>
                {ticketItems.map((ticket) => (
                  <TicketItemCard key={ticket.id} ticket={ticket} />
                ))}
              </div>

              <div className={styles.sectionHeaderRow} style={{ marginTop: "2rem" }}>
                <div>
                  <p className={`label-mono ${styles.sectionTag}`}>Promotions</p>
                  <h2 className={styles.sectionTitle}>Active Discount Coupons</h2>
                </div>
              </div>

              <div className={styles.cardGrid}>
                {couponItems.map((coupon) => (
                  <CouponItemCard key={coupon.id} coupon={coupon} />
                ))}
              </div>
            </div>
          )}

          {/* ORDERS TAB */}
          {activeTab === "orders" && (
            <div className={styles.tabContent}>
              <div className={styles.sectionHeaderRow}>
                <div>
                  <p className={`label-mono ${styles.sectionTag}`}>Transactions</p>
                  <h2 className={styles.sectionTitle}>All Order Transactions</h2>
                </div>
              </div>

              <DataTable
                data={orderRows}
                columns={orderColumns}
                searchPredicate={(row, query) =>
                  row.buyer.toLowerCase().includes(query.toLowerCase()) || row.id.toLowerCase().includes(query.toLowerCase())
                }
                filtersConfig={orderFilters}
                sortOptions={orderSortOptions}
                itemsPerPage={5}
                renderMobileCard={(row) => (
                  <div className={`glass-panel ${styles.mobileOrderCard}`}>
                    <div className={styles.mobileOrderHead}>
                      <span className={`label-mono ${styles.mobileOrderId}`}>{row.id}</span>
                      <StatusBadge label={row.status.label} tone={row.status.tone} />
                    </div>
                    <p className={styles.mobileOrderBuyer}>{row.buyer}</p>
                    <div className={`label-mono ${styles.mobileOrderFoot}`}>
                      <span>{row.ticket}</span>
                      <span>{formatCurrency(row.amount)}</span>
                    </div>
                  </div>
                )}
              />
            </div>
          )}
        </main>

        <DashboardFooter />
      </div>

      <AddTicketModal
        isOpen={isAddTicketOpen}
        onClose={() => setIsAddTicketOpen(false)}
        onSave={() => setIsAddTicketOpen(false)}
      />
    </div>
  );
}
