"use client";

import { useState } from "react";
import styles from "./loginForm.module.css";
import Button from "../Button/Button";
import Swal from "sweetalert2";

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
      await Swal.fire({
        icon: "error",
        title: "Ops!",
        text: err,
        confirmButtonText: "Ok",
      });
      return;
    }
    setErrors(null);
    setLoading(true);
    const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333";
    // Chamada de autenticação
    try {
      const resp = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: senha }),
      });

      if (!resp.ok) {
        const contentType = resp.headers.get("content-type") || "";
        let errorMessage = `Erro ${resp.status} ao autenticar.`;
        try {
          if (contentType.includes("application/json")) {
            const errorData = await resp.json();
            errorMessage = errorData?.message || errorMessage;
          } else {
            const text = await resp.text();
            if (text) errorMessage = text;
          }
        } catch {
          // mantém errorMessage padrão
        }
        throw new Error(errorMessage);
      }

      await new Promise((r) => setTimeout(r, 600));
      await Swal.fire({
        icon: "success",
        title: "Login realizado!",
        text: "Bem-vindo de volta!",
        confirmButtonText: "Ok",
      });
      onSuccess?.({ email });
    } catch (e) {
      const errObj = e as Error;
      const msg = errObj?.message || "Erro ao autenticar.";
      setErrors(msg);
      onError?.(msg);
      await Swal.fire({
        icon: "error",
        title: "Erro ao autenticar",
        text: msg,
        confirmButtonText: "Ok",
      });
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
          placeholder="E-mail"
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
