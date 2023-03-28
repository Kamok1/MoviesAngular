import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IMovie } from 'src/app/interfaces/imovie';
import { Movie } from '../../models/movie';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  Movie: Movie = new Movie();
  NumberOfReviews : number = 0;
  constructor(
    private route: ActivatedRoute,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    let id = Number.parseInt(this.route.snapshot.paramMap.get('title-id')?.split("-")[1]!);

    this.api.GetMovie(id).subscribe(movie => this.Movie = new Movie(movie))


    this.api.CountMovieReviews(id).subscribe(numberOfReviews => this.NumberOfReviews = numberOfReviews);
  }
  addMovieToFavorite(){
    console.log("ASDDAS");

  }
}
