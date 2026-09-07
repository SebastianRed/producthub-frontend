import { NavLink } from "react-router-dom";

import styles from "./Sidebar.module.css";

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <span className={styles.logoMark}>P</span>

        <span className={styles.logoText}>ProductHub</span>
      </div>

      <nav className={styles.navigation}>
        <span className={styles.sectionTitle}>MENÚ</span>

        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `${styles.navItem} ${isActive ? styles.active : ""}`
          }
        >
          <span className={styles.icon}>⌂</span>
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/products"
          className={({ isActive }) =>
            `${styles.navItem} ${isActive ? styles.active : ""}`
          }
        >
          <span className={styles.icon}>▣</span>
          <span>Productos</span>
        </NavLink>

        <NavLink
          to="/categories"
          className={({ isActive }) =>
            `${styles.navItem} ${isActive ? styles.active : ""}`
          }
        >
          <span className={styles.icon}>▦</span>
          <span>Categorías</span>
        </NavLink>
      </nav>
    </aside>
  );
}