import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import {AppSettings} from "../../settings/appsettings";
import { MovieResponse } from '../models/movie-response';
import { Jwt } from '../models/jwt';

@Injectable({
  providedIn: 'root'
})


export class ApiService {

  constructor(private http: HttpClient) { }

  logUserIn(login : string, password : string): Observable<Jwt | null>{
    return this.http.post<Jwt>(AppSettings.API_URL + `/Auth/login`,
    {
      "login": login,
      "password": password
    }).pipe(
      catchError( err => {return of(null)})
    )
  }

  isInUserFavoritesMovies(movieId : number): Observable<boolean>{
    return this.http.get<boolean>(AppSettings.API_URL + `/User/me/movies/check/${movieId}`)
  }
  addToUserFavortiesMovies(movieId : number) : Observable<boolean> {
    return this.http.put<any>(AppSettings.API_URL + `/User/me/movies/${movieId}`, {}).pipe(
      map(res => res.status === 200),
      catchError(this.handleError)
    )
  }
  RemoveFromUserFavortiesMovies(movieId : number) : Observable<boolean> {
    return this.http.delete<any>(AppSettings.API_URL + `/User/me/movies/${movieId}`, {}).pipe(
      map(res => res.status === 200),
      catchError(this.handleError)
    )
  }
  GetMovie(id : number): Observable<MovieResponse>{
    let params = new HttpParams().set('id', id)
    return this.http.get<MovieResponse>(AppSettings.API_URL + '/Movie', {params: params})
  }

  GetMovies(year? : number, title? : string, genreId? : number, directorId? : number, actorId? : number): Observable<MovieResponse[]> {
    let params = new HttpParams()
    if(title !== undefined){
      params.append("title", title)
    }
    return this.http.get<MovieResponse[]>(AppSettings.API_URL + '/Movie', {params: params})
  }
  CountMovieReviews(id : number): Observable<number>{
    return this.http.get<number>(AppSettings.API_URL + `/Review/${id}/Count`)
  }

  private handleError(error: HttpErrorResponse): Observable<boolean> {
    if (error.status === 404) {
      return of(false); // resource not found
    } else {
      return throwError(error); // rethrow the error
    }
  }

}
