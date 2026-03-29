import { useEffect } from "react";
import { router } from "expo-router";

export default function LoginScreen() {
    useEffect(() => {
        router.replace("/(public)/signin");
    }, []);

    return null;
}
