import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Utils } from 'src/app/util/utils';
import { AuthorityBean } from 'src/app/model/authorityBean';
import { UserBean } from 'src/app/model/userBean';
import { Router } from '@angular/router';
import { CompanyService } from 'src/app/services/helpers/company/company.service';
import { WsAuthenticateAuthorityService } from 'src/app/services/ws-authenticate/ws-authenticate.authority.service';
import { TranslateService } from '@ngx-translate/core';





@Component({
  selector: 'app-role-selector-multiple',
  templateUrl: './role-selector-multiple.component.html',
  styleUrls: ['./role-selector-multiple.component.css']
})


// TODO quit oncahcnges
export class RoleSelectorMultipleComponent  {

  @Input() selectedAuthorities: AuthorityBean[] = [];
  // @Input() userBean?:UserBean;
  roleBeans?: AuthorityBean[];
 selectedRoles: AuthorityBean[] = [];
  // selectedItem: AuthorityBean | null = null;
  searchTerm = '';
  @Output() rolesSelected = new EventEmitter<AuthorityBean[]>();




  constructor(private utils: Utils, private wsAuthenticateService: WsAuthenticateAuthorityService, private companyService: CompanyService,
    private router:Router,private translate: TranslateService) { }

toggleRole(item: AuthorityBean): void {
  const index = this.selectedRoles.findIndex(r => r.authority === item.authority);
  if (index >= 0) {
    this.selectedRoles.splice(index, 1);
  } else {
    this.selectedRoles.push(item);
  }
  this.rolesSelected.emit(this.selectedRoles); // Emitir lista actualizada
}


isSelected(item: AuthorityBean): boolean {
  return this.selectedRoles.some(r => r.authority === item.authority);
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
              
    this.companyService.getCompanyObs().subscribe(obs => {
       if (obs) {
      this.wsAuthenticateService.getAuthoritiesEnabledByIdCompany(this.utils, obs.idCompany)
        .subscribe(this.utils.subscribeHandler(this, this.setAuthorities)
        );
      }
      });
 

  }
ngOnInit() {
  this.getAuthorities();

  if (this.selectedAuthorities?.length) {
    this.selectedRoles = [...this.selectedAuthorities];
    this.rolesSelected.emit(this.selectedRoles);
  }
}


get selectedRolesLabel(): string {
  if (!this.selectedRoles || this.selectedRoles.length === 0) {
    return this.translate.instant('ROLE_SELECTOR.SELECT');
  }

  return this.selectedRoles
    .map(r => r.authority.replace('ROLE_', ''))
    .join(', ');
}



}