import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../main-container/main-container.component.scss']
})
export class RegisterComponent implements OnInit {
  @Output() changeComponent = new EventEmitter<string>();
  registerError: boolean = false;
  registerErrorText : string = ""
  registerForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(5)]),
    password: new FormControl('', Validators.required),
    email: new FormControl('',[Validators.required, Validators.email])})
  constructor(
    private _auth: AuthService,
    private _router: Router
  ) { }

  ngOnInit(): void {
  }
  clearError(): void{
    if(this.registerError)
      this.registerError = false
  }
  register(): void{
    this._auth.register(this.registerForm.get("name")!.value, this.registerForm.get("password")!.value, this.registerForm.get("email")!.value).subscribe(res =>{
      if(res != null){
        this.registerError = true
        this.registerErrorText = res
        return
      }

      this._auth.logUserIn(this.registerForm.get("email")!.value, this.registerForm.get("password")!.value).subscribe(res => {
        console.log(res)
        if(res){
          this._router.navigate([""])
        }
        else
          this.registerErrorText = "Error, please try again!"
        })
      })
    }
}
