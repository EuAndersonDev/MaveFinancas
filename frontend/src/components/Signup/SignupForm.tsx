"use client";

import { useState } from "react";
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
      return;
    }
    setErrors(null);
    setLoading(true);
    try {
      // Exemplo de chamada:
      // const r = await fetch("/api/signup",{method:"POST", body: JSON.stringify({ username,email,senha })});
      // if(!r.ok) throw new Error("Falha ao criar conta");
      await new Promise(r => setTimeout(r, 700));
      onSuccess?.();
    } catch (e: any) {
      const msg = e.message || "Erro ao criar conta.";
      setErrors(msg);
      onError?.(msg);
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
          placeholder="seu_nome"
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
          placeholder="voce@email.com"
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