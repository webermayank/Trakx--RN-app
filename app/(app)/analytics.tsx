import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../src/theme/colors";

export default function AnalyticsScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.iconContainer}>
                    <Ionicons name="bar-chart" size={64} color={colors.muted} />
                </View>
                <Text style={styles.title}>Analytics Coming Soon</Text>
                <Text style={styles.description}>
                    Track your spending patterns and insights here
                </Text>
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
    },
});
