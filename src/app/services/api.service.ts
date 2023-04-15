import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import {AppSettings} from "../../settings/appsettings";
import { MovieResponse } from '../models/movie-response';
import { Jwt } from '../models/jwt';
import { UserService } from './user.service';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';

@Injectable({
  providedIn: 'root'
})


export class ApiService {
  constructor(
    private _http: HttpClient,
    private _user: UserService
    ) { }

  private addAuthorizationHeader(headers: HttpHeaders): HttpHeaders {
      if (this._user.isLogged) {
        return headers.set('Authorization', `Bearer ${this._user.jwt}`);
      }
      return headers;
    }


  logUserIn(login : string, password : string): Observable<AuthResponse>{
    return this._http.post<AuthResponse>(AppSettings.API_URL + `/Auth/login`,{
      "login": login,
      "password": password
    })
  }

  logUserInFromRefreshToken(refreshToken : string): Observable<AuthResponse>{
    return this._http.post<AuthResponse>(AppSettings.API_URL + `/Auth/refreshToken`,{
      "token": refreshToken
    })
  }

  userInfo(jwt: string): Observable<User>{
    return this._http.get<User>(AppSettings.API_URL + '/User/me', {headers: new HttpHeaders({'Authorization': 'Bearer ' +  this._user.jwt})})
  }

  createAccount(login : string, password : string, email : string): Observable<string>{
    return this._http.post<string>(AppSettings.API_URL + `/Auth/register`,{
      "name": login,
      "password": password,
      "email": email
    })
  }

  isInUserFavoritesMovies(movieId : number): Observable<boolean>{
    return this._http.get<boolean>(AppSettings.API_URL + `/User/me/movies/check/${movieId}`)
  }
  addToUserFavortiesMovies(movieId : number) : Observable<boolean> {
    return this._http.put<any>(AppSettings.API_URL + `/User/me/movies/${movieId}`, {}).pipe(
      map(res => res.status === 200),
      catchError(this.handleError)
    )
  }
  RemoveFromUserFavortiesMovies(movieId : number) : Observable<boolean> {
    return this._http.delete<any>(AppSettings.API_URL + `/User/me/movies/${movieId}`, {}).pipe(
      map(res => res.status === 200),
      catchError(this.handleError)
    )
  }
  GetMovie(id : number): Observable<MovieResponse>{
    let params = new HttpParams().set('id', id)
    return this._http.get<MovieResponse>(AppSettings.API_URL + '/Movie', {params: params})
  }

  GetMovies(year? : number, title? : string, genreId? : number, directorId? : number, actorId? : number): Observable<MovieResponse[]> {
    let params = new HttpParams()
    if(title !== undefined)
      params.append("title", title)
    return this._http.get<MovieResponse[]>(AppSettings.API_URL + '/Movie', {params: params})
  }
  CountMovieReviews(id : number): Observable<number>{
    return this._http.get<number>(AppSettings.API_URL + `/Review/${id}/Count`)
  }

  private handleError(error: HttpErrorResponse): Observable<boolean> {
    if (error.status === 404) {
      return of(false); // resource not found
    } else {
      return throwError(error); // rethrow the error
    }
  }

}
