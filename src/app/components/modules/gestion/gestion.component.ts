import { Component } from '@angular/core';
import { CompanyService } from 'src/app/core/services/company/company.service';
import { PrivilegyService } from 'src/app/core/services/privilegy/privilegy.service';
import { Utils } from 'src/app/core/util/utils';

@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.css']
})
export class GestionComponent {
  panelOpenState = true;

  constructor(public companyService:CompanyService,public privilegyService:PrivilegyService, private utils:Utils){
   
    this.utils.validateCompany();
    this.utils.validatePermissions();
    this.utils.getSession();
  }

}
