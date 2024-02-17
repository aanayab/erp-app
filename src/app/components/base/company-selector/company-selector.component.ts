import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';

import { Utils } from '../../../core/util/utils';
import { CompanyBean } from 'src/app/core/model/companyBean';
import { UserBean } from 'src/app/core/model/userBean';
import { CompanyService } from 'src/app/core/services/company/company.service';
import { WsSysAdminService } from 'src/app/core/services/ws-sysAdmin/ws-sys-admin.service';




@Component({
  selector: 'app-company-selector',
  templateUrl: './company-selector.component.html',
  styleUrls: ['./company-selector.component.css']
})



export class CompanySelectorComponent implements OnChanges {

  @Input() userBean?: UserBean;
  companyBeans?: CompanyBean[];
  companyBean?: CompanyBean;





  constructor(private utils: Utils, private wsSysAdminService: WsSysAdminService,private companyService:CompanyService) { }

  selectCompany(companyBean:any){
   this.companyBean = companyBean;
   this.companyService.setCompany(this.companyBean);
  }

  setCompanies(component: any, result: any) {    
    
    component.companyBeans = result;
    component.companyBean = result[0];
    component.companyService.setCompany(component.companyBean);

  }

  setCompany(component: any, result: any) {
    component.companyBean = result;
    component.companyService.setCompany(component.companyBean );

  }


  getCompanies() {
    this.wsSysAdminService.getCompanies()
      .subscribe(this.utils.subscribeHandler(this, this.setCompanies)
      );

  }

  getCompany() {
    
    this.wsSysAdminService.getCompany(this.userBean?.company)
      .subscribe(this.utils.subscribeHandler(this, this.setCompany)
      );

  }

  validateRoot(): boolean {
    let result = false;
    let authorities = this.userBean?.authorities;
    for (let i = 0; i < authorities!.length; i++) {
      let value = authorities![i];
      if (value.authority === "ROLE_ROOT") {
        result = true;
        break;
      } else {
        result = false;
      }
    }
    return true;
  }

  ngOnChanges(changes: SimpleChanges) {
    
   

  }


  ngOnInit() {

    if (this.userBean != undefined) {
      if (this.validateRoot()) {
        this.getCompanies();
      } else {
        this.getCompany();
      }
    }

  }


}