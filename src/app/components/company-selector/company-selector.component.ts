import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';

import { Utils } from '../../services/util/utils';
import { CompanyBean } from 'src/app/model/companyBean';
import { UserBean } from 'src/app/model/userBean';
import { CompanyService } from 'src/app/services/company/company.service';
import { WsSysAdminService } from 'src/app/services/ws-sysAdmin/ws-sys-admin.service';




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
   this.companyService.setCompany(companyBean);
  }

  setCompanies(component: any, result: any) {
    
    component.companyBeans = result;

  }

  setCompany(component: any, result: any) {
    component.companyBean = result;
    this.companyService.setCompany(result);

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
    
    if (this.userBean != undefined) {
      if (this.validateRoot()) {
        this.getCompanies();
      } else {
        this.getCompany();
      }
    }


  }


  ngOnInit() {
  }

}