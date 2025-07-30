import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Utils } from 'src/app/util/utils';
import { GrupoBean } from 'src/app/model/grupoBean';
import { UserBean } from 'src/app/model/userBean';
import { Router } from '@angular/router';
import { CompanyService } from 'src/app/services/helpers/company/company.service';
import { WsSysAdminGroupService } from 'src/app/services/ws-sysAdmin/ws-sys-admin.group.service';





@Component({
  selector: 'app-group-selector',
  templateUrl:  './group-selector.component.html',
  styleUrls: ['./group-selector.component.css']
})


// TODO quit oncahcnges
export class GroupSelectorComponent  {

  @Input() userBean?:UserBean;
  groupBeans?: GrupoBean[];
  groupBean?: GrupoBean;
  // selectedItem: GrupoBean | null = null;
  searchTerm = '';
  @Output() groupSelected = new EventEmitter<GrupoBean>();




  constructor(private utils: Utils, private wsSysAdminGroupService: WsSysAdminGroupService, private companyService: CompanyService,
    private router:Router) { }

  selectGroup(item: GrupoBean): void {
    debugger;
    this.groupBean = item;
    this.groupSelected.emit(item); // 🔥 Enviamos el dato al padre
  }

  filteredItems(): GrupoBean[] | any {
    const term = this.searchTerm.toLowerCase();
    return this.groupBeans?.filter(item =>
      item.grupo.toLowerCase().includes(term)
    );
  }
    setGroups(component: any, result: GrupoBean[]) {
      component.groupBeans = result;
  
    }

  getGroups() {
     debugger;        
    this.companyService.getCompanyObs().subscribe(obs => {
       if (obs) {
      this.wsSysAdminGroupService.getGroupsEnabledByIdCompany(this.utils, obs.idCompany)
        .subscribe(this.utils.subscribeHandler(this, this.setGroups)
        );
      }
      });
 

  }
  ngOnInit() {
    debugger;
    this.getGroups();
    // TODO , revidsar
    // if(this.userBean?.groups){
    //   this.groupBean = this.userBean.groups[0];
    // }

  }


}