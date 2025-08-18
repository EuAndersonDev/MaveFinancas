"use client";
import { signOut, useSession } from "next-auth/react";

export default function Dashboard() {
  const { data } = useSession();
  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold">Dashboard</h2>
      <p className="mt-2 text-zinc-400">
        Olá, {data?.user?.name ?? "usuário"}.
      </p>
      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="mt-6 rounded-lg border border-white/10 px-4 py-2 hover:bg-white/10"
      >
        Sair
      </button>
    </div>
  );
}
