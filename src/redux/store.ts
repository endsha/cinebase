import { configureStore } from '@reduxjs/toolkit';
import movieReducer from '@redux/movieSlice';
import { theMovieDbApi } from '@services/apiService';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [theMovieDbApi.reducerPath]: theMovieDbApi.reducer,
    movie: movieReducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(theMovieDbApi.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
