import type { SmsMessage } from "./types";

const NEGATIVE_PATTERNS = [
  /\brecharge\b/i,
  /\bvalidity\b/i,
  /\bunlimited calls\b/i,
  /\bdue on\b/i,
  /\bwill be (processed|credited)\b/i,
  /\bcollect request\b/i,
  /\bipo\b/i,
  /\bblocking of funds\b/i,
  /\botp\b/i,
  /\boffer\b/i,
  /\bregistered\b.*\bnumber\b/i,
  /\bplan rental\b/i,
  /\bbill (for|dated|generated)\b/i,
  /\bpayable amount\b/i,
  /\bavailable balance in account\b/i,
  /\bupi.*registered\b/i,
  /\bupi.*set up\b/i,
  /\bupi.*linked\b/i,
  /\bfunds payout request\b/i,
  /subject to credit availability/i,
  /\byour.*account.*statement\b/i,
  /\bemi.*due\b/i,
  /\bminimum.*due\b/i,
  /\binsufficient funds\b/i,
  /\bkyc\b/i,
  /click.*to.*pay\b/i,
  /\bno transaction\b/i,
  /\binactive\b/i,
];

const AMOUNT_PATTERN = /(?:rs\.?|inr|₹)\s*([\d,]+(?:\.\d{1,2})?)/i;
const KNOWN_FINANCIAL_SENDERS = /(SBI|SBIUPI|SBIBNK|SBIINB|CBSSBI|HDFCBK|ICICIB|AXISBK|KOTAKB|IDFCFB|UPI|PAYTM|PHONEPE|GPAY)/i;

export function getMonthsAgoTimestamp(months: number) {
  const date = new Date();
  date.setMonth(date.getMonth() - months);
  return date.getTime();
}

export function isLikelyTransactionalSms(message: SmsMessage) {
  const body = message.body ?? "";
  const sender = message.address ?? "";

  if (!body) {
    return false;
  }

  if (NEGATIVE_PATTERNS.some((pattern) => pattern.test(body))) {
    return false;
  }

  const amountMatch = body.match(AMOUNT_PATTERN);
  const bareAmountMatch = /\b(?:debited|credited)\s+by\s+([\d,]+(?:\.\d{1,2})?)\b/i.exec(body);
  const amount = amountMatch ? parseFloat(amountMatch[1]!.replace(/,/g, "")) : null;
  const fallbackAmount = bareAmountMatch
    ? parseFloat(bareAmountMatch[1]!.replace(/,/g, ""))
    : null;
  const detectedAmount = amount ?? fallbackAmount;

  if (!detectedAmount || detectedAmount <= 0) {
    return false;
  }

  const hasDebitSignal =
    /\bdebited\b/i.test(body) ||
    /\bpaid\b/i.test(body) ||
    /\bspent\b/i.test(body) ||
    /\bwithdrawn\b/i.test(body) ||
    /\bpayment of rs\b/i.test(body) ||
    /\bpayment of inr\b/i.test(body);

  const hasCreditSignal =
    /\bcredited\b/i.test(body) ||
    /\breceived\b/i.test(body) ||
    /has credit for\b/i.test(body);

  const hasCompletedSignal =
    /\bprocessed successfully\b/i.test(body) ||
    /\bsuccessfully\b/i.test(body) ||
    /\bhas been processed\b/i.test(body) ||
    /\bhas been debited\b/i.test(body) ||
    /\bhas been credited\b/i.test(body);

  const upiTransactional =
    /\bupi\b/i.test(body) && (hasDebitSignal || hasCreditSignal);

  const cardTransactional =
    /\b(card ending|debit card|credit card|pos|e-mandate)\b/i.test(body) &&
    (hasDebitSignal || hasCompletedSignal);

  const bankTransferTransactional =
    /\b(imps|neft|rtgs|txn|trf to|transfer to)\b/i.test(body) &&
    (hasDebitSignal || hasCreditSignal);

  const receivedInAccount =
    /\breceived\b/i.test(body) &&
    /\bin your account\b/i.test(body);

  const hasBankAccountRef =
    /\b(a\/c|ac\b|acct|account)\s*(no\.?)?\s*[xX*\d]+/i.test(body) ||
    /\bin your (account|a\/c)\b/i.test(body) ||
    /\byour (account|a\/c)\b/i.test(body);

  const hasStrongKeyword =
    hasDebitSignal ||
    hasCreditSignal ||
    hasCompletedSignal ||
    upiTransactional ||
    cardTransactional ||
    bankTransferTransactional ||
    receivedInAccount;

  const knownFinancialSender = KNOWN_FINANCIAL_SENDERS.test(sender);

  return (
    hasStrongKeyword &&
    (
      knownFinancialSender ||
      hasBankAccountRef ||
      upiTransactional ||
      cardTransactional ||
      bankTransferTransactional ||
      receivedInAccount
    )
  );
}

export function filterTransactionalSms(messages: SmsMessage[]) {
  return messages.filter(isLikelyTransactionalSms);
}
