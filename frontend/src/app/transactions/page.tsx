"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../context/context";
import Swal from "@/lib/sweetalert";
import Header from "@/components/Header/Header";
import AddTransactionButton from "@/components/Transactions/AddTransactionButton";
import TransactionsTable, { Transaction } from "@/components/Transactions/TransactionsTable";
import Loading from "@/components/Loading/Loading";
import styles from "./transactions.module.css";

type BackendTransaction = {
	id: string;
	name: string;
	amount: number;
	date: string;
	category_id: string;
	user_id: string;
	account_id: string;
	category_name?: string;
	category_type?: "income" | "expense";
};

function formatDate(isoDate: string): string {
	const [year, month, day] = isoDate.split("T")[0].split("-");
	return `${day}/${month}/${year}`;
}

function mapBackendToUI(tx: BackendTransaction): Transaction {
	const isIncome = tx.amount > 0;
	const tipo: "Entrada" | "Saída" | "Investimento" = isIncome ? "Entrada" : "Saída";
	
	return {
		id: tx.id,
		nome: tx.name,
		tipo,
		categoria: tx.category_name || "Outros",
		metodo: "Pix", // Backend não armazena método de pagamento atualmente
		data: formatDate(tx.date),
		valor: tx.amount,
	};
}

export default function TransactionsPage() {
	const { user } = useAuth();
	const [transactions, setTransactions] = useState<Transaction[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!user?.id) {
			setLoading(false);
			return;
		}

		const userId = user.id.toString();

		async function fetchTransactions() {
			try {
				const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/transactions`, {
					headers: {
						"x-user-id": userId,
					},
				});
				
				if (!res.ok) throw new Error("Falha ao buscar transações");
				
				const data: BackendTransaction[] = await res.json();
				const mapped = data.map(mapBackendToUI);
				setTransactions(mapped);
			} catch (err: any) {
				setError(err.message || "Erro ao carregar transações");
			} finally {
				setLoading(false);
			}
		}

		fetchTransactions();
	}, [user]);

	const handleEdit = async (id: string) => {
		// TODO: Implementar modal de edição
		console.log("Editar transação:", id);
	};

	const handleDelete = async (id: string) => {
		const result = await Swal.fire({
			title: "Tem certeza?",
			text: "Esta ação não poderá ser desfeita!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonText: "Sim, excluir",
			cancelButtonText: "Cancelar",
		});

		if (!result.isConfirmed) return;

		try {
			const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/transactions/${id}`, {
				method: "DELETE",
			});

			if (!res.ok) throw new Error("Falha ao excluir transação");

			// Remove da lista local
			setTransactions((prev) => prev.filter((t) => t.id !== id));

			await Swal.fire({
				icon: "success",
				title: "Excluído!",
				text: "Transação excluída com sucesso.",
				timer: 2000,
				showConfirmButton: false,
			});
		} catch (err: any) {
			await Swal.fire({
				icon: "error",
				title: "Erro!",
				text: err.message || "Erro ao excluir transação",
			});
		}
	};

	const handleTransactionCreated = () => {
		// Recarrega a lista após criar nova transação
		if (!user?.id) return;
		
		fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/transactions`, {
			headers: { "x-user-id": user.id.toString() },
		})
			.then((res) => res.json())
			.then((data: BackendTransaction[]) => {
				setTransactions(data.map(mapBackendToUI));
			})
			.catch(console.error);
	};

	return (
		<main>
			<Header />
			<div className={styles.container}>
				<div className={styles.toolbar}>
					<h2 className={styles.title}>Transações</h2>
					{user && user.accountId && (
						<AddTransactionButton
							userId={user.id.toString()}
							accountId={user.accountId}
							onCreated={handleTransactionCreated}
						/>
					)}
				</div>

				{loading ? (
					<Loading />
				) : error ? (
					<p style={{ color: "red" }}>{error}</p>
				) : (
					<TransactionsTable data={transactions} onEdit={handleEdit} onDelete={handleDelete} />
				)}
			</div>
		</main>
	);
}

