import { NativeModules, Platform } from "react-native";
import type { SmsMessage } from "./types";

type SmsNativeModule = {
  getRecentSms(limit: number): Promise<SmsMessage[]>;
  getSmsSince(sinceTimestamp: number, limit: number): Promise<SmsMessage[]>;
};

const nativeSmsModule = NativeModules.SmsModule as SmsNativeModule | undefined;

function assertAndroidSmsModule() {
  if (Platform.OS !== "android") {
    throw new Error("SMS reading is only available on Android");
  }

  if (!nativeSmsModule) {
    throw new Error(
      "SmsModule is not available. Build the Android app with native code enabled."
    );
  }

  return nativeSmsModule;
}

export async function getRecentSms(limit = 50): Promise<SmsMessage[]> {
  return assertAndroidSmsModule().getRecentSms(limit);
}

export async function getSmsSince(
  sinceTimestamp: number,
  limit = 5000
): Promise<SmsMessage[]> {
  return assertAndroidSmsModule().getSmsSince(sinceTimestamp, limit);
}
