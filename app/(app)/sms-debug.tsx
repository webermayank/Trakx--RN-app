import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { useSmsDebug } from "../../src/features/sms/hooks";
import { colors } from "../../src/theme/colors";

function formatTimestamp(timestamp: number) {
  return new Date(timestamp).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default function SmsDebugScreen() {
  const {
    messages,
    transactionalMessages,
    loading,
    importing,
    importSummary,
    permissionGranted,
    error,
    reload,
    importMessages,
  } = useSmsDebug(12);

  const previewMessages = transactionalMessages.slice(0, 30);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>SMS Import</Text>
      <Text style={styles.subtitle}>
        Reads the last 1 year of SMS, filters likely transaction messages, and imports them.
      </Text>

      <View style={styles.card}>
        <Text style={styles.meta}>
          Permission: {permissionGranted ? "Granted" : "Not granted"}
        </Text>
        <Text style={styles.meta}>Messages loaded: {messages.length}</Text>
        <Text style={styles.meta}>Transaction-like SMS: {transactionalMessages.length}</Text>
        <Text style={styles.hint}>
          If import skips messages with "Account could not be detected", first add accounts like
          `SBI 7445` or `HDFC 1234`.
        </Text>
        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Pressable style={styles.manageButton} onPress={() => router.push("/(app)/accounts" as never)}>
          <Text style={styles.buttonText}>Manage Accounts</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={reload} disabled={loading}>
          <Text style={styles.buttonText}>
            {loading ? "Loading..." : "Reload 1 Year"}
          </Text>
        </Pressable>

        <Pressable
          style={[styles.button, styles.importButton]}
          onPress={importMessages}
          disabled={loading || importing || transactionalMessages.length === 0}
        >
          <Text style={styles.buttonText}>
            {importing ? "Importing..." : "Import Transaction SMS"}
          </Text>
        </Pressable>
      </View>

      {importSummary ? (
        <View style={styles.card}>
          <Text style={styles.meta}>Imported: {importSummary.imported}</Text>
          <Text style={styles.meta}>Duplicates: {importSummary.duplicates}</Text>
          <Text style={styles.meta}>Skipped: {importSummary.skipped}</Text>
          <Text style={styles.meta}>Failed: {importSummary.failed}</Text>
          {importSummary.errors.slice(0, 3).map((item, index) => (
            <Text key={`${item}-${index}`} style={styles.error}>
              {item}
            </Text>
          ))}
        </View>
      ) : null}

      <Text style={styles.section}>Preview of importable SMS</Text>
      {previewMessages.length === 0 ? (
        <View style={styles.smsCard}>
          <Text style={styles.body}>No transaction-like SMS found in the last 1 year.</Text>
        </View>
      ) : (
        previewMessages.map((message) => (
          <View key={message.id} style={styles.smsCard}>
            <Text style={styles.sender}>{message.address || "Unknown sender"}</Text>
            <Text style={styles.date}>{formatTimestamp(message.timestamp)}</Text>
            <Text style={styles.body}>{message.body || "No message body"}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  content: {
    padding: 16,
    gap: 12,
  },
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: "700",
  },
  subtitle: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 20,
  },
  section: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "600",
    marginTop: 4,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    gap: 10,
  },
  meta: {
    color: colors.text,
    fontSize: 14,
  },
  error: {
    color: colors.red,
    fontSize: 14,
  },
  hint: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 18,
  },
  manageButton: {
    backgroundColor: colors.surface,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#334155",
  },
  button: {
    backgroundColor: colors.blue,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },
  importButton: {
    backgroundColor: colors.green,
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
  smsCard: {
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 14,
    gap: 6,
  },
  sender: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "700",
  },
  date: {
    color: colors.muted,
    fontSize: 12,
  },
  body: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 20,
  },
});
