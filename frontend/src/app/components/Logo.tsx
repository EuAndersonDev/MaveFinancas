import { Leaf } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex items-center gap-3">
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand text-zinc-900">
        <Leaf className="h-5 w-5" />
      </span>
      <span className="text-xl font-semibold">Mave Finanças</span>
    </div>
  );
}
