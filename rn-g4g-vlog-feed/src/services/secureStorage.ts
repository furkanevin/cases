import * as Keychain from 'react-native-keychain';

/* eslint-disable no-bitwise -- FNV-1a hash is bit-twiddling by design */

const PIN_SERVICE = 'com.awesomeproject.pin';
const PIN_ACCOUNT = 'pin';

function fnv1aHash(input: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  const salted = `${h.toString(16)}::case-app-v1`;
  let h2 = 0xcbf29ce484222325n;
  for (let i = 0; i < salted.length; i++) {
    h2 ^= BigInt(salted.charCodeAt(i));
    h2 = (h2 * 0x100000001b3n) & 0xffffffffffffffffn;
  }
  return h2.toString(16);
}

export async function setPin(pin: string): Promise<void> {
  await Keychain.setGenericPassword(PIN_ACCOUNT, fnv1aHash(pin), {
    service: PIN_SERVICE,
    accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
  });
}

export async function hasPin(): Promise<boolean> {
  const result = await Keychain.getGenericPassword({ service: PIN_SERVICE });
  return result !== false;
}

export async function verifyPin(pin: string): Promise<boolean> {
  const result = await Keychain.getGenericPassword({ service: PIN_SERVICE });
  if (!result) return false;
  return result.password === fnv1aHash(pin);
}

export async function clearPin(): Promise<void> {
  await Keychain.resetGenericPassword({ service: PIN_SERVICE });
}
