import styles from "./Breadcrumbs.module.css";

export interface BreadcrumbSegment {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  segments: BreadcrumbSegment[];
}

export default function Breadcrumbs({ segments }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={styles.nav}>
      <ol className={styles.list}>
        {segments.map((segment, index) => {
          const isCurrent = index === segments.length - 1;
          return (
            <li key={segment.label} className={styles.item}>
              {index > 0 && (
                <span className={styles.separator} aria-hidden="true">
                  /
                </span>
              )}
              {isCurrent || !segment.href ? (
                <span className={styles.current} aria-current={isCurrent ? "page" : undefined}>
                  {segment.label}
                </span>
              ) : (
                <a href={segment.href} className={styles.link}>
                  {segment.label}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
