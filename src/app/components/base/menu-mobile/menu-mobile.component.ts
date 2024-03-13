import { Component,Input } from '@angular/core';
import { GroupBean } from 'src/app/core/model/groupBean';
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
  @Input() menu: Map<String, ScreenBean[]> = new Map();
  keys:any;


  constructor(private utils:Utils) {    

  }

  ngOnInit() {
  this.keys =[ ...this.menu.keys() ];

  }


  logOut(){    
   this.utils.logOut();
  }

  move(name: string) {
    alert(name);
    // this.sidevarChange();
}

  sidevarChange() {
    this.collapsed = !this.collapsed;
    }
    
}
