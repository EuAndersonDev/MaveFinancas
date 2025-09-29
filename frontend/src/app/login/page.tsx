"use client";

import Image from "next/image";
import styles from "./login.module.css";
import LoginForm from "@/components/Login/LoginForm";

export default function LoginPage() {
  return (
    <main className={styles.container}>
      <section className={styles.leftSection}>
        <div>
          <h1>Bem-vindo</h1>
          <p>
            A Mave Finanças é uma plataforma de gestão financeira que monitora suas
            movimentações e oferece insights personalizados, facilitando o controle
            do seu orçamento.
          </p>
        </div>

        <LoginForm
          onCreateAccount={() => {
            // Ex: redirecionar para /register
            console.log("Ir para fluxo de criação de conta");
          }}
          onSuccess={(data) => {
            console.log("Login OK:", data);
            // Ex: redirecionar dashboard
          }}
        />
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