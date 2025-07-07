export type DropdownItem = {
  label: string;
  value: string;
};

export type Movie = {
  id: string;
  imageUrl: string;
  name: string;
  releaseDate: string;
  description: string;
};

export enum Category {
  NowPlaying = 'Now Playing',
  Upcoming = 'Upcoming',
  Popular = 'Popular',
}

export enum SortBy {
  ByAlphabeticalOrder = 'By Alphabetical Order',
  ByRating = 'By Rating',
  ByReleaseDate = 'By Release Date',
}
