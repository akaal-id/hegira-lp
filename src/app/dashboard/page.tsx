"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Calendar,
  CheckCircle2,
  ClipboardList,
  FileText,
  PlusCircle,
  Search,
} from "lucide-react";
import EventCardDB from "@/components/dashboard/event-card/EventCardDB";
import type { StatusTone } from "@/components/ui/status-badge/StatusBadge";
import DashboardButton from "@/components/ui/dashboard-button/DashboardButton";
import { initialDashboardEvents, type DashboardEvent } from "@/components/dashboard/mockData";
import shellStyles from "./DashboardShell.module.css";
import pageStyles from "./events.module.css";

function getTodayLabel(): string {
  return new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function DashboardHomePage() {
  const router = useRouter();
  const [events] = useState<DashboardEvent[]>(initialDashboardEvents);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const heroStats = [
    { label: "All Events", count: events.length, icon: ClipboardList, color: "var(--color-hegra-navy)" },
    { label: "Active Events", count: events.filter((e) => e.status === "Active").length, icon: CheckCircle2, color: "var(--color-hegra-turquoise)" },
    { label: "Draft Events", count: events.filter((e) => e.status === "Draft").length, icon: FileText, color: "var(--color-hegra-yellow)" },
    { label: "Completed Events", count: events.filter((e) => e.status === "Completed").length, icon: Calendar, color: "color-mix(in srgb, var(--color-hegra-navy) 40%, transparent)" },
  ];

  const filteredEvents = useMemo(() => {
    return events.filter((evt) => {
      const matchesSearch =
        evt.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        evt.theme.toLowerCase().includes(searchTerm.toLowerCase()) ||
        evt.location.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || evt.status.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [events, searchTerm, statusFilter]);

  const getStatusTone = (status: string): StatusTone => {
    if (status === "Active") return "positive";
    if (status === "Draft") return "warning";
    return "neutral";
  };

  return (
    <>
      {/* Hero Banner */}
      <div className={shellStyles.hero}>
        <div>
          <p className={shellStyles.heroEyebrow}>{getTodayLabel()}</p>
          <h1 className={shellStyles.heroTitle}>Hello, Indra</h1>
          <p className={shellStyles.heroText}>
            Manage your events, tickets, and revenue from one place.
          </p>
        </div>
        <div className={shellStyles.heroMeta}>
          {heroStats.map(({ label, count, icon: Icon, color }) => (
            <div key={label} className={shellStyles.heroMetricCard}>
              <div className={shellStyles.heroMetricHeader}>
                <span>{label}</span>
                <Icon size={14} style={{ color }} />
              </div>
              <div className={shellStyles.heroMetricCount}>{count}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Event List View */}
      <div className={pageStyles.container}>
        <div className={pageStyles.toolbar}>
          <div className={pageStyles.searchWrapper}>
            <Search size={18} className={pageStyles.searchIcon} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search events by name, theme, or venue location..."
              className={pageStyles.searchInput}
            />
          </div>

          <div className={pageStyles.actionsGroup}>
            <div className={pageStyles.filterGroup}>
              {["all", "active", "draft", "completed"].map((f) => (
                <DashboardButton
                  key={f}
                  variant="filter"
                  size="sm"
                  active={statusFilter === f}
                  onClick={() => setStatusFilter(f)}
                  className={pageStyles.toolbarBtn}
                  style={{ textTransform: "capitalize" }}
                >
                  {f === "all" ? "All" : f}
                </DashboardButton>
              ))}
            </div>

            <DashboardButton
              variant="primary"
              size="sm"
              icon={<PlusCircle size={16} />}
              onClick={() => router.push("/dashboard/events/create")}
              className={pageStyles.toolbarBtn}
            >
              Create New Event
            </DashboardButton>
          </div>
        </div>

        {filteredEvents.length > 0 ? (
          <div className={pageStyles.grid}>
            {filteredEvents.map((evt) => (
              <EventCardDB
                key={evt.id}
                event={{
                  id: evt.id,
                  name: evt.name,
                  coverImageUrl: evt.coverImageUrl,
                  status: evt.status,
                  statusTone: getStatusTone(evt.status),
                  date: evt.startDate,
                  time: evt.timeDisplay,
                  address: evt.location,
                }}
                onView={() => router.push(`/dashboard/events/${evt.id}`)}
                onEdit={() => router.push(`/dashboard/events/${evt.id}/edit`)}
              />
            ))}
          </div>
        ) : (
          <div className={pageStyles.emptyState}>
            <p className={pageStyles.emptyText}>No events found matching your search.</p>
            <DashboardButton
              variant="ghost"
              size="sm"
              onClick={() => router.push("/dashboard/events/create")}
            >
              Create New Event Now
            </DashboardButton>
          </div>
        )}
      </div>
    </>
  );
}
