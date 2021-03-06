import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';
import { Router } from '@angular/router';
import { ContactDataService } from '../contact-data.service';
import { Contact } from '../contact';
import { PagingService } from '../paging.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  allContacts: Contact[] = [];
  pageContacts: any[] = [];
  contacts: Contact[] = [];

  isError: boolean = false;
  alertText: string = '';

  constructor(private contactDataService: ContactDataService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private pagingService: PagingService) { }

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
            this.allContacts.push(contact);
          }

          if (this.allContacts.length > 0) {
            this.pageContacts = this.pagingService.getPageContacts(this.allContacts);
            this.contacts = this.pageContacts[0];
          }
        },error=>{
            this.isError = true;
            this.alertText = "Problem in fetching data, please retry";
        })
      } else {
        this.router.navigate(['/login']);
      }
    })
  }

  logoutButtonClicked() {
    this.logout();
  }

  logout() {
    this.localStorageService.getAuthenticationToken().subscribe(authToken => {
      if (authToken) {
        this.contactDataService.logout(authToken).subscribe(logoutResult => {
          this.localStorageService.clearAuthenticationToken();
          this.router.navigate(['/login']);
        })
      }
    },error => {
        this.isError = true;
        this.alertText = 'Logout is unsuccessful, please retry';
    })
  }

  getOtherContacts(page: number){
    if(this.pageContacts.length>0){
      this.contacts = this.pageContacts[page];
    }
  }
}
