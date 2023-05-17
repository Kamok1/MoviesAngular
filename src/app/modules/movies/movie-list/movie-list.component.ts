import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {

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
