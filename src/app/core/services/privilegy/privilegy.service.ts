import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PrivilegyBean } from 'src/app/core/model/peivilegyBean';

@Injectable({
  providedIn: 'root'
})
export class PrivilegyService {

  private privilegy!: PrivilegyBean;

  constructor(){
    
    const privilegy = localStorage.getItem("SESSIONERPAPPPER");
    if (privilegy !== undefined && privilegy !== null) {
      this.privilegy = JSON.parse(privilegy);
      localStorage.removeItem("SESSIONERPAPPPER");
    }

  }
 

  getRivilegyObs():  Observable<PrivilegyBean> {
    return of(this.privilegy);
  }

  getPrivilegy():  PrivilegyBean {
    return this.privilegy;
  }

  setPrivilegy(privilegy:PrivilegyBean | any){
    this.privilegy = privilegy;

  }

 
}
