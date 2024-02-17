import { Component } from '@angular/core';
import { CompanyService } from 'src/app/core/services/company/company.service';
import { PrivilegyService } from 'src/app/core/services/privilegy/privilegy.service';
import { Utils } from 'src/app/core/util/utils';

@Component({
  selector: 'app-cost-succ',
  templateUrl: './cost-succ.component.html',
  styleUrls: ['./cost-succ.component.css']
})
export class CostSuccComponent {
  panelOpenState = true;
  constructor(public companySrvice:CompanyService,public privilegyService:PrivilegyService, private utils:Utils){
   
    this.utils.validateCompany();
    this.utils.validatePermissions();
    this.utils.getSession();
  }
}
