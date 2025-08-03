import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Token } from '../../model/token';
import { Utils } from '../../util/utils';
import { GrupoBean } from 'src/app/model/grupoBean';
import { LoadingService } from 'src/app/services/helpers/loading/loading.service';
import { ResponseBean } from '../../model/responseBean';
import { EmailBean } from '../../model/emailBean';
import { ConfirmationEmailBean } from '../../model/confirmationEmailBean';
import { useAnimation } from '@angular/animations';
import { environment } from '../../../environments/environment';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class WsAuthenticateGroupService {



  private grupoUrl =  environment.wsAuthenticate.grupo.grupoUrl;
  private addGroupUrl =  environment.wsAuthenticate.grupo.addGroupUrl;
  private updateGroupUrl =  environment.wsAuthenticate.grupo.updateGroupUrl;
  private gruposUrl =  environment.wsAuthenticate.grupo.gruposUrl;
  private disabelEnableGroupUrl =  environment.wsAuthenticate.grupo.disabelEnableGroupUrl;
  private hideShowGroupUrl =  environment.wsAuthenticate.grupo.hideShowGroupUrl;
  private existGroupUrl =  environment.wsAuthenticate.grupo.existGroupUrl;
  private deleteGroupUrl =  environment.wsAuthenticate.grupo.deleteGroupUrl;
  private gruposByIdCompanyUrl = environment.wsAuthenticate.grupo.grupoByIdCompanyUrl;
  private gruposEnabledByIdCompanyUrl = environment.wsAuthenticate.grupo.gruposEnabledByIdCompanyUrl;


  constructor(private http: HttpClient, private loadingService: LoadingService) { }




  getGroup(idGrupo: number,idCompany:any,utils:Utils): Observable<HttpResponse<GrupoBean>> {
    this.loadingService.setLoading(true);
    return this.http.get<GrupoBean>(this.grupoUrl + idGrupo +'/' +idCompany, {
      headers: utils.getBearerToken(),
      observe: 'response',
    });
  }


  getGroups(utils:Utils): Observable<HttpResponse<GrupoBean[]>> {
    this.loadingService.setLoading(true);
    return this.http.get<GrupoBean[]>(this.gruposUrl , {
      headers: utils.getBearerToken(),
      observe: 'response',
    });
  }

    getGroupsByIdCompany(utils:Utils,idCompany:any): Observable<HttpResponse<GrupoBean[]>> {
      this.loadingService.setLoading(true);
      return this.http.get<GrupoBean[]>(this.gruposByIdCompanyUrl+idCompany , {
        headers: utils.getBearerToken(),
        observe: 'response',
      });
    }

    getGroupsEnabledByIdCompany(utils:Utils,idCompany:any): Observable<HttpResponse<GrupoBean[]>> {
      this.loadingService.setLoading(true);
      return this.http.get<GrupoBean[]>(this.gruposEnabledByIdCompanyUrl+idCompany , {
        headers: utils.getBearerToken(),
        observe: 'response',
      });
    }

  addGroup(utils:Utils,grupoBean:GrupoBean): Observable<HttpResponse<ResponseBean>> {
    this.loadingService.setLoading(true);
    return this.http.post<ResponseBean>(this.addGroupUrl,grupoBean , {
      headers: utils.getBearerToken(),
      observe: 'response',
    });
  }

  updateGroups(utils:Utils,grupoBean:GrupoBean): Observable<HttpResponse<ResponseBean>> {
    this.loadingService.setLoading(true);
    return this.http.put<ResponseBean>(this.updateGroupUrl,grupoBean , {
      headers: utils.getBearerToken(),
      observe: 'response',
    });
  }



  disableEnableGroup(utils:Utils,idGrupo:number | any,enable:boolean,idCompany:any): Observable<HttpResponse<ResponseBean>> {
    this.loadingService.setLoading(true);
    return this.http.post<ResponseBean>(this.disabelEnableGroupUrl,{idGrupo,enable,idCompany} , {
      headers: utils.getBearerToken(),
      observe: 'response',
    });
  }

  hideShowGroup(utils:Utils,idGrupo:number | any,hide:boolean,idCompany:any): Observable<HttpResponse<ResponseBean>> {
    this.loadingService.setLoading(true);
    return this.http.post<ResponseBean>(this.hideShowGroupUrl,{idGrupo,hide,idCompany} , {
      headers: utils.getBearerToken(),
      observe: 'response',
    });
  }

  deleteGroup(utils:Utils,idGrupo:number | any,idCompany:any): Observable<HttpResponse<ResponseBean>> {
    this.loadingService.setLoading(true);
    return this.http.delete<ResponseBean>(this.deleteGroupUrl , {
      headers: utils.getBearerToken(),
      observe: 'response',
      body: {idGrupo,idCompany}
    });
  }

  existGroup(grupo: string | any,idCompany:any,utils:Utils): Observable<HttpResponse<Token>> {
    this.loadingService.setLoading(true);
    return this.http
      .get<Token>(this.existGroupUrl + grupo +'/' + idCompany,  {
        headers: utils.getBearerToken(),
        observe: 'response',
      });
  }

}

