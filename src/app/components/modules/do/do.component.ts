import { Component } from '@angular/core';
import { CompanyService } from 'src/app/core/services/helpers/company/company.service';
import { PrivilegyService } from 'src/app/core/services/helpers/privilegy/privilegy.service';
import { Utils } from 'src/app/core/util/utils';

@Component({
  selector: 'app-do',
  templateUrl: './do.component.html',
  styleUrls: ['./do.component.css']
})
export class DoComponent {
  panelOpenState = true;
  constructor(public companySrvice:CompanyService,public privilegyService:PrivilegyService, private utils:Utils){
    this.utils.validate();
  }
}
