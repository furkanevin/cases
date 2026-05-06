import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore } from '@reduxjs/toolkit';
import savedReducer, {
  hydrateSaved,
  toggleSaved,
} from '../src/store/slices/savedSlice';
import { SAVED_ARTICLES_KEY } from '../src/services/storage';
import { Article } from '../src/types/article';

function makeArticle(id: string): Article {
  return {
    id,
    title: `Title ${id}`,
    link: `https://example.com/${id}`,
    pubDate: new Date(0).toISOString(),
    category: 'Tech',
    description: 'desc',
    readTimeMinutes: 1,
  };
}

function makeStore() {
  return configureStore({ reducer: { saved: savedReducer } });
}

beforeEach(async () => {
  await AsyncStorage.clear();
});

describe('savedSlice', () => {
  it('hydrates from AsyncStorage and seeds the lookup index', async () => {
    const seed = [makeArticle('a'), makeArticle('b')];
    await AsyncStorage.setItem(SAVED_ARTICLES_KEY, JSON.stringify(seed));

    const store = makeStore();
    await store.dispatch(hydrateSaved());

    const state = store.getState().saved;
    expect(state.items.map(a => a.id)).toEqual(['a', 'b']);
    expect(state.index).toEqual({ a: true, b: true });
    expect(state.hydrated).toBe(true);
  });

  it('marks hydrated even when AsyncStorage returns nothing', async () => {
    const store = makeStore();
    await store.dispatch(hydrateSaved());

    const state = store.getState().saved;
    expect(state.items).toEqual([]);
    expect(state.hydrated).toBe(true);
  });

  it('toggleSaved adds an article and persists it', async () => {
    const store = makeStore();
    await store.dispatch(hydrateSaved());

    const article = makeArticle('a');
    await store.dispatch(toggleSaved(article));

    const state = store.getState().saved;
    expect(state.items).toEqual([article]);
    expect(state.index).toEqual({ a: true });

    const persisted = await AsyncStorage.getItem(SAVED_ARTICLES_KEY);
    expect(persisted).toBeTruthy();
    expect(JSON.parse(persisted as string)).toEqual([article]);
  });

  it('toggleSaved removes an already-saved article and updates AsyncStorage', async () => {
    const article = makeArticle('a');
    await AsyncStorage.setItem(SAVED_ARTICLES_KEY, JSON.stringify([article]));
    const store = makeStore();
    await store.dispatch(hydrateSaved());

    await store.dispatch(toggleSaved(article));

    const state = store.getState().saved;
    expect(state.items).toEqual([]);
    expect(state.index).toEqual({});

    const persisted = await AsyncStorage.getItem(SAVED_ARTICLES_KEY);
    expect(JSON.parse(persisted as string)).toEqual([]);
  });

  it('puts the most recently saved article at the top of the list', async () => {
    const store = makeStore();
    await store.dispatch(hydrateSaved());

    await store.dispatch(toggleSaved(makeArticle('first')));
    await store.dispatch(toggleSaved(makeArticle('second')));

    const ids = store.getState().saved.items.map(a => a.id);
    expect(ids).toEqual(['second', 'first']);
  });
});
