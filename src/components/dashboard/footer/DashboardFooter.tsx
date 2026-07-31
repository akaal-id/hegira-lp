import styles from "./DashboardFooter.module.css";

export default function DashboardFooter() {
  return (
    <footer className={styles.footer}>
      <p className={styles.text}>&copy; {new Date().getFullYear()} Hegira. All rights reserved.</p>
    </footer>
  );
}
