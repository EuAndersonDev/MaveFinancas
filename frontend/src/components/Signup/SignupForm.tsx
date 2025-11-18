"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "@/lib/sweetalert";
import styles from "../Login/loginForm.module.css";
import Button from "../Button/Button";

interface SignupFormProps {
  onSuccess?: () => void;
  onError?: (msg: string) => void;
  onGoLogin?: () => void;
}

export default function SignupForm({ onSuccess, onError, onGoLogin }: SignupFormProps) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");
  const [errors, setErrors] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function validate() {
    if (!username.trim() || !email.trim() || !senha.trim() || !confirmSenha.trim())
      return "Preencha todos os campos.";
    if (username.trim().length < 3) return "Nome de usuário mínimo 3 caracteres.";
    if (!/^\S+@\S+\.\S+$/.test(email)) return "E-mail inválido.";
    if (senha.length < 6) return "Senha deve ter ao menos 6 caracteres.";
    if (senha !== confirmSenha) return "Senhas não conferem.";
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
    try {
      const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333";
      const resp = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: username,
          email,
          password: senha,
        }),
      });

      if (!resp.ok) {
        const contentType = resp.headers.get("content-type") || "";
        let errorMessage = `Erro ${resp.status} ao criar conta.`;
        try {
          if (contentType.includes("application/json")) {
            const errorData = await resp.json();
            errorMessage = errorData?.message || errorMessage;
          } else {
            const text = await resp.text();
            if (text) errorMessage = text;
          }
        } catch {}
        if (resp.status === 409 || /duplicate|ER_DUP_ENTRY/i.test(errorMessage)) {
          errorMessage = "E-mail já cadastrado.";
        }
        throw new Error(errorMessage);
      }

      await new Promise((r) => setTimeout(r, 600));
      await Swal.fire({
        icon: "success",
        title: "Conta criada!",
        text: "Você será redirecionado para a tela de login.",
        confirmButtonText: "Ok",
      });
      onSuccess?.();
      if (onGoLogin) {
        onGoLogin();
      } else {
        router.push("/login");
      }
    } catch (e) {
      const errObj = e as Error;
      const msg = errObj.message || "Erro ao criar conta.";
      setErrors(msg);
      onError?.(msg);
      await Swal.fire({
        icon: "error",
        title: "Erro no cadastro",
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
        <label htmlFor="signup-username">Nome de usuário</label>
        <input
          id="signup-username"
          type="text"
          placeholder="Nome de usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={loading}
          required
        />
      </div>
      <div className={styles.formField}>
        <label htmlFor="signup-email">E-mail</label>
        <input
          id="signup-email"
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
        <label htmlFor="signup-senha">Senha</label>
        <input
          id="signup-senha"
          type="password"
          autoComplete="new-password"
          placeholder="••••••••"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          disabled={loading}
          required
        />
      </div>
      <div className={styles.formField}>
        <label htmlFor="signup-confirm-senha">Confirmar senha</label>
        <input
          id="signup-confirm-senha"
          type="password"
          autoComplete="new-password"
          placeholder="••••••••"
          value={confirmSenha}
          onChange={(e) => setConfirmSenha(e.target.value)}
          disabled={loading}
          required
        />
      </div>

      {errors && <p className={styles.error}>{errors}</p>}

      <div className={styles.buttons}>
        <Button type="submit" variant="primary" fullWidth loading={loading}>
          Criar conta
        </Button>
        <Button
          type="button"
          variant="link"
          fullWidth
          onClick={onGoLogin}
          disabled={loading}
        >
          Já tenho conta
        </Button>
      </div>
    </form>
  );
}