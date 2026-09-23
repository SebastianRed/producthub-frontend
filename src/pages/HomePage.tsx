import { AlertTriangle, Boxes, Tags } from "lucide-react";

import StatCard from "../components/StatCard/StatCard";

import styles from "./HomePage.module.css";

export default function HomePage() {
  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <div>
          <h1>Dashboard</h1>
          <p>Resumen general de tu inventario.</p>
        </div>
      </header>

      <section className={styles.statsGrid}>
        <StatCard
          title="Productos"
          value={128}
          description="Productos registrados"
          icon={Boxes}
        />

        <StatCard
          title="Categorías"
          value={12}
          description="Categorías disponibles"
          icon={Tags}
        />

        <StatCard
          title="Bajo stock"
          value={7}
          description="Productos que requieren atención"
          icon={AlertTriangle}
          variant="warning"
        />
      </section>

      <section className={styles.overview}>
        <div className={styles.sectionHeader}>
          <div>
            <h2>Resumen de inventario</h2>
            <p>Estado actual del inventario.</p>
          </div>
        </div>

        <div className={styles.inventoryCard}>
          <div className={styles.inventoryItem}>
            <span>Inventario total</span>
            <strong>128 productos</strong>
          </div>

          <div className={styles.inventoryItem}>
            <span>Stock normal</span>
            <strong>121 productos</strong>
          </div>

          <div className={styles.inventoryItem}>
            <span>Stock bajo</span>
            <strong className={styles.warningText}>7 productos</strong>
          </div>
        </div>
      </section>
    </div>
  );
}