import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Utils } from 'src/app/util/utils';
import { PrivilegyBean } from 'src/app/model/privilegyBean';
import { UserBean } from 'src/app/model/userBean';
import { Router } from '@angular/router';
import { CompanyService } from 'src/app/services/helpers/company/company.service';
import { WsSysAdminPrivilegyService } from 'src/app/services/ws-sysAdmin/ws-sys-admin.privilegy.service';





@Component({
  selector: 'app-privilegy-selector',
  templateUrl: './privilegy-selector.component.html',
  styleUrls: ['./privilegy-selector.component.css']
})


// TODO quit oncahcnges
export class PrivilegySelectorComponent {

  @Input() selectedPrivilegy: number | any;
  privilegyBeans?: PrivilegyBean[] = [];
  privilegyBean?: PrivilegyBean;
  // selectedItem: PrivilegyBean | null = null;
  searchTerm = '';
  @Output() privilegySelected = new EventEmitter<PrivilegyBean>();




  constructor(private utils: Utils, private wsSysAdminPrivilegyService
    : WsSysAdminPrivilegyService
    , private companyService: CompanyService,
    private router: Router) { }

  selectPrivilegy(item: PrivilegyBean): void {
     
    this.privilegyBean = item;
    this.privilegySelected.emit(item); // 🔥 Enviamos el dato al padre
  }

  // filteredItems(): PrivilegyBean[] | any {
  //   const term = this.searchTerm.toLowerCase();
  //   return this.privilegyBeans?.filter(item =>
  //     item.idPrivilegy?.toLowerCase().includes(term)
  //   );
  // }
  setPrivilegies(component: any, result: PrivilegyBean[]) {

    component.privilegyBeans = result;
    if (component.selectedPrivilegy) {
      component.privilegyBean = component.privilegyBeans.find((item:PrivilegyBean) => item.idPrivilegy === component.selectedPrivilegy);
      component.privilegySelected.emit(component.privilegyBean);
    }


  }

  getPrivilegies() {


    this.wsSysAdminPrivilegyService.getPrivilegiesEnabled(this.utils)
      .subscribe(this.utils.subscribeHandler(this, this.setPrivilegies)
      );




  }
  ngOnInit() {
     
    this.getPrivilegies();
    // TODO , revidsar
    // if(this.userBean?.privilegies){
    //   this.privilegyBean = this.userBean.privilegies[0];
    // }

  }


}