import { Component,Input } from '@angular/core';
import { FoodNode } from 'src/app/model/foodNode';
import { GrupoBean } from 'src/app/model/grupoBean';
import { MenuBean } from 'src/app/model/menuBean';
import { ScreenBean } from 'src/app/model/screenBean';
import { UserBean } from 'src/app/model/userBean';
import { Utils } from 'src/app/util/utils';

@Component({
  selector: 'app-menu-mobile',
  templateUrl: './menu-mobile.component.html',
  styleUrls: ['./menu-mobile.component.css']
})
export class MenuMobileComponent {


  collapsed:boolean = false;
  @Input() user?:UserBean;  
  @Input() foodNode: FoodNode[] | any;
  keys:any;


  constructor(private utils:Utils) {    

  }



  logOut(){    
   this.utils.logOut();
  }

  move(name: string) {
    alert(name);
}

  sidevarChange() {
    this.collapsed = !this.collapsed;
    }
    
}
