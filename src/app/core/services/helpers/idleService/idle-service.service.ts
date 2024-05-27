import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdleServiceService {


  idleState = 'NOT_STARTED';
  timedOut = false;
  lastPing?: any = null;

  constructor() { }



  resetIdle(){
    this.idleState = 'NOT_STARTED';
    this.timedOut = false;
  }
 

}
