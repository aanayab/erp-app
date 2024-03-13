import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Utils } from '../../util/utils';
import { UserBean } from 'src/app/core/model/userBean';
import { LoadingService } from 'src/app/core/services/loading/loading.service';
import { CompanyBean } from 'src/app/core/model/companyBean';
import { PrivilegyBean } from 'src/app/core/model/peivilegyBean';


@Injectable({
  providedIn: 'root'
})
export class WsSysAdminService {

  url = 'localhost';
  companyUrl = 'http://'+ this.url +':8096/ws-sysAdmin/api/company/all';
  companybyIdUrl = 'http://'+ this.url +':8096/ws-sysAdmin/api/company/';
  privilegyByIdRoll = 'http://'+ this.url +':8096/ws-sysAdmin/api/privilegy/allByRole/';


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

  getPrivilegyByRole(role:any): Observable<HttpResponse<PrivilegyBean>>{
    this.loadingService.setLoading(true);
     return  this.http.get<PrivilegyBean>(this.privilegyByIdRoll + role,{
      headers:this.utils.getBearerToken(),
      observe:  'response' ,
     });
  }

}
