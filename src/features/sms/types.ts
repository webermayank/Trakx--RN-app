export interface SmsMessage {
  id: string;
  address: string | null;
  body: string | null;
  timestamp: number;
  type: number;
}

export interface SmsPermissionResult {
  granted: boolean;
  canAskAgain: boolean;
}

export interface SmsImportSummary {
  total: number;
  imported: number;
  duplicates: number;
  skipped: number;
  failed: number;
  errors: string[];
}

export interface SmsClassification {
  index: number;
  isTransactional: boolean;
  direction: "debit" | "credit" | "unknown";
  transactionStatus: "completed" | "pending" | "failed" | "unknown";
  amount: number | null;
  merchant: string | null;
  paymentMethod: "UPI" | "CARD" | "BANK" | "IMPS" | "NEFT" | "RTGS";
  reason: string | null;
}
