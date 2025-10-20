"use client";
import React from "react";
import dynamic from "next/dynamic";
import styles from "./ChartCard.module.css";

const Line = dynamic(() => import("react-chartjs-2").then((m) => m.Line), {
  ssr: false,
});

// Registro dos elementos do Chart.js precisa ocorrer no client
// Usamos import dinâmico para evitar SSR
const useRegisterChart = () => {
  React.useEffect(() => {
    (async () => {
      const ChartJS = await import("chart.js");
      const { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } = ChartJS;
      Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);
    })();
  }, []);
};

type ChartCardProps = {
  title?: string;
  labels?: string[];
  values?: number[];
};

export default function ChartCard({
  title = "Fluxo de caixa (últimos 6 meses)",
  labels = ["Mai", "Jun", "Jul", "Ago", "Set", "Out"],
  values = [1200, 1500, 900, 1800, 1650, 2100],
}: ChartCardProps) {
  useRegisterChart();

  const data = {
    labels,
    datasets: [
      {
        label: "Saldo",
        data: values,
        fill: true,
        backgroundColor: "rgba(57,190,0,0.15)",
        borderColor: "#39be00",
        tension: 0.4,
        pointRadius: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false as const,
    plugins: {
      legend: { display: false, labels: { color: "#fff" } },
      tooltip: { mode: "index" as const, intersect: false },
      title: { display: false, text: title },
    },
    interaction: { intersect: false, mode: "index" as const },
    scales: {
      x: { grid: { display: false }, ticks: { color: "#71717a" } },
      y: { grid: { color: "rgba(255,255,255,0.08)" }, ticks: { color: "#71717a" } },
    },
  };

  return (
    <section className={styles.card} aria-label={title}>
      <h3 className={styles.title}>{title}</h3>
      <div style={{ height: 280 }}>
        <Line data={data} options={options} />
      </div>
    </section>
  );
}
