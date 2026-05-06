import AsyncStorage from '@react-native-async-storage/async-storage';
import { Article } from '../types/article';

export const SAVED_ARTICLES_KEY = '@case/saved-articles/v1';

export async function loadSavedArticles(): Promise<Article[]> {
  const raw = await AsyncStorage.getItem(SAVED_ARTICLES_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as Article[];
  } catch {
    await AsyncStorage.removeItem(SAVED_ARTICLES_KEY);
    return [];
  }
}

export async function persistSavedArticles(items: Article[]): Promise<void> {
  await AsyncStorage.setItem(SAVED_ARTICLES_KEY, JSON.stringify(items));
}
