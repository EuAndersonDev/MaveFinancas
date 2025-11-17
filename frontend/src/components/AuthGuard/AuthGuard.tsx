"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/app/context/context";

const publicRoutes = ["/login", "/signup"];

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { token } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Se não tem token e está tentando acessar rota protegida, redireciona para login
    if (!token && !publicRoutes.includes(pathname || "")) {
      router.push("/login");
    }
    // Se tem token e está na página de login, redireciona para dashboard
    if (token && pathname === "/login") {
      router.push("/dashboard");
    }
  }, [token, pathname, router]);

  // Se não tem token e não está em rota pública, não renderiza nada (vai redirecionar)
  if (!token && !publicRoutes.includes(pathname || "")) {
    return null;
  }

  return <>{children}</>;
}
