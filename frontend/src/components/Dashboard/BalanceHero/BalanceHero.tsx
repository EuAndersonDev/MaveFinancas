"use client";
import SvgIconInline from "@/components/SvgIconInline/SvgIconInline";
import React, { useState } from "react";
import styles from "./BalanceHero.module.css";
import AddTransactionModal from "@/components/Transactions/AddTransactionModal";

type Props = {
  balance?: number;
  userId: string;
  accountId: string;
  onTransactionCreated?: (tx: any) => void;
};

export default function BalanceHero({ balance, userId, accountId, onTransactionCreated }: Props) {
  const [open, setOpen] = useState(false);
  const brl = (n?: number) => (n ?? 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  return (
    <section className={styles.hero}>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <span className={styles.kpiLabel}>Saldo</span>
        <div className={styles.kpiValue}>
          <span>{brl(balance)}</span>
        </div>
      </div>
      <button className={styles.btnPrimary} onClick={() => setOpen(true)}>
        Adicionar Transação
        <span style={{ marginLeft: 8 }}>
          <SvgIconInline src="/lucide_arrow-down-up.svg" size={16} color="#ffffff" />
        </span>
      </button>
      <AddTransactionModal
        open={open}
        onClose={() => setOpen(false)}
        userId={userId}
        accountId={accountId}
        onCreated={(created) => {
          onTransactionCreated?.(created);
        }}
      />
    </section>
  );
}
