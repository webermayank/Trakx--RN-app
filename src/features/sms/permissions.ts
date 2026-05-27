import { PermissionsAndroid, Platform } from "react-native";
import type { SmsPermissionResult } from "./types";

export async function requestSmsPermission(): Promise<SmsPermissionResult> {
  if (Platform.OS !== "android") {
    return { granted: false, canAskAgain: false };
  }

  const currentStatus = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.READ_SMS
  );

  if (currentStatus) {
    return { granted: true, canAskAgain: true };
  }

  const result = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.READ_SMS,
    {
      title: "Allow SMS access",
      message:
        "Trakx needs SMS access to read bank transaction messages from your Android inbox.",
      buttonPositive: "Allow",
      buttonNegative: "Deny",
    }
  );

  return {
    granted: result === PermissionsAndroid.RESULTS.GRANTED,
    canAskAgain: result !== PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN,
  };
}
