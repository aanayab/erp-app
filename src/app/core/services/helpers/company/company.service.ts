import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CompanyBean } from 'src/app/core/model/companyBean';
import { MessageService } from '../message/message.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private messageService: MessageService) {
    
    const company = localStorage.getItem("SESSIONERPAPPCMY");
    if (company !== undefined && company !== null) {
      this.company = JSON.parse(company);
      localStorage.removeItem("SESSIONERPAPPCMY");
    }

  }

  private company: CompanyBean | any;


  getCompanyObs(): Observable<CompanyBean> {
    if (this.company === undefined) {
      this.messageService.showDangerMessage("utils.COMPANY ERROR");
    }
    return of(this.company);
  }

  getCompany(): CompanyBean {
    // if (this.company === undefined) {
    //   this.messageService.showDangerMessage("utils.COMPANY ERROR");
    // }
    return this.company;
  }

  setCompany(company: CompanyBean | any) {
    
    this.company = company;
    

  }

}
