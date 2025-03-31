import { Component } from '@angular/core';
import { CompanyService } from 'src/app/services/helpers/company/company.service';
import { PrivilegyService } from 'src/app/services/helpers/privilegy/privilegy.service';
import { Utils } from 'src/app/util/utils';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class PurchComponent {
  panelOpenState = true;

  constructor(public companySrvice:CompanyService,public privilegyService:PrivilegyService, private utils:Utils){
   
    this.utils.validate();
  }
}
