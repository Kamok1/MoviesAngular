import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, catchError, map, of } from 'rxjs';
import { CurrencyPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentDate : Date = new Date();
  private loginSuccessful : boolean = false;
  isLogged: boolean = false;

  constructor(
    private _api: ApiService
  ) {}

  logUserIn(login : string, password : string): Observable<boolean>{
    return this._api.logUserIn(login, password).pipe(
      map(res => {
        if(res === null){
          return false
        }
        this.loginSuccessful = true
        this.setAuthCookies(res.jwt, res.expiresIn)
        return true
      }),
      catchError(err => {
        return of(false);
      })
    )
  }

  register(login : string, password : string, email : string): Observable<string | null>{
    return this._api.createAccount(login, password, email).pipe(
      catchError(err => {
        return of(err["error"]["messege"])
      })
    )
  }

  setAuthCookies(jwt : string, expiresIn : number){
    localStorage.setItem('token', jwt)
    localStorage.setItem('expires_at', new Date(this.currentDate.getTime() + (expiresIn*1000)).getTime().toString())

  }

  logout(){
    localStorage.removeItem("token")
    localStorage.removeItem("expires_at")
  }
}
