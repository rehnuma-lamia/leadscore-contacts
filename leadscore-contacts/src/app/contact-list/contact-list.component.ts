import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';
import { Router } from '@angular/router';
import { ContactDataService } from '../contact-data.service';
import { Contact } from '../contact';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  contacts: Contact[] = [];

  constructor(private contactDataService: ContactDataService,
    private localStorageService: LocalStorageService,
    private router: Router) { }

  ngOnInit() {
    this.getContacts();
  }

  getContacts() {
    this.localStorageService.getAuthenticationToken().subscribe(authToken => {
      if (authToken) {
        this.contactDataService.getContacts(authToken).subscribe(contactsResult => {
          var contacts = contactsResult.data;
          for (let con of contacts) {
            var contact: Contact = {
              id: con.id,
              name: con.displayName,
              email: con.emails != null && con.emails[0].email != undefined ? con.emails[0].email : '',
              phoneNumber: con.phoneNumbers != null && con.phoneNumbers[0].number != undefined ? con.phoneNumbers[0].number : '',
              companyName: con.companyName
            }
            this.contacts.push(contact);
          }
        })
      }

    })
  }

  logoutButtonClicked() {
    this.logout();
  }

  logout() {
    this.localStorageService.getAuthenticationToken().subscribe(authToken=>{
      if(authToken){
        this.contactDataService.logout(authToken).subscribe(logoutResult=>{
          this.localStorageService.clearAuthenticationToken();
          this.router.navigate(['/login']);
        })
      }
    })
  }


}
