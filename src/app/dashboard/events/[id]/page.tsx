"use client";

import { use, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Clock,
  MapPin,
  Edit,
  Power,
  PowerOff,
  ChevronRight,
  Ticket,
  Tag,
  ShoppingCart,
  UserCheck,
  Share2,
} from "lucide-react";
import StatusBadge, { type StatusTone } from "@/components/ui/status-badge/StatusBadge";
import DashboardButton from "@/components/ui/dashboard-button/DashboardButton";
import {
  initialDashboardEvents,
  initialOrders,
  initialVisitors,
  initialTicketTiers,
  initialCoupons,
  type DashboardEvent,
} from "@/components/dashboard/mockData";
import styles from "./eventDetail.module.css";

type OverviewTab = "tickets" | "coupons" | "orders" | "visitors";

const formatCurrency = (amount: number) =>
  `Rp ${amount.toLocaleString("id-ID")}`;

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

export default function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  const [events, setEvents] = useState<DashboardEvent[]>(initialDashboardEvents);
  const [isDescExpanded, setIsDescExpanded] = useState(false);
  const [overviewTab, setOverviewTab] = useState<OverviewTab>("tickets");

  const event = events.find((e) => e.id === id) || events[0];

  const eventOrders = useMemo(
    () => initialOrders.filter((o) => o.eventId === event.id),
    [event.id]
  );
  const paidOrders = useMemo(
    () => eventOrders.filter((o) => o.status === "Paid"),
    [eventOrders]
  );
  const eventVisitors = useMemo(
    () => initialVisitors.filter((v) => v.eventId === event.id),
    [event.id]
  );
  const checkedInCount = useMemo(
    () => eventVisitors.filter((v) => v.isCheckedIn).length,
    [eventVisitors]
  );
  const eventTicketTiers = useMemo(
    () => initialTicketTiers.filter((t) => t.eventId === event.id),
    [event.id]
  );
  const eventCoupons = useMemo(
    () => initialCoupons.filter((c) => c.eventId === event.id),
    [event.id]
  );

  const soldPct = event.totalQuota > 0 ? Math.round((event.ticketsSold / event.totalQuota) * 100) : 0;
  const checkInPct = eventVisitors.length > 0 ? Math.round((checkedInCount / eventVisitors.length) * 100) : 0;

  const getStatusTone = (status: string): StatusTone => {
    if (status === "Active") return "positive";
    if (status === "Draft") return "warning";
    return "neutral";
  };

  const handleToggleStatus = (newStatus: "Active" | "Draft" | "Completed") => {
    setEvents((prev) =>
      prev.map((e) => (e.id === event.id ? { ...e, status: newStatus } : e))
    );
  };

  const getTierTone = (status: string): StatusTone => {
    if (status === "Available") return "positive";
    if (status === "Sold Out") return "neutral";
    return "warning";
  };

  const getCouponTone = (status: string): StatusTone => {
    if (status === "Active") return "positive";
    if (status === "Expired") return "neutral";
    return "warning";
  };

  const getOrderTone = (status: string): StatusTone => {
    if (status === "Paid") return "positive";
    if (status === "Pending") return "warning";
    return "neutral";
  };

  const overviewTabs: { id: OverviewTab; label: string; href: string; count: number }[] = [
    { id: "tickets", label: "Tickets", href: "/dashboard/tickets", count: eventTicketTiers.length },
    { id: "coupons", label: "Coupons", href: "/dashboard/coupons", count: eventCoupons.length },
    { id: "orders", label: "Orders", href: "/dashboard/orders", count: eventOrders.length },
    { id: "visitors", label: "Visitors", href: "/dashboard/visitors", count: eventVisitors.length },
  ];
  const activeOverviewTab = overviewTabs.find((t) => t.id === overviewTab)!;

  return (
    <div className={styles.container}>
      {/* Split layout: full event details left, metrics + quick nav right */}
      <div className={styles.splitGrid}>
        <div className={styles.columnLeft}>
          {/* Banner & Header Card */}
          <div className={styles.bannerCard}>
            <div className={styles.bannerImageWrap}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={event.coverImageUrl}
                alt={event.name}
                className={styles.bannerImage}
              />
              <div className={styles.bannerBadge}>
                <StatusBadge label={event.status} tone={getStatusTone(event.status)} />
              </div>
            </div>

            <div className={styles.bannerBody}>
              <div className={styles.bannerTitleRow}>
                <div>
                  <h1 className={styles.eventTitle}>{event.name}</h1>
                  <div className={styles.bannerMetaCol}>
                    <p className={styles.headerMetaLine}>
                      <MapPin size={14} /> {event.location}
                    </p>
                    <p className={styles.headerMetaLine}>
                      <Clock size={14} /> {event.startDate} &nbsp;|&nbsp; {event.timeDisplay}
                    </p>
                  </div>
                </div>

                <div className={styles.bannerActions}>
                  <DashboardButton
                    variant="secondary"
                    size="sm"
                    icon={<Share2 size={14} />}
                  >
                    Share Event
                  </DashboardButton>
                </div>
              </div>

              <div className={styles.descPreview}>
                <div
                  className={`${styles.descText} ${!isDescExpanded ? styles.descClamped : ""}`}
                  dangerouslySetInnerHTML={{ __html: event.description }}
                />
                <button
                  type="button"
                  className={styles.seeMoreBtn}
                  onClick={() => setIsDescExpanded(!isDescExpanded)}
                >
                  {isDescExpanded ? "See less" : "See more"}
                </button>
              </div>
            </div>
          </div>

          {/* Overview */}
          <div>
            <h2 className={styles.sectionTitle}>Overview</h2>

            <div className={styles.overviewTabs}>
              {overviewTabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  className={`${styles.overviewTabBtn} ${overviewTab === tab.id ? styles.overviewTabBtnActive : ""}`}
                  onClick={() => setOverviewTab(tab.id)}
                >
                  {tab.label}
                  <span className={styles.overviewTabCount}>{tab.count}</span>
                </button>
              ))}
            </div>

            {overviewTab === "tickets" && (
              eventTicketTiers.length > 0 ? (
                <div className={styles.overviewList}>
                  {eventTicketTiers.slice(0, 4).map((tier) => {
                    const tierPct = tier.quota > 0 ? Math.round((tier.sold / tier.quota) * 100) : 0;
                    return (
                      <button
                        key={tier.id}
                        type="button"
                        className={styles.overviewRow}
                        onClick={() => router.push("/dashboard/tickets")}
                      >
                        <span className={styles.overviewRowIcon}>
                          <Ticket size={15} />
                        </span>
                        <span className={styles.overviewRowMain}>
                          <span className={styles.overviewRowTitle}>{tier.name}</span>
                          <span className={styles.overviewRowMeta}>
                            {tier.sold.toLocaleString("id-ID")} / {tier.quota.toLocaleString("id-ID")} sold
                          </span>
                          <span className={styles.overviewRowMeter}>
                            <span className={styles.overviewRowMeterFill} style={{ width: `${tierPct}%` }} />
                          </span>
                        </span>
                        <span className={styles.overviewRowEnd}>
                          <span className={styles.overviewRowValue}>{formatCurrency(tier.price)}</span>
                          <StatusBadge label={tier.status} tone={getTierTone(tier.status)} />
                          <ChevronRight size={14} className={styles.overviewRowChevron} />
                        </span>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <p className={styles.overviewEmpty}>No ticket tiers configured yet.</p>
              )
            )}

            {overviewTab === "coupons" && (
              eventCoupons.length > 0 ? (
                <div className={styles.overviewList}>
                  {eventCoupons.slice(0, 4).map((coupon) => {
                    const couponPct = coupon.quota > 0 ? Math.round((coupon.used / coupon.quota) * 100) : 0;
                    return (
                      <button
                        key={coupon.id}
                        type="button"
                        className={styles.overviewRow}
                        onClick={() => router.push("/dashboard/coupons")}
                      >
                        <span className={styles.overviewRowIcon}>
                          <Tag size={15} />
                        </span>
                        <span className={styles.overviewRowMain}>
                          <span className={styles.overviewRowTitle}>{coupon.code}</span>
                          <span className={styles.overviewRowMeta}>
                            {coupon.used.toLocaleString("id-ID")} / {coupon.quota.toLocaleString("id-ID")} used
                          </span>
                          <span className={styles.overviewRowMeter}>
                            <span className={styles.overviewRowMeterFill} style={{ width: `${couponPct}%` }} />
                          </span>
                        </span>
                        <span className={styles.overviewRowEnd}>
                          <span className={styles.overviewRowValue}>
                            {coupon.discountType === "percentage"
                              ? `${coupon.discountValue}% off`
                              : `${formatCurrency(coupon.discountValue)} off`}
                          </span>
                          <StatusBadge label={coupon.status} tone={getCouponTone(coupon.status)} />
                          <ChevronRight size={14} className={styles.overviewRowChevron} />
                        </span>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <p className={styles.overviewEmpty}>No coupons created yet.</p>
              )
            )}

            {overviewTab === "orders" && (
              eventOrders.length > 0 ? (
                <div className={styles.overviewList}>
                  {eventOrders.slice(0, 4).map((order) => (
                    <button
                      key={order.id}
                      type="button"
                      className={styles.overviewRow}
                      onClick={() => router.push("/dashboard/orders")}
                    >
                      <span className={styles.overviewRowIcon}>
                        <ShoppingCart size={15} />
                      </span>
                      <span className={styles.overviewRowMain}>
                        <span className={styles.overviewRowTitle}>{order.buyerName}</span>
                        <span className={styles.overviewRowMeta}>{order.orderNumber}</span>
                      </span>
                      <span className={styles.overviewRowEnd}>
                        <span className={styles.overviewRowValue}>{formatCurrency(order.totalPrice)}</span>
                        <StatusBadge label={order.status} tone={getOrderTone(order.status)} />
                        <ChevronRight size={14} className={styles.overviewRowChevron} />
                      </span>
                    </button>
                  ))}
                </div>
              ) : (
                <p className={styles.overviewEmpty}>No orders yet.</p>
              )
            )}

            {overviewTab === "visitors" && (
              eventVisitors.length > 0 ? (
                <div className={styles.overviewList}>
                  {eventVisitors.slice(0, 4).map((visitor) => (
                    <button
                      key={visitor.id}
                      type="button"
                      className={styles.overviewRow}
                      onClick={() => router.push("/dashboard/visitors")}
                    >
                      <span className={styles.overviewRowAvatar}>{getInitials(visitor.visitorName)}</span>
                      <span className={styles.overviewRowMain}>
                        <span className={styles.overviewRowTitle}>{visitor.visitorName}</span>
                        <span className={styles.overviewRowMeta}>{visitor.ticketCategory}</span>
                      </span>
                      <span className={styles.overviewRowEnd}>
                        <StatusBadge
                          label={visitor.isCheckedIn ? "Checked In" : "Not Checked In"}
                          tone={visitor.isCheckedIn ? "positive" : "neutral"}
                        />
                        <ChevronRight size={14} className={styles.overviewRowChevron} />
                      </span>
                    </button>
                  ))}
                </div>
              ) : (
                <p className={styles.overviewEmpty}>No visitors registered yet.</p>
              )
            )}

            {activeOverviewTab.count > 4 && (
              <button
                type="button"
                className={styles.overviewViewAll}
                onClick={() => router.push(activeOverviewTab.href)}
              >
                View all {activeOverviewTab.count} {activeOverviewTab.label.toLowerCase()}
                <ChevronRight size={14} />
              </button>
            )}
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.columnRight}>
          <div className={styles.linksPanel}>
            {/* Event Actions */}
            <div className={styles.sidebarActions}>
              <DashboardButton
                variant="secondary"
                size="sm"
                icon={<Edit size={14} />}
                onClick={() => router.push(`/dashboard/events/${event.id}/edit`)}
                className={styles.sidebarActionBtn}
              >
                Edit Details
              </DashboardButton>

              {event.status === "Active" ? (
                <DashboardButton
                  variant="primary"
                  size="sm"
                  icon={<PowerOff size={14} />}
                  onClick={() => handleToggleStatus("Draft")}
                  className={styles.sidebarActionBtn}
                >
                  Deactivate
                </DashboardButton>
              ) : (
                <DashboardButton
                  variant="primary"
                  size="sm"
                  icon={<Power size={14} />}
                  onClick={() => handleToggleStatus("Active")}
                  className={styles.sidebarActionBtn}
                >
                  Publish Event
                </DashboardButton>
              )}
            </div>

            {/* Performance Metrics */}
            <div className={styles.metricsPanel}>
              <div className={styles.metricRow}>
                <div className={styles.metricHead}>
                  <span className={styles.metricIcon}>
                    <Ticket size={15} />
                  </span>
                  <span className={styles.metricLabel}>Tickets Sold</span>
                  <span className={styles.metricPct}>{soldPct}%</span>
                </div>
                <p className={styles.metricValue}>
                  {event.ticketsSold.toLocaleString("id-ID")}
                  <span className={styles.statValueSuffix}> / {event.totalQuota.toLocaleString("id-ID")}</span>
                </p>
                <div className={styles.progressTrack}>
                  <div className={styles.progressFill} style={{ width: `${soldPct}%` }} />
                </div>
              </div>

              <div className={styles.metricRow}>
                <div className={styles.metricHead}>
                  <span className={styles.metricIcon}>
                    <ShoppingCart size={15} />
                  </span>
                  <span className={styles.metricLabel}>Orders</span>
                </div>
                <p className={styles.metricValue}>{paidOrders.length}</p>
                <p className={styles.metricFootnote}>
                  {eventOrders.length - paidOrders.length} pending / failed
                </p>
              </div>

              <div className={styles.metricRow}>
                <div className={styles.metricHead}>
                  <span className={styles.metricIcon}>
                    <UserCheck size={15} />
                  </span>
                  <span className={styles.metricLabel}>Checked In</span>
                  <span className={styles.metricPct}>{checkInPct}%</span>
                </div>
                <p className={styles.metricValue}>
                  {checkedInCount.toLocaleString("id-ID")}
                  <span className={styles.statValueSuffix}> / {eventVisitors.length.toLocaleString("id-ID")}</span>
                </p>
                <div className={styles.progressTrack}>
                  <div className={styles.progressFill} style={{ width: `${checkInPct}%` }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
