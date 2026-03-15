import { apiGet } from "./api";

export interface TransactionData {
    id: string;
    amount: number;
    date: string;
    merchant: string | null;
    description: string | null;
    paymentMethod: string | null;
    accountId: string;
    userId: string;
    categoryId: string | null;
    account: {
        name: string;
        type: string;
    };
    category: {
        name: string;
    } | null;
}

/**
 * Fetch all transactions for the current user
 */
export async function fetchTransactions(): Promise<TransactionData[]> {
    try {
        const transactions = await apiGet<TransactionData[]>("/trxn/transactions");
        return transactions;
    } catch (error) {
        console.error("Failed to fetch transactions:", error);
        throw error;
    }
}

/**
 * Fetch a single transaction by ID
 */
export async function fetchTransaction(id: string): Promise<TransactionData> {
    try {
        const transaction = await apiGet<TransactionData>(`/trxn/transactions/${id}`);
        return transaction;
    } catch (error) {
        console.error("Failed to fetch transaction:", error);
        throw error;
    }
}

/**
 * Format transaction for display
 */
export function formatTransactionForDisplay(txn: TransactionData) {
    return {
        id: txn.id,
        title: txn.merchant || txn.description || "Transaction",
        category: txn.category?.name || "Other",
        amount: txn.amount,
        time: new Date(txn.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        }),
    };
}
