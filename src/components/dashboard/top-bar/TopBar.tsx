"use client";

import Link from "next/link";
import { Bell, ChevronDown, LayoutDashboard, LogOut, Menu, Search, UserCircle } from "lucide-react";
import Breadcrumbs, { type BreadcrumbSegment } from "@/components/ui/breadcrumbs/Breadcrumbs";
import styles from "./TopBar.module.css";

interface TopBarProps {
  segments: BreadcrumbSegment[];
  userName: string;
  onToggleMobileNav?: () => void;
}

/** Derives initials from a full name, e.g. "Budi Santoso" → "BS" */
function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

export default function TopBar({ segments, userName, onToggleMobileNav }: TopBarProps) {
  return (
    <header className={styles.header}>
      {/* ── Left: hamburger + breadcrumbs ─────────────── */}
      <div className={styles.left}>
        <button
          type="button"
          onClick={onToggleMobileNav}
          aria-label="Toggle navigation"
          className={styles.menuButton}
        >
          <Menu size={18} />
        </button>
        <Breadcrumbs segments={segments} />
      </div>

      {/* ── Right: search, bell, user dropdown ─────────── */}
      <div className={styles.right}>
        {/* Search pill */}
        <div className={styles.searchWrap}>
          <Search size={13} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search dashboard…"
            className={styles.searchInput}
            readOnly
            aria-label="Search dashboard"
          />
          <kbd className={styles.searchKbd}>⌘K</kbd>
        </div>

        {/* Notification bell */}
        <button type="button" aria-label="Notifications" className={styles.iconBtn}>
          <Bell size={16} />
          <span className={styles.notifDot} aria-hidden />
        </button>

        <details className={styles.details}>
          <summary className={styles.summary}>
            <div className={styles.summaryUser}>
              <span className={styles.avatarCircle} aria-hidden>
                {getInitials(userName)}
              </span>
              <span className={styles.summaryName}>{userName}</span>
            </div>
            <ChevronDown size={14} className={styles.chevron} aria-hidden />
          </summary>

          <div className={styles.menu}>
            {/* User info */}
            <div className={styles.userInfo}>
              <p className={styles.userName}>{userName}</p>
              <p className={styles.userRole}>Event Organizer</p>
            </div>

            {/* Actions */}
            <div className={styles.menuSection}>
              <Link href="/dashboard/account" className={styles.menuItem}>
                <UserCircle size={14} className={styles.menuIcon} />
                Account Info
              </Link>
              <Link href="/dashboard" className={styles.menuItem}>
                <LayoutDashboard size={14} className={styles.menuIcon} />
                Dashboard Home
              </Link>
            </div>

            {/* Logout */}
            <div className={styles.menuSection}>
              <button
                type="button"
                className={`${styles.menuItem} ${styles.menuItemDanger}`}
              >
                <LogOut size={14} className={styles.menuIcon} />
                Sign Out
              </button>
            </div>
          </div>
        </details>
      </div>
    </header>
  );
}
