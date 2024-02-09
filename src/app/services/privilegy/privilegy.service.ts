import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PrivilegyBean } from 'src/app/model/peivilegyBean';

@Injectable({
  providedIn: 'root'
})
export class PrivilegyService {

  privilegy!: any;
 

  getRivilegyObs():  Observable<PrivilegyBean> {
    return of(this.privilegy);
  }

  getPrivilegy():  PrivilegyBean {
    return this.privilegy;
  }

  setPrivilegy(privilegy:PrivilegyBean){
    this.privilegy = privilegy;

  }

 
}
