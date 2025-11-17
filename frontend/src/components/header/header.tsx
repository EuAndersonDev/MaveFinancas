"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";
import { useAuth } from "@/app/context/context";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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

export default function Header({ userName }: HeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [hydrated, setHydrated] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  useEffect(() => setHydrated(true), []);
  const nameToShow = userName || (hydrated ? user?.name : undefined) || "Usuário";

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

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

        {/* Direita: dropdown do usuário */}
        <div className={styles.userDropdownWrapper}>
          <button 
            className={styles.user} 
            onClick={toggleDropdown}
            title={nameToShow}
          >
            <span className={styles.userIconWrap}>
              <GitHubIcon />
            </span>
            <span className={styles.userName}>{nameToShow}</span>
            <svg 
              className={`${styles.chevron} ${dropdownOpen ? styles.chevronOpen : ''}`}
              width="16" 
              height="16" 
              viewBox="0 0 16 16" 
              fill="none"
            >
              <path 
                d="M4 6L8 10L12 6" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </button>
          {dropdownOpen && (
            <div className={styles.dropdownMenu}>
              <button 
                onClick={handleLogout} 
                className={styles.dropdownItem}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path 
                    d="M6 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V3.33333C2 2.97971 2.14048 2.64057 2.39052 2.39052C2.64057 2.14048 2.97971 2 3.33333 2H6M10.6667 11.3333L14 8M14 8L10.6667 4.66667M14 8H6" 
                    stroke="currentColor" 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
                Sair
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}