import { Component, OnInit } from '@angular/core';
import { ContactDataService } from '../contact-data.service';
import { User } from '../user';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userName: string;
  password: string;

  constructor(private contactDataService: ContactDataService, private localStorageService: LocalStorageService) { }

  ngOnInit() {
  }

  loginButtonClicked() {
    this.login();
  }

  login() {
    var user: User = {
      userName: this.userName,
      password: this.password
    }

    this.contactDataService.login(user).subscribe(loginData => {

      if(loginData.token.authToken){
        alert('Succes: ' + loginData.token.authToken);
        this.localStorageService.setAuthenticationToken(loginData.token.authToken);
      } else{
        alert('Invalid crediantial')
      }
      
    })
  }

}
