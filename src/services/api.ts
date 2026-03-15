import { getToken } from "./token";

const API_URL = "http://localhost:5050/api/v1";

export async function apiGet<T>(path: string): Promise<T> {
    const token = await getToken();

    const res = await fetch(`${API_URL}${path}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
        },
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Request failed");
    }

    return res.json();
}

export async function apiPost<T>(path: string, body: any): Promise<T> {
    const token = await getToken();

    const res = await fetch(`${API_URL}${path}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Request failed");
    }

    return res.json();
}

export async function apiDelete<T>(path: string): Promise<T> {
    const token = await getToken();

    const res = await fetch(`${API_URL}${path}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
        },
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Request failed");
    }

    return res.json();
}
