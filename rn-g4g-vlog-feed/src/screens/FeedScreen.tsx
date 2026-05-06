import React, { useCallback, useEffect } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../store';
import {
  loadInitialFeed,
  loadNextPage,
  refreshFeed,
} from '../store/slices/feedSlice';
import { toggleSaved } from '../store/slices/savedSlice';
import { ArticleCard } from '../components/ArticleCard';
import { SkeletonCard } from '../components/SkeletonCard';
import { Article } from '../types/article';
import type { TabScreenProps } from '../navigation/types';

const SKELETON_COUNT = 6;
const skeletonKeys = Array.from({ length: SKELETON_COUNT }, (_, i) => `s${i}`);

export function FeedScreen() {
  const dispatch = useAppDispatch();
  const navigation =
    useNavigation<TabScreenProps<'Feed'>['navigation']>();

  const articles = useAppSelector(s => s.feed.articles);
  const status = useAppSelector(s => s.feed.status);
  const error = useAppSelector(s => s.feed.error);
  const reachedEnd = useAppSelector(s => s.feed.reachedEnd);
  const savedIndex = useAppSelector(s => s.saved.index);

  useEffect(() => {
    if (articles.length === 0 && status === 'idle') {
      dispatch(loadInitialFeed());
    }
  }, [articles.length, status, dispatch]);

  const handleRefresh = useCallback(() => {
    dispatch(refreshFeed());
  }, [dispatch]);

  const handleEndReached = useCallback(() => {
    if (status === 'idle' && !reachedEnd && articles.length > 0) {
      dispatch(loadNextPage());
    }
  }, [status, reachedEnd, articles.length, dispatch]);

  const handlePress = useCallback(
    (article: Article) => {
      navigation.navigate('ArticleWebView', { article });
    },
    [navigation],
  );

  const handleToggle = useCallback(
    (article: Article) => {
      dispatch(toggleSaved(article));
    },
    [dispatch],
  );

  const renderItem: ListRenderItem<Article> = useCallback(
    ({ item }) => (
      <ArticleCard
        article={item}
        isSaved={!!savedIndex[item.id]}
        onPress={handlePress}
        onToggleSave={handleToggle}
      />
    ),
    [savedIndex, handlePress, handleToggle],
  );

  if (status === 'loading' && articles.length === 0) {
    return (
      <View style={styles.container} testID="feed-skeleton">
        {skeletonKeys.map(key => (
          <SkeletonCard key={key} />
        ))}
      </View>
    );
  }

  if (status === 'error' && articles.length === 0) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorTitle}>Could not load feed</Text>
        <Text style={styles.errorBody}>{error ?? 'Unknown error'}</Text>
        <Text
          style={styles.retry}
          onPress={() => dispatch(loadInitialFeed())}
          accessibilityRole="button"
        >
          Tap to retry
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      testID="feed-list"
      data={articles}
      keyExtractor={a => a.id}
      renderItem={renderItem}
      contentContainerStyle={styles.listContent}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.4}
      refreshControl={
        <RefreshControl
          refreshing={status === 'refreshing'}
          onRefresh={handleRefresh}
        />
      }
      ListFooterComponent={
        status === 'paging' ? (
          <View style={styles.footer}>
            <ActivityIndicator />
          </View>
        ) : reachedEnd && articles.length > 0 ? (
          <View style={styles.footer}>
            <Text style={styles.footerText}>You're all caught up.</Text>
          </View>
        ) : null
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    paddingTop: 8,
  },
  listContent: {
    paddingVertical: 8,
    backgroundColor: '#F9FAFB',
    flexGrow: 1,
  },
  footer: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  footerText: {
    color: '#6B7280',
    fontSize: 12,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#F9FAFB',
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  errorBody: {
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 16,
  },
  retry: {
    color: '#0369A1',
    fontWeight: '600',
  },
});
