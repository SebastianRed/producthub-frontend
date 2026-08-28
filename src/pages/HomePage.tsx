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
        <article className={styles.statCard}>
          <div className={styles.statHeader}>
            <span className={styles.statLabel}>Productos</span>
            <span className={styles.statIcon}>▣</span>
          </div>

          <strong className={styles.statValue}>128</strong>

          <span className={styles.statDescription}>
            Productos registrados
          </span>
        </article>

        <article className={styles.statCard}>
          <div className={styles.statHeader}>
            <span className={styles.statLabel}>Categorías</span>
            <span className={styles.statIcon}>▦</span>
          </div>

          <strong className={styles.statValue}>12</strong>

          <span className={styles.statDescription}>
            Categorías disponibles
          </span>
        </article>

        <article className={styles.statCard}>
          <div className={styles.statHeader}>
            <span className={styles.statLabel}>Bajo stock</span>
            <span className={`${styles.statIcon} ${styles.warningIcon}`}>
              !
            </span>
          </div>

          <strong className={styles.statValue}>7</strong>

          <span className={styles.statDescription}>
            Productos que requieren atención
          </span>
        </article>
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