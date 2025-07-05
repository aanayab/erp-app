import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Utils } from 'src/app/util/utils';
import { AuthorityBean } from 'src/app/model/authorityBean';
import { UserBean } from 'src/app/model/userBean';
import { Router } from '@angular/router';
import { CompanyService } from 'src/app/services/helpers/company/company.service';
import { WsAuthenticateAuthorityService } from 'src/app/services/ws-authenticate/ws-authenticate.authority.service';





@Component({
  selector: 'app-role-selector',
  templateUrl: './role-selector.component.html',
  styleUrls: ['./role-selector.component.css']
})


// TODO quit oncahcnges
export class RoleSelectorComponent  {

  @Input() userBean?:UserBean;
  roleBeans?: AuthorityBean[];
  roleBean?: AuthorityBean;
  // selectedItem: AuthorityBean | null = null;
  searchTerm = '';
  @Output() roleSelected = new EventEmitter<AuthorityBean>();




  constructor(private utils: Utils, private wsAuthenticateService: WsAuthenticateAuthorityService, private companyService: CompanyService,
    private router:Router) { }

  selectRole(item: AuthorityBean): void {
    debugger;
    this.roleBean = item;
    this.roleSelected.emit(item); // 🔥 Enviamos el dato al padre
  }

  filteredItems(): AuthorityBean[] | any {
    const term = this.searchTerm.toLowerCase();
    return this.roleBeans?.filter(item =>
      item.authority.toLowerCase().includes(term)
    );
  }
    setAuthorities(component: any, result: AuthorityBean[]) {
      component.roleBeans = result;
  
    }

  getAuthorities() {
     debugger;        
    this, this.companyService.getCompanyObs().subscribe(obs => {
      this.wsAuthenticateService.getAuthoritiesEnabledByIdCompany(this.utils, obs.idCompany)
        .subscribe(this.utils.subscribeHandler(this, this.setAuthorities)
        );
      });
 

  }
  ngOnInit() {
    debugger;
    this.getAuthorities();
    if(this.userBean?.authorities){
      this.roleBean = this.userBean.authorities[0];
    }

  }


}