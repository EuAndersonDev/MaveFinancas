import React from "react";
import styles from "./CategoryBarsCard.module.css";

type Item = { name: string; percent: number; value: string };

export default function CategoryBarsCard({
  title = "Gastos por categoria",
  items = [
    { name: "Moradia", percent: 50, value: "R$ 2.500" },
    { name: "Alimentação", percent: 40, value: "R$ 1.200" },
    { name: "Saúde", percent: 30, value: "R$ 320,00" },
    { name: "Transporte", percent: 20, value: "R$ 150,00" },
  ],
}: { title?: string; items?: Item[] }) {
  return (
    <section className={styles.card}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.scroll}>
        {items.map((it) => (
          <div key={it.name} className={styles.row}>
            <div className={styles.head}>
              <span className={styles.label}>{it.name}</span>
              <span className={styles.percent}>{it.percent}%</span>
            </div>
            <div className={styles.barBg}>
              <div className={styles.barFill} style={{ width: `${it.percent}%` }} />
            </div>
            <span className={styles.value}>{it.value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
