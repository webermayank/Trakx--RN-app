import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../theme/colors";

export function BalanceCard() {
    return (
        <LinearGradient
            colors={[colors.blue, colors.purple]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.card}
        >
            <Text style={styles.label}>Total Balance</Text>
            <Text style={styles.amount}>$12,847.32</Text>
            <Text style={styles.delta}>+ $234.56 this month</Text>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
    },
    label: {
        color: "#E0E7FF",
        fontSize: 14,
    },
    amount: {
        color: "#fff",
        fontSize: 28,
        fontWeight: "700",
        marginVertical: 6,
    },
    delta: {
        color: "#DCFCE7",
        fontSize: 12,
    },
});
