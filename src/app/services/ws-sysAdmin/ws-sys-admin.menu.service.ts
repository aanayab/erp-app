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
export class WsSysAdminMenuService {

  private menuByIdRoll = environment.wsSysAdmin.menu.menuByIdRoll;
  private foodNodeByIdRoll = environment.wsSysAdmin.menu.foodNodeByIdRoll;
  private routeByIdRoll = environment.wsSysAdmin.menu.routeByIdRoll;


  constructor(private http: HttpClient,private loadingService:LoadingService,private utils:Utils) { }




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
