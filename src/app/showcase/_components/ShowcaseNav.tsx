"use client";

import styles from "./ShowcaseNav.module.css";

interface NavGroup {
  title: string;
  items: { id: string; label: string }[];
}

const GROUPS: NavGroup[] = [
  {
    title: "Core UI",
    items: [
      { id: "logo", label: "Logo" },
      { id: "toggle-chip", label: "Toggle chip" },
      { id: "loader", label: "Loader" },
      { id: "radial-progress", label: "Radial progress" },
      { id: "breadcrumbs", label: "Breadcrumbs" },
      { id: "article-card", label: "Article card" },
      { id: "feature-item", label: "Feature item" },
      { id: "floating-help-button", label: "Floating help button" },
      { id: "copyable-text", label: "Copyable text" },
      { id: "status-badge", label: "Status badge" },
      { id: "toast", label: "Toast" },
      { id: "confirmation-modal", label: "Confirmation modal" },
    ],
  },
  {
    title: "Dashboard",
    items: [
      { id: "sidebar-nav", label: "Sidebar nav" },
      { id: "top-bar", label: "Top bar" },
      { id: "data-table", label: "Data table" },
      { id: "event-card", label: "Event card" },
      { id: "ticket-item-card", label: "Ticket item card" },
      { id: "coupon-item-card", label: "Coupon item card" },
      { id: "dashboard-footer", label: "Dashboard footer" },
      { id: "add-ticket-modal", label: "Add ticket modal" },
    ],
  },
];

export default function ShowcaseNav() {
  return (
    <nav aria-label="Component index" className={styles.nav}>
      {GROUPS.map((group) => (
        <div key={group.title} className={styles.group}>
          <p className={`label-mono ${styles.groupTitle}`}>{group.title}</p>
          <ul className={styles.list}>
            {group.items.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className={styles.link}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}
