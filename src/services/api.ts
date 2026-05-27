import Constants from "expo-constants";
import { Platform } from "react-native";
import { getToken } from "./token";

function resolveApiUrl() {
  const envUrl = process.env.EXPO_PUBLIC_API_BASE_URL?.trim();
  if (envUrl) {
    return envUrl;
  }

  if (Platform.OS === "android") {
    const hostUri = Constants.expoConfig?.hostUri;
    const expoHost = hostUri?.split(":")[0];
    if (expoHost) {
      return `http://${expoHost}:5050/api/v1`;
    }

    return "http://192.168.1.5:5050/api/v1";
  }

  return "http://localhost:5050/api/v1";
}

const API_URL = resolveApiUrl();
console.log("Resolved API_URL:", API_URL);

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
