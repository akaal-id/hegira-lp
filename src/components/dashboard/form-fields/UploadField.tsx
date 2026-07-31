"use client";

import { useRef, useState } from "react";
import { UploadCloud, X } from "lucide-react";
import styles from "./form-fields.module.css";

interface UploadFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  badge?: string;
  aspectRatio?: string;
  emptyTitle?: string;
  helperText?: string;
  className?: string;
}

export default function UploadField({
  label,
  value,
  onChange,
  badge,
  aspectRatio = "16 / 9",
  emptyTitle = "Upload Image",
  helperText = "PNG, JPG, or WEBP (Max 5MB)",
  className,
}: UploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const applyFile = (file: File | undefined) => {
    if (!file) return;
    onChange(URL.createObjectURL(file));
  };

  return (
    <div className={`${styles.fieldGroup} ${className || ""}`}>
      <div className={styles.labelRow}>
        <label className={styles.label}>{label}</label>
        {badge && <span className={styles.helper}>{badge}</span>}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => applyFile(e.target.files?.[0])}
      />

      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          applyFile(e.dataTransfer.files?.[0]);
        }}
        className={`${styles.uploadDropzone} ${isDragging ? styles.uploadDropzoneDragging : ""}`}
        style={{ aspectRatio }}
      >
        {value ? (
          <>
            <button
              type="button"
              className={styles.uploadRemoveBtn}
              onClick={(e) => {
                e.stopPropagation();
                onChange("");
              }}
              aria-label="Remove image"
            >
              <X size={14} />
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={value} alt={label} className={styles.previewImage} />
            <div className={styles.uploadOverlay}>
              <span className={`${styles.iconBadge} ${styles.iconBadgeLg}`}>
                <UploadCloud size={22} />
              </span>
              <span className={styles.uploadOverlayTitle}>Replace Image</span>
              <span className={styles.uploadOverlaySub}>{helperText}</span>
            </div>
          </>
        ) : (
          <div className={styles.uploadEmpty}>
            <span className={`${styles.iconBadge} ${styles.iconBadgeLg}`}>
              <UploadCloud size={22} />
            </span>
            <span className={styles.uploadEmptyTitle}>{emptyTitle}</span>
            <span className={styles.uploadEmptySub}>{helperText}</span>
          </div>
        )}
      </div>
    </div>
  );
}
