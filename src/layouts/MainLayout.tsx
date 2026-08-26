import { Outlet } from "react-router-dom";

import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";

import styles from "./MainLayout.module.css";

export default function MainLayout() {
  return (
    <div className={styles.layout}>
      <Sidebar />

      <div className={styles.mainArea}>
        <Header />

        <main className={styles.main}>
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
}