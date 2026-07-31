"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import Button from "@/components/ui/button/Button";
import styles from "./Navbar.module.css";

const NAV_LINKS = [
  { href: "/events", label: "Events" },
  { href: "#about", label: "About" },
  { href: "#features", label: "Features" },
  { href: "#business-matching", label: "Business Matching" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className={styles.header}>
      <Link href="#" className={styles.logoLink} aria-label="Hegira home">
        <Image
          src="/icon/hegiralogo.png"
          alt="Hegira"
          width={988}
          height={386}
          priority
          className={styles.logo}
        />
      </Link>

      <div className={styles.navWrap}>
        <div className={styles.pill}>
          <div className={styles.startWrap}>
            <Button href="#" fill>
              Start Free
            </Button>
          </div>

          <motion.button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="nav-dropdown"
            aria-label={open ? "Close menu" : "Open menu"}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={styles.menuButton}
          >
            {open ? (
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </motion.button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.nav
              id="nav-dropdown"
              aria-label="Main navigation"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className={styles.dropdown}
            >
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`label-mono ${styles.dropdownRow}`}
                >
                  {link.label}
                  <span aria-hidden="true" className={styles.rowArrow}>
                    →
                  </span>
                </Link>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
