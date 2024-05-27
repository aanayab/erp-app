import { Component } from '@angular/core';
import { CompanyService } from 'src/app/core/services/helpers/company/company.service';
import { PrivilegyService } from 'src/app/core/services/helpers/privilegy/privilegy.service';
import { Utils } from 'src/app/core/util/utils';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  panelOpenState = true;
  color:String | any;
  constructor(public companySrvice:CompanyService,public privilegyService:PrivilegyService, private utils:Utils){
   
      // this.utils.validate();
  }
}
