import { HostListener, Injectable } from '@angular/core';
import { LocalStorage } from '@ng-idle/core';
import { Subject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserLoggedServiceService {

  private userLoggedIn = new Subject<boolean>();
  private username: string | any;
  private token: string | any;
  private browserUuid: string | any;

  constructor() {
    
    const browserUuid = localStorage.getItem("SESSIONERPAPPUUID");
    if(browserUuid !== undefined && browserUuid !== null){
      this.browserUuid = browserUuid;
      localStorage.removeItem("SESSIONERPAPPUUID");
    }
    const username = localStorage.getItem("SESSIONERPAPPUSN");
    if(username !== undefined && username !== null){
      this.username = username;
      localStorage.removeItem("SESSIONERPAPPUSN");
    }
    const token = localStorage.getItem("SESSIONERPAPPTKN");
    if(token !== undefined && token !== null){
      this.token = token;
      localStorage.removeItem("SESSIONERPAPPTKN");
    }
    this.userLoggedIn.next(false);
  }

  setUserLoggedIn(userLoggedIn: boolean) {
    this.userLoggedIn.next(userLoggedIn);
  }

  getUserLoggedIn(): Observable<boolean> {
    return this.userLoggedIn.asObservable();
  }


  setUserName(username: string | any) {
    this.username = username;
  }

  getUserNameObs(): Observable<string> {
    return of(this.username);
  }

  getUserName(): string {
    return this.username;
  }

  getTokenObs(): Observable<string> {
    return of(this.token);
  }

  setToken(token: string | any) {
    this.token = token;
  }

  getToken(): string {
    return this.token;
  }

  getBrowserUuidObs(): Observable<string> {
    return of(this.browserUuid);
  }

  setBrowserUuid(browserUuid: string | any) {
    this.browserUuid = browserUuid;
  }

  getBrowserUuid(): string {
    return this.browserUuid;
  }

}
