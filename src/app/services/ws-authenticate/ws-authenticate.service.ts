import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Token } from '../../model/token';
import { Utils } from '../../services/util/utils';
import { UserBean } from 'src/app/model/userBean';
import { LoadingService } from 'src/app/services/loading/loading.service';

@Injectable({
  providedIn: 'root'
})
export class WsAuthenticateService {

  tokenUrl = 'http://192.168.100.15:8096/api/authenticate?';
  userUrl = 'http://192.168.100.15:8096/ws-authenticator/api/user/';


  constructor(private http: HttpClient,private loadingService:LoadingService,private utils:Utils) { }


  getToken(username:string,password:string): Observable<HttpResponse<Token>>  {
    this.loadingService.setLoading(true);
    return  this.http
    .post<Token>(this.tokenUrl + "username=" + username + "&password=" +  password,{},{ observe: 'response' });
  }

  getUser(username:string): Observable<HttpResponse<UserBean>>{
    this.loadingService.setLoading(true);
     return  this.http.get<UserBean>(this.userUrl + username,{
      headers:this.utils.getBearerToken(),
      observe:  'response' ,
     });
  }

}
