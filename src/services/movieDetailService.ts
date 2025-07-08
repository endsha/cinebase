import { Category } from '@custom-types/common';
import { MovieCredits, MovieDetail } from '@custom-types/movie';
import { theMovieDbApi } from '@services/apiService';

type RequestMovieDetailParams = {
  movieId: string;
};

const convertRuntimeToHoursAndMinutes = (runtime: number): string => {
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  return `${hours}h ${minutes}m`;
};

const convertReleaseDate = (date: string): string => {
  // Convert date from 'YYYY-MM-DD' to 'DD/MM/YYYY'
  const [year, month, day] = date.split('-');
  return `${day}/${month}/${year}`;
};

const extendedApi = theMovieDbApi.injectEndpoints({
  endpoints: build => ({
    movieDetail: build.query({
      query: ({ movieId }: RequestMovieDetailParams) => {
        return {
          url: `movie/${movieId}`,
        };
      },
      providesTags: result => {
        return [{ type: 'MovieDetail', id: result.id }];
      },
      transformResponse(baseQueryReturnValue): MovieDetail {
        console.log('baseQueryReturnValue', baseQueryReturnValue);
        return {
          id: baseQueryReturnValue.id.toString(),
          imageUrl: `https://image.tmdb.org/t/p/w500${baseQueryReturnValue.poster_path}`,
          name: baseQueryReturnValue.title,
          releaseDate: `${convertReleaseDate(
            baseQueryReturnValue.release_date,
          )} (${baseQueryReturnValue.origin_country.join(', ')})`,
          shortDescription: baseQueryReturnValue.tagline || '',
          ageRating: baseQueryReturnValue.adult ? '18+' : 'PG-13',
          duration: convertRuntimeToHoursAndMinutes(
            baseQueryReturnValue.runtime,
          ),
          genres: baseQueryReturnValue.genres.map((genre: any) => genre.name),
          score: baseQueryReturnValue.vote_average || 0,
          description: baseQueryReturnValue.overview || '',
          status: baseQueryReturnValue.status || '',
          language:
            baseQueryReturnValue.spoken_languages
              .map((lang: any) => lang.english_name)
              .join(', ') || '',
        };
      },
    }),
    movieCredits: build.query({
      query: ({ movieId }: RequestMovieDetailParams) => {
        return {
          url: `movie/${movieId}/credits`,
        };
      },
      providesTags: (_result, _error, arg) => {
        return [{ type: 'MovieCredits', id: arg.movieId }];
      },
      transformResponse(baseQueryReturnValue: any): MovieCredits {
        console.log(
          'baseQueryReturnValue for movieCredits',
          baseQueryReturnValue,
        );
        return {
          cast: baseQueryReturnValue.cast.map((member: any) => ({
            id: member.id.toString(),
            name: member.name,
            character: member.character,
            imageUrl: `https://image.tmdb.org/t/p/w500${member.profile_path}`,
          })),
          crew: baseQueryReturnValue.crew.map((member: any) => ({
            id: member.id.toString(),
            name: member.name,
            job: member.job,
          })),
        };
      },
    }),
    movieRecommendations: build.query({
      query: ({ movieId }: RequestMovieDetailParams) => {
        return {
          url: `movie/${movieId}/recommendations`,
        };
      },
      providesTags: (_result, _error, arg) => {
        return [{ type: 'MovieRecommendations', id: arg.movieId }];
      },
      transformResponse(baseQueryReturnValue: any) {
        console.log(
          'baseQueryReturnValue for movieRecommendations',
          baseQueryReturnValue,
        );
        return baseQueryReturnValue.results.map((movie: any) => ({
          id: movie.id.toString(),
          imageUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          name: movie.title,
          score: movie.vote_average || 0,
        }));
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useMovieDetailQuery,
  useMovieCreditsQuery,
  useMovieRecommendationsQuery,
} = extendedApi;
