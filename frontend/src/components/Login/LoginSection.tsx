"use client";

import { useRouter } from "next/navigation";
import LoginForm from "./LoginForm";

export default function LoginSection() {
  const router = useRouter();

  return (
    <LoginForm
      onCreateAccount={() => router.push("/register")}
      onSuccess={() => router.push("/dashboard")}
      onError={(msg) => console.warn("Falha login:", msg)}
    />
  );
}