import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/internal/operators/catchError';
import { of } from 'rxjs/internal/observable/of';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export abstract class JokeService {

  private url = "http://api.icndb.com";
  constructor(
    protected httpClient: HttpClient,
  ) {
  }

  getJokeList(): Observable<any> {
    return this.httpClient
      .get(
        `${this.url}/jokes/random/1000`
      )
      .pipe(
        catchError(this.handleError(`get joke list`))
      );
  }

  getJoke(joke_id): Observable<any> {
    return this.httpClient
      .get(
        `${this.url}/jokes/${joke_id}`
      )
      .pipe(
        catchError(this.handleError(`get joke id=${joke_id}`))
      );
  }

  protected handleError(operation = 'operation', result?) {
    return (error: any): Observable<any> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result);
    };
  }

}