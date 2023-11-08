import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Token } from '../model/token';

@Injectable({
  providedIn: 'root'
})
export class WsAuthenticateService {

  



  tokenUrl = 'http://localhost:8083/api/authenticate?';


  constructor(private http: HttpClient) { }


  getToken(username:string,password:string): Observable<HttpResponse<Token>>  {
    return  this.http
    .post<Token>(this.tokenUrl + "username=" + username + "&password=" +  password,{},{ observe: 'response' });
  }

}
