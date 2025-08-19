import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Utils } from 'src/app/util/utils';
import { MenuBean } from 'src/app/model/menuBean';
import { UserBean } from 'src/app/model/userBean';
import { Router } from '@angular/router';
import { CompanyService } from 'src/app/services/helpers/company/company.service';
import { WsSysAdminMenuService } from 'src/app/services/ws-sysAdmin/ws-sys-admin.menu.service';





@Component({
  selector: 'app-menu-selector',
  templateUrl: './menu-selector.component.html',
  styleUrls: ['./menu-selector.component.css']
})


// TODO quit oncahcnges
export class MenuSelectorComponent {

  @Input() selectedMenu: number | any;
  menuBeans?: MenuBean[];
  menuBean?: MenuBean;
  // selectedItem: MenuBean  | null = null;
  searchTerm = '';
  @Output() menuSelected: EventEmitter<MenuBean> = new EventEmitter<MenuBean>();




  constructor(private utils: Utils, private wsSysAdminMenuService
    : WsSysAdminMenuService
    , private companyService: CompanyService,
    private router: Router) { }

  selectMenu(item: MenuBean): void {
     
    this.menuBean = item;
    this.menuSelected.emit(item); // 🔥 Enviamos el dato al padre
  }

  filteredItems(): MenuBean[] | any {
    const term = this.searchTerm.toLowerCase();
    return this.menuBeans?.filter(item =>
      item.name?.toLowerCase().includes(term)
    ); 
  }
  setMenus(component: any, result: MenuBean[]) {
     
        component.menuBeans =   [
    { idMenu: 0, screen: 'Menú raíz',name: 'Menú raíz' },
    ...result
  ];
    if (component.selectedMenu !== undefined && component.selectedMenu !== null) {
      component.menuBean = component.menuBeans.find((item :MenuBean)  => item.idMenu === component.selectedMenu);
      component.menuSelected.emit(component.menuBean);
    }



  }

  getMenus() {
    this.wsSysAdminMenuService.getMenusEnabled(this.utils)
      .subscribe(this.utils.subscribeHandler(this, this.setMenus)
      );




  }
  ngOnInit() {
     
    this.getMenus();
    // TODO , revidsar
    // if(this.userBean?.menus){
    //   this.menuBean = this.userBean.menus[0];
    // }

  }


}