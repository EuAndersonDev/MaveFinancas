"use client";

import { useRouter } from "next/navigation";
import SignupForm from "./SignupForm";

export default function SignupSection() {
  const router = useRouter();

  return (
    <SignupForm
      onSuccess={() => router.push("/dashboard")}
      onGoLogin={() => router.push("/login")}
      onError={(m) => console.warn("Falha signup:", m)}
    />
  );
}