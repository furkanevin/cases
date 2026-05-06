import React, { memo, useCallback } from 'react';
import {
  Pressable,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import { Article } from '../types/article';

export interface ArticleCardProps {
  article: Article;
  isSaved: boolean;
  onPress: (article: Article) => void;
  onToggleSave: (article: Article) => void;
}

function ArticleCardImpl({
  article,
  isSaved,
  onPress,
  onToggleSave,
}: ArticleCardProps) {
  const handlePress = useCallback(() => onPress(article), [article, onPress]);
  const handleToggle = useCallback(
    () => onToggleSave(article),
    [article, onToggleSave],
  );

  return (
    <Pressable
      onPress={handlePress}
      android_ripple={{ color: '#E5E7EB' }}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
      accessibilityRole="button"
      accessibilityLabel={`Open article: ${article.title}`}
    >
      <View style={styles.header}>
        <View style={styles.tag}>
          <Text style={styles.tagText} numberOfLines={1}>
            {article.category}
          </Text>
        </View>
        <View style={styles.saveRow}>
          <Text style={styles.saveLabel}>Save</Text>
          <Switch
            value={isSaved}
            onValueChange={handleToggle}
            accessibilityLabel={
              isSaved
                ? `Unsave ${article.title}`
                : `Save ${article.title} for offline`
            }
          />
        </View>
      </View>

      <Text style={styles.title} numberOfLines={3}>
        {article.title}
      </Text>

      <View style={styles.metaRow}>
        <Text style={styles.meta}>{article.readTimeMinutes} min read</Text>
        {article.author ? (
          <>
            <Text style={styles.metaDot}>·</Text>
            <Text style={styles.meta} numberOfLines={1}>
              {article.author}
            </Text>
          </>
        ) : null}
      </View>
    </Pressable>
  );
}

export const ArticleCard = memo(ArticleCardImpl);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  pressed: { opacity: 0.85 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  tag: {
    backgroundColor: '#E0F2FE',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    maxWidth: '60%',
  },
  tagText: {
    color: '#0369A1',
    fontSize: 12,
    fontWeight: '600',
  },
  saveRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  saveLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginRight: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    lineHeight: 22,
    marginBottom: 12,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  meta: {
    fontSize: 12,
    color: '#6B7280',
  },
  metaDot: {
    fontSize: 12,
    color: '#9CA3AF',
    marginHorizontal: 6,
  },
});
