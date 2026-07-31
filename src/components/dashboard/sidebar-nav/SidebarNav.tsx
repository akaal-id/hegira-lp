"use client";

import { useState, type ElementType } from "react";
import { ChevronRight, SidebarClose, SidebarOpen } from "lucide-react";
import Logo from "@/components/ui/logo/Logo";
import styles from "./SidebarNav.module.css";

export interface SidebarItem {
  id: string;
  label: string;
  icon: ElementType;
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

export default function SidebarNav({ sections, activeId, onSelect }: SidebarNavProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={`${styles.wrap} ${isOpen ? styles.open : styles.collapsed}`}>
      <div className={styles.header}>
        <div className={`${styles.logoWrap} ${isOpen ? styles.logoVisible : styles.logoHidden}`}>
          <Logo variant="sidebar" />
        </div>
        <button
          type="button"
          onClick={() => setIsOpen((v) => !v)}
          aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
          className={styles.toggle}
        >
          {isOpen ? <SidebarClose size={18} /> : <SidebarOpen size={18} />}
        </button>
      </div>

      <nav className={styles.nav}>
        {sections.map((section) => (
          <div key={section.title} className={styles.section}>
            {isOpen && <h3 className={styles.sectionTitle}>{section.title}</h3>}
            <div className={styles.items}>
              {section.items.map((item) => {
                const isActive = item.id === activeId;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onSelect?.(item.id)}
                    title={!isOpen ? item.label : undefined}
                    className={`${styles.item} ${isActive ? styles.itemActive : ""} ${!isOpen ? styles.itemCollapsed : ""}`}
                  >
                    <item.icon size={19} className={styles.itemIcon} />
                    {isOpen && <span className={styles.itemLabel}>{item.label}</span>}
                    {isOpen && isActive && <ChevronRight size={15} className={styles.itemChevron} />}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </div>
  );
}
