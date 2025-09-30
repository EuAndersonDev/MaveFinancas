"use client";

import Image from "next/image";
import styles from "./login.module.css";
import LoginSection from "@/components/Login/LoginSection";

export default function LoginPage() {
  return (
    <main className={styles.container}>
      <section className={styles.leftSection}>
        <div>
          <h1>Bem-vindo</h1>
          <p>
             Realize seu login para gerenciar suas finanças com praticidade e controle total.
          </p>
        </div>
        <LoginSection />
      </section>
      <div className={styles.hiddenHalf} />
      <Image
        src="/logoLogin.svg"
        alt="Logo Mave Finanças"
        width={987}
        height={958}
        priority
        className={styles.logoDecoration}
      />
    </main>
  );
}