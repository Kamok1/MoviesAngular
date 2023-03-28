import { AppSettings } from "src/settings/appsettings";
import { IMovie } from "../interfaces/imovie";

export class Movie implements IMovie{
  public genres!: Array<string>;
  public title!:string;
  public rating!: number;
  public description!: string;
  public director!: string;
  public releaseDate!: Date;
  public id! : number;
  public posterPath! :string;

  public get poster(): string{
    return `${AppSettings.SERVER_URL}/${this.posterPath}`.replace(/\\/g,"/");
  }
  public get year(): number{
    return new Date(this.releaseDate).getFullYear();
  }

  constructor(movie? : IMovie){
    this.genres = movie?.genres ?? new Array<string>;
    this.title = movie?.title ?? "";
    this.rating = movie?.rating ?? 0;
    this.description = movie?.description ?? "";
    this.director = movie?.director ?? "";
    this.releaseDate = movie?.releaseDate ?? new Date;
    this.id = movie?.id ?? 0;
    this.posterPath = movie?.posterPath ?? "";
  }
}
