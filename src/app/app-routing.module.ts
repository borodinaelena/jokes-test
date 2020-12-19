import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JokeListComponent } from './pages/joke-list/joke-list.component';
import { JokeComponent } from './pages/joke/joke.component';

const routes: Routes = [
  {
    path: 'list',
    component: JokeListComponent
  },
  {
    path: 'details/:jokeId',
    component: JokeComponent
  },
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: '*', redirectTo: 'list', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
