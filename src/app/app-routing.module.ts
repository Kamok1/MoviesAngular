import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesComponent } from './components/movies/movies.component';
import { MovieDetailsMainComponent } from './components/movie-details/movie-details-main/movie-details-main.component';

const routes: Routes = [
  {path: "", component: MoviesComponent},
  {path: "movie/:title-id", component: MovieDetailsMainComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
