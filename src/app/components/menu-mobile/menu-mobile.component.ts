import { Component,Input } from '@angular/core';
import { Router} from '@angular/router';
import { GroupBean } from 'src/app/model/groupBean';
import { ScreenBean } from 'src/app/model/screenBean';
import { UserBean } from 'src/app/model/userBean';

@Component({
  selector: 'app-menu-mobile',
  templateUrl: './menu-mobile.component.html',
  styleUrls: ['./menu-mobile.component.css']
})
export class MenuMobileComponent {


  collapsed:boolean = false;
  @Input() user?:UserBean;  
  @Input() menu: Map<GroupBean, ScreenBean[]> = new Map();
  keys:any;


  constructor(private router: Router) {    

  }

  ngOnInit() {
  this.keys =[ ...this.menu.keys() ];

  }


  logOut(){
    
    localStorage.removeItem("SESSIONERPAPPTK");
    localStorage.removeItem('SESSIONERPAPPUSN');
    //localStorage.removeItem('SESSIONERPAPPUSR');
    //localStorage.removeItem('SESSIONERPAPPAUT');
    this.router.navigate(['/login']);
  }

  move(name: string) {
    alert(name);
    // this.sidevarChange();
}

  sidevarChange() {
    this.collapsed = !this.collapsed;
    }
    
}
