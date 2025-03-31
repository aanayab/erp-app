import { Component } from '@angular/core';
import { CompanyService } from 'src/app/services/helpers/company/company.service';
import { PrivilegyService } from 'src/app/services/helpers/privilegy/privilegy.service';
import { Utils } from 'src/app/util/utils';

@Component({
  selector: 'app-produccion',
  templateUrl: './produccion.component.html',
  styleUrls: ['./produccion.component.css']
})
export class ProdComponent {
  panelOpenState = true;
  constructor(public companySrvice:CompanyService,public privilegyService:PrivilegyService, private utils:Utils){
    this.utils.validate();
  }
}
