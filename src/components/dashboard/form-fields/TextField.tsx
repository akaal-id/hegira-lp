"use client";

import { type ReactNode } from "react";
import styles from "./form-fields.module.css";

interface TextFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "number" | "email";
  multiline?: boolean;
  rows?: number;
  required?: boolean;
  placeholder?: string;
  maxLength?: number;
  showCounter?: boolean;
  min?: number;
  helper?: string;
  actions?: ReactNode;
  endAdornment?: ReactNode;
  className?: string;
}

export default function TextField({
  label,
  value,
  onChange,
  type = "text",
  multiline = false,
  rows = 3,
  required = false,
  placeholder,
  maxLength,
  showCounter = false,
  min,
  helper,
  actions,
  endAdornment,
  className,
}: TextFieldProps) {
  const control = multiline ? (
    <textarea
      required={required}
      rows={rows}
      maxLength={maxLength}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`${styles.inputBase} ${styles.textarea}`}
    />
  ) : (
    <input
      type={type}
      required={required}
      maxLength={maxLength}
      min={min}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={styles.inputBase}
    />
  );

  return (
    <div className={`${styles.fieldGroup} ${className || ""}`}>
      <div className={styles.labelRow}>
        <label className={styles.label}>
          {label} {required && <span className={styles.required}>*</span>}
        </label>
        {actions || (showCounter && (
          <span className={styles.helper}>
            {value.length}/{maxLength} chars
          </span>
        )) || (helper && <span className={styles.helper}>{helper}</span>)}
      </div>
      {endAdornment ? (
        <div className={styles.inputRow}>
          {control}
          {endAdornment}
        </div>
      ) : (
        control
      )}
    </div>
  );
}
