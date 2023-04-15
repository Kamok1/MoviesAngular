export interface IMovie{
  genres: Array<string>;
  title:string;
  rating: number;
  description: string;
  director: string;
  releaseDate: Date;
  posterPath :string;
  id : number;
}
