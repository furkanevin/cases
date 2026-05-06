import React, { useEffect, useRef } from 'react';
import {
  AppState,
  AppStateStatus,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { store, useAppDispatch } from './src/store';
import { hydrateSaved } from './src/store/slices/savedSlice';
import { appReturnedToForeground, lock } from './src/store/slices/authSlice';
import { RootNavigator } from './src/navigation/RootNavigator';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <View style={styles.container}>
          <AppContent />
        </View>
      </SafeAreaProvider>
    </Provider>
  );
}

function AppContent() {
  const dispatch = useAppDispatch();
  const appState = useRef<AppStateStatus>(AppState.currentState);

  useEffect(() => {
    dispatch(hydrateSaved());
  }, [dispatch]);

  useEffect(() => {
    const sub = AppState.addEventListener('change', next => {
      const prev = appState.current;
      appState.current = next;

      if (prev === 'active' && next.match(/inactive|background/)) {
        dispatch(lock());
      } else if (next === 'active') {
        dispatch(appReturnedToForeground({ at: Date.now() }));
      }
    });
    return () => sub.remove();
  }, [dispatch]);

  return <RootNavigator />;
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default App;
