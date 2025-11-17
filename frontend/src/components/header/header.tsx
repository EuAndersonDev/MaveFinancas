"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";

interface HeaderProps {
  userName?: string;
}

function GitHubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" width={12} height={12} aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M8 .2a8 8 0 0 0-2.53 15.6c.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2 .37-2.53-.49-2.69-.94-.09-.24-.48-.94-.82-1.13-.28-.15-.68-.53-.01-.54.63-.01 1.08.58 1.23.82.72 1.2 1.86.86 2.32.65.07-.52.28-.86.51-1.06-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.58.82-2.13-.08-.2-.36-1.01.08-2.11 0 0 .67-.21 2.2.82a7.5 7.5 0 0 1 4 0c1.53-1.03 2.2-.82 2.2-.82.44 1.1.16 1.91.08 2.11.51.55.82 1.26.82 2.13 0 3.07-1.87 3.74-3.65 3.94.29.25.55.74.55 1.5 0 1.08-.01 1.94-.01 2.2 0 .21.15.46.55.38A8 8 0 0 0 8 .2Z"
      />
    </svg>
  );
}

export default function Header({ userName = "Alicia Koch" }: HeaderProps) {
  const pathname = usePathname();

  const links = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/transactions", label: "Transações" },
    { href: "/assinatura", label: "Assinatura" },
  ];

  const isActive = (href: string) =>
    pathname === href || pathname?.startsWith(href + "/");

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Esquerda: logo + marca + navegação */}
        <div className={styles.left}>
          <Link href="/" className={styles.brand}>
            <Image
              src="/logoHeader.svg"
              alt="Mave"
              width={28}
              height={28}
              priority
            />
            <span className={styles.logoText}>Mave</span>
          </Link>

          <nav className={styles.nav}>
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`${styles.navLink} ${isActive(l.href) ? styles.navLinkActive : ""}`}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Direita: “quadradinho” do usuário */}
        <div className={styles.user} title={userName}>
          <span className={styles.userIconWrap}>
            <GitHubIcon />
          </span>
          <span className={styles.userName}>{userName}</span>
        </div>
      </div>
    </header>
  );
}