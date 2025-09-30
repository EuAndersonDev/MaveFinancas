import styles from "./signup.module.css";
import SignupSection from "@/components/Signup/SignupSection";
import Image from "next/image";

export default function SignupPage() {
  return (
    <div className={styles.container}>
      <div className={styles.leftSection}>
        <div>
          <h1>Crie sua conta</h1>
          <p>
            A Mave Finanças é uma plataforma de gestão financeira que monitora suas
            movimentações e oferece insights personalizados, facilitando o controle
            do seu orçamento.
          </p>
        </div>
        <SignupSection />
      </div>
      <div className={styles.hiddenHalf} />
      <Image
        src="/logoLogin.svg"
        alt="Logo Mave Finanças"
        width={987}
        height={958}
        priority
        className={styles.logoDecoration}
      />
    </div>
  );
}