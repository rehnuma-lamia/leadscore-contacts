import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders}    from '@angular/common/http';
import { Constants } from './constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactDataService {

  constructor(private http: HttpClient) { }

  login(): Observable<any>{
    var httpOptions = {
      headers: new HttpHeaders({ 'Content-type': 'application/json' })
    };

    var body = {
      'username': 'abcd2@gmail.com',
      'password': 'QWEasd123@'
    }

    return this.http.post(Constants.LeadscoreAPI.LOGIN_URL, body, httpOptions);
  }
  
  getContacts(): Observable<any>{
   var httpOptions = {
     headers: new HttpHeaders({'authToken': 'session_2e5bbb38-db8e-4e59-bf77-defb96f34da1'})
   }  
   return this.http.get(Constants.LeadscoreAPI.CONTACTS_URL);
  }
}
