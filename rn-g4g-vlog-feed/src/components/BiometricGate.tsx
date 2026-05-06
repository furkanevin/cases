import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../store';
import { unlockSucceeded } from '../store/slices/authSlice';
import {
  checkBiometryAvailability,
  describeBiometry,
  promptBiometric,
  type BiometryType,
} from '../services/biometric';
import {
  hasPin,
  setPin as persistPin,
  verifyPin,
} from '../services/secureStorage';
import { PinPad } from './PinPad';

const PIN_LENGTH = 4;
const MAX_FAILED_ATTEMPTS = 5;

type Stage =
  | { kind: 'checking' }
  | { kind: 'biometric-available'; type: BiometryType }
  | { kind: 'pin-setup' }
  | { kind: 'pin-confirm'; firstEntry: string }
  | { kind: 'pin-verify'; failures: number; lockedOut: boolean }
  | { kind: 'error'; message: string };

export interface BiometricGateProps {
  children: React.ReactNode;
}

export function BiometricGate({ children }: BiometricGateProps) {
  const dispatch = useAppDispatch();
  const unlocked = useAppSelector(s => s.auth.unlocked);

  const [stage, setStage] = useState<Stage>({ kind: 'checking' });
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  const handleUnlock = useCallback(() => {
    dispatch(unlockSucceeded({ at: Date.now() }));
  }, [dispatch]);

  const startAuthFlow = useCallback(async () => {
    setPinInput('');
    setPinError(false);

    const pinExists = await hasPin();
    if (!pinExists) {
      setStage({ kind: 'pin-setup' });
      return;
    }

    const { available, biometryType } = await checkBiometryAvailability();
    if (available) {
      setStage({ kind: 'biometric-available', type: biometryType });
      const ok = await promptBiometric('Unlock saved articles');
      if (ok) {
        handleUnlock();
      } else {
        setStage({ kind: 'pin-verify', failures: 0, lockedOut: false });
      }
    } else {
      setStage({ kind: 'pin-verify', failures: 0, lockedOut: false });
    }
  }, [handleUnlock]);

  useEffect(() => {
    if (unlocked) return;
    startAuthFlow();
  }, [unlocked, startAuthFlow]);

  useEffect(() => {
    if (pinInput.length !== PIN_LENGTH) return;

    if (stage.kind === 'pin-setup') {
      setStage({ kind: 'pin-confirm', firstEntry: pinInput });
      setPinInput('');
      return;
    }

    if (stage.kind === 'pin-confirm') {
      const matches = pinInput === stage.firstEntry;
      if (!matches) {
        setPinError(true);
        setTimeout(() => {
          setPinError(false);
          setPinInput('');
          setStage({ kind: 'pin-setup' });
        }, 600);
        return;
      }
      (async () => {
        try {
          await persistPin(pinInput);
          handleUnlock();
        } catch (err) {
          setStage({
            kind: 'error',
            message:
              err instanceof Error
                ? err.message
                : 'Could not save PIN to secure storage',
          });
        }
      })();
      return;
    }

    if (stage.kind === 'pin-verify') {
      (async () => {
        const ok = await verifyPin(pinInput);
        if (ok) {
          handleUnlock();
          return;
        }
        const failures = stage.failures + 1;
        setPinError(true);
        setTimeout(() => {
          setPinError(false);
          setPinInput('');
          setStage({
            kind: 'pin-verify',
            failures,
            lockedOut: failures >= MAX_FAILED_ATTEMPTS,
          });
        }, 600);
      })();
    }
  }, [pinInput, stage, handleUnlock]);

  if (unlocked) return <>{children}</>;

  return <View style={styles.gate}>{renderStage(stage, {
    pinInput,
    pinError,
    setPinInput,
    onRetryBiometric: startAuthFlow,
  })}</View>;
}

interface RenderCtx {
  pinInput: string;
  pinError: boolean;
  setPinInput: (s: string) => void;
  onRetryBiometric: () => void;
}

function renderStage(stage: Stage, ctx: RenderCtx): React.ReactNode {
  switch (stage.kind) {
    case 'checking':
      return (
        <View style={styles.center}>
          <ActivityIndicator />
        </View>
      );

    case 'biometric-available':
      return (
        <View style={styles.center}>
          <Text style={styles.title}>Authentication required</Text>
          <Text style={styles.body}>
            Unlock with {describeBiometry(stage.type)}.
          </Text>
          <Pressable onPress={ctx.onRetryBiometric} style={styles.button}>
            <Text style={styles.buttonText}>Try again</Text>
          </Pressable>
        </View>
      );

    case 'pin-setup':
      return (
        <View style={styles.pinContainer}>
          <Text style={styles.title}>Set a PIN</Text>
          <Text style={styles.body}>
            Choose a {PIN_LENGTH}-digit PIN. We'll use it as a fallback when
            biometrics aren't available.
          </Text>
          <PinPad
            value={ctx.pinInput}
            length={PIN_LENGTH}
            onChange={ctx.setPinInput}
            error={ctx.pinError}
          />
        </View>
      );

    case 'pin-confirm':
      return (
        <View style={styles.pinContainer}>
          <Text style={styles.title}>Confirm your PIN</Text>
          <Text style={styles.body}>Re-enter the same {PIN_LENGTH} digits.</Text>
          <PinPad
            value={ctx.pinInput}
            length={PIN_LENGTH}
            onChange={ctx.setPinInput}
            error={ctx.pinError}
          />
        </View>
      );

    case 'pin-verify':
      if (stage.lockedOut) {
        return (
          <View style={styles.center}>
            <Text style={styles.title}>Too many attempts</Text>
            <Text style={styles.body}>
              Close the app and try again later.
            </Text>
          </View>
        );
      }
      return (
        <View style={styles.pinContainer}>
          <Text style={styles.title}>Enter your PIN</Text>
          {stage.failures > 0 ? (
            <Text style={styles.error}>
              Incorrect PIN ({MAX_FAILED_ATTEMPTS - stage.failures} attempts
              left)
            </Text>
          ) : (
            <Text style={styles.body}>
              Or use biometrics.{' '}
              <Text style={styles.link} onPress={ctx.onRetryBiometric}>
                Try again
              </Text>
              .
            </Text>
          )}
          <PinPad
            value={ctx.pinInput}
            length={PIN_LENGTH}
            onChange={ctx.setPinInput}
            error={ctx.pinError}
          />
        </View>
      );

    case 'error':
      return (
        <View style={styles.center}>
          <Text style={styles.title}>Something went wrong</Text>
          <Text style={styles.error}>{stage.message}</Text>
          <Pressable onPress={ctx.onRetryBiometric} style={styles.button}>
            <Text style={styles.buttonText}>Try again</Text>
          </Pressable>
        </View>
      );
  }
}

const styles = StyleSheet.create({
  gate: {
    flex: 1,
    backgroundColor: '#fff',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  pinContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
    textAlign: 'center',
  },
  body: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 16,
  },
  error: {
    color: '#DC2626',
    fontSize: 14,
    marginBottom: 16,
    textAlign: 'center',
  },
  link: {
    color: '#0369A1',
    fontWeight: '600',
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#0369A1',
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
