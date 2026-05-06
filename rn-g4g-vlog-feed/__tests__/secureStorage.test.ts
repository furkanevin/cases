import * as Keychain from 'react-native-keychain';
import {
  clearPin,
  hasPin,
  setPin,
  verifyPin,
} from '../src/services/secureStorage';

type Stored = { username: string; password: string; service: string };

const setMock = Keychain.setGenericPassword as jest.Mock;
const getMock = Keychain.getGenericPassword as jest.Mock;
const resetMock = Keychain.resetGenericPassword as jest.Mock;

let stored: Stored | false = false;

beforeEach(() => {
  stored = false;
  setMock.mockImplementation(async (username: string, password: string, opts: { service: string }) => {
    stored = { username, password, service: opts.service };
    return true;
  });
  getMock.mockImplementation(async () => stored);
  resetMock.mockImplementation(async () => {
    stored = false;
    return true;
  });
});

describe('secureStorage', () => {
  it('writes a hashed value to the Keychain (never the raw PIN)', async () => {
    await setPin('1234');
    expect(stored).not.toBe(false);
    expect((stored as Stored).password).not.toBe('1234');
  });

  it('verifyPin returns true only for the original PIN', async () => {
    await setPin('1234');
    expect(await verifyPin('1234')).toBe(true);
    expect(await verifyPin('0000')).toBe(false);
  });

  it('hasPin reflects current state, including after clearPin', async () => {
    expect(await hasPin()).toBe(false);
    await setPin('5678');
    expect(await hasPin()).toBe(true);
    await clearPin();
    expect(await hasPin()).toBe(false);
  });
});
