"use client";

import { useMemo, useState } from "react";
import { PlusCircle, Search } from "lucide-react";
import CouponItemCard from "@/components/dashboard/coupon-item-card/CouponItemCard";
import DashboardButton from "@/components/ui/dashboard-button/DashboardButton";
import type { StatusTone } from "@/components/ui/status-badge/StatusBadge";
import { initialCoupons, initialDashboardEvents, type CouponItem } from "@/components/dashboard/mockData";
import styles from "./coupons.module.css";

const STATUS_FILTERS = ["all", "Active", "Inactive", "Expired"] as const;

export default function CouponsPage() {
  const [coupons, setCoupons] = useState<CouponItem[]>(initialCoupons);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<(typeof STATUS_FILTERS)[number]>("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCoupon, setNewCoupon] = useState({
    code: "",
    discountType: "percentage" as "percentage" | "fixed",
    discountValue: 10,
    quota: 100,
    validUntil: "2026-12-31",
  });

  const filteredCoupons = useMemo(() => {
    return coupons.filter((cpn) => {
      const matchesSearch = cpn.code.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" || cpn.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [coupons, searchTerm, statusFilter]);

  const getStatusTone = (status: string): StatusTone => {
    if (status === "Active") return "positive";
    if (status === "Expired") return "neutral";
    return "warning";
  };

  const handleDelete = (id: string) => {
    setCoupons((prev) => prev.filter((c) => c.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCoupon.code) return;

    const created: CouponItem = {
      id: `cpn-${Date.now()}`,
      eventId: "evt-1",
      code: newCoupon.code.toUpperCase(),
      discountType: newCoupon.discountType,
      discountValue: Number(newCoupon.discountValue),
      quota: Number(newCoupon.quota),
      used: 0,
      validUntil: newCoupon.validUntil,
      status: "Active",
    };

    setCoupons((prev) => [...prev, created]);
    setNewCoupon({
      code: "",
      discountType: "percentage",
      discountValue: 10,
      quota: 100,
      validUntil: "2026-12-31",
    });
    setIsModalOpen(false);
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.headerBar}>
        <p className={styles.headerEyebrow}>Event Management</p>
        <h1 className={styles.title}>Coupon Management</h1>
        <p className={styles.subtitle}>
          Create promotional discount codes to boost ticket sales for your event.
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
            placeholder="Search coupons by code..."
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
          onClick={() => setIsModalOpen(true)}
          className={styles.toolbarBtn}
        >
          Create New Coupon
        </DashboardButton>
      </div>

      {/* Coupon Grid */}
      {filteredCoupons.length > 0 ? (
        <div className={styles.grid}>
          {filteredCoupons.map((cpn) => {
            const event = initialDashboardEvents.find((e) => e.id === cpn.eventId);

            return (
              <CouponItemCard
                key={cpn.id}
                coupon={{
                  id: cpn.id,
                  code: cpn.code,
                  eventName: event?.name || "Unknown Event",
                  discountLabel:
                    cpn.discountType === "percentage"
                      ? `${cpn.discountValue}% OFF`
                      : `Rp ${cpn.discountValue.toLocaleString("id-ID")} OFF`,
                  quota: cpn.quota,
                  used: cpn.used,
                  validity: cpn.validUntil,
                  status: { label: cpn.status, tone: getStatusTone(cpn.status) },
                }}
                onDelete={() => handleDelete(cpn.id)}
              />
            );
          })}
        </div>
      ) : (
        <p className={styles.emptyText}>No coupons match your search.</p>
      )}

      {/* Modal Add Coupon */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>Create New Coupon</h2>
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
                  Coupon / Promo Code
                </label>
                <input
                  type="text"
                  required
                  value={newCoupon.code}
                  onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value.toUpperCase() })}
                  placeholder="e.g. HEGIRA2026"
                  className={styles.input}
                  style={{ textTransform: "uppercase", fontFamily: "var(--font-mono)", letterSpacing: "0.05em" }}
                />
              </div>

              <div className={styles.formGrid}>
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>
                    Discount Type
                  </label>
                  <select
                    value={newCoupon.discountType}
                    onChange={(e) =>
                      setNewCoupon({ ...newCoupon, discountType: e.target.value as any })
                    }
                    className={styles.input}
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed Amount (Rp)</option>
                  </select>
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.label}>
                    Discount Value
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={newCoupon.discountValue}
                    onChange={(e) =>
                      setNewCoupon({ ...newCoupon, discountValue: Number(e.target.value) })
                    }
                    className={styles.input}
                  />
                </div>
              </div>

              <div className={styles.formGrid}>
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>
                    Usage Quota
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={newCoupon.quota}
                    onChange={(e) => setNewCoupon({ ...newCoupon, quota: Number(e.target.value) })}
                    className={styles.input}
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.label}>
                    Valid Until
                  </label>
                  <input
                    type="date"
                    required
                    value={newCoupon.validUntil}
                    onChange={(e) => setNewCoupon({ ...newCoupon, validUntil: e.target.value })}
                    className={styles.input}
                  />
                </div>
              </div>

              <div className={styles.modalFooter}>
                <DashboardButton variant="secondary" size="sm" onClick={() => setIsModalOpen(false)}>Cancel</DashboardButton>
                <DashboardButton variant="primary" size="sm" onClick={handleSubmit}>Save Coupon</DashboardButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
