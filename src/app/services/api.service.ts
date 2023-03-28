import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie';
import { TokenType } from '@angular/compiler';
import {AppSettings} from "../../settings/appsettings";
import { IMovie } from '../interfaces/imovie';
import { MovieRequest } from '../models/movie-request';


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

  GetMovie(id : number): Observable<MovieRequest>{
    let params = new HttpParams().set('id', id);
    return this.http.get<MovieRequest>(AppSettings.API_URL + '/Movie', {params: params})
  }

  GetMovies(year? : number, title? : string, genreId? : number, directorId? : number, actorId? : number): Observable<MovieRequest[]> {
    let params = new HttpParams();
    if(title !== undefined){
      params.append("title", title);
    }
    return this.http.get<MovieRequest[]>(AppSettings.API_URL + '/Movie', {params: params});
  }
  CountMovieReviews(id : number): Observable<number>{
    return this.http.get<number>(AppSettings.API_URL + `/Review/${id}/Count`)
  }
}
