"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header/Header";
import styles from "./page.module.css";
import DashboardClient from "@/components/Dashboard/DashboardClient";
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

function getMockData(): DashboardData {
  return {
    balance: 3120,
    kpis: {
      invested: 4000,
      income: { value: 8400, trend: "+4,5%" },
      expenses: { value: 5280, trend: "+2,1%" },
    },
    distribution: [
      { label: "Ganhos", value: 55, color: "#39BE00", icon: "/16_Trending Up.svg" },
      { label: "Gastos", value: 30, color: "#E93030", icon: "/16_Trending Down.svg" },
      { label: "Investimentos", value: 15, color: "#FFFFFF", icon: "/16_Piggy Bank.svg" },
    ],
    categories: [
      { name: "Moradia", percent: 35, value: "R$ 1.850,00" },
      { name: "Alimentação", percent: 25, value: "R$ 1.320,00" },
      { name: "Transporte", percent: 20, value: "R$ 980,00" },
      { name: "Saúde", percent: 10, value: "R$ 520,00" },
      { name: "Lazer", percent: 10, value: "R$ 610,00" },
    ],
    transactions: [
      { id: "1", date: "01/10", name: "Salário", category: "Receita", amount: 6000 },
      { id: "2", date: "03/10", name: "Pix recebido", category: "Receita", amount: 400 },
      { id: "3", date: "05/10", name: "Freelance", category: "Receita", amount: 2000 },
      { id: "4", date: "06/10", name: "Supermercado", category: "Alimentação", amount: -420.5 },
      { id: "5", date: "07/10", name: "Conta de luz", category: "Moradia", amount: -210.35 },
    ],
  };
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData>(getMockData());
  const [loading, setLoading] = useState(true);
  const { user, token } = useAuth();

  useEffect(() => {
    async function fetchDashboard() {
      if (!user?.id) {
        setLoading(false);
        return;
      }

      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      
      try {
        const res = await fetch(`${API_URL}/dashboard`, {
          headers: {
            'x-user-id': user.id.toString(),
            ...(token && { 'Authorization': `Bearer ${token}` })
          },
        });

        if (!res.ok) {
          console.error('Erro ao buscar dashboard:', res.status);
          return;
        }

        const dashboardData = await res.json();
        setData(dashboardData);
      } catch (error) {
        console.error('Erro na requisição da dashboard:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboard();
  }, [user, token]);

  if (loading) {
    return (
      <main>
        <Header />
        <div style={{ padding: '2rem', textAlign: 'center' }}>Carregando dashboard...</div>
      </main>
    );
  }

  return (
    <main>
      <Header />
      <DashboardClient initial={data} />
    </main>
  );
}