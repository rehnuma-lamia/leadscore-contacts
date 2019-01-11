import { Component, OnInit } from '@angular/core';
import { ContactDataService } from '../contact-data.service';
import { User } from '../user';
import { LocalStorageService } from '../local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userName: string;
  password: string;

  constructor(private contactDataService: ContactDataService, 
    private localStorageService: LocalStorageService, 
    private router: Router) { }

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
        this.localStorageService.setAuthenticationToken(loginData.token.authToken);
        this.router.navigate(['/contacts']);
      } else{
        alert('Invalid crediantial')
      }
      
    })
  }

}
