import { Component, Input } from '@angular/core';
import { UserBean } from 'src/app/model/userBean';
import { Utils } from 'src/app/util/utils';
import { Router } from '@angular/router';

import {
  MatDialog,
} from '@angular/material/dialog';
import { UserInfoComponent } from '../user-info/user-info-component';
import { UserLoggedServiceService } from 'src/app/services/helpers/userLoggedService/user-logged-service.service';
import { ThemeComponent } from '../theme/theme-component';
import { CompanyService } from 'src/app/services/helpers/company/company.service';
import { filter } from 'rxjs';




@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {


  userName?: string;
  @Input() user?: UserBean;
  color: string | any;
  backgroundUrl: string = '';
  isImageReady: boolean = false;

  constructor(public dialog: MatDialog, private router: Router, private utils: Utils,
    private userLoggedServiceService: UserLoggedServiceService, private companyService: CompanyService) {


  }


  openDialog(userBean: any): void {
    this.dialog.open(UserInfoComponent, {
      data: userBean,
      width: '550px',
      enterAnimationDuration: '0ms',
      exitAnimationDuration: '0ms',
      position: { top: '45px', right: '0px' },
      disableClose: true
    });
  }




  openThemeDialog(): void {
    this.dialog.open(ThemeComponent, {
      width: '300px',
      enterAnimationDuration: '0ms',
      exitAnimationDuration: '0ms',
      position: { top: '45px', right: '0px' },
      disableClose: true
    });
  }


  validateRoot() {
    return true;
  }


  logOut() {
    this.utils.logOut();
  }



  ngOnInit() {

    this.userName = this.utils.getUsername();
  //  setTimeout(() => {
      this.companyService.getCompanyObs().pipe(
        filter(company => !!company?.image?.data)
      ).subscribe(company => {
          if (company) {
        console.log('Imagen cargada:', company.image.data.slice(0, 50));
        this.backgroundUrl = 'data:image/jpeg;base64,' + company.image.data;

        this.isImageReady = true;
          }
      });
    
 //   }, 2000);



  }
}
