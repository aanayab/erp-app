import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Utils } from 'src/app/util/utils';
import { ActionBean } from 'src/app/model/actionBean';
import { UserBean } from 'src/app/model/userBean';
import { Router } from '@angular/router';
import { CompanyService } from 'src/app/services/helpers/company/company.service';
import { WsSysAdminActionService } from 'src/app/services/ws-sysAdmin/ws-sys-admin.action.service';





@Component({
  selector: 'app-action-selector',
  templateUrl:  './action-selector.component.html',
  styleUrls: ['./action-selector.component.css']
})


// TODO quit oncahcnges
export class ActionSelectorComponent  {

  @Input() userBean?:UserBean;
  actionBeans?: ActionBean[];
  actionBean?: ActionBean;
  // selectedItem: ActionBean | null = null;
  searchTerm = '';
  @Output() actionSelected = new EventEmitter<ActionBean>();




  constructor(private utils: Utils, private wsSysAdminActionService: WsSysAdminActionService, private companyService: CompanyService,
    private router:Router) { }

  selectAction(item: ActionBean): void {
    debugger;
    this.actionBean = item;
    this.actionSelected.emit(item); // 🔥 Enviamos el dato al padre
  }

  filteredItems(): ActionBean[] | any {
    const term = this.searchTerm.toLowerCase();
    return this.actionBeans?.filter(item =>
      item.action.toLowerCase().includes(term)
    );
  }
    setActions(component: any, result: ActionBean[]) {
      component.actionBeans = result;
  
    }

  getActions() {
     debugger;        
    this.companyService.getCompanyObs().subscribe(obs => {
       if (obs) {
      this.wsSysAdminActionService.getActionsEnabled(this.utils)
        .subscribe(this.utils.subscribeHandler(this, this.setActions)
        );
      }
      });
 

  }
  ngOnInit() {
    debugger;
    this.getActions();
    // TODO , revidsar
    // if(this.userBean?.actions){
    //   this.actionBean = this.userBean.actions[0];
    // }

  }


}