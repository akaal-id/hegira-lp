"use client";

import { type ReactNode, useRef, useState } from "react";
import { Bold, Italic, List, ListOrdered } from "lucide-react";
import styles from "./form-fields.module.css";

interface RichTextFieldProps {
  label: string;
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  minHeight?: string;
  actions?: ReactNode;
  className?: string;
  /** Stretch to fill the height of its flex/grid container instead of sizing to minHeight. */
  fill?: boolean;
}

export default function RichTextField({
  label,
  value,
  onChange,
  placeholder = "Start typing...",
  minHeight = "8rem",
  actions,
  className,
  fill = false,
}: RichTextFieldProps) {
  const editableRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  const exec = (command: string) => {
    editableRef.current?.focus();
    document.execCommand(command);
    onChange(editableRef.current?.innerHTML || "");
  };

  return (
    <div className={`${styles.fieldGroup} ${fill ? styles.fieldGroupFill : ""} ${className || ""}`}>
      <div className={styles.labelRow}>
        <label className={styles.label}>{label}</label>
        {actions}
      </div>

      <div
        className={`${styles.richTextShell} ${isFocused ? styles.richTextShellFocused : ""} ${
          fill ? styles.richTextShellFill : ""
        }`}
      >
        <div className={styles.richTextToolbar}>
          <button type="button" className={styles.richToolBtn} onMouseDown={(e) => e.preventDefault()} onClick={() => exec("bold")} aria-label="Bold">
            <Bold size={14} />
          </button>
          <button type="button" className={styles.richToolBtn} onMouseDown={(e) => e.preventDefault()} onClick={() => exec("italic")} aria-label="Italic">
            <Italic size={14} />
          </button>
          <div className={styles.richToolDivider} />
          <button type="button" className={styles.richToolBtn} onMouseDown={(e) => e.preventDefault()} onClick={() => exec("insertUnorderedList")} aria-label="Bullet list">
            <List size={14} />
          </button>
          <button type="button" className={styles.richToolBtn} onMouseDown={(e) => e.preventDefault()} onClick={() => exec("insertOrderedList")} aria-label="Numbered list">
            <ListOrdered size={14} />
          </button>
        </div>

        <div
          ref={editableRef}
          contentEditable
          suppressContentEditableWarning
          data-placeholder={placeholder}
          className={`${styles.richTextEditable} ${fill ? styles.richTextEditableFill : ""}`}
          style={fill ? undefined : { minHeight }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onInput={(e) => onChange(e.currentTarget.innerHTML)}
          dangerouslySetInnerHTML={{ __html: value }}
        />
      </div>
    </div>
  );
}
