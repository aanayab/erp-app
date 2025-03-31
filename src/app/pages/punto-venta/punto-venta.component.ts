import { Component } from '@angular/core';
import { CompanyService } from 'src/app/services/helpers/company/company.service';
import { PrivilegyService } from 'src/app/services/helpers/privilegy/privilegy.service';
import { Utils } from 'src/app/util/utils';

@Component({
  selector: 'app-punto-venta',
  templateUrl: './punto-venta.component.html',
  styleUrls: ['./punto-venta.component.css']
})
export class PvComponent {
  panelOpenState = true;
  constructor(public companySrvice:CompanyService,public privilegyService:PrivilegyService, private utils:Utils){
   
    this.utils.validate();
  }
}
