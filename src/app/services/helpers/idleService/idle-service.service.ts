import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdleServiceService {


  idleState = 'IDDLE_SERVICE.NOT_STARTED';
  timedOut = false;
  lastPing?: any = null;

  constructor() { }



  resetIdle(){
    this.idleState = 'IDDLE_SERVICE.NOT_STARTED';
    this.timedOut = false;
  }
 

}
