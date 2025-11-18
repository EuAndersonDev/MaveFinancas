"use client";
import React, { useState, useEffect } from "react";
import styles from "./AddTransactionModal.module.css";
import Button from "@/components/Button/Button";

export type NewTransactionPayload = {
  name: string;
  amount: number; // valor com sinal: positivo = entrada, negativo = saída
  date: string; // ISO date (yyyy-MM-dd)
  category_id: string;
  user_id: string;
  account_id: string;
};

type Category = {
  id: string;
  name: string;
  type: "income" | "expense";
  icon?: string;
  color?: string;
};

type AddTransactionModalProps = {
  open: boolean;
  onClose: () => void;
  userId: string;
  accountId: string;
  onCreated?: (created: any) => void;
};

function todayISO() {
  return new Date().toISOString().split("T")[0];
}

export default function AddTransactionModal({ open, onClose, userId, accountId, onCreated }: AddTransactionModalProps) {
  const [title, setTitle] = useState("");
  // `value` armazena apenas dígitos (centavos). Ex.: "1234" => R$ 12,34
  const [value, setValue] = useState("");
  const [txTypeUI, setTxTypeUI] = useState<"income" | "expense">("income");
  const [categoryId, setCategoryId] = useState("");
  const [date, setDate] = useState(todayISO());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  // Busca categorias ao abrir modal
  useEffect(() => {
    if (!open) return;
    
    async function fetchCategories() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/categories`);
        if (!res.ok) throw new Error("Falha ao buscar categorias");
        const data: Category[] = await res.json();
        setCategories(data);
        
        // Define primeira categoria do tipo selecionado como padrão
        const defaultCat = data.find(c => c.type === txTypeUI);
        if (defaultCat) setCategoryId(defaultCat.id);
      } catch (err) {
        console.error("Erro ao buscar categorias:", err);
      } finally {
        setLoadingCategories(false);
      }
    }
    
    fetchCategories();
  }, [open, txTypeUI]);

  // Atualiza categorias disponíveis quando tipo muda
  useEffect(() => {
    const filtered = categories.filter(c => c.type === txTypeUI);
    if (filtered.length > 0 && !filtered.find(c => c.id === categoryId)) {
      setCategoryId(filtered[0].id);
    }
  }, [txTypeUI, categories, categoryId]);

  if (!open) return null;

  const reset = () => {
    setTitle("");
    setValue("");
    setTxTypeUI("income");
    setCategoryId("");
    setDate(todayISO());
    setError(null);
    setSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    const cents = parseInt(value || "0", 10);
    const parsed = cents / 100;
    if (!title.trim()) return setError("Informe o título");
    if (isNaN(parsed) || parsed <= 0) return setError("Valor inválido");
    if (!categoryId) return setError("Selecione uma categoria");

    // Amount com sinal: positivo para entrada, negativo para saída
    const signedAmount = txTypeUI === "income" ? parsed : -parsed;

    const payload: NewTransactionPayload = {
      name: title.trim(),
      amount: signedAmount,
      date,
      category_id: categoryId,
      user_id: userId,
      account_id: accountId,
    };

    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/transactions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Falha ao criar transação");
      const created = await res.json();
      setSuccess(true);
      onCreated?.(created);
      reset();
      // fecha após curto delay para feedback
      setTimeout(() => { onClose(); }, 600);
    } catch (err: any) {
      setError(err.message || "Erro inesperado");
    } finally {
      setLoading(false);
    }
  };

  const filteredCategories = categories.filter(c => c.type === txTypeUI);

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="Adicionar transação">
      <form className={styles.modal} onSubmit={handleSubmit}>
        <div className={styles.header}>
          <h4 className={styles.title}>Adicionar Transação</h4>
          <button type="button" className={styles.closeBtn} onClick={() => { onClose(); reset(); }} aria-label="Fechar modal">✕</button>
        </div>
        <div className={styles.divider} />
        <div className={styles.content}>
          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="txTitle">Título</label>
            <input
              id="txTitle"
              className={styles.input}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Salário"
            />
            {error === "Informe o título" && <span className={styles.errorMsg}>{error}</span>}
          </div>

          <div className={styles.fieldRow}>
            <div className={styles.fieldGroup} style={{ flex: 1 }}>
              <label className={styles.label} htmlFor="txValue">Valor</label>
              <input
                id="txValue"
                className={styles.input}
                type="text"
                inputMode="numeric"
                placeholder="R$ 0,00"
                value={formatBRLFromDigits(value)}
                onKeyDown={(e) => {
                  const control = ["Backspace","Delete","Tab","ArrowLeft","ArrowRight","Home","End","Enter"];
                  if (control.includes(e.key)) return;
                  if (/^[0-9]$/.test(e.key)) return;
                  e.preventDefault();
                }}
                onPaste={(e) => {
                  e.preventDefault();
                  const pasted = e.clipboardData.getData("text") || "";
                  const digits = pasted.replace(/\D/g, "");
                  if (!digits) return;
                  setValue((prev) => `${prev || ""}${digits}`);
                }}
                onChange={(e) => {
                  const digits = (e.target.value || "").replace(/\D/g, "");
                  setValue(digits);
                }}
              />
            </div>
            <div className={styles.fieldGroup} style={{ flex: 1 }}>
              <label className={styles.label} htmlFor="txDate">Data</label>
              <input id="txDate" type="date" className={styles.input} value={date} onChange={e => setDate(e.target.value)} />
            </div>
          </div>

          <div className={styles.fieldRow}>
            <div className={styles.fieldGroup} style={{ flex: 1 }}>
              <label className={styles.label} htmlFor="txType">Tipo da transação</label>
              <select id="txType" className={styles.select} value={txTypeUI} onChange={e => setTxTypeUI(e.target.value as "income" | "expense")}>
                <option value="income">Entrada</option>
                <option value="expense">Saída</option>
              </select>
            </div>
            <div className={styles.fieldGroup} style={{ flex: 1 }}>
              <label className={styles.label} htmlFor="txCategory">Categoria</label>
              <select 
                id="txCategory" 
                className={styles.select} 
                value={categoryId} 
                onChange={e => setCategoryId(e.target.value)}
                disabled={loadingCategories}
              >
                {loadingCategories ? (
                  <option>Carregando...</option>
                ) : filteredCategories.length === 0 ? (
                  <option>Nenhuma categoria</option>
                ) : (
                  filteredCategories.map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.icon} {cat.name}
                    </option>
                  ))
                )}
              </select>
            </div>
          </div>

          {error && !error.includes("título") && <span className={styles.errorMsg}>{error}</span>}
          {success && <span className={styles.successMsg}>Transação criada!</span>}
        </div>
        <div className={styles.footer}>
          <Button type="button" variant="outline" onClick={() => { onClose(); reset(); }} disabled={loading}>Cancelar</Button>
          <Button type="submit" loading={loading}>Salvar</Button>
        </div>
      </form>
    </div>
  );
}

  function formatBRLFromDigits(digits: string) {
    const cents = parseInt(digits || "0", 10);
    const value = cents / 100;
    return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }
