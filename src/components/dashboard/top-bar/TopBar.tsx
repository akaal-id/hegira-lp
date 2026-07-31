"use client";

import { Menu } from "lucide-react";
import Breadcrumbs, { type BreadcrumbSegment } from "@/components/ui/breadcrumbs/Breadcrumbs";
import UserMenu from "@/components/dashboard/user-menu/UserMenu";
import styles from "./TopBar.module.css";

interface TopBarProps {
  segments: BreadcrumbSegment[];
  userName: string;
  onToggleMobileNav?: () => void;
}

export default function TopBar({ segments, userName, onToggleMobileNav }: TopBarProps) {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <button
          type="button"
          onClick={onToggleMobileNav}
          aria-label="Toggle navigation"
          className={styles.menuButton}
        >
          <Menu size={20} />
        </button>
        <Breadcrumbs segments={segments} />
      </div>
      <UserMenu userName={userName} />
    </header>
  );
}
