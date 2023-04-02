import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../../../models/movie';
import { ApiService } from '../../../services/api.service';
import { KeyValueDiffer, KeyValueDiffers } from '@angular/core';

const filledStarSrc : string = "../../../assets/filledStar.svg"
const unfilledStarSrc : string = "../../../assets/Star.svg"
let isViewUpdated : boolean = false;
@Component({
  selector: 'app-movie-header',
  templateUrl: './movie-header.component.html',
  styleUrls: ['./movie-header.component.css']
})
export class MovieHeaderComponent implements OnInit {
  @Input() movie : Movie = new Movie()

  movieDiffer: KeyValueDiffer<string,any> | undefined
  numberOfReviews : number = 0
  posterSrc : string = ""
  isFavorite : boolean = false;
  starSrc: string = unfilledStarSrc
  isLogged : boolean = false

  constructor(
    private _api: ApiService,
    private _differs: KeyValueDiffers,
  ) {}

  ngOnInit(): void {
    if(isViewUpdated == false){
      this.movieDiffer = this._differs.find(this.movie).create()
    }
    if(this.movie.id !== 0){
      this.posterSrc = `url(${this.movie.poster})`
      this._api.CountMovieReviews(this.movie.id).subscribe(numberOfReviews => this.numberOfReviews = numberOfReviews)
      if(this.isLogged){
        this._api.isInUserFavoritesMovies(this.movie.id).subscribe(res => {
          this.isFavorite = res
          this.updateStar()
        } )
      }
    }
  }
  updateStar(){
    this.starSrc =  this.isFavorite ? filledStarSrc : unfilledStarSrc
  }
  async editFavoriteMovie(){
    let isSuccessful = this.isFavorite ? await this._api.RemoveFromUserFavortiesMovies(this.movie.id).toPromise() : await this._api.addToUserFavortiesMovies(this.movie.id).toPromise()
    if(!isSuccessful){
      alert("editing error")
      return
    }
    this.isFavorite = !this.isFavorite
    this.updateStar()
  }
  ngDoCheck(): void {
    if(this.movieDiffer?.diff(this.movie) && !isViewUpdated){
      isViewUpdated = true;
      setTimeout(()=>{
        this.ngOnInit()
      }, 100)
    }
}
}
