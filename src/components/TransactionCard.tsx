import { View, Text, StyleSheet } from "react-native";
import { colors } from "../theme/colors";

export function TransactionCard({ item }: any) {
    const isPositive = item.amount > 0;

    return (
        <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.meta}>
                {item.category} · {item.time}
            </Text>
            <Text
                style={[
                    styles.amount,
                    { color: isPositive ? colors.green : colors.red },
                ]}
            >
                ${Math.abs(item.amount)}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.surface,
        borderRadius: 14,
        padding: 14,
        width: 220,
        marginRight: 12,
    },
    title: {
        color: colors.text,
        fontSize: 15,
        fontWeight: "600",
    },
    meta: {
        color: colors.muted,
        fontSize: 12,
        marginVertical: 4,
    },
    amount: {
        fontSize: 16,
        fontWeight: "600",
    },
});
