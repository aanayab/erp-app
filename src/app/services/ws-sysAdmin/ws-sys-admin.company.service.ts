import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Utils } from '../../util/utils';
import { UserBean } from 'src/app/model/userBean';
import { LoadingService } from 'src/app/services/helpers/loading/loading.service';
import { CompanyBean } from 'src/app/model/companyBean';

import { MenuBean } from '../../model/menuBean';
import { FoodNode } from '../../model/foodNode';
import { Route } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ResponseBean } from 'src/app/model/responseBean';
import { Token } from 'src/app/model/token';

@Injectable({
  providedIn: 'root'
})
export class WsSysAdminCompanyService {

  
  private  companyUrl = environment.wsSysAdmin.company.companyUrl;
  private companybyIdUrl = environment.wsSysAdmin.company.companybyIdUrl;

  // private companyUrl =  environment.wsSysAdmin.company.companyUrl;
  private addCompanyUrl =  environment.wsSysAdmin.company.addScreenUrl;
  private updateCompanyUrl =  environment.wsSysAdmin.company.updateScreenUrl;
  private companiesUrl =  environment.wsSysAdmin.company.companiesUrl;
  private disabelEnableCompanyUrl =  environment.wsSysAdmin.company.disableEnableCompanyUrl;
  private existCompanyUrl =  environment.wsSysAdmin.company.existCompanyUrl;
  private deleteCompanyUrl =  environment.wsSysAdmin.company.deleteCompanyUrl;
  private companiesEnabledUrl = environment.wsSysAdmin.company.companiesEnabledUrl;


  constructor(private http: HttpClient,private loadingService:LoadingService,private utils:Utils) { }


 

  getCompanies1(): Observable<HttpResponse<CompanyBean>>{
    this.loadingService.setLoading(true);
     return  this.http.get<CompanyBean>(this.companyUrl,{
      headers:this.utils.getBearerToken(),
      observe:  'response' ,
     });
  }


  getCompany(idCompany:any): Observable<HttpResponse<CompanyBean>>{
    this.loadingService.setLoading(true);
     return  this.http.get<CompanyBean>(this.companybyIdUrl + idCompany,{
      headers:this.utils.getBearerToken(),
      observe:  'response' ,
     });
    }

    // TODO revisar las funciones nuevas
    //  getCompany(company: string,utils:Utils): Observable<HttpResponse<CompanyBean>> {
    //     this.loadingService.setLoading(true);
    //     return this.http.get<CompanyBean>(this.companyUrl + company , {
    //       headers: utils.getBearerToken(),
    //       observe: 'response',
    //     });
    //   }
    
        getCompanies3(utils:Utils): Observable<HttpResponse<CompanyBean[]>> {
          this.loadingService.setLoading(true);
          return this.http.get<CompanyBean[]>(this.companiesUrl , {
            headers: utils.getBearerToken(),
            observe: 'response',
          });
        }
    
        getCompaniesEnabled(): Observable<HttpResponse<CompanyBean[]>> {
          this.loadingService.setLoading(true);
          return this.http.get<CompanyBean[]>(this.companiesEnabledUrl , {
            headers: this.utils.getBearerToken(),
            observe: 'response',
          });
        }
    
      addCompany(utils:Utils,companyBean:CompanyBean): Observable<HttpResponse<ResponseBean>> {
        this.loadingService.setLoading(true);
        return this.http.post<ResponseBean>(this.addCompanyUrl,companyBean , {
          headers: utils.getBearerToken(),
          observe: 'response',
        });
      }
    
      updateCompany(utils:Utils,companyBean:CompanyBean): Observable<HttpResponse<ResponseBean>> {
        this.loadingService.setLoading(true);
        return this.http.put<ResponseBean>(this.updateCompanyUrl,companyBean , {
          headers: utils.getBearerToken(),
          observe: 'response',
        });
      }
    
    
    
      disableEnableCompany(utils:Utils,idCompany:number | any,enable:boolean): Observable<HttpResponse<ResponseBean>> {
        this.loadingService.setLoading(true);
        return this.http.post<ResponseBean>(this.disabelEnableCompanyUrl,{idCompany,enable} , {
          headers: utils.getBearerToken(),
          observe: 'response',
        });
      }
    
    
    
      deleteCompany(utils:Utils,idCompany:number | any): Observable<HttpResponse<ResponseBean>> {
        this.loadingService.setLoading(true);
        return this.http.delete<ResponseBean>(this.deleteCompanyUrl , {
          headers: utils.getBearerToken(),
          observe: 'response',
          body: {idCompany}
        });
      }
    
      existCompany(idCompany: number | any,utils:Utils): Observable<HttpResponse<Token>> {
        this.loadingService.setLoading(true);
        return this.http
          .get<Token>(this.existCompanyUrl + idCompany,  {
            headers: utils.getBearerToken(),
            observe: 'response',
          });
      }
    
}
