"use client";

import { useCallback, useState } from "react";
import { Check, Copy } from "lucide-react";
import styles from "./CopyableText.module.css";

interface CopyableTextProps {
  value: string;
  displayText?: string;
  className?: string;
}

export default function CopyableText({ value, displayText, className = "" }: CopyableTextProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // Clipboard API unavailable — nothing else to fall back to in this showcase context.
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [value]);

  return (
    <span className={`${styles.wrap} ${className}`}>
      <span className={styles.text}>{displayText ?? value}</span>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? "Copied" : "Copy"}
        className={styles.button}
      >
        {copied ? <Check size={13} className={styles.check} /> : <Copy size={13} />}
      </button>
    </span>
  );
}
