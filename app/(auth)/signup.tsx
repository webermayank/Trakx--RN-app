import { useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable, ActivityIndicator } from "react-native";
import { router } from "expo-router";
import { colors } from "../../src/theme/colors";
import { register } from "../../src/services/auth";

export default function SignupScreen() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSignup = async () => {
        setError(null);
        setLoading(true);
        try {
            await register(name, email, password);
            router.replace("/(app)/home");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Signup failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create Account</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Full Name"
                placeholderTextColor={colors.muted}
            />
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder="Email"
                placeholderTextColor={colors.muted}
            />
            <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholder="Password"
                placeholderTextColor={colors.muted}
            />

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <Pressable style={styles.button} onPress={handleSignup} disabled={loading}>
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>Sign Up</Text>
                )}
            </Pressable>

            <Text style={styles.secondaryText}>
                Already have an account?
                <Text style={styles.link} onPress={() => router.push("/(public)/signin")}>Sign In</Text>
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bg,
        padding: 24,
        justifyContent: "center",
    },
    title: {
        fontSize: 32,
        fontWeight: "700",
        color: colors.text,
        marginBottom: 24,
    },
    input: {
        height: 52,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.surface,
        backgroundColor: colors.surface,
        paddingHorizontal: 14,
        marginBottom: 14,
        color: colors.text,
    },
    button: {
        height: 52,
        borderRadius: 10,
        backgroundColor: colors.blue,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 6,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    error: {
        color: colors.red,
        marginBottom: 12,
        textAlign: "center",
    },
    secondaryText: {
        marginTop: 18,
        textAlign: "center",
        color: colors.muted,
    },
    link: {
        color: colors.blue,
        fontWeight: "700",
    },
});