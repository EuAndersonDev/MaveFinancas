import React from "react";
import styles from "./TransactionsTable.module.css";
import SvgIconInline from "@/components/SvgIconInline/SvgIconInline";

type Tx = { id: string; date: string; description: string; category: string; amount: number };

const txs: Tx[] = [
  { id: "1", date: "10/10", description: "Salário", category: "Receita", amount: 4250 },
  { id: "2", date: "11/10", description: "Mercado", category: "Alimentação", amount: -320.45 },
  { id: "3", date: "11/10", description: "Uber", category: "Transporte", amount: -37.9 },
  { id: "4", date: "12/10", description: "Pix recebido", category: "Receita", amount: 150 },
  { id: "5", date: "12/10", description: "Conta de luz", category: "Moradia", amount: -210.35 },
  { id: "6", date: "13/10", description: "Almoço", category: "Alimentação", amount: -48.9 },
  { id: "7", date: "13/10", description: "Gasolina", category: "Transporte", amount: -180 },
  { id: "8", date: "14/10", description: "Internet", category: "Moradia", amount: -120 },
  { id: "9", date: "14/10", description: "Cinema", category: "Lazer", amount: -42 },
  { id: "10", date: "15/10", description: "Pix recebido", category: "Receita", amount: 200 },
  { id: "11", date: "15/10", description: "Farmácia", category: "Saúde", amount: -68.5 },
  { id: "12", date: "16/10", description: "Assinatura Netflix", category: "Lazer", amount: -39.9 },
  { id: "13", date: "16/10", description: "Café", category: "Alimentação", amount: -12.5 },
];

export default function TransactionsTable({ data = txs }: { data?: Tx[] }) {
  return (
    <section className={styles.card} aria-label="Transações recentes">
      <h3 className={styles.title}>Transações recentes</h3>
      <div className={styles.scroll}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Data</th>
              <th>Descrição</th>
              <th>Categoria</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            {data.map((t) => {
            const isIncome = t.amount > 0;
            const isExpense = t.amount < 0 && t.category !== "Investimento";
            const isInvest = t.category === "Investimento" || (t.amount < 0 && t.description.toLowerCase().includes("bitcoin"));
            const color = isIncome ? "#39BE00" : isExpense ? "#E93030" : "#ffffff";
            const iconSrc = isIncome
              ? "/16_Trending Up.svg"
              : isExpense
              ? "/16_Trending Down.svg"
              : "/16_Piggy Bank.svg";
            const amountColor = isIncome ? "#39BE00" : isExpense ? "#E93030" : "#fff";
            return (
              <tr key={t.id}>
              <td>{t.date}</td>
              <td>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                    <span style={{ background: "var(--surface-03)", border: "1px solid var(--stroke)", borderRadius: 10.667, padding: 10, display: "inline-flex", width: 40, height: 40, alignItems: "center", justifyContent: "center" }}>
                      <SvgIconInline src={iconSrc} size={20} color={color} />
                    </span>
                  {t.description}
                </span>
              </td>
              <td>{t.category}</td>
                <td style={{ color: amountColor, fontWeight: 700 }}>
                  {t.amount.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                </td>
              </tr>
            );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
