import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private _auth :AuthService) {}
  ngOnInit(): void {
    this._auth.tryLogUserInFromRefreshToken()
  }
  title = 'Movies';
}
