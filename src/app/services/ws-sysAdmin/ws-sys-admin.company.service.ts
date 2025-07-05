import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Utils } from '../../util/utils';
import { UserBean } from 'src/app/model/userBean';
import { LoadingService } from 'src/app/services/helpers/loading/loading.service';
import { CompanyBean } from 'src/app/model/companyBean';
import { PrivilegyBean } from 'src/app/model/peivilegyBean';
import { MenuBean } from '../../model/menuBean';
import { FoodNode } from '../../model/foodNode';
import { Route } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WsSysAdminCompanyService {

  
  private  companyUrl = environment.wsSysAdmin.company.companyUrl;
  private companybyIdUrl = environment.wsSysAdmin.company.companybyIdUrl;

  constructor(private http: HttpClient,private loadingService:LoadingService,private utils:Utils) { }


 

  getCompanies(): Observable<HttpResponse<CompanyBean>>{
    this.loadingService.setLoading(true);
     return  this.http.get<CompanyBean>(this.companyUrl,{
      headers:this.utils.getBearerToken(),
      observe:  'response' ,
     });
  }


  getCompany(idCompany:any): Observable<HttpResponse<UserBean>>{
    this.loadingService.setLoading(true);
     return  this.http.get<CompanyBean>(this.companybyIdUrl + idCompany,{
      headers:this.utils.getBearerToken(),
      observe:  'response' ,
     });
    }
}
