export type MovieDetail = {
  id: string;
  imageUrl: string;
  name: string;
  releaseDate: string;
  shortDescription: string;
  ageRating: string;
  duration: string;
  genres: string[];
  score: number;
  description: string;
  status: string;
  language: string;
};

export type MovieCredits = {
  cast: {
    id: string;
    name: string;
    character: string;
    imageUrl: string;
  }[];
  crew: {
    id: string;
    name: string;
    job: string;
  }[];
};
