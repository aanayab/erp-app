import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CompanyBean } from 'src/app/model/companyBean';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  company!: any;
 

  getCompanyObs():  Observable<CompanyBean> {
    return of(this.company);
  }

  getCompany():  CompanyBean {
    return this.company;
  }

  setCompany(company:CompanyBean){
    this.company = company;

  }

}
