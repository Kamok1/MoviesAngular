import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../main-container/main-container.component.scss'],

})
export class LoginComponent implements OnInit {
  @Output() changeComponent = new EventEmitter<string>();
  loginError: boolean = false;
  loginForm: FormGroup = new FormGroup({
    login: new FormControl('', [Validators.required, Validators.minLength(5)]),
    password: new FormControl('', Validators.required)
  }
  );

  constructor(
    private _auth: AuthService,
    private _router: Router
    ) { }


  ngOnInit(): void {
  }
  changePassword(): void{
    //todo
  }
  changeContainer(destinationContainer : string): void{
    this.changeComponent.emit("register")
  }
  clearError(): void{
    if(this.loginError)
      this.loginError = false
  }
  logUserIn():void{
    this._auth.logUserIn(this.loginForm.get("login")?.value,this.loginForm.get("password")?.value).subscribe(res => {
      this.loginError = !res
      if(res)
        this._router.navigate([""])
      else(
        this.loginForm.reset()
      )
    })
  }
}
