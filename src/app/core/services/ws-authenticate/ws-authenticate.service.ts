import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Token } from '../../model/token';
import { Utils } from '../../util/utils';
import { UserBean } from 'src/app/core/model/userBean';
import { LoadingService } from 'src/app/core/services/loading/loading.service';

@Injectable({
  providedIn: 'root'
})
export class WsAuthenticateService {

  tokenUrl = 'http://192.168.100.15:8096/api/authenticate?';
  validateUrl = 'http://192.168.100.15:8096/api/authenticate/validate/';
  refreshUrl = 'http://192.168.100.15:8096/api/authenticate/refresh/';
  userUrl = 'http://192.168.100.15:8096/ws-authenticator/api/user/';

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

}
