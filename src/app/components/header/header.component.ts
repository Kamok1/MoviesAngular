import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() title: string = "title";

  constructor(
    private _user: UserService,
    private _auth: AuthService
  ) { }

  get isLogged(): boolean{
    return this._user.isLogged
  }

  ngOnInit(): void {
  }
  logout(){
    this._auth.logout()
  }
}
