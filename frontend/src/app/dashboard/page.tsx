import Header from "@/components/Header/Header";
import SummaryCards from "@/components/Dashboard/SummaryCards/SummaryCards";
import BalanceHero from "@/components/Dashboard/BalanceHero/BalanceHero";
import DonutCard from "@/components/Dashboard/DonutCard/DonutCard";
import CategoryBarsCard from "@/components/Dashboard/CategoryBarsCard/CategoryBarsCard";
import TransactionsTable from "@/components/Dashboard/TransactionsTable/TransactionsTable";
import styles from "./page.module.css";

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

// Centralizador de dados do Dashboard
// Troque o retorno mock abaixo por um fetch ao seu backend, por exemplo:
// const res = await fetch(`${process.env.API_URL}/dashboard`, { cache: "no-store" });
// const data: DashboardData = await res.json();
async function getDashboardData(): Promise<DashboardData> {
  // MOCK ajustado com dados coerentes
  return {
    balance: 3120, // total de receitas (8400) - despesas (5280) = 3120
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
      { id: "1", date: "01/10", description: "Salário", category: "Receita", amount: 6000 },
      { id: "2", date: "03/10", description: "Pix recebido", category: "Receita", amount: 400 },
      { id: "3", date: "05/10", description: "Freelance", category: "Receita", amount: 2000 },
      { id: "4", date: "06/10", description: "Supermercado", category: "Alimentação", amount: -420.5 },
      { id: "5", date: "07/10", description: "Conta de luz", category: "Moradia", amount: -210.35 },
      { id: "6", date: "07/10", description: "Água", category: "Moradia", amount: -95.8 },
      { id: "7", date: "08/10", description: "Internet", category: "Moradia", amount: -120 },
      { id: "8", date: "09/10", description: "Almoço", category: "Alimentação", amount: -58.9 },
      { id: "9", date: "10/10", description: "Farmácia", category: "Saúde", amount: -134.9 },
      { id: "10", date: "11/10", description: "Gasolina", category: "Transporte", amount: -210 },
      { id: "11", date: "12/10", description: "Metrô e ônibus", category: "Transporte", amount: -38 },
      { id: "12", date: "13/10", description: "Cinema", category: "Lazer", amount: -52 },
      { id: "13", date: "14/10", description: "Restaurante", category: "Alimentação", amount: -145.7 },
      { id: "14", date: "15/10", description: "Pix recebido", category: "Receita", amount: 0 }, // só pra completar o fluxo
      { id: "15", date: "16/10", description: "Plano de saúde", category: "Saúde", amount: -385 },
      { id: "16", date: "17/10", description: "Roupas", category: "Lazer", amount: -178 },
      { id: "17", date: "18/10", description: "Almoço com amigos", category: "Lazer", amount: -92 },
      { id: "18", date: "19/10", description: "Uber", category: "Transporte", amount: -48.9 },
      { id: "19", date: "20/10", description: "Material de limpeza", category: "Moradia", amount: -95 },
      { id: "20", date: "22/10", description: "Mercado", category: "Alimentação", amount: -210 },
    ],
  };
}

export const metadata = {
  title: "Dashboard - Mave Finanças",
};

export default async function DashboardPage() {
  const data = await getDashboardData();
  const brl = (n: number) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  return (
    <main>
      <Header userName="Matheus" />
      <div className={styles.container}>
        <h2 className={styles.title}>Dashboard</h2>
        <section className={styles.gridMain}>
          <div className={styles.leftCol}>
            <div className={styles.leftFull}>
              <BalanceHero balance={data.balance} />
            </div>
            <div className={styles.leftRow3}>
              <div className={styles.col4}><SummaryCards data={[{ title: "Investido", value: brl(data.kpis.invested) }]} /></div>
              <div className={styles.col4}><SummaryCards data={[{ title: "Receitas (mês)", value: brl(data.kpis.income.value), trend: data.kpis.income.trend }]} /></div>
              <div className={styles.col4}><SummaryCards data={[{ title: "Despesas (mês)", value: brl(data.kpis.expenses.value), trend: data.kpis.expenses.trend, negative: true }]} /></div>
            </div>
            <div className={styles.leftRow2}>
              <div className={styles.col4}><DonutCard data={data.distribution} /></div>
              <div className={styles.col8}><CategoryBarsCard items={data.categories} /></div>
            </div>
          </div>
          <div className={styles.rightCol}>
            <TransactionsTable data={data.transactions} />
          </div>
        </section>
      </div>
    </main>
  );
}
