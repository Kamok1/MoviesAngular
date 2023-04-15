import { Component, OnInit } from '@angular/core';
import { Movie} from 'src/app/models/movie';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})

export class MoviesComponent implements OnInit {

  Movies: Movie[] = Array();
  isLoading: boolean = false;

  constructor(
    private api: ApiService,
    private _auth: AuthService
    ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.api.GetMovies().subscribe(movies =>{

        movies.forEach(movie=>{
          this.Movies.push(new Movie(movie))
        })
        this.isLoading = false;
    })
    this._auth.decodeJwt(localStorage.getItem("token")!)
  }
}
