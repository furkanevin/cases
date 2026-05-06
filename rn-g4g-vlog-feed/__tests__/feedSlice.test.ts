import { configureStore } from '@reduxjs/toolkit';
import feedReducer, {
  loadInitialFeed,
  loadNextPage,
  refreshFeed,
  resetFeed,
} from '../src/store/slices/feedSlice';
import { Article } from '../src/types/article';

function makeArticle(id: string, overrides: Partial<Article> = {}): Article {
  return {
    id,
    title: `Title ${id}`,
    link: `https://example.com/${id}`,
    pubDate: new Date(0).toISOString(),
    category: 'Tech',
    description: 'desc',
    readTimeMinutes: 1,
    ...overrides,
  };
}

function makeStore() {
  return configureStore({ reducer: { feed: feedReducer } });
}

describe('feedSlice', () => {
  it('starts in idle with no articles', () => {
    const store = makeStore();
    expect(store.getState().feed).toMatchObject({
      articles: [],
      status: 'idle',
      page: 0,
      reachedEnd: false,
    });
  });

  it('hydrates the list on initial load and dedupes by id', () => {
    const store = makeStore();
    const articles = [
      makeArticle('a'),
      makeArticle('b'),
      makeArticle('a'),
    ];
    store.dispatch({
      type: loadInitialFeed.fulfilled.type,
      payload: articles,
    });
    const state = store.getState().feed;
    expect(state.articles.map(a => a.id)).toEqual(['a', 'b']);
    expect(state.status).toBe('idle');
    expect(state.page).toBe(1);
    expect(state.reachedEnd).toBe(false);
  });

  it('marks reachedEnd when a paged response yields no new items', () => {
    const store = makeStore();
    store.dispatch({
      type: loadInitialFeed.fulfilled.type,
      payload: [makeArticle('a'), makeArticle('b')],
    });
    // ?paged past the end returns the same window again.
    store.dispatch({
      type: loadNextPage.fulfilled.type,
      payload: [makeArticle('a'), makeArticle('b')],
    });

    const state = store.getState().feed;
    expect(state.reachedEnd).toBe(true);
    expect(state.page).toBe(1);
    expect(state.articles).toHaveLength(2);
  });

  it('appends only genuinely new items on a successful page load', () => {
    const store = makeStore();
    store.dispatch({
      type: loadInitialFeed.fulfilled.type,
      payload: [makeArticle('a')],
    });
    store.dispatch({
      type: loadNextPage.fulfilled.type,
      payload: [makeArticle('a'), makeArticle('b'), makeArticle('c')],
    });
    const state = store.getState().feed;
    expect(state.articles.map(a => a.id)).toEqual(['a', 'b', 'c']);
    expect(state.page).toBe(2);
    expect(state.reachedEnd).toBe(false);
  });

  it('prepends new items on refresh without disturbing existing order', () => {
    const store = makeStore();
    store.dispatch({
      type: loadInitialFeed.fulfilled.type,
      payload: [makeArticle('b'), makeArticle('c')],
    });
    store.dispatch({
      type: refreshFeed.fulfilled.type,
      payload: [makeArticle('a'), makeArticle('b'), makeArticle('c')],
    });
    const state = store.getState().feed;
    expect(state.articles.map(a => a.id)).toEqual(['a', 'b', 'c']);
  });

  it('captures the error message on rejection without losing existing data', () => {
    const store = makeStore();
    store.dispatch({
      type: loadInitialFeed.fulfilled.type,
      payload: [makeArticle('a')],
    });
    store.dispatch({
      type: loadNextPage.rejected.type,
      error: { message: 'boom' },
    });
    const state = store.getState().feed;
    expect(state.status).toBe('error');
    expect(state.error).toBe('boom');
    expect(state.articles).toHaveLength(1);
  });

  it('resetFeed brings the slice back to its initial state', () => {
    const store = makeStore();
    store.dispatch({
      type: loadInitialFeed.fulfilled.type,
      payload: [makeArticle('a')],
    });
    store.dispatch(resetFeed());
    expect(store.getState().feed).toMatchObject({
      articles: [],
      status: 'idle',
      page: 0,
      reachedEnd: false,
    });
  });
});
