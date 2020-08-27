import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  baseUri: string = 'http://localhost:3010/user';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient, private authService: AuthService) { }

  // Create
  createUser(data): Observable<any> {
    let url = `${this.baseUri}/add`;
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorMgmt)
      );
  }

  // Get all users
  getUsers(): Observable<any> {
    return this.http.get(`${this.baseUri}/all`);
  }

  // Get employee
  getUser(id): Observable<any> {
    let url = `${this.baseUri}/get/${id}`;
    return this.http.get(url, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    );
  }

  // Update user
  updateUser(id, data): Observable<any> {
    let url = `${this.baseUri}/update/${id}`;
    return this.http.put(url, data, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

  // Delete user
  deleteUser(id): Observable<any> {
    let url = `${this.baseUri}/delete/${id}`;
    return this.http.delete(url, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

  // Error handling
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
