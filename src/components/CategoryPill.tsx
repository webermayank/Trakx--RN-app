import { Text, Pressable, StyleSheet } from "react-native";
import { colors } from "../theme/colors";

export function CategoryPill({ label }: { label: string }) {
    return (
        <Pressable style={styles.pill}>
            <Text style={styles.text}>{label}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    pill: {
        backgroundColor: colors.card,
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
        marginRight: 10,
    },
    text: {
        color: colors.text,
        fontSize: 13,
    },
});
