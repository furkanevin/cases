import React, { useCallback } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const KEYS: ReadonlyArray<string | null> = [
  '1', '2', '3',
  '4', '5', '6',
  '7', '8', '9',
  null, '0', '⌫',
];

export interface PinPadProps {
  value: string;
  length: number;
  onChange: (next: string) => void;
  error?: boolean;
}

export function PinPad({ value, length, onChange, error }: PinPadProps) {
  const handlePress = useCallback(
    (key: string) => {
      if (key === '⌫') {
        if (value.length > 0) onChange(value.slice(0, -1));
        return;
      }
      if (value.length >= length) return;
      onChange(value + key);
    },
    [value, length, onChange],
  );

  return (
    <View style={styles.container}>
      <View style={styles.dots}>
        {Array.from({ length }).map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              value.length > i && styles.dotFilled,
              error && styles.dotError,
            ]}
          />
        ))}
      </View>

      <View style={styles.grid}>
        {KEYS.map((key, idx) =>
          key === null ? (
            <View key={`gap-${idx}`} style={styles.key} />
          ) : (
            <Pressable
              key={key}
              onPress={() => handlePress(key)}
              accessibilityRole="button"
              accessibilityLabel={key === '⌫' ? 'Delete' : `Digit ${key}`}
              style={({ pressed }) => [
                styles.key,
                pressed && styles.keyPressed,
              ]}
            >
              <Text style={styles.keyText}>{key}</Text>
            </Pressable>
          ),
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  dots: {
    flexDirection: 'row',
    marginVertical: 24,
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 1.5,
    borderColor: '#9CA3AF',
    marginHorizontal: 8,
  },
  dotFilled: {
    backgroundColor: '#111827',
    borderColor: '#111827',
  },
  dotError: {
    borderColor: '#DC2626',
    backgroundColor: '#FEE2E2',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 280,
    justifyContent: 'space-between',
  },
  key: {
    width: 80,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 4,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
  },
  keyPressed: { backgroundColor: '#E5E7EB' },
  keyText: {
    fontSize: 24,
    fontWeight: '500',
    color: '#111827',
  },
});
