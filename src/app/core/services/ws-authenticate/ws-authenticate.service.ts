import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Token } from '../../model/token';
import { Utils } from '../../util/utils';
import { UserBean } from 'src/app/core/model/userBean';
import { LoadingService } from 'src/app/core/services/helpers/loading/loading.service';
import { ResponseBean } from '../../model/responseBean';
import { EmailBean } from '../../model/emailBean';
import { ConfirmationEmailBean } from '../../model/confirmationEmailBean';
import { useAnimation } from '@angular/animations';
import { environment } from '../../../../environments/environment';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class WsAuthenticateService {


  private tokenUrl = environment.wsAuthenticate.tokenUrl;
  private validateUrl =  environment.wsAuthenticate.validateUrl;
  private refreshUrl =  environment.wsAuthenticate.refreshUrl;
  private userUrl =  environment.wsAuthenticate.userUrl;
  private addUserUrl =  environment.wsAuthenticate.addUserUrl;
  private updateUserUrl =  environment.wsAuthenticate.updateUserUrl;
  private usersUrl =  environment.wsAuthenticate.usersUrl;
  private usersByIdCompanyUrl =  environment.wsAuthenticate.usersByIdCompanyUrl;
  private disabelEnableUserUrl =  environment.wsAuthenticate.disabelEnableUserUrl;
  private hideShowUserUrl =  environment.wsAuthenticate.hideShowUserUrl;
  private existUsernameUrl =  environment.wsAuthenticate.existUsernameUrl;
  private existEmailUrl =  environment.wsAuthenticate.existEmailUrl;
  private existMobileUrl =  environment.wsAuthenticate.existMobileUrl;
  private confirmUserUrl =  environment.wsAuthenticate.confirmUserUrl;
  private deleteUserUrl =  environment.wsAuthenticate.deleteUserUrl;
  private resetPasswordUrl = environment.wsAuthenticate.resetPasswordUrl;

  constructor(private http: HttpClient, private loadingService: LoadingService) { }


  getToken(username: string, password: string): Observable<HttpResponse<Token>> {
    this.loadingService.setLoading(true);

    let requestId  = environment.profile === "DEV" ? environment.profile : uuidv4(); // Generar un UUID
    localStorage.setItem('SESSIONERPAPPUUID', requestId);
    let headers = new HttpHeaders().set("X-Browser-ID",requestId).set('X-Client-Type','browser');
    return this.http
      .post<Token>(this.tokenUrl + "username=" + username + "&password=" + password, {}, { headers,observe: 'response' });
  }
  validate(username: string,utils:Utils): Observable<HttpResponse<Boolean>> {
    this.loadingService.setLoading(true);
    return this.http
      .post<Boolean>(this.validateUrl + username, {}, {
        headers: utils.getBearerToken(),
        observe: 'response'
      });
  }
  refesh(username: string,utils:Utils): Observable<HttpResponse<Token>> {
    this.loadingService.setLoading(true);
    return this.http
      .post<Token>(this.refreshUrl + username, {}, {
        headers: utils.getBearerToken(),
        observe: 'response'
      });
  }

  getUser(username: string,utils:Utils): Observable<HttpResponse<UserBean>> {
    this.loadingService.setLoading(true);
    return this.http.get<UserBean>(this.userUrl + username, {
      headers: utils.getBearerToken(),
      observe: 'response',
    });
  }


  getUsers(utils:Utils): Observable<HttpResponse<UserBean[]>> {
    this.loadingService.setLoading(true);
    return this.http.get<UserBean[]>(this.usersUrl , {
      headers: utils.getBearerToken(),
      observe: 'response',
    });
  }
  getUsersByIdCompany(utils:Utils,idComapny:any): Observable<HttpResponse<UserBean[]>> {
    this.loadingService.setLoading(true);
    return this.http.get<UserBean[]>(this.usersByIdCompanyUrl+idComapny , {
      headers: utils.getBearerToken(),
      observe: 'response',
    });
  }

  addUsers(utils:Utils,userBean:UserBean): Observable<HttpResponse<ResponseBean>> {
    this.loadingService.setLoading(true);
    return this.http.post<ResponseBean>(this.addUserUrl,userBean , {
      headers: utils.getBearerToken(),
      observe: 'response',
    });
  }

  updateUsers(utils:Utils,userBean:UserBean): Observable<HttpResponse<ResponseBean>> {
    this.loadingService.setLoading(true);
    return this.http.put<ResponseBean>(this.updateUserUrl,userBean , {
      headers: utils.getBearerToken(),
      observe: 'response',
    });
  }

  resetPassword(utils:Utils,userBean:UserBean): Observable<HttpResponse<ResponseBean>> {
    this.loadingService.setLoading(true);
    return this.http.put<ResponseBean>(this.resetPasswordUrl,userBean , {
      headers: utils.getBearerToken(),
      observe: 'response',
    });
  }

  disableEnableUser(utils:Utils,username:string | any,enable:boolean): Observable<HttpResponse<ResponseBean>> {
    this.loadingService.setLoading(true);
    return this.http.post<ResponseBean>(this.disabelEnableUserUrl,{username,enable} , {
      headers: utils.getBearerToken(),
      observe: 'response',
    });
  }

  hideShowUser(utils:Utils,username:string | any,hide:boolean): Observable<HttpResponse<ResponseBean>> {
    this.loadingService.setLoading(true);
    return this.http.post<ResponseBean>(this.hideShowUserUrl,{username,hide} , {
      headers: utils.getBearerToken(),
      observe: 'response',
    });
  }

  deleteUser(utils:Utils,username:string | any): Observable<HttpResponse<ResponseBean>> {
    this.loadingService.setLoading(true);
    return this.http.delete<ResponseBean>(this.deleteUserUrl , {
      headers: utils.getBearerToken(),
      observe: 'response',
      body: username
    });
  }

  existUsername(username: string | any,utils:Utils): Observable<HttpResponse<Token>> {
    this.loadingService.setLoading(true);
    return this.http
      .get<Token>(this.existUsernameUrl + username,  {
        headers: utils.getBearerToken(),
        observe: 'response',
      });
  }
  existEmail(email: string | any,utils:Utils): Observable<HttpResponse<Token>> {
    this.loadingService.setLoading(true);
    return this.http
      .get<Token>(this.existEmailUrl + email,  {
        headers: utils.getBearerToken(),
        observe: 'response'
      });
  }


  existMobile(mobile: string | any,utils:Utils): Observable<HttpResponse<Token>> {
    this.loadingService.setLoading(true);
    return this.http
      .get<Token>(this.existMobileUrl + mobile,  {
        headers: utils.getBearerToken(),
        observe: 'response'
      });
  }

  confirmUser(confirmationEmailBean:ConfirmationEmailBean,utils:Utils): Observable<HttpResponse<ResponseBean>> {
    this.loadingService.setLoading(true);
    return this.http.post<ResponseBean>(this.confirmUserUrl,confirmationEmailBean , {
      headers: utils.getBearerToken(),
      observe: 'response',
    });
  }
}

