import { apiPost, apiGet } from "./api";
import { saveToken, clearToken, getToken } from "./token";

export interface AuthUser {
    userId: string;
    email: string;
    name?: string;
}

export interface AuthResponse {
    token: string;
    userId: string;
    email?: string;
    message?: string;
}

export async function register( name: string, email: string, password: string ) {
    const result = await apiPost<AuthResponse>("/auth/register", {
        name,
        email,
        password,
    });

    if (!result.token) throw new Error("Registration succeeded but token not returned");
    await saveToken(result.token);
    return result;
}

export async function login(email: string, password: string) {
    const result = await apiPost<AuthResponse>("/auth/login", {
        email,
        password,
    });

    if (!result.token) throw new Error("Login succeeded but token not returned");
    await saveToken(result.token);
    return result;
}

export async function logout() {
    await clearToken();
}

export async function getCurrentToken() {
    return getToken();
}

export async function fetchMe() {
    return apiGet<{ user: AuthUser }>("/auth/me");
}
