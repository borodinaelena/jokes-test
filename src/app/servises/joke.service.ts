import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { tap } from 'rxjs/internal/operators/tap';
import { catchError } from 'rxjs/internal/operators/catchError';
import { of } from 'rxjs/internal/observable/of';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export abstract class JokeService {

  private page = 0;
  private jokeList: any[];
  constructor(
    protected httpClient: HttpClient,
  ) {
  }

  getJokeList(): Observable<any> {
    return this.httpClient
      .get(
        `http://api.icndb.com/jokes/random/1000`,
        { headers: this.getHeaders() },
      )
      .pipe(
        map((response: any) => response),
        map((data: any) => data),
        tap(_ => console.log(`fetched joke list`, _)),
        catchError(this.handleError(`get joke list`))
      );
  }

  getJoke(joke_id): Observable<any> {
    return this.httpClient
      .get(
        `http://api.icndb.com/jokes/${joke_id}`,
        { headers: this.getHeaders() },
      )
      .pipe(
        map((response: any) => response),
        map((data: any) => data),
        tap(_ => console.log(`fetched joke id=${joke_id}`, _)),
        catchError(this.handleError(`get joke id=${joke_id}`))
      );
  }

  setPage(newPage) {
    this.page = newPage;
  }
  getPage() {
    return this.page;
  }

  setJokeList(list) {
    this.jokeList = list;
  }

  getSavedJokeList() {
    return this.jokeList;
  }

  getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }

  protected handleError(operation = 'operation', result?) {
    return (error: any): Observable<any> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: Extract error messages from error.data.message
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result);
    };
  }

}