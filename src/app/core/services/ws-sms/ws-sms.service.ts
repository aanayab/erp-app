import { Injectable } from '@angular/core';
import { LoadingService } from '../helpers/loading/loading.service';
import { Utils } from '../../util/utils';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ResponseBean } from '../../model/responseBean';
import { Observable } from 'rxjs';
import { SmsConfirmationBean } from '../../model/smsConfirmationBean';

@Injectable({
  providedIn: 'root'
})
export class WsSmsService {



  url = 'localhost';
  sendUrl = 'http://'+ this.url +':8096/ws-sms/api/sms/send-confirmation-code';

  constructor(private http: HttpClient,private loadingService:LoadingService,private utils:Utils) { }




  sendSms(utils:Utils,phoneNumber:string,message:string,token:string): Observable<HttpResponse<ResponseBean>> {
    const smsBean:SmsConfirmationBean = {'phoneNumber':phoneNumber,'message':message,'token':token};
    this.loadingService.setLoading(true);
    return this.http.post<ResponseBean>(this.sendUrl,smsBean , {
      headers: utils.getBearerToken(),
      observe: 'response',
    });
  }

}
