import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Token } from '../../model/token';
import { Utils } from '../../util/utils';
import { UserBean } from 'src/app/core/model/userBean';
import { LoadingService } from 'src/app/core/services/loading/loading.service';
import { ResponseBean } from '../../model/responseBean';

@Injectable({
  providedIn: 'root'
})
export class WsAuthenticateService {

  url = 'localhost';
  tokenUrl = 'http://' + this.url+':8096/ws-authenticator/api/authenticate?';
  validateUrl = 'http://' + this.url+':8096/ws-authenticator/api/authenticate/validate/';
  refreshUrl = 'http://' + this.url+':8096/ws-authenticator/api/authenticate/refresh/';
  userUrl = 'http://' + this.url+':8096/ws-authenticator/api/user/';
  usersUrl = 'http://' + this.url+':8096/ws-authenticator/api/user/all';

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

  addUsers(utils:Utils,userBean:UserBean): Observable<HttpResponse<ResponseBean>> {
    this.loadingService.setLoading(true);
    return this.http.post<ResponseBean>(this.userUrl,userBean , {
      headers: utils.getBearerToken(),
      observe: 'response',
    });
  }


}
