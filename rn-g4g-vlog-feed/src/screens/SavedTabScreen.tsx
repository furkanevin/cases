import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BiometricGate } from '../components/BiometricGate';
import { SavedScreen } from './SavedScreen';

export function SavedTabScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <BiometricGate>
        <SavedScreen />
      </BiometricGate>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F9FAFB' },
});
