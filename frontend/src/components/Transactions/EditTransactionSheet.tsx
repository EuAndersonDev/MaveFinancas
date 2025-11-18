"use client";

import React, { useState, useEffect } from "react";
import styles from "./EditTransactionSheet.module.css";
import Button from "@/components/Button/Button";
import Swal from "@/lib/sweetalert";

type Category = {
  id: string;
  name: string;
  type: "income" | "expense";
  icon?: string;
  color?: string;
};

type Transaction = {
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

type EditTransactionSheetProps = {
  open: boolean;
  transaction: Transaction | null;
  onClose: () => void;
  onSaved: () => void;
  onDeleted: (id: string) => void;
};

function formatDateToInput(isoDate: string): string {
  return isoDate.split("T")[0];
}

function formatDateDisplay(isoDate: string): string {
  const date = new Date(isoDate);
  const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
  const day = date.getDate().toString().padStart(2, "0");
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day} de ${month} ${year}`;
}

export default function EditTransactionSheet({ open, transaction, onClose, onSaved, onDeleted }: EditTransactionSheetProps) {
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [txType, setTxType] = useState<"income" | "expense">("income");
  const [categoryId, setCategoryId] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  
  // Estados para valores originais
  const [originalName, setOriginalName] = useState("");
  const [originalValue, setOriginalValue] = useState("");
  const [originalTxType, setOriginalTxType] = useState<"income" | "expense">("income");
  const [originalCategoryId, setOriginalCategoryId] = useState("");
  const [originalDate, setOriginalDate] = useState("");

  // Carrega categorias
  useEffect(() => {
    if (!open) return;
    
    async function fetchCategories() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/categories`);
        if (!res.ok) throw new Error("Falha ao buscar categorias");
        const data: Category[] = await res.json();
        setCategories(data);
      } catch (err) {
        console.error("Erro ao buscar categorias:", err);
      }
    }
    
    fetchCategories();
  }, [open]);

  // Preenche formulário com dados da transação
  useEffect(() => {
    if (!transaction) return;
    
    const absValue = Math.abs(transaction.amount);
    const valueString = (absValue * 100).toString();
    const typeValue = transaction.amount > 0 ? "income" : "expense";
    const dateString = formatDateToInput(transaction.date);
    
    setName(transaction.name);
    setValue(valueString);
    setTxType(typeValue);
    setCategoryId(transaction.category_id);
    setDate(dateString);
    
    // Salva valores originais
    setOriginalName(transaction.name);
    setOriginalValue(valueString);
    setOriginalTxType(typeValue);
    setOriginalCategoryId(transaction.category_id);
    setOriginalDate(dateString);
    
    setHasChanges(false);
  }, [transaction]);

  // Detecta mudanças
  useEffect(() => {
    if (!transaction) return;
    
    const changed = 
      name !== originalName ||
      value !== originalValue ||
      txType !== originalTxType ||
      categoryId !== originalCategoryId ||
      date !== originalDate;
    
    setHasChanges(changed);
  }, [name, value, txType, categoryId, date, originalName, originalValue, originalTxType, originalCategoryId, originalDate, transaction]);

  if (!open || !transaction) return null;

  const handleSave = async () => {
    if (!hasChanges) return;

    const cents = parseInt(value || "0", 10);
    const parsed = cents / 100;
    const signedAmount = txType === "income" ? parsed : -parsed;

    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/transactions/${transaction.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          amount: signedAmount,
          date,
          category_id: categoryId,
          user_id: transaction.user_id,
          account_id: transaction.account_id,
        }),
      });

      if (!res.ok) throw new Error("Falha ao atualizar transação");

      await Swal.fire({
        icon: "success",
        title: "Sucesso!",
        text: "Transação atualizada com sucesso.",
        timer: 2000,
        showConfirmButton: false,
      });

      onSaved();
      onClose();
    } catch (err: any) {
      await Swal.fire({
        icon: "error",
        title: "Erro!",
        text: err.message || "Erro ao atualizar transação",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
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
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/transactions/${transaction.id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Falha ao excluir transação");

      await Swal.fire({
        icon: "success",
        title: "Excluído!",
        text: "Transação excluída com sucesso.",
        timer: 2000,
        showConfirmButton: false,
      });

      onDeleted(transaction.id);
      onClose();
    } catch (err: any) {
      await Swal.fire({
        icon: "error",
        title: "Erro!",
        text: err.message || "Erro ao excluir transação",
      });
    }
  };

  const filteredCategories = categories.filter(c => c.type === txType);

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.sheet}>
        <div className={styles.header}>
          <h2 className={styles.title}>Transação</h2>
          <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Fechar">
            ✕
          </button>
        </div>

        <div className={styles.divider} />

        <div className={styles.content}>
          <div className={styles.field}>
            <label className={styles.label}>Título</label>
            <input
              type="text"
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Valor</label>
            <input
              type="text"
              inputMode="numeric"
              className={styles.input}
              value={formatBRLFromDigits(value)}
              onKeyDown={(e) => {
                const control = ["Backspace","Delete","Tab","ArrowLeft","ArrowRight","Home","End","Enter"];
                if (control.includes(e.key)) return;
                if (/^[0-9]$/.test(e.key)) return;
                e.preventDefault();
              }}
              onChange={(e) => {
                const digits = (e.target.value || "").replace(/\D/g, "");
                setValue(digits);
              }}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Tipo da transação</label>
            <select
              className={styles.select}
              value={txType}
              onChange={(e) => setTxType(e.target.value as "income" | "expense")}
            >
              <option value="income">Entrada</option>
              <option value="expense">Saída</option>
            </select>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Categoria</label>
            <select
              className={styles.select}
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              {filteredCategories.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.icon} {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Data</label>
            <input
              type="date"
              className={styles.input}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className={styles.deleteSection}>
            <button type="button" className={styles.deleteBtn} onClick={handleDelete}>
              Deletar Transação
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 4h12M5.333 4V2.667a1.333 1.333 0 0 1 1.334-1.334h2.666a1.333 1.333 0 0 1 1.334 1.334V4m2 0v9.333a1.333 1.333 0 0 1-1.334 1.334H4.667a1.333 1.333 0 0 1-1.334-1.334V4h9.334Z" stroke="#E93030" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6.667 7.333v4M9.333 7.333v4" stroke="#E93030" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        <div className={styles.footer}>
          <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
            Cancelar
          </Button>
          <Button
            type="button"
            onClick={handleSave}
            disabled={!hasChanges || loading}
            loading={loading}
            style={{
              background: hasChanges ? "#39BE00" : "rgba(57, 190, 0, 0.6)",
              opacity: hasChanges ? 1 : 0.5,
            }}
          >
            Salvar
          </Button>
        </div>
      </div>
    </>
  );
}

function formatBRLFromDigits(digits: string) {
  const cents = parseInt(digits || "0", 10);
  const value = cents / 100;
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
