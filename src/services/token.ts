import { setItemAsync, getItemAsync, deleteItemAsync } from "expo-secure-store";
import { Platform } from "react-native";

const TOKEN_KEY = "trakx_token";

/**
 * Save JWT / auth token
 * Uses SecureStore on native, localStorage on web
 */
export async function saveToken(token: string) {
    try {
        if (Platform.OS === "web") {
            if (typeof window !== "undefined") {
                localStorage.setItem(TOKEN_KEY, token);
            }
        } else {
            await setItemAsync(TOKEN_KEY, token);
        }
    } catch (error) {
        console.error("Failed to save token:", error);
        throw error;
    }
}

/**
 * Read token (used on app startup)
 * Uses SecureStore on native, localStorage on web
 */
export async function getToken() {
    try {
        if (Platform.OS === "web") {
            if (typeof window !== "undefined") {
                return localStorage.getItem(TOKEN_KEY);
            }
            return null;
        } else {
            return await getItemAsync(TOKEN_KEY);
        }
    } catch (error) {
        console.error("Failed to retrieve token:", error);
        return null;
    }
}

/**
 * Clear token (logout)
 * Uses SecureStore on native, localStorage on web
 */
export async function clearToken() {
    try {
        if (Platform.OS === "web") {
            if (typeof window !== "undefined") {
                localStorage.removeItem(TOKEN_KEY);
            }
        } else {
            await deleteItemAsync(TOKEN_KEY);
        }
    } catch (error) {
        console.error("Failed to clear token:", error);
        throw error;
    }
}