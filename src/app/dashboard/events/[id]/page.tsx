"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Calendar,
  Clock,
  MapPin,
  Edit,
  Power,
  PowerOff,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import StatusBadge, { type StatusTone } from "@/components/ui/status-badge/StatusBadge";
import DashboardButton from "@/components/ui/dashboard-button/DashboardButton";
import { initialDashboardEvents, type DashboardEvent } from "@/components/dashboard/mockData";
import styles from "./eventDetail.module.css";

export default function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  const [events, setEvents] = useState<DashboardEvent[]>(initialDashboardEvents);
  const [isDescOpen, setIsDescOpen] = useState(true);
  const [isTermsOpen, setIsTermsOpen] = useState(true);

  const event = events.find((e) => e.id === id) || events[0];

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

  return (
    <div className={styles.container}>
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
          <div>
            <h1 className={styles.eventTitle}>{event.name}</h1>
            <p className={styles.eventTheme}>{event.theme}</p>
          </div>

          <div className={styles.bannerActions}>
            <DashboardButton
              variant="secondary"
              size="sm"
              icon={<Edit size={14} />}
              onClick={() => router.push(`/dashboard/events/${event.id}/edit`)}
            >
              Edit Details
            </DashboardButton>

            {event.status === "Active" ? (
              <DashboardButton
                variant="ghost"
                size="sm"
                icon={<PowerOff size={14} />}
                onClick={() => handleToggleStatus("Draft")}
              >
                Deactivate
              </DashboardButton>
            ) : (
              <DashboardButton
                variant="primary"
                size="sm"
                icon={<Power size={14} />}
                onClick={() => handleToggleStatus("Active")}
              >
                Publish Event
              </DashboardButton>
            )}
          </div>
        </div>
      </div>

      {/* Meta Grid (Date, Time, Location) */}
      <div className={styles.metaGrid}>
        <div className={styles.metaCard}>
          <Calendar className={styles.metaIcon} size={20} />
          <div>
            <p className={styles.metaLabel}>Date</p>
            <p className={styles.metaValue}>{event.startDate}</p>
          </div>
        </div>

        <div className={styles.metaCard}>
          <Clock className={styles.metaIcon} size={20} />
          <div>
            <p className={styles.metaLabel}>Time</p>
            <p className={styles.metaValue}>{event.timeDisplay}</p>
          </div>
        </div>

        <div className={styles.metaCard}>
          <MapPin className={styles.metaIcon} size={20} />
          <div>
            <p className={styles.metaLabel}>Location</p>
            <p className={styles.metaValue}>{event.location}</p>
          </div>
        </div>
      </div>

      {/* Full Description Section */}
      <div className={styles.card}>
        <div
          className={styles.cardHeader}
          onClick={() => setIsDescOpen(!isDescOpen)}
        >
          <h2 className={styles.cardTitle}>Event Description</h2>
          {isDescOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
        {isDescOpen && <div className={styles.cardBody}>{event.description}</div>}
      </div>

      {/* Terms & Conditions Section */}
      <div className={styles.card}>
        <div
          className={styles.cardHeader}
          onClick={() => setIsTermsOpen(!isTermsOpen)}
        >
          <h2 className={styles.cardTitle}>Terms & Conditions</h2>
          {isTermsOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
        {isTermsOpen && <div className={styles.cardBody}>{event.termsAndConditions}</div>}
      </div>
    </div>
  );
}
