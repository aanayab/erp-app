import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';

import { Utils } from '../../../core/util/utils';
import { CompanyBean } from 'src/app/core/model/companyBean';
import { UserBean } from 'src/app/core/model/userBean';
import { CompanyService } from 'src/app/core/services/helpers/company/company.service';
import { WsSysAdminService } from 'src/app/core/services/ws-sysAdmin/ws-sys-admin.service';
import { Router } from '@angular/router';





@Component({
  selector: 'app-phone-selector',
  templateUrl: './phone-selector.component.html',
  styleUrls: ['./phone-selector.component.css']
})



export class PhoneSelectorComponent implements OnChanges {

  @Input() userBean?: UserBean;
  companyBeans?: CompanyBean[];
  companyBean?: CompanyBean;





  constructor(private utils: Utils, private wsSysAdminService: WsSysAdminService,private companyService:CompanyService,
    private router:Router) { }

  selectCompany(companyBean:any){
   this.companyBean = companyBean;
   this.companyService.setCompany(this.companyBean);  
  //  this.router.

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
    //  
    // component.companyBeans = result;  
   
    // component.companyService.setCompany(component.companyBean);
  

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
    
    this.wsSysAdminService.getCompany(this.userBean?.idCompany)
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