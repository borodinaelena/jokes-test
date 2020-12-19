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