import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { Article } from '../../types/article';
import {
  loadSavedArticles,
  persistSavedArticles,
} from '../../services/storage';

export interface SavedState {
  items: Article[];
  index: Record<string, true>;
  hydrated: boolean;
}

const initialState: SavedState = {
  items: [],
  index: {},
  hydrated: false,
};

export const hydrateSaved = createAsyncThunk<Article[]>(
  'saved/hydrate',
  async () => loadSavedArticles(),
);

export const toggleSaved = createAsyncThunk<
  { items: Article[]; addedId: string | null; removedId: string | null },
  Article,
  { state: { saved: SavedState } }
>('saved/toggle', async (article, { getState }) => {
  const { saved } = getState();
  const isSaved = !!saved.index[article.id];

  let nextItems: Article[];
  let addedId: string | null = null;
  let removedId: string | null = null;

  if (isSaved) {
    nextItems = saved.items.filter(item => item.id !== article.id);
    removedId = article.id;
  } else {
    nextItems = [article, ...saved.items];
    addedId = article.id;
  }

  await persistSavedArticles(nextItems);
  return { items: nextItems, addedId, removedId };
});

const savedSlice = createSlice({
  name: 'saved',
  initialState,
  reducers: {
    setSaved(state, action: PayloadAction<Article[]>) {
      state.items = action.payload;
      state.index = {};
      for (const a of action.payload) state.index[a.id] = true;
      state.hydrated = true;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(hydrateSaved.fulfilled, (state, action) => {
        state.items = action.payload;
        state.index = {};
        for (const a of action.payload) state.index[a.id] = true;
        state.hydrated = true;
      })
      .addCase(hydrateSaved.rejected, state => {
        state.hydrated = true;
      })
      .addCase(toggleSaved.fulfilled, (state, action) => {
        state.items = action.payload.items;
        if (action.payload.addedId) {
          state.index[action.payload.addedId] = true;
        }
        if (action.payload.removedId) {
          delete state.index[action.payload.removedId];
        }
      });
  },
});

export const { setSaved } = savedSlice.actions;
export default savedSlice.reducer;
