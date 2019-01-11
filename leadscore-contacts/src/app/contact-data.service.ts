import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders}    from '@angular/common/http';
import { Constants } from './constants';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class ContactDataService {

  constructor(private httpClient: HttpClient) { }

  login(user: User): Observable<any>{
    var httpOptions = {
      headers: new HttpHeaders({'Content-type': 'application/json'})
    };

    var body = {
      'username': user.userName,
      'password': user.password
    }

    return this.httpClient.post(Constants.LeadscoreAPI.LOGIN_URL, body, httpOptions);
  }
  
  getContacts(authenticationToken: string): Observable<any>{
   var httpOptions = {
     headers: new HttpHeaders({'authToken': authenticationToken})
   }  

   return this.httpClient.get(Constants.LeadscoreAPI.CONTACTS_URL, httpOptions);
  }

  logout(authenticationToken: string): Observable<any>{
    var httpOptions = {
      headers: new HttpHeaders({'Content-type': 'application/json'})
    }; 

    var body ={
      'authToken': authenticationToken
    }

    return this.httpClient.post(Constants.LeadscoreAPI.LOGOUT_URL, body, httpOptions);
  }
}
