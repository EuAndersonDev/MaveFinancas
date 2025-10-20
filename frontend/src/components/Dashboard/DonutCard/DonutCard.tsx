"use client";
import React from "react";
import dynamic from "next/dynamic";
import styles from "./DonutCard.module.css";
import SvgIconInline from "@/components/SvgIconInline/SvgIconInline";

const Doughnut = dynamic(() => import("react-chartjs-2").then((m) => m.Doughnut), { ssr: false });

const useRegisterChart = () => {
  React.useEffect(() => {
    (async () => {
      const ChartJS = await import("chart.js");
      const { Chart, ArcElement, Tooltip, Legend } = ChartJS;
      Chart.register(ArcElement, Tooltip, Legend);
    })();
  }, []);
};

type DonutCardProps = {
  title?: string;
  data?: { label: string; value: number; color: string; icon?: string }[];
};

export default function DonutCard({
  title,
  data = [
    { label: "Ganhos", value: 60, color: "#39BE00", icon: "/16_Trending Up.svg" },
    { label: "Gastos", value: 22, color: "#E93030", icon: "/16_Trending Down.svg" },
    { label: "Investimentos", value: 18, color: "#FFFFFF", icon: "/16_Piggy Bank.svg" },
  ],
}: DonutCardProps) {
  useRegisterChart();

  const chartData = {
    labels: data.map((d) => d.label),
    datasets: [
      {
        data: data.map((d) => d.value),
        backgroundColor: data.map((d) => d.color),
        borderWidth: 0 as number,
        cutout: "72%" as string,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { enabled: true } },
  };

  return (
    <section className={styles.card}>
      <div className={styles.wrap}>
        <div style={{ width: 180, height: 180 }}>
          <Doughnut data={chartData} options={options} />
        </div>
      </div>
      <div className={styles.legend}>
        {data.map((d) => (
          <div key={d.label} className={styles.legendItem}>
            <div className={styles.legendLeft}>
              {d.icon && (
                <span className={styles.iconBox}>
                  <SvgIconInline src={d.icon} size={16} color={d.color} />
                </span>
              )}
              <span>{d.label}</span>
            </div>
            <span className={styles.percent}>{d.value}%</span>
          </div>
        ))}
      </div>
    </section>
  );
}
