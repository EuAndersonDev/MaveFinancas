"use client";
import React, { useState } from "react";
import BalanceHero from "@/components/Dashboard/BalanceHero/BalanceHero";
import DonutCard from "@/components/Dashboard/DonutCard/DonutCard";
import CategoryBarsCard from "@/components/Dashboard/CategoryBarsCard/CategoryBarsCard";
import SummaryCards from "@/components/Dashboard/SummaryCards/SummaryCards";
import TransactionsSection from "@/components/Dashboard/TransactionsSection/TransactionsSection";
import styles from "@/app/dashboard/page.module.css";
import { useAuth } from "@/app/context/context";

type Tx = { id: string; date: string; name: string; category: string; amount: number };
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
  const { user } = useAuth();
  const brl = (n: number) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  
  // Usa o ID do usuário logado ou um mock se não estiver logado
  const userId = user?.id?.toString() || "550e8400-e29b-41d4-a716-446655440000";
  const accountId = user?.accountId || "650e8400-e29b-41d4-a716-446655440001";
  
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Dashboard</h2>
      <section className={styles.gridMain}>
        <div className={styles.leftCol}>
          <div className={styles.leftFull}>
            <BalanceHero
              balance={initial.balance}
              userId={userId}
              accountId={accountId}
              onTransactionCreated={(created) => {
                setTransactions(prev => [
                  { id: created.id, date: created.date?.slice(5,10) || "", name: created.name || created.description, category: created.category_name || "Outros", amount: created.amount },
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