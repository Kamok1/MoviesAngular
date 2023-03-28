import { minDate } from "src/environments/environment.prod";
import { IMovie } from "../interfaces/imovie";
export class MovieRequest implements IMovie{
  id: number = 0;
  genres: string[] = [];
  rating: number = 0;
  title: string = "empty";
  description: string  = "empty";
  director: string = "empty";
  releaseDate: Date = minDate;
  posterPath: string = "empty";
}
