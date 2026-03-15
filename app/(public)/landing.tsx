import { View, Text, StyleSheet, Pressable } from "react-native";
import { router } from "expo-router";
import { colors } from "../../src/theme/colors";

export default function LandingScreen() {
    return (
        <View style={styles.container}>
            {/* App name */}
            <Text style={styles.title}>Trakx</Text>

            {/* Tagline */}
            <Text style={styles.subtitle}>
                Track every rupee. Automatically.
            </Text>

            {/* Primary CTA */}
            <Pressable
                style={styles.primaryButton}
                onPress={() => router.push("/(public)/signin")}
            >
                <Text style={styles.primaryButtonText}>Get Started</Text>
            </Pressable>

            {/* Secondary CTA */}
            <Pressable onPress={() => router.push("/(public)/signin")}>
                <Text style={styles.linkText}>
                    Already have an account? Sign in
                </Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bg,
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
    },
    title: {
        fontSize: 36,
        fontWeight: "700",
        color: colors.text,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: colors.muted,
        textAlign: "center",
        marginBottom: 40,
    },
    primaryButton: {
        backgroundColor: colors.blue,
        paddingVertical: 14,
        paddingHorizontal: 32,
        borderRadius: 12,
        width: "100%",
        marginBottom: 16,
    },
    primaryButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
        textAlign: "center",
    },
    linkText: {
        color: colors.muted,
        fontSize: 14,
    },
});
