import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Utils } from '../../util/utils';
import { UserBean } from 'src/app/model/userBean';
import { LoadingService } from 'src/app/services/helpers/loading/loading.service';
import { CompanyBean } from 'src/app/model/companyBean';
import { PrivilegyBean } from 'src/app/model/privilegyBean';
import { MenuBean } from '../../model/menuBean';
import { FoodNode } from '../../model/foodNode';
import { Route } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Token } from '@angular/compiler';
import { ResponseBean } from 'src/app/model/responseBean';

@Injectable({
  providedIn: 'root'
})
export class WsSysAdminMenuService {

  private menuByIdRoll = environment.wsSysAdmin.menu.menuByIdRoll;
  private foodNodeByIdRoll = environment.wsSysAdmin.menu.foodNodeByIdRoll;
  private routeByIdRoll = environment.wsSysAdmin.menu.routeByIdRoll;


  private menuUrl =  environment.wsSysAdmin.menu.menuUrl;
  private addMenuUrl =  environment.wsSysAdmin.menu.addMenuUrl;
  private updateMenuUrl =  environment.wsSysAdmin.menu.updateMenuUrl;
  private menusUrl =  environment.wsSysAdmin.menu.menusUrl;
  private disabelEnableMenuUrl =  environment.wsSysAdmin.menu.disableEnableMenuUrl;
  private existMenuUrl =  environment.wsSysAdmin.menu.existMenuUrl;
  private deleteMenuUrl =  environment.wsSysAdmin.menu.deleteMenuUrl;
  private menusEnabledUrl = environment.wsSysAdmin.menu.menusEnabledUrl;
  private updateMenusOrderUrl = environment.wsSysAdmin.menu.updateMenusOrderUrl;

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

    getMenu(menu: string,utils:Utils): Observable<HttpResponse<MenuBean>> {
      this.loadingService.setLoading(true);
      return this.http.get<MenuBean>(this.menuUrl + menu , {
        headers: utils.getBearerToken(),
        observe: 'response',
      });
    }
  
      getMenus(utils:Utils): Observable<HttpResponse<MenuBean[]>> {
        this.loadingService.setLoading(true);
        return this.http.get<MenuBean[]>(this.menusUrl , {
          headers: utils.getBearerToken(),
          observe: 'response',
        });
      }
  
      getMenusEnabled(utils:Utils): Observable<HttpResponse<MenuBean[]>> {
        this.loadingService.setLoading(true);
        return this.http.get<MenuBean[]>(this.menusEnabledUrl , {
          headers: utils.getBearerToken(),
          observe: 'response',
        });
      }
  
    addMenu(utils:Utils,menuBean:MenuBean): Observable<HttpResponse<ResponseBean>> {
      this.loadingService.setLoading(true);
      return this.http.post<ResponseBean>(this.addMenuUrl,menuBean , {
        headers: utils.getBearerToken(),
        observe: 'response',
      });
    }
  
    updateMenu(utils:Utils,menuBean:MenuBean): Observable<HttpResponse<ResponseBean>> {
      this.loadingService.setLoading(true);
      return this.http.put<ResponseBean>(this.updateMenuUrl,menuBean , {
        headers: utils.getBearerToken(),
        observe: 'response',
      });
    }
  
  
  
    disableEnableMenu(utils:Utils,idMenu:number | any,enable:boolean): Observable<HttpResponse<ResponseBean>> {
      this.loadingService.setLoading(true);
      return this.http.post<ResponseBean>(this.disabelEnableMenuUrl,{idMenu,enable} , {
        headers: utils.getBearerToken(),
        observe: 'response',
      });
    }
  
  
  
    deleteMenu(utils:Utils,idMenu:number | any): Observable<HttpResponse<ResponseBean>> {
      this.loadingService.setLoading(true);
      return this.http.delete<ResponseBean>(this.deleteMenuUrl , {
        headers: utils.getBearerToken(),
        observe: 'response',
        body: {idMenu}
      });
    }
  
    existMenu(name: string | any,utils:Utils): Observable<HttpResponse<Token>> {
      this.loadingService.setLoading(true);
      return this.http
        .get<Token>(this.existMenuUrl + name,  {
          headers: utils.getBearerToken(),
          observe: 'response',
        });
    }
  
        updateMenuOrder(utils:Utils,screenBean:MenuBean[]): Observable<HttpResponse<ResponseBean>> {
        this.loadingService.setLoading(true);
        return this.http.put<ResponseBean>(this.updateMenusOrderUrl,screenBean , {
          headers: utils.getBearerToken(),
          observe: 'response',
        });
      }


}
