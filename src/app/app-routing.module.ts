import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesComponent } from './components/movies/movies.component';
import { MovieDetailsMainComponent } from './components/movie-details/movie-details-main/movie-details-main.component';
import { MainContainerComponent } from './components/auth/main-container/main-container.component';

const routes: Routes = [
  {path: "", component: MoviesComponent},
  {path: "movie/:title-id", component: MovieDetailsMainComponent},
  {path: "login", component: MainContainerComponent }
  // { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
