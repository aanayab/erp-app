import { Component, Input } from '@angular/core';

import { Utils } from '../../util/utils';
import { CompanyBean } from 'src/app/model/companyBean';
import { UserBean } from 'src/app/model/userBean';
import { CompanyService } from 'src/app/services/helpers/company/company.service';
import { WsSysAdminMenuService } from 'src/app/services/ws-sysAdmin/ws-sys-admin.menu.service';
import { WsSysAdminCompanyService } from 'src/app/services/ws-sysAdmin/ws-sys-admin.company.service';
import { Router } from '@angular/router';





@Component({
  selector: 'app-company-selector',
  templateUrl: './company-selector.component.html',
  styleUrls: ['./company-selector.component.css']
})


// TODO quit oncahcnges
export class CompanySelectorComponent  {

  @Input() userBean?: UserBean;
  companyBeans?: CompanyBean[];
  companyBean?: CompanyBean;





  constructor(private utils: Utils, private wsSysAdminService: WsSysAdminMenuService,
     private wsSysAdminCompanyService: WsSysAdminCompanyService,private companyService:CompanyService,
    private router:Router) { }

  selectCompany(companyBean:any){
   this.companyBean = companyBean;
   this.companyService.setCompany(this.companyBean);  
  window.location.reload();
   

  }

  setCompanies(component: any, result: any) {    
    component.companyBeans = result;
    let aux = component.companyService.getCompany();       
    if(aux !== undefined){
      component.companyBean = aux;
    }else{
      component.companyBean = result[0];
    }
    component.companyService.setCompany(component.companyBean);
 

  }

  setCompany(component: any, result: any) {
    component.companyBean = result;
    component.companyService.setCompany(component.companyBean );

  }


  getCompanies() {
    this.wsSysAdminCompanyService.getCompaniesEnabled()
      .subscribe(this.utils.subscribeHandler(this, this.setCompanies)
      );

  }

  getCompany() {
    
    this.wsSysAdminCompanyService.getCompany(this.userBean?.idCompany)
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
    return result;
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