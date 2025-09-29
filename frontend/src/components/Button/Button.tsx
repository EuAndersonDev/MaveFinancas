"use client";
import React from "react";
import styles from "./button.module.css";

type ButtonVariant = "primary" | "link" | "outline" | "danger";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export default function Button({
  variant = "primary",
  fullWidth,
  loading,
  disabled,
  leftIcon,
  rightIcon,
  children,
  className = "",
  ...rest
}: ButtonProps) {
  return (
    <button
      className={[
        styles.base,
        styles[variant],
        fullWidth ? styles.full : "",
        loading ? styles.loading : "",
        className
      ].join(" ").trim()}
      disabled={disabled || loading}
      {...rest}
    >
      {leftIcon && <span className={styles.icon}>{leftIcon}</span>}
      <span>{loading ? "Carregando..." : children}</span>
      {rightIcon && <span className={styles.icon}>{rightIcon}</span>}
    </button>
  );
}