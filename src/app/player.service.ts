import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { IPlayer } from './model/player';
import { catchError, map, tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

   private dataUri = 'http://localhost:3000/players'

  constructor(private http: HttpClient) { }

  addBook(player: IPlayer): Observable<IPlayer> {
    return this.http.post<IPlayer>(this.dataUri, player)
      .pipe(
        catchError(this.handleError)
      )
  }

  updateBook(isbn: string, player: IPlayer): Observable<IPlayer> {
    console.log('subscribing to update' + isbn);
    let playerURI: string = this.dataUri + '/' + isbn;
    return this.http.put<IPlayer>(playerURI, player)
      .pipe(
        catchError(this.handleError)
      )
  }

  getBooks(): Observable<IPlayer[]> {

    console.log("get Player called");



    return this.http.get<IPlayer[]>(`${this.dataUri}?limit=10`)
      .pipe(
        catchError(this.handleError)
      )
  }

  //taken from: https://angular.io/guide/http

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.


      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${JSON.stringify(error.error)}`);



      // question over how much information you want to give to the end-user
      // it depends on who will be using the system
      // this information would not be returned in a public interface but might in an intranet.

      if (error.status == 412) {
        return throwError('412 Error' + JSON.stringify(error.error))
      }

    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }

}


