import React from "react";
import styles from "./SummaryCards.module.css";
import SvgIconInline from "@/components/SvgIconInline/SvgIconInline";

type Card = {
  title: string;
  value: string;
  trend?: string;
  negative?: boolean;
};

const defaultData: Card[] = [
  { title: "Investido", value: "R$ 3.500,00" },
  { title: "Receitas (mês)", value: "R$ 8.150,00", trend: "+3,1%" },
  { title: "Despesas (mês)", value: "R$ 2.950,00", trend: "-1,4%", negative: true },
];

export default function SummaryCards({ data = defaultData }: { data?: Card[] }) {
  const icons: Record<string, string> = {
    Investido: "/16_Piggy Bank.svg",
    "Receitas (mês)": "/16_Trending Up.svg",
    "Despesas (mês)": "/16_Trending Down.svg",
  };

  return (
    <section className={styles.grid} aria-label="Resumo">
      {data.map((c) => (
        <div key={c.title} className={`${styles.card} ${c.title === "Investido" ? styles.investido : ""}`}>
          <span className={styles.title}>
            {icons[c.title] && (
              <span style={{ background: "var(--surface-03)", border: "1px solid var(--stroke)", borderRadius: 8.533, padding: 10, display: "inline-flex", marginRight: 8 }}>
                <SvgIconInline src={icons[c.title]} size={16} color={c.negative ? "var(--red)" : c.trend ? "var(--green)" : "currentColor"} />
              </span>
            )}
            {c.title}
          </span>
          <span className={styles.value}>{c.value}</span>
          <span className={`${styles.trend} ${c.negative ? styles.negative : ""} ${!c.trend ? styles.trendEmpty : ""}`}>{c.trend ?? ""}</span>
        </div>
      ))}
    </section>
  );
}
