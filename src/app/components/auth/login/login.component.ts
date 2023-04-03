import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../main-container/main-container.component.scss'],

})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    login: new FormControl('', [Validators.required, Validators.minLength(5)]),
    password: new FormControl('', Validators.required)
  });

  constructor(
    private _api: ApiService
    ) { }


  ngOnInit(): void {
  }
  changePassword(): void{
  }
  logUserIn():void{
    console.log(this.loginForm.value);

    this._api.logUserIn();
  }
}
