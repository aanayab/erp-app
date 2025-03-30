import { Component,Input } from '@angular/core';
import { FoodNode } from 'src/app/core/model/foodNode';
import { GroupBean } from 'src/app/core/model/groupBean';
import { MenuBean } from 'src/app/core/model/menuBean';
import { ScreenBean } from 'src/app/core/model/screenBean';
import { UserBean } from 'src/app/core/model/userBean';
import { Utils } from 'src/app/core/util/utils';

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
