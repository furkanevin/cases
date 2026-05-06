/**
 * Jest setup — mocks for native modules used in tests.
 */

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

jest.mock('react-native-keychain', () => ({
  ACCESSIBLE: { WHEN_UNLOCKED_THIS_DEVICE_ONLY: 'WhenUnlockedThisDeviceOnly' },
  ACCESS_CONTROL: { BIOMETRY_CURRENT_SET: 'BiometryCurrentSet' },
  setGenericPassword: jest.fn().mockResolvedValue(true),
  getGenericPassword: jest.fn().mockResolvedValue(false),
  resetGenericPassword: jest.fn().mockResolvedValue(true),
}));

jest.mock('react-native-biometrics', () => {
  const BiometryTypes = {
    TouchID: 'TouchID',
    FaceID: 'FaceID',
    Biometrics: 'Biometrics',
  };
  class ReactNativeBiometrics {
    isSensorAvailable = jest
      .fn()
      .mockResolvedValue({ available: false, biometryType: undefined });
    simplePrompt = jest.fn().mockResolvedValue({ success: false });
  }
  return { __esModule: true, default: ReactNativeBiometrics, BiometryTypes };
});

jest.mock('react-native-webview', () => ({
  WebView: 'WebView',
}));
