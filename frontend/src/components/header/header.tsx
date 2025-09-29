"use client";

import styles from "./header.module.css";

interface HeaderProps {
  currentPage?: "dashboard" | "transactions" | "subscription";
}

export default function Header({ currentPage = "dashboard" }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Logo */}
        <div className={styles.logo}>
          <div className={styles.logoGraphic}>
            <div className={styles.bar1}></div>
            <div className={styles.bar2}></div>
            <div className={styles.bar3}></div>
            <div className={styles.bar4}></div>
            <div className={styles.bar5}></div>
            <div className={styles.bar6}></div>
            <div className={styles.bar7}></div>
          </div>
          <span className={styles.logoText}>Mave</span>
        </div>

        {/* Navigation */}
        <nav className={styles.nav}>
          <a 
            href="/dashboard" 
            className={currentPage === "dashboard" ? styles.active : styles.inactive}
          >
            Dashboard
          </a>
          <a 
            href="/transactions" 
            className={currentPage === "transactions" ? styles.active : styles.inactive}
          >
            Transações
          </a>
          <a 
            href="/subscription" 
            className={currentPage === "subscription" ? styles.active : styles.inactive}
          >
            Assinatura
          </a>
        </nav>

        {/* User Profile */}
        <div className={styles.userProfile}>
          <div className={styles.avatar}>
            <div className={styles.avatarBg}></div>
            <img 
              src="https://placehold.co/20x20" 
              alt="User Avatar" 
              className={styles.avatarImg}
            />
          </div>
          <span className={styles.userName}>Alicia Koch</span>
        </div>
      </div>
    </header>
  );
}