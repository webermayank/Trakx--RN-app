import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import { colors } from "../../src/theme/colors";
import { BalanceCard } from "../../src/components/BalanceCard";
import { SpendCard } from "../../src/components/SpendCard";
import { CategoryPill } from "../../src/components/CategoryPill";
import { TransactionCard } from "../../src/components/TransactionCard";
import { categories } from "../../src/data/mock";
import {
    fetchTransactions,
    formatTransactionForDisplay,
    type TransactionData
} from "../../src/services/transactions";

interface DisplayTransaction {
    id: string;
    title: string;
    category: string;
    amount: number;
    time: string;
}

export default function HomeScreen() {
    const [transactions, setTransactions] = useState<DisplayTransaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadTransactions = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await fetchTransactions();
                const formatted = data.map(formatTransactionForDisplay);
                setTransactions(formatted);
            } catch (err) {
                console.error("Error loading transactions:", err);
                setError(err instanceof Error ? err.message : "Failed to load transactions");
            } finally {
                setLoading(false);
            }
        };

        loadTransactions();
    }, []);

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Dashboard</Text>

            <BalanceCard />
            <SpendCard />

            <Text style={styles.section}>Categories</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {categories.map((c) => (
                    <CategoryPill key={c} label={c} />
                ))}
            </ScrollView>

            <Text style={styles.section}>Recent Transactions</Text>
            {loading ? (
                <ActivityIndicator
                    size="large"
                    color={colors.blue}
                    style={styles.loader}
                />
            ) : error ? (
                <Text style={styles.error}>
                    Error: {error}
                </Text>
            ) : transactions.length === 0 ? (
                <Text style={styles.emptyState}>
                    No transactions yet
                </Text>
            ) : (
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {transactions.map((t) => (
                        <TransactionCard key={t.id} item={t} />
                    ))}
                </ScrollView>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bg,
        padding: 16,
    },
    header: {
        color: colors.text,
        fontSize: 26,
        fontWeight: "700",
        marginBottom: 16,
    },
    section: {
        color: colors.text,
        fontSize: 18,
        fontWeight: "600",
        marginVertical: 12,
    },
    loader: {
        marginVertical: 20,
    },
    error: {
        color: colors.red,
        fontSize: 14,
        marginVertical: 12,
        padding: 12,
        borderRadius: 8,
        backgroundColor: "rgba(239, 68, 68, 0.1)",
    },
    emptyState: {
        color: colors.text,
        fontSize: 14,
        marginVertical: 12,
        textAlign: "center",
        opacity: 0.6,
    },
});
