import { View, Text, StyleSheet } from "react-native";
import { colors } from "../theme/colors";

export function SpendCard() {
    return (
        <View style={styles.card}>
            <Text style={styles.label}>Today&apos;s Spend</Text>
            <Text style={styles.amount}>$51.66</Text>
            <Text style={styles.sub}>2 transactions</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.surface,
        borderRadius: 14,
        padding: 16,
        marginBottom: 20,
    },
    label: {
        color: colors.muted,
        fontSize: 13,
    },
    amount: {
        color: colors.text,
        fontSize: 22,
        fontWeight: "600",
        marginVertical: 4,
    },
    sub: {
        color: colors.muted,
        fontSize: 12,
    },
});
