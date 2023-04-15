import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, catchError, empty, map, of } from 'rxjs';
import { decodedJwt } from '../models/decoded-jwt';
import { UserService } from './user.service';
import { Jwt } from '../models/jwt';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';

const currentDate : Date = new Date();

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenData : decodedJwt | undefined;
  constructor(
    private _api: ApiService,
    private _user: UserService
  ) {}

  logUserIn(login : string, password : string): Observable<boolean>{
    return this._api.logUserIn(login, password).pipe(
      map(res => {
        this.loginSuccessful(res)
        return true
      }),
      catchError(err => {
        return of(false);
      })
    )
  }

  get isLogged(): boolean {
    return localStorage.getItem("expires_at") ?
     currentDate < JSON.parse(localStorage.getItem("expires_at")!) && localStorage.getItem("token") !== null
     : false
  }



  tryLogUserInFromRefreshToken(): void{
    if(this._user.isLogged)
      return;
    let refreshToken = localStorage.getItem("refresh_token");
    if(refreshToken !== null && currentDate < JSON.parse(localStorage.getItem("refresh_token_expires_at")!)){
      this._api.logUserInFromRefreshToken(refreshToken).subscribe((res) => this.loginSuccessful(res),
        (error) => {this.cleanRefreshToken()})
    }
  }

  register(login : string, password : string, email : string): Observable<string | null>{
    return this._api.createAccount(login, password, email).pipe(
      catchError(err => {
        return of(err["error"]["message"])
      })
    )
  }


  loginSuccessful(res : AuthResponse){
    this.decodeJwt(res.token)
    this.setAuthCookies(res.token, this.tokenData!.exp)
    let refreshTokenValidUntil = new Date(Date.parse(res.refreshToken.expires)).getTime().toString();
    this.setRefreshToken(res.refreshToken.token, refreshTokenValidUntil)
    this._user.jwt = res.token
    this._api.userInfo(res.token).subscribe(user =>
      this._user.setUserVariables(user, this.tokenData!.role)
      )
  }



  decodeJwt(jwt: string): void{
    this.tokenData = (JSON.parse(atob(jwt.split('.')[1])))
  }

  setAuthCookies(jwt : string, expiresIn : number): void{
    localStorage.setItem('token', jwt)
    localStorage.setItem('expires_at', new Date(expiresIn * 1000).getTime().toString())
  }

  setRefreshToken(refreshToken : string, refreshTokenValidUntil : string){
    localStorage.setItem('refresh_token', refreshToken)
    localStorage.setItem('refresh_token_expires_at', refreshTokenValidUntil)
    console.log(new Date(parseInt(refreshTokenValidUntil)).toUTCString());
  }

  cleanRefreshToken(){
    localStorage.removeItem("refresh_token")
    localStorage.removeItem("refresh_token_expires_at")
  }

  logout(): void {
    localStorage.removeItem("token")
    localStorage.removeItem("expires_at")
    this.cleanRefreshToken()
    this._user.reset()
  }
}
