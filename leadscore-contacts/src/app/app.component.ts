import { Component } from '@angular/core';
import { ContactDataService } from './contact-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(private contactDataService: ContactDataService) {
    
  }

  ngOnInit(){
    // this.contactDataService.getContacts().subscribe(contacts => {
    //   alert(contacts)
    //   console.log(contacts);
      
    // }, error => {
    //   alert('error' + error);
    // })

    // this.contactDataService.login().subscribe(a => {
    //   alert('log' + a);
    //   console.log('log: ' + a);
    // }, error => {
    //   alert('error' + error);
    // })
   
  
  }



}
