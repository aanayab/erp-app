import { Component } from '@angular/core';
import { CompanyService } from 'src/app/core/services/helpers/company/company.service';
import { PrivilegyService } from 'src/app/core/services/helpers/privilegy/privilegy.service';
import { Utils } from 'src/app/core/util/utils';

@Component({
  selector: 'app-auditoria',
  templateUrl: './auditoria.component.html',
  styleUrls: ['./auditoria.component.css']
})
export class AuditComponent {
  panelOpenState = true;

  constructor(public companySrvice:CompanyService,public privilegyService:PrivilegyService, private utils:Utils){
    this.utils.validate();
  }
}
