import { Component,Input } from '@angular/core';
import { UserBean } from 'src/app/model/userBean';
import { Utils } from 'src/app/util/utils';
import { Router} from '@angular/router';

import {
  MatDialog,
} from '@angular/material/dialog';
import { UserInfoComponent } from '../user-info/user-info-component';
import { UserLoggedServiceService } from 'src/app/services/helpers/userLoggedService/user-logged-service.service';
import { ThemeComponent } from '../theme/theme-component';




@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {


  userName?:string;
  @Input() user?:UserBean; 
  color:string | any; 
  
  constructor(public dialog: MatDialog,private router: Router,private utils:Utils,
    private userLoggedServiceService:UserLoggedServiceService){
    

  }


  openDialog(userBean:any): void {
    this.dialog.open(UserInfoComponent, {
      data :userBean,
      width: '550px',
      enterAnimationDuration: '0ms',
      exitAnimationDuration: '0ms',
      position:{top: '45px', right:'0px'}, 
      disableClose:true
    });
  }




openThemeDialog(): void {
  this.dialog.open(ThemeComponent, {
    width: '300px',
    enterAnimationDuration: '0ms',
    exitAnimationDuration: '0ms',
    position:{top: '45px', right:'0px'}, 
    disableClose:true
  });
}


  validateRoot(){    
    return true;
  }


  logOut(){
    this.utils.logOut();
  }



  ngOnInit() {
    
    this.userName = this.utils.getUsername();
   }
 


}
