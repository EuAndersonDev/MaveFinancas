import Header from "@/components/header/header";
import Button from "@/components/Button/Button";
import TransactionsTable, { Transaction } from "@/components/Transactions/TransactionsTable";
import styles from "./transactions.module.css";

export const metadata = { title: "Transações - Mave Finanças" };

async function getTransactions(): Promise<Transaction[]> {
	// Substituir por fetch ao backend quando disponível
	return [
		{ id: "1", nome: "Salário", tipo: "Entrada", categoria: "Receita", metodo: "Pix", data: "01/10/2025", valor: 6000 },
		{ id: "2", nome: "Supermercado", tipo: "Saída", categoria: "Alimentação", metodo: "Cartão de crédito", data: "06/10/2025", valor: -420.5 },
		{ id: "3", nome: "Conta de luz", tipo: "Saída", categoria: "Moradia", metodo: "Débito", data: "07/10/2025", valor: -210.35 },
		{ id: "4", nome: "Freelance", tipo: "Entrada", categoria: "Receita", metodo: "Transferência", data: "05/10/2025", valor: 2000 },
		{ id: "5", nome: "Farmácia", tipo: "Saída", categoria: "Saúde", metodo: "Cartão de débito", data: "10/10/2025", valor: -134.9 },
		{ id: "6", nome: "Aplicação CDB", tipo: "Investimento", categoria: "Investimento", metodo: "Corretora", data: "11/10/2025", valor: -500 },
		{ id: "7", nome: "Rendimento CDB", tipo: "Investimento", categoria: "Investimento", metodo: "Corretora", data: "12/10/2025", valor: 45.75 },
		{ id: "8", nome: "Internet", tipo: "Saída", categoria: "Moradia", metodo: "Débito automático", data: "12/10/2025", valor: -120 },
		{ id: "9", nome: "Almoço", tipo: "Saída", categoria: "Alimentação", metodo: "Cartão de débito", data: "13/10/2025", valor: -58.9 },
		{ id: "10", nome: "Pix recebido", tipo: "Entrada", categoria: "Receita", metodo: "Pix", data: "14/10/2025", valor: 300 },
		{ id: "11", nome: "Gasolina", tipo: "Saída", categoria: "Transporte", metodo: "Crédito", data: "15/10/2025", valor: -210 },
		{ id: "12", nome: "Cinema", tipo: "Saída", categoria: "Lazer", metodo: "Crédito", data: "16/10/2025", valor: -52 },
		{ id: "13", nome: "Dividendos Ações", tipo: "Investimento", categoria: "Investimento", metodo: "Corretora", data: "17/10/2025", valor: 120.3 },
		{ id: "14", nome: "Supermercado", tipo: "Saída", categoria: "Alimentação", metodo: "Crédito", data: "18/10/2025", valor: -210.2 },
		{ id: "15", nome: "Plano de saúde", tipo: "Saída", categoria: "Saúde", metodo: "Boleto", data: "19/10/2025", valor: -385 },
	];
}

export default async function TransactionsPage() {
	const data = await getTransactions();

	return (
		<main>
			<Header userName="Matheus" />
			<div className={styles.container}>
				<div className={styles.toolbar}>
					<h2 className={styles.title}>Transações</h2>
					<Button>Adicionar Transação</Button>
				</div>

				<TransactionsTable data={data} />
			</div>
		</main>
	);
}

