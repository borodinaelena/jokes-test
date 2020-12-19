import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JokeListComponent } from './pages/joke-list/joke-list.component';
import { JokeComponent } from './pages/joke/joke.component';
import { PaginationComponent } from './components/pagination/pagination.component';


@NgModule({
  declarations: [
    AppComponent,
    JokeListComponent,
    JokeComponent,
    PaginationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
