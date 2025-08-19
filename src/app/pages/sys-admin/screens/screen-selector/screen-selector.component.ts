import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Utils } from 'src/app/util/utils';
import { ScreenBean } from 'src/app/model/screenBean';
import { UserBean } from 'src/app/model/userBean';
import { Router } from '@angular/router';
import { CompanyService } from 'src/app/services/helpers/company/company.service';
import { WsSysAdminScreenService } from 'src/app/services/ws-sysAdmin/ws-sys-admin.screen.service';





@Component({
  selector: 'app-screen-selector',
  templateUrl: './screen-selector.component.html',
  styleUrls: ['./screen-selector.component.css']
})


// TODO quit oncahcnges
export class ScreenSelectorComponent {

  @Input() selectedScreen: number | any;
  screenBeans?: ScreenBean[] = [];
  screenBean?: ScreenBean;
  // selectedItem: ScreenBean | null = null;
  searchTerm = '';
  @Output() screenSelected = new EventEmitter<ScreenBean>();




  constructor(private utils: Utils, private wsSysAdminScreenService
    : WsSysAdminScreenService
    , private companyService: CompanyService,
    private router: Router) { }

  selectScreen(item: ScreenBean): void {
     
    this.screenBean = item;
    this.screenSelected.emit(item); // 🔥 Enviamos el dato al padre
  }

  filteredItems(): ScreenBean[] | any {
    const term = this.searchTerm.toLowerCase();
    return this.screenBeans?.filter(item =>
      item.idScreen?.toLowerCase().includes(term)
    );
  }
  setScreens(component: any, result: ScreenBean[]) {

    component.screenBeans = result;
    if (component.selectedScreen) {
      component.screenBean = component.screenBeans.find((item:ScreenBean) => item.idScreen === component.selectedScreen);
      component.screenSelected.emit(component.screenBean);
    }


  }

  getScreens() {


    this.wsSysAdminScreenService.getScreensEnabled(this.utils)
      .subscribe(this.utils.subscribeHandler(this, this.setScreens)
      );




  }
  ngOnInit() {
     
    this.getScreens();
    // TODO , revidsar
    // if(this.userBean?.screens){
    //   this.screenBean = this.userBean.screens[0];
    // }

  }


}