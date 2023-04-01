import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie';
import { TokenType } from '@angular/compiler';
import {AppSettings} from "../../settings/appsettings";
import { IMovie } from '../interfaces/imovie';
import { MovieResponse } from '../models/movie-response';


const httpOptions = {
  headers : new HttpHeaders({
    'Content-Type' : "Appliaction-json"
  })
};


@Injectable({
  providedIn: 'root'
})


export class ApiService {

  constructor(private http: HttpClient) { }

  // GetUserMovie(id : number): Observable<boolean>{
  //   return this.http.get(AppSettings.API_URL + `/me/movies/check/${id}`)//todo
  // }

  GetMovie(id : number): Observable<MovieResponse>{
    let params = new HttpParams().set('id', id);
    return this.http.get<MovieResponse>(AppSettings.API_URL + '/Movie', {params: params})
  }

  GetMovies(year? : number, title? : string, genreId? : number, directorId? : number, actorId? : number): Observable<MovieResponse[]> {
    let params = new HttpParams();
    if(title !== undefined){
      params.append("title", title);
    }
    return this.http.get<MovieResponse[]>(AppSettings.API_URL + '/Movie', {params: params});
  }
  CountMovieReviews(id : number): Observable<number>{
    return this.http.get<number>(AppSettings.API_URL + `/Review/${id}/Count`)
  }
}
