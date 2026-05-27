import { apiPost } from "../../services/api";
import type { SmsClassification, SmsImportSummary, SmsMessage } from "./types";

const BATCH_SIZE = 50;

function toPayload(messages: SmsMessage[]) {
  return {
    messages: messages.map((message) => ({
      sms: message.body ?? "",
      timestamp: message.timestamp,
      address: message.address,
    })),
  };
}

function chunkMessages(messages: SmsMessage[], batchSize = BATCH_SIZE) {
  const chunks: SmsMessage[][] = [];
  for (let index = 0; index < messages.length; index += batchSize) {
    chunks.push(messages.slice(index, index + batchSize));
  }
  return chunks;
}

export async function importSmsBatch(messages: SmsMessage[]) {
  const summary: SmsImportSummary = {
    total: messages.length,
    imported: 0,
    duplicates: 0,
    skipped: 0,
    failed: 0,
    errors: [],
  };

  const chunks = chunkMessages(messages);

  for (const chunk of chunks) {
    const response = await apiPost<{ success: true; summary: SmsImportSummary }>(
      "/ingest/bulk-ingest-sms",
      toPayload(chunk)
    );

    summary.imported += response.summary.imported;
    summary.duplicates += response.summary.duplicates;
    summary.skipped += response.summary.skipped;
    summary.failed += response.summary.failed;
    summary.errors.push(...response.summary.errors);
  }

  summary.errors = summary.errors.slice(0, 10);
  return { success: true as const, summary };
}

export async function classifySmsBatch(messages: SmsMessage[]) {
  const chunks = chunkMessages(messages);
  const results: SmsClassification[] = [];

  for (const chunk of chunks) {
    const response = await apiPost<{ success: true; results: SmsClassification[] }>(
      "/ingest/classify-sms",
      toPayload(chunk)
    );

    const offset = results.length;
    results.push(
      ...response.results.map((item) => ({
        ...item,
        index: item.index + offset,
      }))
    );
  }

  return { success: true as const, results };
}
