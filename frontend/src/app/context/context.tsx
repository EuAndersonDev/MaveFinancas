"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type User = {
	id: string | number;
	name: string;
	email: string;
	accountId?: string;
};

type AuthState = {
	token: string | null;
	user: User | null;
};

type LoginPayload = {
	token: string;
	user: User;
};

type AuthContextType = AuthState & {
	login: (payload: LoginPayload) => void;
	logout: () => void;
	loading: boolean;
};

const STORAGE_TOKEN_KEY = "mave:auth_token";
const STORAGE_USER_KEY = "mave:auth_user";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [token, setToken] = useState<string | null>(null);
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	// Carrega armazenamento apenas após hidratação para manter HTML consistente entre server e primeiro render client
	useEffect(() => {
		try {
			const t = window.localStorage.getItem(STORAGE_TOKEN_KEY);
			const raw = window.localStorage.getItem(STORAGE_USER_KEY);
			if (t) setToken(t);
			if (raw) setUser(JSON.parse(raw));
		} catch {}
		setLoading(false);
	}, []);

	const login = (payload: LoginPayload) => {
		setToken(payload.token);
		setUser(payload.user);
		try {
			window.localStorage.setItem(STORAGE_TOKEN_KEY, payload.token);
			window.localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(payload.user));
		} catch {}
	};

	const logout = () => {
		setToken(null);
		setUser(null);
		try {
			window.localStorage.removeItem(STORAGE_TOKEN_KEY);
			window.localStorage.removeItem(STORAGE_USER_KEY);
		} catch {}
	};

	const value = useMemo(() => ({ token, user, login, logout, loading }), [token, user, loading]);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	const ctx = useContext(AuthContext);
	if (!ctx) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return ctx;
}

// Optional helpers for external usage
export const authStorageKeys = { token: STORAGE_TOKEN_KEY, user: STORAGE_USER_KEY } as const;
