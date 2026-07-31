"use client";

import { useEffect, useState, type ElementType } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Logo from "@/components/ui/logo/Logo";
import styles from "./SidebarNav.module.css";

export interface SidebarItem {
  id: string;
  label: string;
  icon: ElementType;
  href?: string;
}

export interface SidebarSection {
  title: string;
  items: SidebarItem[];
}

interface SidebarNavProps {
  sections: SidebarSection[];
  activeId: string;
  onSelect?: (id: string) => void;
}

const STORAGE_KEY = "hegira-sidebar-collapsed";

export default function SidebarNav({ sections, activeId, onSelect }: SidebarNavProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Restore persisted collapse state from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "true") setIsCollapsed(true);
    setHydrated(true);
  }, []);

  // Persist collapse state
  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, String(isCollapsed));
  }, [isCollapsed, hydrated]);

  function handleToggle() {
    setIsCollapsed((prev) => !prev);
  }

  return (
    <div className={`${styles.wrap} ${isCollapsed ? styles.collapsed : styles.open}`}>
      {/* ── Brand block ─────────────────────────────────── */}
      <div className={styles.brandBlock}>
        <Link href="/dashboard" className={styles.brandLink} title="Hegira Organizer Portal">
          <span className={styles.logoWrap}>
            <Logo variant="sidebar" className={styles.logo} />
          </span>
        </Link>
      </div>

      {/* ── Navigation ──────────────────────────────────── */}
      <nav className={styles.nav} aria-label="Dashboard navigation">
        {sections.map((section) => (
          <div key={section.title} className={styles.section}>
            {!isCollapsed && (
              <h3 className={styles.sectionTitle}>{section.title}</h3>
            )}
            <div className={styles.items}>
              {section.items.map((item) => {
                const isActive = item.id === activeId || (item.href && item.href === activeId);
                const className = [
                  styles.item,
                  isActive ? styles.itemActive : "",
                  isCollapsed ? styles.itemCollapsed : "",
                ]
                  .filter(Boolean)
                  .join(" ");

                const content = (
                  <>
                    <item.icon size={16} className={styles.itemIcon} aria-hidden />
                    {!isCollapsed && (
                      <span className={styles.itemLabel}>{item.label}</span>
                    )}
                  </>
                );

                if (item.href) {
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      onClick={() => onSelect?.(item.id)}
                      title={isCollapsed ? item.label : undefined}
                      aria-current={isActive ? "page" : undefined}
                      className={className}
                    >
                      {content}
                    </Link>
                  );
                }

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onSelect?.(item.id)}
                    title={isCollapsed ? item.label : undefined}
                    aria-current={isActive ? "page" : undefined}
                    className={className}
                  >
                    {content}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* ── Footer / collapse toggle ─────────────────────── */}
      <div className={styles.footer}>
        <button
          type="button"
          className={styles.toggleButton}
          onClick={handleToggle}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-expanded={!isCollapsed}
        >
          {isCollapsed ? (
            <ChevronRight className={styles.toggleIcon} aria-hidden />
          ) : (
            <>
              <span className={styles.toggleLabel}>Collapse</span>
              <ChevronLeft className={styles.toggleIcon} aria-hidden />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
