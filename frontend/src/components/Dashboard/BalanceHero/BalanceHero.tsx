import SvgIconInline from "@/components/SvgIconInline/SvgIconInline";
import React from "react";
import styles from "./BalanceHero.module.css";

export default function BalanceHero({ balance }: { balance?: number }) {
  const brl = (n?: number) => (n ?? 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  return (
    <section className={styles.hero}>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <span className={styles.kpiLabel}>Saldo</span>
        <div className={styles.kpiValue}>
          <span>{brl(balance)}</span>
        </div>
      </div>
      <button className={styles.btnPrimary}>
        Adicionar Transação
        <span style={{ marginLeft: 8 }}>
          <SvgIconInline src="/lucide_arrow-down-up.svg" size={16} color="#ffffff" />
        </span>
      </button>
    </section>
  );
}
