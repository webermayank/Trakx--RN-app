import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../src/theme/colors";
import { logout } from "../../src/services/auth";
import { router } from "expo-router";

export default function ProfileScreen() {
    const signOut = async () => {
        await logout();
        router.replace("/(public)/signin");
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.iconContainer}>
                    <Ionicons name="person" size={64} color={colors.muted} />
                </View>
                <Text style={styles.title}>Profile</Text>
                <Text style={styles.description}>
                    Manage your account settings and preferences here
                </Text>

                <Pressable style={styles.logoutButton} onPress={signOut}>
                    <Text style={styles.logoutText}>Logout</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bg,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
    },
    content: {
        alignItems: "center",
        justifyContent: "center",
    },
    iconContainer: {
        marginBottom: 24,
        padding: 16,
        backgroundColor: colors.surface,
        borderRadius: 16,
    },
    title: {
        color: colors.text,
        fontSize: 24,
        fontWeight: "600",
        marginBottom: 8,
        textAlign: "center",
    },
    description: {
        color: colors.muted,
        fontSize: 14,
        textAlign: "center",
        maxWidth: 280,
        lineHeight: 20,
        marginBottom: 24,
    },
    logoutButton: {
        backgroundColor: colors.red,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    logoutText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
});
