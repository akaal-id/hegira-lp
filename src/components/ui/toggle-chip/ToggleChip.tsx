"use client";

import type { ElementType } from "react";
import styles from "./ToggleChip.module.css";

interface ToggleChipProps {
  icon?: ElementType;
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

export default function ToggleChip({ icon: Icon, label, isSelected, onClick }: ToggleChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isSelected}
      className={`label-mono ${styles.chip} ${isSelected ? styles.selected : ""}`}
    >
      {Icon && <Icon size={14} />}
      {label}
    </button>
  );
}
