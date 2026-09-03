import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div>
        <span className={styles.subtitle}>Panel administrativo</span>
      </div>

      <div className={styles.user}>
        <div className={styles.avatar}>A</div>

        <div className={styles.userInfo}>
          <span className={styles.userName}>Administrador</span>
          <span className={styles.userRole}>Gestión de inventario</span>
        </div>
      </div>
    </header>
  );
}