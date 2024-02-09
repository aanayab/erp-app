import { Component } from '@angular/core';
import { CompanyService } from 'src/app/services/company/company.service';
import { PrivilegyService } from 'src/app/services/privilegy/privilegy.service';

@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.css']
})
export class GestionComponent {
  panelOpenState = true;

  constructor(public companySrvice:CompanyService,public privilegyService:PrivilegyService){
   
  }
}
