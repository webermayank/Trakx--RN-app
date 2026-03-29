import { useEffect } from "react";
import { useRouter } from "expo-router";
import { getToken } from "../src/services/token";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = await getToken();
      if (token) {
        router.replace("/(app)/home");
      } else {
        router.replace("/(public)/landing");
      }
    };

    checkAuth();
  }, [router]);

  return null;
}

