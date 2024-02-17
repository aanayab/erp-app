import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdleServiceService {


  idleState = 'Not started.';
  timedOut = false;
  lastPing?: any = null;

  constructor() { }



  resetIdle(){
    this.idleState = 'Not started.';
    this.timedOut = false;
  }
 

}
