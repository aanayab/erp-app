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
import { ResponseBean } from 'src/app/model/responseBean';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class WsSysAdminPrivilegyService {

  private privilegyByIdRoll = environment.wsSysAdmin.privilegy.privilegyByIdRoll;

  private privilegyUrl =  environment.wsSysAdmin.privilegy.privilegyUrl;
  private addPrivilegyUrl =  environment.wsSysAdmin.privilegy.addPrivilegyUrl;
  private updatePrivilegyUrl =  environment.wsSysAdmin.privilegy.updatePrivilegyUrl;
  private privilegiesUrl =  environment.wsSysAdmin.privilegy.privilegiesUrl;
  private disabelEnablePrivilegyUrl =  environment.wsSysAdmin.privilegy.disableEnablePrivilegyUrl;
  private existPrivilegyUrl =  environment.wsSysAdmin.privilegy.existPrivilegyUrl;
  private deletePrivilegyUrl =  environment.wsSysAdmin.privilegy.deletePrivilegyUrl;
  private privilegiesEnabledUrl = environment.wsSysAdmin.privilegy.privilegiesEnabledUrl;
  private updatePrivilegiesOrderUrl = environment.wsSysAdmin.privilegy.updatePrivilegiesOrderUrl;




  constructor(private http: HttpClient,private loadingService:LoadingService,private utils:Utils) { }


 

  getPrivilegyByRole(role:any): Observable<HttpResponse<PrivilegyBean>>{
    this.loadingService.setLoading(true);
     return  this.http.get<PrivilegyBean>(this.privilegyByIdRoll + role,{
      headers:this.utils.getBearerToken(),
      observe:  'response' ,
     });
  }

    getPrivilegy(idPrivilegy: number,utils:Utils): Observable<HttpResponse<PrivilegyBean>> {
      this.loadingService.setLoading(true);
      return this.http.get<PrivilegyBean>(this.privilegyUrl + idPrivilegy , {
        headers: utils.getBearerToken(),
        observe: 'response',
      });
    }
  
      getPrivilegies(utils:Utils): Observable<HttpResponse<PrivilegyBean[]>> {
        this.loadingService.setLoading(true);
        return this.http.get<PrivilegyBean[]>(this.privilegiesUrl , {
          headers: utils.getBearerToken(),
          observe: 'response',
        });
      }
  
      getPrivilegiesEnabled(utils:Utils): Observable<HttpResponse<PrivilegyBean[]>> {
        this.loadingService.setLoading(true);
        return this.http.get<PrivilegyBean[]>(this.privilegiesEnabledUrl , {
          headers: utils.getBearerToken(),
          observe: 'response',
        });
      }
  
    addPrivilegy(utils:Utils,privilegyBean:PrivilegyBean): Observable<HttpResponse<ResponseBean>> {
      this.loadingService.setLoading(true);
      return this.http.post<ResponseBean>(this.addPrivilegyUrl,privilegyBean , {
        headers: utils.getBearerToken(),
        observe: 'response',
      });
    }
  
    updatePrivilegy(utils:Utils,privilegyBean:PrivilegyBean): Observable<HttpResponse<ResponseBean>> {
      this.loadingService.setLoading(true);
      return this.http.put<ResponseBean>(this.updatePrivilegyUrl,privilegyBean , {
        headers: utils.getBearerToken(),
        observe: 'response',
      });
    }
  
  
  
    disableEnablePrivilegy(utils:Utils,idPrivilegy:number | any,enable:boolean): Observable<HttpResponse<ResponseBean>> {
      this.loadingService.setLoading(true);
      return this.http.post<ResponseBean>(this.disabelEnablePrivilegyUrl,{idPrivilegy,enable} , {
        headers: utils.getBearerToken(),
        observe: 'response',
      });
    }
  
  
  
    deletePrivilegy(utils:Utils,idPrivilegy:number | any): Observable<HttpResponse<ResponseBean>> {
      this.loadingService.setLoading(true);
      return this.http.delete<ResponseBean>(this.deletePrivilegyUrl , {
        headers: utils.getBearerToken(),
        observe: 'response',
        body: {idPrivilegy}
      });
    }
  
    existPrivilegy(idPrivilegy: number | any,utils:Utils): Observable<HttpResponse<Token>> {
      this.loadingService.setLoading(true);
      return this.http
        .get<Token>(this.existPrivilegyUrl + idPrivilegy,  {
          headers: utils.getBearerToken(),
          observe: 'response',
        });
    }
  
      updatePrivilegySOrder(utils:Utils,privilegyBean:PrivilegyBean[]): Observable<HttpResponse<ResponseBean>> {
      this.loadingService.setLoading(true);
      return this.http.put<ResponseBean>(this.updatePrivilegiesOrderUrl,privilegyBean , {
        headers: utils.getBearerToken(),
        observe: 'response',
      });
    }


}
