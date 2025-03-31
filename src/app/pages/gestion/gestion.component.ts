import { Component } from '@angular/core';
import { CompanyService } from 'src/app/services/helpers/company/company.service';
import { PrivilegyService } from 'src/app/services/helpers/privilegy/privilegy.service';
import { Utils } from 'src/app/util/utils';

@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.css']
})
export class GestionComponent {
  panelOpenState = true;

  constructor(public companyService:CompanyService,public privilegyService:PrivilegyService, private utils:Utils){
   
    this.utils.validate();
  }

}
