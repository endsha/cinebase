import { Category } from '@custom-types/common';
import { theMovieDbApi } from '@services/apiService';

const extendedApi = theMovieDbApi.injectEndpoints({
  endpoints: build => ({
    movieList: build.infiniteQuery({
      infiniteQueryOptions: {
        // Must provide a default initial page param value
        initialPageParam: 1,
        // Must provide a `getNextPageParam` function
        getNextPageParam: (
          lastPage,
          allPages,
          lastPageParam,
          allPageParams,
          queryArg,
        ) => lastPageParam + 1,
        // Optionally provide a `getPreviousPageParam` function
        getPreviousPageParam: (
          firstPage,
          allPages,
          firstPageParam,
          allPageParams,
          queryArg,
        ) => {
          return firstPageParam > 0 ? firstPageParam - 1 : undefined;
        },
      },
      query: ({ queryArg, pageParam }) => {
        const { filter } = queryArg;
        let url = '';
        switch (filter) {
          case Category.NowPlaying:
            url = 'movie/now_playing';
            break;
          case Category.Popular:
            url = 'movie/popular';
            break;
          case Category.Upcoming:
            url = 'movie/upcoming';
            break;
          default:
            url = 'movie/now_playing';
        }
        return {
          url,
          params: { page: pageParam },
        };
      },
      transformResponse(baseQueryReturnValue) {
        return baseQueryReturnValue.results.map((movie: any) => ({
          id: movie.id.toString(),
          imageUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          name: movie.title,
          releaseDate: movie.release_date,
          description: movie.overview,
        }));
      },
    }),
  }),
  overrideExisting: false,
});

export const { useMovieListInfiniteQuery } = extendedApi;
