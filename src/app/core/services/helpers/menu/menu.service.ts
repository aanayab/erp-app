import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FoodNode } from '../../../model/foodNode';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private menu!: FoodNode;

  constructor(){
    
    const menu = localStorage.getItem("SESSIONERPAPPPMN");
    if (menu !== undefined && menu !== null) {
      this.menu = JSON.parse(menu);
      localStorage.removeItem("SESSIONERPAPPPMN");
    }

  }
 

  getMenuObs():  Observable<FoodNode> {
    return of(this.menu);
  }

  getMenu():  FoodNode {
    return this.menu;
  }

  setMenu(menu:FoodNode | any){
    this.menu = menu;

  }

 
}
