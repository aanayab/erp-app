import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Token } from '../../model/token';
import { Utils } from '../../util/utils';
import { UserBean } from 'src/app/core/model/userBean';
import { LoadingService } from 'src/app/core/services/helpers/loading/loading.service';
import { ResponseBean } from '../../model/responseBean';
import { ConfirmationEmailBean } from '../../model/confirmationEmailBean';

@Injectable({
  providedIn: 'root'
})
export class WsAuthenticateService {

  private url = 'localhost';
  private tokenUrl = 'http://' + this.url+':8096/ws-authenticator/api/authenticate?';
  private validateUrl = 'http://' + this.url+':8096/ws-authenticator/api/authenticate/validate/';
  private refreshUrl = 'http://' + this.url+':8096/ws-authenticator/api/authenticate/refresh/';
  private userUrl = 'http://' + this.url+':8096/ws-authenticator/api/user/';
  private addUserUrl = 'http://' + this.url+':8096/ws-authenticator/api/user';
  private usersUrl = 'http://' + this.url+':8096/ws-authenticator/api/user/all';
  private usersByIdCompanyUrl = 'http://' + this.url+':8096/ws-authenticator/api/user/allByIdCompany/';
  private disabelEnableUserUrl = 'http://' + this.url+':8096/ws-authenticator/api/user/disable';
  private hideShowUserUrl = 'http://' + this.url+':8096/ws-authenticator/api/user/hide';
  private existUsernameUrl = 'http://' + this.url+':8096/ws-authenticator/api/user/username/exist/';
  private existEmailUrl = 'http://' + this.url+':8096/ws-authenticator/api/user/email/exist/';
  private confirmUserUrl = 'http://' + this.url+':8096/ws-authenticator/api/user/confirm';

  constructor(private http: HttpClient, private loadingService: LoadingService) { }


  getToken(username: string, password: string): Observable<HttpResponse<Token>> {
    this.loadingService.setLoading(true);
    return this.http
      .post<Token>(this.tokenUrl + "username=" + username + "&password=" + password, {}, { observe: 'response' });
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
  getUsersBydDCompany(utils:Utils,idComapny:any): Observable<HttpResponse<UserBean[]>> {
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

  disableEnableUser(utils:Utils,userBean:UserBean): Observable<HttpResponse<ResponseBean>> {
    this.loadingService.setLoading(true);
    return this.http.post<ResponseBean>(this.disabelEnableUserUrl,userBean , {
      headers: utils.getBearerToken(),
      observe: 'response',
    });
  }

  hideShowUser(utils:Utils,userBean:UserBean): Observable<HttpResponse<ResponseBean>> {
    this.loadingService.setLoading(true);
    return this.http.post<ResponseBean>(this.hideShowUserUrl,userBean , {
      headers: utils.getBearerToken(),
      observe: 'response',
    });
  }

  existUsername(username: string | any,utils:Utils): Observable<HttpResponse<Token>> {
    this.loadingService.setLoading(true);
    return this.http
      .get<Token>(this.existUsernameUrl + username,  {
        headers: utils.getBearerToken(),
        observe: 'response'
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

  confirmUser(confirmationEmailBean:ConfirmationEmailBean,utils:Utils): Observable<HttpResponse<ResponseBean>> {
    this.loadingService.setLoading(true);
    return this.http.post<ResponseBean>(this.confirmUserUrl,confirmationEmailBean , {
      headers: utils.getBearerToken(),
      observe: 'response',
    });
  }
}
