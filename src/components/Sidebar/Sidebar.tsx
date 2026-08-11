import { NavLink } from "react-router-dom";

import styles from "./Sidebar.module.css";

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Dashboard</NavLink>
          </li>

          <li>
            <NavLink to="/products">Productos</NavLink>
          </li>

          <li>
            <NavLink to="/categories">Categorías</NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}