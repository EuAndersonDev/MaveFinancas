"use client";
import React, { useState } from "react";
import AddTransactionButton from "@/components/Transactions/AddTransactionButton";
import TransactionsTable from "@/components/Dashboard/TransactionsTable/TransactionsTable";

type Tx = { id: string; date: string; description: string; category: string; amount: number };

export default function TransactionsSection({ data }: { data: Tx[] }) {
  const [items, setItems] = useState<Tx[]>(data);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 style={{ margin: 0 }}>Transações recentes</h3>
      </div>
      <TransactionsTable data={items} />
    </div>
  );
}
