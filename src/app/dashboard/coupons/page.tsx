"use client";

import { useState } from "react";
import { PlusCircle, Tag } from "lucide-react";
import CouponItemCard from "@/components/dashboard/coupon-item-card/CouponItemCard";
import DashboardButton from "@/components/ui/dashboard-button/DashboardButton";
import { initialCoupons, type CouponItem } from "@/components/dashboard/mockData";
import styles from "./coupons.module.css";

export default function CouponsPage() {
  const [coupons, setCoupons] = useState<CouponItem[]>(initialCoupons);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCoupon, setNewCoupon] = useState({
    code: "",
    discountType: "percentage" as "percentage" | "fixed",
    discountValue: 10,
    quota: 100,
    validUntil: "2026-12-31",
  });

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
        <div>
          <h1 className={styles.title}>
            <Tag className="text-[var(--color-hegra-yellow)]" /> Coupon Management
          </h1>
          <p className={styles.subtitle}>
            Create promotional discount codes to boost ticket sales for your event.
          </p>
        </div>

        <DashboardButton
          variant="primary"
          size="md"
          icon={<PlusCircle size={16} />}
          onClick={() => setIsModalOpen(true)}
        >
          Create New Coupon
        </DashboardButton>
      </div>

      {/* Coupon Grid */}
      <div className={styles.grid}>
        {coupons.map((cpn) => (
          <CouponItemCard
            key={cpn.id}
            coupon={{
              id: cpn.id,
              name: `Coupon ${cpn.code}`,
              code: cpn.code,
              eventName: "Sunset Music Fest",
              discountLabel:
                cpn.discountType === "percentage"
                  ? `${cpn.discountValue}% OFF`
                  : `Rp ${cpn.discountValue.toLocaleString("id-ID")} OFF`,
              quantity: cpn.quota - cpn.used,
              validity: cpn.validUntil,
            }}
          />
        ))}
      </div>

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
