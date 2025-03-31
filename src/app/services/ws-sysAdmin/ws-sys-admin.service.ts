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
export class WsSysAdminService {

  
  private  companyUrl = environment.wsSysAdmin.companyUrl;
  private companybyIdUrl = environment.wsSysAdmin.companybyIdUrl;
  private privilegyByIdRoll = environment.wsSysAdmin.privilegyByIdRoll;
  private menuByIdRoll = environment.wsSysAdmin.menuByIdRoll;
  private foodNodeByIdRoll = environment.wsSysAdmin.foodNodeByIdRoll;
  private routeByIdRoll = environment.wsSysAdmin.routeByIdRoll;


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

  getMenuByRole(role:any): Observable<HttpResponse<MenuBean>>{
    this.loadingService.setLoading(true);
     return  this.http.get<MenuBean>(this.menuByIdRoll + role,{
      headers:this.utils.getBearerToken(),
      observe:  'response' ,
     });
  }

  getFoodNodeByRole(role:any): Observable<HttpResponse<FoodNode>>{
    this.loadingService.setLoading(true);
     return  this.http.get<FoodNode>(this.foodNodeByIdRoll + role,{
      headers:this.utils.getBearerToken(),
      observe:  'response' ,
     });
  }


  getRouteByRole(role:any): Observable<HttpResponse<Route>>{
    this.loadingService.setLoading(true);
     return  this.http.get<Route>(this.routeByIdRoll + role,{
      headers:this.utils.getBearerToken(),
      observe:  'response' ,
     });
  }

}
