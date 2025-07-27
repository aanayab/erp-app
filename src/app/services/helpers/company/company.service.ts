import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { CompanyBean } from 'src/app/model/companyBean';
import { MessageService } from '../message/message.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private companySubject = new BehaviorSubject<CompanyBean | null>(null);

  constructor(private messageService: MessageService) {
    
    const company = localStorage.getItem("SESSIONERPAPPCMY");
    if (company !== undefined && company !== null) {
      this.company = JSON.parse(company);
      localStorage.removeItem("SESSIONERPAPPCMY");
    }

  }

  private company: CompanyBean | any;


  getCompanyObs(): Observable<CompanyBean | null> {
    //TODO revisar 
    // if (this.company === undefined) {
    //   this.messageService.showDangerMessage("COMPANY_SERVICE.COMPANY_ERROR");
    // }
    return this.companySubject.asObservable();
  }

  getCompany(): CompanyBean | any {
    return this.company;
  }

  setCompany(company: CompanyBean|any ): void {
    this.company = company;
    this.companySubject.next(company);
  }
}
