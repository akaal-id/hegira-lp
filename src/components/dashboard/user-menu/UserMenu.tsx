"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, LayoutDashboard, LogOut, UserCircle } from "lucide-react";
import styles from "./UserMenu.module.css";

interface UserMenuProps {
  userName: string;
}

export default function UserMenu({ userName }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div ref={menuRef} className={styles.wrap}>
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className={`${styles.trigger} ${isOpen ? styles.triggerOpen : ""}`}
      >
        <UserCircle size={20} />
        <span className={styles.name}>Hi, {userName}</span>
        <ChevronDown size={15} className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ""}`} />
      </button>

      {isOpen && (
        <div role="menu" className={`glass-panel ${styles.menu}`}>
          <button type="button" role="menuitem" className={`label-mono ${styles.item}`}>
            <LayoutDashboard size={15} /> Dashboard Home
          </button>
          <button type="button" role="menuitem" className={`label-mono ${styles.item} ${styles.itemDanger}`}>
            <LogOut size={15} /> Logout
          </button>
        </div>
      )}
    </div>
  );
}
