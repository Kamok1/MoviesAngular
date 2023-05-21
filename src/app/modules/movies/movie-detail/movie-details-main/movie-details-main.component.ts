import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/models/movie';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-movie-details-main',
  templateUrl: './movie-details-main.component.html',
  styleUrls: ['./movie-details-main.component.scss']
})
export class MovieDetailsMainComponent implements OnInit {

    Movie: Movie = new Movie()
    NumberOfReviews : number = 0
    constructor(
      private route: ActivatedRoute,
      private api: ApiService
    ) {}

    ngOnInit(): void {
      let id = Number.parseInt(this.route.snapshot.paramMap.get('title-id')?.split("-")[1]!)
      this.api.GetMovie(id).subscribe(movie => {this.Movie = new Movie(movie); console.log(this.Movie)})
      this.api.CountMovieReviews(id).subscribe(numberOfReviews => this.NumberOfReviews = numberOfReviews)
    }
  }

