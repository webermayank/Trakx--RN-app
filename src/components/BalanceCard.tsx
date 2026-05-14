import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../theme/colors";
import { useState, useEffect } from "react";
import { apiGet } from "../services/api";

interface Transaction {
    id: string;
    amount: number;
    date: string;

}

export function BalanceCard() {
    const [totalSpending, setTotalSpending] = useState<number>(0);
    const [monthlySpending, setMonthlySpending] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchSpending = async () => {
            try {
                const transactions: Transaction[] = await apiGet("/transactions");
                const now = new Date();
                const thisMonth = now.getMonth();
                const thisYear = now.getFullYear();

                let total = 0;
                let monthly = 0;

                transactions.forEach(t => {
                    if (t.amount < 0) {
                        total += Math.abs(t.amount);
                        const d = new Date(t.date);
                        if (d.getMonth() === thisMonth && d.getFullYear() === thisYear) {
                            monthly += Math.abs(t.amount);
                        }
                    }
                });

                setTotalSpending(total);
                setMonthlySpending(monthly);
            } catch (error) {
                console.error("Failed to fetch transactions:", error);
                // Optionally set error state
            } finally {
                setLoading(false);
            }
        };

        fetchSpending();
    }, []);

    if (loading) {
        return (
            <LinearGradient
                colors={[colors.blue, colors.purple]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.card}
            >
                <Text style={styles.label}>Loading...</Text>
            </LinearGradient>
        );
    }

    return (
        <LinearGradient
            colors={[colors.blue, colors.purple]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.card}
        >
            <Text style={styles.label}>Total Spending</Text>
            <Text style={styles.amount}>${totalSpending.toFixed(2)}</Text>
            <Text style={styles.delta}>${monthlySpending.toFixed(2)} this month</Text>
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
