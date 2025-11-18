import React from "react";
import styles from "./Loading.module.css";

type LoadingProps = {
  size?: "small" | "medium" | "large";
  centered?: boolean;
};

export default function Loading({ size = "medium", centered = true }: LoadingProps) {
  return (
    <div className={`${styles.container} ${centered ? styles.centered : ""}`}>
      <div className={`${styles.loader} ${styles[size]}`} />
    </div>
  );
}
