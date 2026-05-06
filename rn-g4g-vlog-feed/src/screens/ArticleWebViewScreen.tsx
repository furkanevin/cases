import React, { useCallback, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Linking,
  Platform,
  Pressable,
  Share,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { WebView, WebViewNavigation } from 'react-native-webview';
import type { RootStackScreenProps } from '../navigation/types';

type Props = RootStackScreenProps<'ArticleWebView'>;

export function ArticleWebViewScreen({ route, navigation }: Props) {
  const { article } = route.params;
  const insets = useSafeAreaInsets();
  const webRef = useRef<WebView>(null);

  const [canGoBack, setCanGoBack] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentUrl, setCurrentUrl] = useState(article.link);

  const handleNavStateChange = useCallback((nav: WebViewNavigation) => {
    setCanGoBack(nav.canGoBack);
    setCurrentUrl(nav.url);
  }, []);

  const handleBack = useCallback(() => {
    if (canGoBack && webRef.current) {
      webRef.current.goBack();
    } else {
      navigation.goBack();
    }
  }, [canGoBack, navigation]);

  const handleShare = useCallback(async () => {
    try {
      await Share.share(
        Platform.select({
          ios: { url: currentUrl, message: article.title },
          // Android Share ignores `url`, so pack it into the message body.
          default: { message: `${article.title}\n${currentUrl}` },
        }) ?? { message: currentUrl },
        { dialogTitle: 'Share article' },
      );
    } catch {
      // Some Android OEMs throw on share cancel.
    }
  }, [currentUrl, article.title]);

  const handleOpenExternal = useCallback(() => {
    Linking.openURL(currentUrl).catch(() => {});
  }, [currentUrl]);

  return (
    <View style={styles.container}>
      <View style={[styles.toolbar, { paddingTop: insets.top + 6 }]}>
        <ToolbarButton
          label="Back"
          onPress={handleBack}
          accessibilityLabel="Go back"
        />
        <Text style={styles.title} numberOfLines={1}>
          {article.title}
        </Text>
        <View style={styles.toolbarRight}>
          <ToolbarButton
            label="Share"
            onPress={handleShare}
            accessibilityLabel="Share article"
          />
          <ToolbarButton
            label="Open"
            onPress={handleOpenExternal}
            accessibilityLabel="Open in browser"
          />
        </View>
      </View>

      <WebView
        ref={webRef}
        testID="article-webview"
        source={{ uri: article.link }}
        onNavigationStateChange={handleNavStateChange}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        startInLoadingState
        originWhitelist={['*']}
        decelerationRate="normal"
        allowsBackForwardNavigationGestures
      />

      {loading ? (
        <View style={styles.loadingOverlay} pointerEvents="none">
          <ActivityIndicator size="small" />
        </View>
      ) : null}
    </View>
  );
}

interface ToolbarButtonProps {
  label: string;
  onPress: () => void;
  accessibilityLabel: string;
}

function ToolbarButton({ label, onPress, accessibilityLabel }: ToolbarButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      hitSlop={8}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      style={({ pressed }) => [
        styles.toolbarButton,
        pressed && styles.toolbarButtonPressed,
      ]}
    >
      <Text style={styles.toolbarButtonText}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingBottom: 8,
    backgroundColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E7EB',
  },
  toolbarRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginHorizontal: 8,
  },
  toolbarButton: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 6,
  },
  toolbarButtonPressed: { backgroundColor: '#F3F4F6' },
  toolbarButtonText: {
    color: '#0369A1',
    fontSize: 14,
    fontWeight: '600',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 80,
    right: 16,
  },
});
