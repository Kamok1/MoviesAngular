import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieDetailsMainComponent } from '../movies/movie-detail/movie-details-main/movie-details-main.component';
import { MainContainerComponent } from '../auth/main-container/main-container.component';
import { MovieListComponent } from '../movies/movie-list/movie-list.component';

const routes: Routes = [
  {path: "", component: MovieListComponent},
  {path: "movie/:title-id", component: MovieDetailsMainComponent},
  {path: "login", component: MainContainerComponent }
  // { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
