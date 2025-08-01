import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Token } from '../../model/token';
import { Utils } from '../../util/utils';
import { ActionBean } from 'src/app/model/actionBean';
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
export class WsSysAdminActionService {



  private actionUrl =  environment.wsSysAdmin.action.actionUrl;
  private addActionUrl =  environment.wsSysAdmin.action.addActionUrl;
  private updateActionUrl =  environment.wsSysAdmin.action.updateActionUrl;
  private actionsUrl =  environment.wsSysAdmin.action.actionsUrl;
  private disabelEnableActionUrl =  environment.wsSysAdmin.action.disabelEnableActionUrl;
  private existActionUrl =  environment.wsSysAdmin.action.existActionUrl;
  private deleteActionUrl =  environment.wsSysAdmin.action.deleteActionUrl;
  private actionsEnabledUrl = environment.wsSysAdmin.action.actionsEnabledUrl;


  constructor(private http: HttpClient, private loadingService: LoadingService) { }




  getAction(idAction: number,utils:Utils): Observable<HttpResponse<ActionBean>> {
    this.loadingService.setLoading(true);
    return this.http.get<ActionBean>(this.actionUrl + idAction, {
      headers: utils.getBearerToken(),
      observe: 'response',
    });
  }




    getActions(utils:Utils): Observable<HttpResponse<ActionBean[]>> {
      this.loadingService.setLoading(true);
      return this.http.get<ActionBean[]>(this.actionsUrl , {
        headers: utils.getBearerToken(),
        observe: 'response',
      });
    }

    getActionsEnabled(utils:Utils): Observable<HttpResponse<ActionBean[]>> {
      this.loadingService.setLoading(true);
      return this.http.get<ActionBean[]>(this.actionsEnabledUrl , {
        headers: utils.getBearerToken(),
        observe: 'response',
      });
    }

  addAction(utils:Utils,actionBean:ActionBean): Observable<HttpResponse<ResponseBean>> {
    this.loadingService.setLoading(true);
    return this.http.post<ResponseBean>(this.addActionUrl,actionBean , {
      headers: utils.getBearerToken(),
      observe: 'response',
    });
  }

  updateActions(utils:Utils,actionBean:ActionBean): Observable<HttpResponse<ResponseBean>> {
    this.loadingService.setLoading(true);
    return this.http.put<ResponseBean>(this.updateActionUrl,actionBean , {
      headers: utils.getBearerToken(),
      observe: 'response',
    });
  }



  disableEnableAction(utils:Utils,idAction:number | any,enable:boolean): Observable<HttpResponse<ResponseBean>> {
    this.loadingService.setLoading(true);
    return this.http.post<ResponseBean>(this.disabelEnableActionUrl,{idAction,enable} , {
      headers: utils.getBearerToken(),
      observe: 'response',
    });
  }



  deleteAction(utils:Utils,idAction:number | any): Observable<HttpResponse<ResponseBean>> {
    this.loadingService.setLoading(true);
    return this.http.delete<ResponseBean>(this.deleteActionUrl , {
      headers: utils.getBearerToken(),
      observe: 'response',
      body: {idAction}
    });
  }

  existAction(action: string | any,utils:Utils): Observable<HttpResponse<Token>> {
    this.loadingService.setLoading(true);
    return this.http
      .get<Token>(this.existActionUrl + action,  {
        headers: utils.getBearerToken(),
        observe: 'response',
      });
  }

}

