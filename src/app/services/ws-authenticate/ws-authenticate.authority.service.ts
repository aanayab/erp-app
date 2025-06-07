import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Token } from '../../model/token';
import { Utils } from '../../util/utils';
import { AuthorityBean } from 'src/app/model/authorityBean';
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
export class WsAuthenticateService {



  private authorityUrl =  environment.wsAuthenticate.authority.authorityUrl;
  private addAuthorityUrl =  environment.wsAuthenticate.authority.addAuthorityUrl;
  private updateAuthorityUrl =  environment.wsAuthenticate.authority.updateAuthorityUrl;
  private authoritiesUrl =  environment.wsAuthenticate.authority.authoritiesUrl;
  private disabelEnableAuthorityUrl =  environment.wsAuthenticate.authority.disabelEnableAuthorityUrl;
  private hideShowAuthorityUrl =  environment.wsAuthenticate.authority.hideShowAuthorityUrl;
  private existAuthorityUrl =  environment.wsAuthenticate.authority.existAuthorityUrl;
  private deleteAuthorityUrl =  environment.wsAuthenticate.authority.deleteAuthorityUrl;
  private authoritiesByIdCompanyUrl = environment.wsAuthenticate.authority.authorityByIdCompanyUrl;
  private authoritiesEnabledByIdCompanyUrl = environment.wsAuthenticate.authority.authoritiesEnabledByIdCompanyUrl;


  constructor(private http: HttpClient, private loadingService: LoadingService) { }




  getAuthority(authority: string,idComapny:any,utils:Utils): Observable<HttpResponse<AuthorityBean>> {
    this.loadingService.setLoading(true);
    return this.http.get<AuthorityBean>(this.authorityUrl + authority +'/' +idComapny, {
      headers: utils.getBearerToken(),
      observe: 'response',
    });
  }


  getAuthorities(utils:Utils): Observable<HttpResponse<AuthorityBean[]>> {
    this.loadingService.setLoading(true);
    return this.http.get<AuthorityBean[]>(this.authoritiesUrl , {
      headers: utils.getBearerToken(),
      observe: 'response',
    });
  }

    getAuthoritiesByIdCompany(utils:Utils,idCompany:any): Observable<HttpResponse<AuthorityBean[]>> {
      this.loadingService.setLoading(true);
      return this.http.get<AuthorityBean[]>(this.authoritiesByIdCompanyUrl+idCompany , {
        headers: utils.getBearerToken(),
        observe: 'response',
      });
    }

    getAuthoritiesEnabledByIdCompany(utils:Utils,idCompany:any): Observable<HttpResponse<AuthorityBean[]>> {
      this.loadingService.setLoading(true);
      return this.http.get<AuthorityBean[]>(this.authoritiesEnabledByIdCompanyUrl+idCompany , {
        headers: utils.getBearerToken(),
        observe: 'response',
      });
    }

  addAuthority(utils:Utils,authorityBean:AuthorityBean): Observable<HttpResponse<ResponseBean>> {
    this.loadingService.setLoading(true);
    return this.http.post<ResponseBean>(this.addAuthorityUrl,authorityBean , {
      headers: utils.getBearerToken(),
      observe: 'response',
    });
  }

  updateAuthorities(utils:Utils,authorityBean:AuthorityBean): Observable<HttpResponse<ResponseBean>> {
    this.loadingService.setLoading(true);
    return this.http.put<ResponseBean>(this.updateAuthorityUrl,authorityBean , {
      headers: utils.getBearerToken(),
      observe: 'response',
    });
  }



  disableEnableAuthority(utils:Utils,authority:string | any,enable:boolean,idCompany:any): Observable<HttpResponse<ResponseBean>> {
    this.loadingService.setLoading(true);
    return this.http.post<ResponseBean>(this.disabelEnableAuthorityUrl,{authority,enable,idCompany} , {
      headers: utils.getBearerToken(),
      observe: 'response',
    });
  }

  hideShowAuthority(utils:Utils,authority:string | any,hide:boolean,idCompany:any): Observable<HttpResponse<ResponseBean>> {
    this.loadingService.setLoading(true);
    return this.http.post<ResponseBean>(this.hideShowAuthorityUrl,{authority,hide,idCompany} , {
      headers: utils.getBearerToken(),
      observe: 'response',
    });
  }

  deleteAuthority(utils:Utils,authority:string | any,idCompany:any): Observable<HttpResponse<ResponseBean>> {
    this.loadingService.setLoading(true);
    return this.http.delete<ResponseBean>(this.deleteAuthorityUrl , {
      headers: utils.getBearerToken(),
      observe: 'response',
      body: {authority,idCompany}
    });
  }

  existAuthority(authority: string | any,idCompany:any,utils:Utils): Observable<HttpResponse<Token>> {
    this.loadingService.setLoading(true);
    return this.http
      .get<Token>(this.existAuthorityUrl + authority +'/' + idCompany,  {
        headers: utils.getBearerToken(),
        observe: 'response',
      });
  }

}

