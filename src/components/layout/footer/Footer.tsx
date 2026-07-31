import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/button/Button";
import styles from "./Footer.module.css";

const PRODUCT_LINKS = [
  { href: "#features", label: "Ticketing" },
  { href: "#features", label: "Event Management" },
  { href: "#business-matching", label: "Business Matching" },
];

const COMPANY_LINKS = [
  { href: "#about", label: "About" },
  { href: "mailto:hello@hegira.id", label: "Contact" },
];

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://instagram.com",
    path: "M12 2c2.7 0 3.05.01 4.12.06 1.07.05 1.8.22 2.44.47.66.26 1.22.6 1.77 1.15.55.55.9 1.11 1.15 1.77.25.64.42 1.37.47 2.44C21.99 8.95 22 9.3 22 12s-.01 3.05-.06 4.12c-.05 1.07-.22 1.8-.47 2.44a4.9 4.9 0 0 1-1.15 1.77 4.9 4.9 0 0 1-1.77 1.15c-.64.25-1.37.42-2.44.47C15.05 21.99 14.7 22 12 22s-3.05-.01-4.12-.06c-1.07-.05-1.8-.22-2.44-.47a4.9 4.9 0 0 1-1.77-1.15 4.9 4.9 0 0 1-1.15-1.77c-.25-.64-.42-1.37-.47-2.44C2.01 15.05 2 14.7 2 12s.01-3.05.06-4.12c.05-1.07.22-1.8.47-2.44.26-.66.6-1.22 1.15-1.77A4.9 4.9 0 0 1 5.45 2.53c.64-.25 1.37-.42 2.44-.47C8.95 2.01 9.3 2 12 2Zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 8.2A3.2 3.2 0 1 1 12 8.8a3.2 3.2 0 0 1 0 6.4ZM17.4 6a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4Z",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    path: "M6.94 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM3 8.5h4V21H3V8.5Zm6.5 0h3.83v1.71h.05c.53-1 1.84-2.06 3.78-2.06 4.04 0 4.79 2.66 4.79 6.12V21h-4v-6.13c0-1.46-.03-3.34-2.03-3.34-2.04 0-2.35 1.6-2.35 3.24V21h-4V8.5Z",
  },
  {
    label: "X",
    href: "https://x.com",
    path: "M18.9 3H21.7l-6.06 6.93L22.8 21h-5.6l-4.38-5.73L7.8 21H5l6.48-7.41L4.7 3h5.74l3.96 5.24L18.9 3Zm-.98 16.17h1.53L7.16 4.74H5.51l12.4 14.43Z",
  },
];

export default function Footer() {
  return (
    <footer data-surface="dark" className={styles.footer}>
      <span aria-hidden="true" className={styles.ctaGlow} />
      <div className={styles.ctaWrap}>
        <h2 className={styles.ctaTitle}>Ready to run your next event on Hegira?</h2>
        <div className={styles.ctaButtonWrap}>
          <Button href="#">Start Free</Button>
        </div>
      </div>

      <div className={styles.linksGrid}>
        <div className={styles.brandCol}>
          <Image
            src="/icon/hegiralogo.png"
            alt="Hegira"
            width={988}
            height={386}
            className={styles.brandLogo}
          />
          <p className={styles.brandTagline}>The integrated event platform for organizers.</p>
        </div>

        <div className={styles.linkCol}>
          <h3 className={`label-mono ${styles.linkColHeading}`}>Product</h3>
          <nav aria-label="Product" className={styles.linkList}>
            {PRODUCT_LINKS.map((link) => (
              <Link key={link.label} href={link.href} className={`focus-on-navy ${styles.footerLink}`}>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className={styles.linkCol}>
          <h3 className={`label-mono ${styles.linkColHeading}`}>Company</h3>
          <nav aria-label="Company" className={styles.linkList}>
            {COMPANY_LINKS.map((link) => (
              <Link key={link.label} href={link.href} className={`focus-on-navy ${styles.footerLink}`}>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className={styles.linkCol}>
          <h3 className={`label-mono ${styles.linkColHeading}`}>Social</h3>
          <div className={styles.socialRow}>
            {SOCIAL_LINKS.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className={`focus-on-navy ${styles.socialLink}`}
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                  <path d={social.path} />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <div className={styles.bottomInner}>
          <p>© 2026 Hegira. Powered by Akaal.</p>
          <div className={styles.legalRow}>
            <Link href="#" className={`focus-on-navy ${styles.legalLink}`}>
              Privacy
            </Link>
            <Link href="#" className={`focus-on-navy ${styles.legalLink}`}>
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
