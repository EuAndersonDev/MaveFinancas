"use client";
import React, { useState } from "react";
import Button from "@/components/Button/Button";
import SvgIconInline from "@/components/SvgIconInline/SvgIconInline";
import AddTransactionModal from "./AddTransactionModal";

type Props = {
  userId: string;
  accountId: string;
  onCreated?: (tx: any) => void;
  className?: string;
};

export default function AddTransactionButton({ userId, accountId, onCreated, className }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        className={className}
        onClick={() => setOpen(true)}
        leftIcon={<SvgIconInline src="/lucide_arrow-down-up.svg" size={16} color="#ffffff" />}
        style={{
          background: "var(--green)",
          borderRadius: "100px",
          fontWeight: 700,
          fontSize: 13,
          padding: "6px 14px"
        }}
      >
        Adicionar Transação
      </Button>
      <AddTransactionModal
        open={open}
        onClose={() => setOpen(false)}
        userId={userId}
        accountId={accountId}
        onCreated={onCreated}
      />
    </>
  );
}
