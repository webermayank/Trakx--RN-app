import { useEffect, useState } from "react";
import { classifySmsBatch, importSmsBatch } from "./api";
import { getSmsSince } from "./native";
import { requestSmsPermission } from "./permissions";
import type { SmsClassification, SmsImportSummary, SmsMessage } from "./types";
import { filterTransactionalSms, getMonthsAgoTimestamp } from "./utils";

const MAX_CLASSIFICATION_CANDIDATES = 600;

export function useSmsDebug(monthsBack = 12) {
  const [messages, setMessages] = useState<SmsMessage[]>([]);
  const [transactionalMessages, setTransactionalMessages] = useState<SmsMessage[]>([]);
  const [classifications, setClassifications] = useState<SmsClassification[]>([]);
  const [loading, setLoading] = useState(false);
  const [importing, setImporting] = useState(false);
  const [importSummary, setImportSummary] = useState<SmsImportSummary | null>(null);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadMessages = async () => {
    setLoading(true);
    setError(null);

    try {
      const permission = await requestSmsPermission();
      setPermissionGranted(permission.granted);

      if (!permission.granted) {
        setError(
          permission.canAskAgain
            ? "SMS permission was denied."
            : "SMS permission was permanently denied. Enable it from Android settings."
        );
        return;
      }

      const result = await getSmsSince(getMonthsAgoTimestamp(monthsBack), 5000);
      setMessages(result);
      const candidateMessages = filterTransactionalSms(result).slice(0, MAX_CLASSIFICATION_CANDIDATES);
      const classificationResponse = await classifySmsBatch(candidateMessages);
      setClassifications(classificationResponse.results);
      setTransactionalMessages(
        classificationResponse.results
          .filter(
            (item) =>
              item.isTransactional &&
              item.transactionStatus === "completed" &&
              (item.direction === "debit" || item.direction === "credit")
          )
          .map((item) => candidateMessages[item.index]!)
          .filter(Boolean)
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to read SMS");
    } finally {
      setLoading(false);
    }
  };

  const importMessages = async () => {
    setImporting(true);
    setError(null);

    try {
      const response = await importSmsBatch(transactionalMessages);
      setImportSummary(response.summary);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to import SMS");
    } finally {
      setImporting(false);
    }
  };

  useEffect(() => {
    void loadMessages();
  }, []);

  return {
    messages,
    transactionalMessages,
    classifications,
    loading,
    importing,
    importSummary,
    permissionGranted,
    error,
    reload: loadMessages,
    importMessages,
  };
}
