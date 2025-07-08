// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TOKEN, API_URL } from '@env';

// initialize an empty api service that we'll inject endpoints into later as needed
export const theMovieDbApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = TOKEN;
      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: [
    'MovieList',
    'MovieDetail',
    'MovieCredits',
    'MovieRecommendations',
    'AccountDetail',
  ],
});
