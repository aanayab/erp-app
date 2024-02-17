import { Component } from '@angular/core';
import { CompanyService } from 'src/app/core/services/company/company.service';
import { PrivilegyService } from 'src/app/core/services/privilegy/privilegy.service';
import { Utils } from 'src/app/core/util/utils';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent {
  panelOpenState = true;
  constructor(public companySrvice:CompanyService,public privilegyService:PrivilegyService, private utils:Utils){
   
    this.utils.validateCompany();
    this.utils.validatePermissions();
    this.utils.getSession();
  }

}
