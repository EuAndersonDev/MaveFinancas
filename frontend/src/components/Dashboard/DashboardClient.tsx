"use client";
import React, { useState } from "react";
import BalanceHero from "@/components/Dashboard/BalanceHero/BalanceHero";
import DonutCard from "@/components/Dashboard/DonutCard/DonutCard";
import CategoryBarsCard from "@/components/Dashboard/CategoryBarsCard/CategoryBarsCard";
import SummaryCards from "@/components/Dashboard/SummaryCards/SummaryCards";
import TransactionsSection from "@/components/Dashboard/TransactionsSection/TransactionsSection";
import styles from "@/app/dashboard/page.module.css";

type Tx = { id: string; date: string; description: string; category: string; amount: number };
type DonutItem = { label: string; value: number; color: string; icon?: string };
type CategoryItem = { name: string; percent: number; value: string };
type DashboardData = {
  balance: number;
  kpis: {
    invested: number;
    income: { value: number; trend: string };
    expenses: { value: number; trend: string };
  };
  distribution: DonutItem[];
  categories: CategoryItem[];
  transactions: Tx[];
};

export default function DashboardClient({ initial }: { initial: DashboardData }) {
  const [transactions, setTransactions] = useState<Tx[]>(initial.transactions);
  const brl = (n: number) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Dashboard</h2>
      <section className={styles.gridMain}>
        <div className={styles.leftCol}>
          <div className={styles.leftFull}>
            <BalanceHero
              balance={initial.balance}
              userId="mock-user"
              accountId="mock-account"
              onTransactionCreated={(created) => {
                setTransactions(prev => [
                  { id: created.id, date: created.date?.slice(5,10) || "", description: created.description, category: created.type === "deposit" ? "Receita" : "Despesa", amount: created.amount },
                  ...prev,
                ]);
              }}
            />
          </div>
          <div className={styles.leftRow3}>
            <div className={styles.col4}><SummaryCards data={[{ title: "Investido", value: brl(initial.kpis.invested) }]} /></div>
            <div className={styles.col4}><SummaryCards data={[{ title: "Receitas (mês)", value: brl(initial.kpis.income.value), trend: initial.kpis.income.trend }]} /></div>
            <div className={styles.col4}><SummaryCards data={[{ title: "Despesas (mês)", value: brl(initial.kpis.expenses.value), trend: initial.kpis.expenses.trend, negative: true }]} /></div>
          </div>
          <div className={styles.leftRow2}>
            <div className={styles.col4}><DonutCard data={initial.distribution} /></div>
            <div className={styles.col8}><CategoryBarsCard items={initial.categories} /></div>
          </div>
        </div>
        <div className={styles.rightCol}>
          <TransactionsSection data={transactions} />
        </div>
      </section>
    </div>
  );
}