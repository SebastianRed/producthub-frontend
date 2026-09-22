import type { LucideIcon } from "lucide-react";

import styles from "./StatCard.module.css";

interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: LucideIcon;
  variant?: "primary" | "warning";
}

export default function StatCard({
  title,
  value,
  description,
  icon: Icon,
  variant = "primary",
}: StatCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <span className={styles.title}>{title}</span>

        <span
          className={`${styles.icon} ${
            variant === "warning" ? styles.warning : ""
          }`}
        >
          <Icon />
        </span>
      </div>

      <strong className={styles.value}>{value}</strong>

      <span className={styles.description}>{description}</span>
    </article>
  );
}