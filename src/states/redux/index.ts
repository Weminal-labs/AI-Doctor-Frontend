import { configureStore, combineReducers } from "@reduxjs/toolkit";

// Import slices
import { ThemeSlice } from "./theme";
import { ConversationSlice } from "./conversation";

// Central Reducer.
const reducers = combineReducers({
  [ThemeSlice.name]: ThemeSlice.reducer,
  [ConversationSlice.name]: ConversationSlice.reducer,
});

/**
 * Redux will be use as state manager in this app. It must be installed in `App.tsx` and
 * its actions and selectors must have a __hook wrapping outside__.
 */
export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
