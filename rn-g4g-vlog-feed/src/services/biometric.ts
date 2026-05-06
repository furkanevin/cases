import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';

const rnBiometrics = new ReactNativeBiometrics({
  // Device passcode fallback would bypass our PIN screen, so disable it.
  allowDeviceCredentials: false,
});

export type BiometryType = 'TouchID' | 'FaceID' | 'Biometrics' | undefined;

export interface BiometryAvailability {
  available: boolean;
  biometryType: BiometryType;
}

export async function checkBiometryAvailability(): Promise<BiometryAvailability> {
  try {
    const { available, biometryType } = await rnBiometrics.isSensorAvailable();
    return { available, biometryType: biometryType as BiometryType };
  } catch {
    return { available: false, biometryType: undefined };
  }
}

export async function promptBiometric(reason: string): Promise<boolean> {
  try {
    const { success } = await rnBiometrics.simplePrompt({
      promptMessage: reason,
      cancelButtonText: 'Use PIN',
    });
    return success;
  } catch {
    return false;
  }
}

export function describeBiometry(type: BiometryType): string {
  switch (type) {
    case BiometryTypes.FaceID:
      return 'Face ID';
    case BiometryTypes.TouchID:
      return 'Touch ID';
    case BiometryTypes.Biometrics:
      return 'fingerprint';
    default:
      return 'biometrics';
  }
}
