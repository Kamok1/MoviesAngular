import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../../../models/movie';
import { ApiService } from '../../../services/api.service';
import { KeyValueDiffer, KeyValueDiffers } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-movie-header',
  templateUrl: './movie-header.component.html',
  styleUrls: ['./movie-header.component.css']
})
export class MovieHeaderComponent implements OnInit {
  @Input() movie? : Movie
  @Input() movieId? : number
  Movie: Movie = new Movie()
  movieDiffer: KeyValueDiffer<string,any> | undefined
  NumberOfReviews : number = 0
  IsFavorite : boolean = false;
  StarSrc: string =  "../../../assets/Star.svg"
  constructor(
    private api: ApiService,
    private differs: KeyValueDiffers,
  ) {}

  ngOnInit(): void {
    //if(logged)
    if(this.movie === undefined && this.movieId !== undefined){
      this.api.GetMovie(this.movieId).subscribe(movie => this.Movie = new Movie(movie))
      this.api.CountMovieReviews(this.movieId).subscribe(numberOfReviews => this.NumberOfReviews = numberOfReviews)
    }
    else if(this.Movie.title === ""){
      this.Movie = this.movie!
      this.movieDiffer = this.differs.find(this.Movie).create()
    }
  }
  editFavoriteMovie(){
    this.StarSrc =  this.StarSrc.includes("filled") ? this.StarSrc.replace("filled","") : this.StarSrc.replace("Star","filledStar")
  }
  ngDoCheck(): void {
    if(this.movieDiffer?.diff(this.Movie)){
      setTimeout(()=>{
        this.ngOnInit()
      }, 100)
    }
}
}
