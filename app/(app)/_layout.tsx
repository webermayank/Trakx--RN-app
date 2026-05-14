import { useEffect, useState } from "react";
import { Tabs, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../src/theme/colors";
import { getToken } from "../../src/services/token";
import { ActivityIndicator, View } from "react-native";

export default function AppLayout() {
    const router = useRouter();
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        const validate = async () => {
            const token = await getToken();
            if (!token) {
                router.replace("/(public)/signin");
            } else {
                setChecked(true);
            }
        };
        validate();
    }, [router]);

    if (!checked) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color={colors.blue} />
            </View>
        );
    }

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: colors.surface,
                    borderTopColor: "#020617",
                },
                tabBarActiveTintColor: colors.blue,
                tabBarInactiveTintColor: colors.muted,
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" size={size} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="transactions"
                options={{
                    title: "Transactions",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="list" size={size} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="analytics"
                options={{
                    title: "Analytics",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="bar-chart" size={size} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person" size={size} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="sms-debug"
                options={{
                    href: null,
                }}
            />
        </Tabs>
    );
}
