import { Injectable } from '@angular/core';
import { Role } from '../models/role-enum';
import { decodedJwt } from '../models/decoded-jwt';
import { ApiService } from './api.service';
import { User } from '../models/user';

const roles = Object.values(Role)
const currentDate : Date = new Date();

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _displayName: string = "";
  private _role: Role  = Role.User;
  private _jwt: string = ""
  private _description: string = ""
  private _refreshToken: string = ""

  get isLogged(): boolean {
    return localStorage.getItem("expires_at") ?
     currentDate < JSON.parse(localStorage.getItem("expires_at")!) && localStorage.getItem("token") !== null
     : false
  }

  get refreshToken(): string{
    return this._refreshToken
  }

  set refreshToken(value : string){
    this._refreshToken = value
  }

  get description(): string {
    return this._description
  }
  set description(value: string) {
    this._description = value
  }

  get jwt(): string {
    return this._jwt
  }
  set jwt(value: string) {
    this._jwt = value
  }

  get displayName(): string {
    return this._displayName
  }
  set displayName(value: string) {
    this._displayName = value
  }

  get role(): Role{
    return this._role
  }

  set role(role : Role){
    if (roles.includes(role))
      this._role = (<any>Role)[role]
  }


  constructor(){}

  setUserVariables(user : User, role : string){
    if (roles.includes(role))
      this.role = (<any>Role)[role]
    this.displayName = user.displayName
    this.description = user.description
    }

    reset(){
      this.displayName = "";
      this.role = Role.User;
      this.jwt =  ""
      this.description = ""
    }
}
