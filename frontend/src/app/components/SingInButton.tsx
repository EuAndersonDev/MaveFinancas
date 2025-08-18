"use client";
import { signIn } from "next-auth/react";

function GoogleMark() {
  return (
    <span className="mr-2 inline-block h-5 w-5 rounded-full bg-white">
      {/* simples marcador branco; troque por um svg do Google se quiser */}
    </span>
  );
}

export default function SignInButton() {
  return (
    <button
      onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
      className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium hover:bg-white/10 transition"
    >
      <span className="inline-flex items-center justify-center">
        <GoogleMark /> Entrar com Google
      </span>
    </button>
  );
}
