"use client";
import React from "react";
import AddTransactionButton from "@/components/Transactions/AddTransactionButton";
import TransactionsTable from "@/components/Dashboard/TransactionsTable/TransactionsTable";

type Tx = { id: string; date: string; name: string; category: string; amount: number };

export default function TransactionsSection({ data }: { data: Tx[] }) {
  // Usa diretamente a prop para evitar estado desatualizado após criação de transação
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {/* Cabeçalho já é exibido dentro de TransactionsTable; poderia ser removido aqui se duplicado */}
      <TransactionsTable data={data} />
    </div>
  );
}
