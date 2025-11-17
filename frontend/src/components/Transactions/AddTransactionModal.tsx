"use client";
import React, { useState } from "react";
import styles from "./AddTransactionModal.module.css";
import Button from "@/components/Button/Button";

export type NewTransactionPayload = {
  description: string; // título
  amount: number; // valor numérico positivo
  type: "deposit" | "withdrawal"; // mapeado de Entrada/Saída
  date?: string; // ISO date (yyyy-MM-dd)
  paymentMethod?: string; // exibido apenas UI
  user_id: string;
  account_id: string;
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
  const [txTypeUI, setTxTypeUI] = useState("Entrada"); // Entrada | Saída | Investimento
  const [paymentMethod, setPaymentMethod] = useState("Pix");
  const [date, setDate] = useState(todayISO());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  if (!open) return null;

  const reset = () => {
    setTitle("");
    setValue("");
    setTxTypeUI("Entrada");
    setPaymentMethod("Pix");
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

    const payload: NewTransactionPayload = {
      description: title.trim(),
      amount: parsed,
      // Mapeia Investimento como saída (withdrawal) enquanto backend suporta 2 tipos
      type: txTypeUI === "Entrada" ? "deposit" : "withdrawal",
      date,
      paymentMethod,
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
              <select id="txType" className={styles.select} value={txTypeUI} onChange={e => setTxTypeUI(e.target.value)}>
                <option>Entrada</option>
                <option>Saída</option>
                <option>Investimento</option>
              </select>
            </div>
            <div className={styles.fieldGroup} style={{ flex: 1 }}>
              <label className={styles.label} htmlFor="txMethod">Método de pagamento</label>
              <select id="txMethod" className={styles.select} value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)}>
                <option>Pix</option>
                <option>Cartão de crédito</option>
                <option>Cartão de débito</option>
                <option>Dinheiro</option>
                <option>Transferência</option>
                <option>Boleto</option>
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
