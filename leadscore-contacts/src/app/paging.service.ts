import { Injectable } from '@angular/core';
import { Constants } from './constants';
import { Contact } from './contact';

@Injectable({
  providedIn: 'root'
})
export class PagingService {

  constructor() { }

  getPageContacts(contacts: Contact[]){
    var pageContacts= [];
    if(contacts.length>0){
      while(contacts.length>0){
        pageContacts.push(contacts.splice(0,Constants.NUMBER_OF_ITEM_PER_PAGE));
      }
    }
    return pageContacts;
  }
}
