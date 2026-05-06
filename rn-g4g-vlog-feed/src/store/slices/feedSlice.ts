import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { Article } from '../../types/article';
import { fetchArticles } from '../../services/rssService';

export type FeedStatus = 'idle' | 'loading' | 'refreshing' | 'paging' | 'error';

export interface FeedState {
  articles: Article[];
  seenIds: Record<string, true>;
  status: FeedStatus;
  page: number;
  reachedEnd: boolean;
  error: string | null;
}

const initialState: FeedState = {
  articles: [],
  seenIds: {},
  status: 'idle',
  page: 0,
  reachedEnd: false,
  error: null,
};

export const loadInitialFeed = createAsyncThunk<Article[]>(
  'feed/loadInitial',
  async () => fetchArticles({ page: 1 }),
);

export const refreshFeed = createAsyncThunk<Article[]>(
  'feed/refresh',
  async () => fetchArticles({ page: 1 }),
);

export const loadNextPage = createAsyncThunk<
  Article[],
  void,
  { state: { feed: FeedState } }
>('feed/loadNextPage', async (_arg, { getState }) => {
  const { feed } = getState();
  return fetchArticles({ page: feed.page + 1 });
});

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    resetFeed(state) {
      state.articles = [];
      state.seenIds = {};
      state.status = 'idle';
      state.page = 0;
      state.reachedEnd = false;
      state.error = null;
    },
    appendArticles(state, action: PayloadAction<Article[]>) {
      for (const a of action.payload) {
        if (!state.seenIds[a.id]) {
          state.seenIds[a.id] = true;
          state.articles.push(a);
        }
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadInitialFeed.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loadInitialFeed.fulfilled, (state, action) => {
        state.status = 'idle';
        state.page = 1;
        state.reachedEnd = action.payload.length === 0;
        state.articles = [];
        state.seenIds = {};
        for (const a of action.payload) {
          if (state.seenIds[a.id]) continue;
          state.seenIds[a.id] = true;
          state.articles.push(a);
        }
      })
      .addCase(loadInitialFeed.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message ?? 'Failed to load feed';
      })

      .addCase(refreshFeed.pending, state => {
        state.status = 'refreshing';
        state.error = null;
      })
      .addCase(refreshFeed.fulfilled, (state, action) => {
        state.status = 'idle';
        state.page = 1;
        state.reachedEnd = action.payload.length === 0;
        // Prepend new items so the user's scroll position survives a refresh.
        const incoming = action.payload;
        const newOnes: Article[] = [];
        for (const a of incoming) {
          if (!state.seenIds[a.id]) {
            state.seenIds[a.id] = true;
            newOnes.push(a);
          }
        }
        state.articles = [...newOnes, ...state.articles];
      })
      .addCase(refreshFeed.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message ?? 'Failed to refresh feed';
      })

      .addCase(loadNextPage.pending, state => {
        state.status = 'paging';
        state.error = null;
      })
      .addCase(loadNextPage.fulfilled, (state, action) => {
        state.status = 'idle';
        const before = state.articles.length;
        for (const a of action.payload) {
          if (!state.seenIds[a.id]) {
            state.seenIds[a.id] = true;
            state.articles.push(a);
          }
        }
        const added = state.articles.length - before;
        if (added === 0) {
          state.reachedEnd = true;
        } else {
          state.page += 1;
        }
      })
      .addCase(loadNextPage.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message ?? 'Failed to load more';
      });
  },
});

export const { resetFeed, appendArticles } = feedSlice.actions;
export default feedSlice.reducer;
