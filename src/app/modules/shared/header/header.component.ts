import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ThemeService } from 'src/app/services/theme.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() title: string = "title";
  isDarkTheme: boolean = true;
  constructor(
    private _user: UserService,
    private _auth: AuthService,
    private theme: ThemeService
  ) { }

  get isLogged(): boolean{
    return this._user.isLogged
  }

  ngOnInit(): void {
    this.isDarkTheme = this.theme.current === "dark"
  }
  logout(){
    this._auth.logout()
  }
  switchTheme(): void {
    this.theme.changeTheme()
    this.isDarkTheme = !this.isDarkTheme
  }
}
