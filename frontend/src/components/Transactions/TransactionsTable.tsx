"use client";

import React from "react";
import styles from "./transactions.module.css";
import SvgIconInline from "@/components/SvgIconInline/SvgIconInline";

export type Transaction = {
	id: string;
	nome: string;
	tipo: "Entrada" | "Saída" | "Investimento";
	categoria: string;
	metodo: string;
	data: string; // ISO ou dd/MM/yyyy
	valor: number; // em centavos ou float; exibiremos formatado
};

type TransactionsTableProps = {
	data: Transaction[];
	onEdit?: (id: string) => void;
	onDelete?: (id: string) => void;
};

function formatCurrency(value: number) {
	return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function TransactionsTable({ data, onEdit, onDelete }: TransactionsTableProps) {
	return (
		<div className={styles.tableWrap}>
			<table className={styles.table}>
						<thead className={styles.thead}>
					<tr>
						<th>Nome</th>
						<th>Tipo</th>
						<th>Categoria</th>
						<th>Método</th>
								<th>Data</th>
								<th className={styles.colValue}>Valor</th>
								<th className={styles.colActions} aria-label="Ações" />
					</tr>
				</thead>
				<tbody className={styles.tbody}>
					{data.length === 0 ? (
						<tr>
							<td className={styles.empty} colSpan={7}>Nenhuma transação encontrada.</td>
						</tr>
					) : (
						data.map((t) => (
							<tr key={t.id} className={styles.row}>
								<td className={styles.cellPrimary}>{t.nome}</td>
												<td>
													<span className={`${styles.pill} ${t.valor > 0 ? styles.pillIn : styles.pillOut}`}>
														{t.tipo}
													</span>
												</td>
								<td>{t.categoria}</td>
								<td>{t.metodo}</td>
												<td>{t.data}</td>
												<td className={`${styles.value} ${t.valor > 0 ? styles.valueIn : styles.valueOut}`}>
									{formatCurrency(t.valor)}
								</td>
								<td className={styles.actions}>
									<button
										type="button"
										className={styles.iconBtn}
										aria-label="Editar transação"
										onClick={() => onEdit?.(t.id)}
									>
										<SvgIconInline src="/icons/external-link.svg" size={16} alt="Editar" />
									</button>
									<button
										type="button"
										className={styles.iconBtn}
										aria-label="Excluir transação"
										onClick={() => onDelete?.(t.id)}
									>
										<SvgIconInline src="/icons/trash-2.svg" size={16} alt="Excluir" />
									</button>
								</td>
							</tr>
						))
					)}
				</tbody>
			</table>
		</div>
	);
}

