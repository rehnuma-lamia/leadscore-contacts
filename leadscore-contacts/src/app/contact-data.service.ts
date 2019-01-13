import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Constants } from './constants';
import { Observable, throwError, EMPTY, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class ContactDataService {

  constructor(private httpClient: HttpClient) {}

  login(user: User): Observable<any> {
    var httpOptions = {
      headers: new HttpHeaders({ 'Content-type': 'application/json' })
    };

    var body = {
      'username': user.userName,
      'password': user.password
    }

    return this.httpClient.post(Constants.LeadscoreAPI.LOGIN_URL, body, httpOptions)
      .pipe(
        catchError(this.handleHTTPError)
      );
  }

  getContacts(authenticationToken: string): Observable<any> {
    var httpOptions = {
      headers: new HttpHeaders({ 'authToken': authenticationToken })
    }

    return this.httpClient.get(Constants.LeadscoreAPI.CONTACTS_URL, httpOptions)
    .pipe(
     catchError(this.handleHTTPError)
    );
  }

  logout(authenticationToken: string): Observable<any> {
    var httpOptions = {
      headers: new HttpHeaders({ 'Content-type': 'application/json' })
    };

    var body = {
      'authToken': authenticationToken
    }

    return this.httpClient.post(Constants.LeadscoreAPI.LOGOUT_URL, body, httpOptions)
    .pipe(
      catchError(this.handleHTTPError)
    );
  }

  private handleHTTPError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
