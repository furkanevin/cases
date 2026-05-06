import React, { useCallback } from 'react';
import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../store';
import { ArticleCard } from '../components/ArticleCard';
import { toggleSaved } from '../store/slices/savedSlice';
import { Article } from '../types/article';
import type { TabScreenProps } from '../navigation/types';

export function SavedScreen() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<TabScreenProps<'Saved'>['navigation']>();
  const items = useAppSelector(s => s.saved.items);
  const index = useAppSelector(s => s.saved.index);

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
        isSaved={!!index[item.id]}
        onPress={handlePress}
        onToggleSave={handleToggle}
      />
    ),
    [index, handlePress, handleToggle],
  );

  if (items.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyTitle}>No saved articles yet</Text>
        <Text style={styles.emptyBody}>
          Toggle "Save" on any article in the feed to keep it here for offline
          reading.
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      testID="saved-list"
      data={items}
      keyExtractor={a => a.id}
      renderItem={renderItem}
      contentContainerStyle={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  list: { paddingVertical: 8, backgroundColor: '#F9FAFB', flexGrow: 1 },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#F9FAFB',
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  emptyBody: {
    color: '#6B7280',
    textAlign: 'center',
  },
});
