"use client";

import { useState } from "react";
import { Plus, ShieldCheck, Users, Zap } from "lucide-react";

import ShowcaseNav from "./_components/ShowcaseNav";
import ShowcaseSection from "./_components/ShowcaseSection";

import Logo from "@/components/ui/logo/Logo";
import ToggleChip from "@/components/ui/toggle-chip/ToggleChip";
import Loader from "@/components/ui/loader/Loader";
import RadialProgress from "@/components/ui/radial-progress/RadialProgress";
import Breadcrumbs from "@/components/ui/breadcrumbs/Breadcrumbs";
import ArticleCard from "@/components/ui/article-card/ArticleCard";
import FeatureItem from "@/components/ui/feature-item/FeatureItem";
import FloatingHelpButton from "@/components/ui/floating-help-button/FloatingHelpButton";
import CopyableText from "@/components/ui/copyable-text/CopyableText";
import StatusBadge from "@/components/ui/status-badge/StatusBadge";
import Toast from "@/components/ui/toast/Toast";
import ConfirmationModal from "@/components/ui/confirmation-modal/ConfirmationModal";

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

import DashboardView from "./_components/DashboardView";

import {
  articleCards,
  couponItems,
  eventCards,
  orderRows,
  sidebarSections,
  ticketItems,
  toastItems,
  type OrderRow,
} from "./showcase-data";

import styles from "./page.module.css";

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(amount);

const orderColumns: DataTableColumn<OrderRow>[] = [
  { header: "Order ID", accessor: (row) => row.id },
  { header: "Buyer", accessor: (row) => row.buyer },
  { header: "Ticket", accessor: (row) => row.ticket },
  { header: "Amount", accessor: (row) => formatCurrency(row.amount) },
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

export default function ShowcasePage() {
  const [viewMode, setViewMode] = useState<"components" | "dashboard">("components");
  const [selectedChip, setSelectedChip] = useState("b2c");
  const [activeSidebarId, setActiveSidebarId] = useState("dashboard");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isAddTicketOpen, setIsAddTicketOpen] = useState(false);

  return (
    <div className={styles.page}>
      <div className={styles.intro}>
        <p className="label-mono">Design system</p>
        <h1 className={styles.heading}>Component showcase</h1>
        <p className={styles.subheading}>
          A living reference of the interface pieces that power Hegira — from marketing building blocks to the
          organizer dashboard. Every component below runs on this site&apos;s own tokens and CSS Modules, ported
          and restyled from the production app.
        </p>

        {/* Top-Level Mode Tabs */}
        <div className={styles.topTabs}>
          <button
            type="button"
            onClick={() => setViewMode("components")}
            className={`label-mono ${styles.topTabBtn} ${viewMode === "components" ? styles.topTabBtnActive : ""}`}
          >
            Components Library (22)
          </button>
          <button
            type="button"
            onClick={() => setViewMode("dashboard")}
            className={`label-mono ${styles.topTabBtn} ${viewMode === "dashboard" ? styles.topTabBtnActive : ""}`}
          >
            Full Dashboard Page
          </button>
        </div>
      </div>

      {viewMode === "dashboard" ? (
        <div className={styles.dashboardContainer}>
          <DashboardView />
        </div>
      ) : (
        <div className={styles.layout}>
          <aside className={styles.sidebar}>
            <ShowcaseNav />
          </aside>

          <div className={styles.content}>
          <p className={`label-mono ${styles.categoryLabel}`}>01 — Core UI &amp; marketing</p>

          <ShowcaseSection id="logo" index="01" title="Logo">
            <div className={styles.row}>
              <Logo />
              <Logo variant="sidebar" />
            </div>
          </ShowcaseSection>

          <ShowcaseSection id="toggle-chip" index="02" title="Toggle chip">
            <div className={styles.row}>
              <ToggleChip label="B2C" isSelected={selectedChip === "b2c"} onClick={() => setSelectedChip("b2c")} />
              <ToggleChip label="B2B" isSelected={selectedChip === "b2b"} onClick={() => setSelectedChip("b2b")} />
              <ToggleChip label="B2G" isSelected={selectedChip === "b2g"} onClick={() => setSelectedChip("b2g")} />
            </div>
          </ShowcaseSection>

          <ShowcaseSection id="loader" index="03" title="Loader">
            <div className={styles.row}>
              <Loader size="sm" />
              <Loader size="md" />
              <Loader size="lg" label="Loading…" />
            </div>
          </ShowcaseSection>

          <ShowcaseSection id="radial-progress" index="04" title="Radial progress">
            <div className={styles.row}>
              <RadialProgress percentage={36} />
              <RadialProgress percentage={68} tone="yellow" />
              <RadialProgress percentage={94} size={72} strokeWidth={6} />
            </div>
          </ShowcaseSection>

          <ShowcaseSection id="breadcrumbs" index="05" title="Breadcrumbs">
            <Breadcrumbs
              segments={[
                { label: "Home", href: "#" },
                { label: "Events", href: "#" },
                { label: "Hei Talk Vol. 4" },
              ]}
            />
          </ShowcaseSection>

          <ShowcaseSection id="article-card" index="06" title="Article card">
            <div className={styles.cardGrid}>
              {articleCards.map((article) => (
                <ArticleCard key={article.title} {...article} />
              ))}
            </div>
          </ShowcaseSection>

          <ShowcaseSection id="feature-item" index="07" title="Feature item">
            <div className={styles.cardGrid}>
              <FeatureItem icon={Zap} title="Fast checkout" description="Attendees check out in under a minute with saved payment methods." />
              <FeatureItem icon={ShieldCheck} title="Fraud protection" description="Every transaction is screened before tickets are issued." tone="yellow" />
              <FeatureItem icon={Users} title="Business matching" description="Connect organizers with B2B and B2G partners inside the same platform." />
            </div>
          </ShowcaseSection>

          <ShowcaseSection
            id="floating-help-button"
            index="08"
            title="Floating help button"
            description="Positioned relative to this frame for the demo — in production it's fixed to the viewport corner."
          >
            <div className={styles.fabFrame}>
              <FloatingHelpButton />
            </div>
          </ShowcaseSection>

          <ShowcaseSection id="copyable-text" index="09" title="Copyable text">
            <CopyableText value="ORD-10231" />
          </ShowcaseSection>

          <ShowcaseSection id="status-badge" index="10" title="Status badge">
            <div className={styles.row}>
              <StatusBadge label="Active" tone="positive" />
              <StatusBadge label="Almost sold out" tone="warning" />
              <StatusBadge label="Sold out" tone="negative" />
              <StatusBadge label="Draft" tone="neutral" />
            </div>
          </ShowcaseSection>

          <ShowcaseSection id="toast" index="11" title="Toast">
            <Toast items={toastItems} />
          </ShowcaseSection>

          <ShowcaseSection id="confirmation-modal" index="12" title="Confirmation modal">
            <button type="button" onClick={() => setIsConfirmOpen(true)} className={styles.triggerButton}>
              Open confirmation modal
            </button>
            <ConfirmationModal
              isOpen={isConfirmOpen}
              onClose={() => setIsConfirmOpen(false)}
              onConfirm={() => setIsConfirmOpen(false)}
              title="Publish this event?"
              description="Once published, the event becomes visible to attendees and ticket sales open immediately."
              confirmLabel="Publish"
            />
          </ShowcaseSection>

          <p className={`label-mono ${styles.categoryLabel}`}>02 — Dashboard &amp; admin</p>

          <ShowcaseSection id="sidebar-nav" index="13" title="Sidebar nav">
            <div className={styles.sidebarFrame}>
              <SidebarNav sections={sidebarSections} activeId={activeSidebarId} onSelect={setActiveSidebarId} />
            </div>
          </ShowcaseSection>

          <ShowcaseSection id="top-bar" index="14" title="Top bar">
            <div className={styles.topBarFrame}>
              <TopBar
                segments={[{ label: "Dashboard", href: "#" }, { label: "Tickets & coupons" }]}
                userName="Sarah"
              />
            </div>
          </ShowcaseSection>

          <ShowcaseSection id="data-table" index="15" title="Data table">
            <DataTable
              data={orderRows}
              columns={orderColumns}
              searchPredicate={(row, query) =>
                row.buyer.toLowerCase().includes(query.toLowerCase()) || row.id.toLowerCase().includes(query.toLowerCase())
              }
              filtersConfig={orderFilters}
              sortOptions={orderSortOptions}
              itemsPerPage={4}
              renderMobileCard={(row) => (
                <div className={styles.mobileOrderCard}>
                  <div className={styles.mobileOrderHead}>
                    <span className={styles.mobileOrderId}>{row.id}</span>
                    <StatusBadge label={row.status.label} tone={row.status.tone} />
                  </div>
                  <p className={styles.mobileOrderBuyer}>{row.buyer}</p>
                  <div className={styles.mobileOrderFoot}>
                    <span>{row.ticket}</span>
                    <span>{formatCurrency(row.amount)}</span>
                  </div>
                </div>
              )}
            />
          </ShowcaseSection>

          <ShowcaseSection id="event-card" index="16" title="Event card">
            <div className={styles.cardGrid}>
              {eventCards.map((event) => (
                <EventCardDB key={event.id} event={event} />
              ))}
            </div>
          </ShowcaseSection>

          <ShowcaseSection id="ticket-item-card" index="17" title="Ticket item card">
            <div className={styles.cardGrid}>
              {ticketItems.map((ticket) => (
                <TicketItemCard key={ticket.id} ticket={ticket} />
              ))}
            </div>
          </ShowcaseSection>

          <ShowcaseSection id="coupon-item-card" index="18" title="Coupon item card">
            <div className={styles.cardGrid}>
              {couponItems.map((coupon) => (
                <CouponItemCard key={coupon.id} coupon={coupon} />
              ))}
            </div>
          </ShowcaseSection>

          <ShowcaseSection id="dashboard-footer" index="19" title="Dashboard footer">
            <DashboardFooter />
          </ShowcaseSection>

          <ShowcaseSection id="add-ticket-modal" index="20" title="Add ticket modal">
            <button type="button" onClick={() => setIsAddTicketOpen(true)} className={styles.triggerButton}>
              <Plus size={16} /> Open add ticket modal
            </button>
            <AddTicketModal
              isOpen={isAddTicketOpen}
              onClose={() => setIsAddTicketOpen(false)}
              onSave={() => setIsAddTicketOpen(false)}
            />
          </ShowcaseSection>
        </div>
      </div>
      )}
    </div>
  );
}
