"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header/Header";
import Loading from "@/components/Loading/Loading";
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

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const { user, token } = useAuth();

  useEffect(() => {
    async function fetchDashboard() {
      if (!user?.id) {
        // Usuário não autenticado: apenas finaliza loading sem dados
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
        // Confere campos principais antes de setar
        if (dashboardData && typeof dashboardData.balance === 'number') {
          setData(dashboardData);
        } else {
          console.warn('Formato inesperado da dashboard', dashboardData);
        }
      } catch (error) {
        console.error('Erro na requisição da dashboard:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboard();
  }, [user, token]);

  return (
    <main>
      <Header />
      {loading && <Loading />}
      {!loading && !data && (
        <div style={{ padding: 24 }}>
          <p>Faça login para visualizar sua dashboard.</p>
        </div>
      )}
      {!loading && data && <DashboardClient initial={data} />}
    </main>
  );
}