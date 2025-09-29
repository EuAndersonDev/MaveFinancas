"use client";

import { useState } from "react";
import styles from "./loginForm.module.css";
import Button from "../Button/Button";

interface LoginFormProps {
  onSuccess?: (data: { email: string }) => void;
  onError?: (msg: string) => void;
  onCreateAccount?: () => void;
}

export default function LoginForm({ onSuccess, onError, onCreateAccount }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [errors, setErrors] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function validate() {
    if (!email.trim() || !senha.trim()) return "Preencha todos os campos.";
    if (!/^\S+@\S+\.\S+$/.test(email)) return "E-mail inválido.";
    if (senha.length < 6) return "Senha deve ter ao menos 6 caracteres.";
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const err = validate();
    if (err) {
      setErrors(err);
      onError?.(err);
      return;
    }
    setErrors(null);
    setLoading(true);
    try {
      // Chamada à API (exemplo)
      // const resp = await fetch("/api/login", { method:"POST", body: JSON.stringify({ email, senha }) });
      // if (!resp.ok) throw new Error("Credenciais inválidas");
      await new Promise(r => setTimeout(r, 600)); // simulação
      onSuccess?.({ email });
    } catch (e: any) {
      const msg = e.message || "Erro ao autenticar.";
      setErrors(msg);
      onError?.(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.formField}>
        <label htmlFor="login-email">E-mail</label>
        <input
          id="login-email"
          type="email"
          autoComplete="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          required
        />
      </div>
      <div className={styles.formField}>
        <label htmlFor="login-senha">Senha</label>
        <input
          id="login-senha"
            type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          disabled={loading}
          required
        />
      </div>

      {errors && <p className={styles.error}>{errors}</p>}

      <div className={styles.buttons}>
        <Button
          type="submit"
          variant="primary"
          fullWidth
          loading={loading}
        >
          Entrar
        </Button>
        <Button
          type="button"
          variant="link"
          fullWidth
          onClick={onCreateAccount}
          disabled={loading}
        >
          Criar conta
        </Button>
      </div>
    </form>
  );
}