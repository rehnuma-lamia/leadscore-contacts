import { Injectable } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(protected localStorage: LocalStorage) { }

  setAuthenticationToken(token: string){
    this.localStorage.setItem('authToken', token).subscribe(() => {});
  }

  getAuthenticationToken(){
    return this.localStorage.getItem('authToken');
  }
  
  clearAuthenticationToken(){
    this.localStorage.clear().subscribe(() => {});
  }
}
