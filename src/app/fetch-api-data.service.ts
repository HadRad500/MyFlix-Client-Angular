import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

const apiUrl = 'https://movie-api-r6ua.onrender.com/';
@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  constructor(private http: HttpClient) {}

  public registerUser(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(`${apiUrl}users`, userDetails)
      .pipe(catchError(this.handleError));
  }

  public loginUser(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(`${apiUrl}users`, userDetails)
      .pipe(catchError(this.handleError));
  }

  public getMovies(): Observable<any> {
    return this.http.get(`${apiUrl}movies`).pipe(catchError(this.handleError));
  }

  public getMovie(movieTitle: string): Observable<any> {
    return this.http
      .get(`${apiUrl}movies/${movieTitle}`)
      .pipe(catchError(this.handleError));
  }

  public getDirector(name: string): Observable<any> {
    return this.http
      .get(`${apiUrl}director/${name}`)
      .pipe(catchError(this.handleError));
  }

  public getGenre(name: string): Observable<any> {
    return this.http
      .get(`${apiUrl}genre/${name}`)
      .pipe(catchError(this.handleError));
  }

  public getUsers(userName: string): Observable<any> {
    return this.http
      .get(`${apiUrl}users/${userName}`)
      .pipe(catchError(this.handleError));
  }

  public addFavoriteMovie(movieId: string, userName: string): Observable<any> {
    return this.http
      .post(`${apiUrl}users/${userName}/movies/${movieId}`, {})
      .pipe(catchError(this.handleError));
  }

  public updateUser(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .put(`${apiUrl}users`, userDetails)
      .pipe(catchError(this.handleError));
  }

  public deleteUser(userName: any): Observable<any> {
    return this.http
      .delete(`${apiUrl}users/${userName}`)
      .pipe(catchError(this.handleError));
  }

  public removeFavoriteMovie(
    movieId: string,
    userName: string
  ): Observable<any> {
    return this.http
      .delete(`${apiUrl}users/${userName}/movies/${movieId}`, {})
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some Error Occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error Body is: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}
