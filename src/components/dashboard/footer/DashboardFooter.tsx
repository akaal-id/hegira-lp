import styles from "./DashboardFooter.module.css";

export default function DashboardFooter() {
  return (
    <footer className={`label-mono ${styles.footer}`}>
      <p className={styles.text}>&copy; {new Date().getFullYear()} Hegira. All rights reserved.</p>
      <div className={styles.status}>
        <span className={styles.statusDot} />
        <span>All Systems Operational</span>
      </div>
    </footer>
  );
}
