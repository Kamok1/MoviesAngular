import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieDetailComponent } from './movie-detail/movie-detail/movie-detail.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { AppRoutingModule } from 'src/app/modules/app/app-routing.module';
import { AuthService } from 'src/app/services/auth.service';
import { MovieHeaderComponent } from './movie-detail/movie-header/movie-header.component';
import { RatingSectionComponent } from './movie-detail/rating-section/rating-section.component';
import { MovieDetailsMainComponent } from './movie-detail/movie-details-main/movie-details-main.component';
import { ActorListComponent } from './movie-detail/actor-list/actor-list.component';



@NgModule({
  declarations: [
    MovieDetailsMainComponent,
    MovieHeaderComponent,
    MovieListComponent,
    MovieDetailComponent,
    MovieCardComponent,
    RatingSectionComponent,
    ActorListComponent
  ],
  imports: [
    AppRoutingModule,
    CommonModule
  ],
  providers:[
    AuthService
  ]
})
export class MoviesModule { }
